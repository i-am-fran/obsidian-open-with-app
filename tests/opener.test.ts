import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, OpenWithSettings, appLabel, desktopLaunch, iosUrl } from "../src/opener";

const file = (path: string) => ({ path, fullPath: `/var/vault/${path}`, vault: "My Vault" });
const settings = (overrides: Partial<OpenWithSettings> = {}): OpenWithSettings => ({ ...DEFAULT_SETTINGS, ...overrides });

describe("desktopLaunch", () => {
	it("opens the file with `open -a` on Mac", () => {
		expect(desktopLaunch("mac", settings(), "/vault/Note.md")).toEqual({
			command: "open",
			args: ["-a", "iA Writer", "/vault/Note.md"],
		});
	});

	it("runs the program with the file on Windows", () => {
		const s = settings({ windowsPath: "C:\\Program Files\\iA Writer\\iAWriter.exe" });
		expect(desktopLaunch("windows", s, "C:\\vault\\Note.md")).toEqual({
			command: "C:\\Program Files\\iA Writer\\iAWriter.exe",
			args: ["C:\\vault\\Note.md"],
		});
	});

	it("runs the command with the file on Linux", () => {
		expect(desktopLaunch("linux", settings({ linuxCommand: "ghostwriter" }), "/vault/Note.md")).toEqual({
			command: "ghostwriter",
			args: ["/vault/Note.md"],
		});
	});

	it("trims stray spaces from the setting", () => {
		expect(desktopLaunch("linux", settings({ linuxCommand: "  ghostwriter " }), "/v/N.md")).toEqual({
			command: "ghostwriter",
			args: ["/v/N.md"],
		});
	});

	it("returns null when this system's app isn't set", () => {
		expect(desktopLaunch("windows", settings(), "C:\\vault\\Note.md")).toBeNull();
		expect(desktopLaunch("mac", settings({ macApp: " " }), "/vault/Note.md")).toBeNull();
	});
});

describe("iosUrl", () => {
	it("builds an iA Writer open link for the file in the named location", () => {
		expect(iosUrl(settings({ iosLocation: "Obsidian", iosShowKeyboard: false }), file("Notes/My Note.md"))).toBe(
			"ia-writer://open?path=Obsidian%3A%20Notes%2FMy%20Note.md",
		);
	});

	it("asks iA Writer to show the keyboard when that's on", () => {
		expect(iosUrl(settings({ iosLocation: "Obsidian", iosShowKeyboard: true }), file("Note.md"))).toBe(
			"ia-writer://open?path=Obsidian%3A%20Note.md&edit=true",
		);
	});

	it("returns null when neither a location nor a custom link is set", () => {
		expect(iosUrl(settings({ iosLocation: "" }), file("Note.md"))).toBeNull();
	});

	it("fills the custom link's placeholders, encoded for a URL", () => {
		const s = settings({ iosCustomLink: "textastic://x-callback-url/open?location=fullPath&path={fullPath}&v={vault}&p={path}" });
		expect(iosUrl(s, file("Notes/My Note.md"))).toBe(
			"textastic://x-callback-url/open?location=fullPath&path=%2Fvar%2Fvault%2FNotes%2FMy%20Note.md&v=My%20Vault&p=Notes%2FMy%20Note.md",
		);
	});

	it("uses the custom link instead of iA Writer when both are set", () => {
		const s = settings({ iosLocation: "Obsidian", iosCustomLink: "onewriter://x-callback-url/open?path={path}" });
		expect(iosUrl(s, file("Note.md"))).toBe("onewriter://x-callback-url/open?path=Note.md");
	});
});

describe("appLabel", () => {
	it("uses the Mac app name", () => {
		expect(appLabel("mac", settings({ macApp: "Typora" }))).toBe("Typora");
	});

	it("uses the program's file name without .exe on Windows", () => {
		expect(appLabel("windows", settings({ windowsPath: "C:\\Program Files\\iA Writer\\iAWriter.exe" }))).toBe("iAWriter");
	});

	it("uses the command's last path part on Linux", () => {
		expect(appLabel("linux", settings({ linuxCommand: "/usr/bin/marktext" }))).toBe("marktext");
	});

	it("is iA Writer on iOS without a custom link", () => {
		expect(appLabel("ios", settings())).toBe("iA Writer");
	});

	it("uses the custom link's scheme on iOS", () => {
		expect(appLabel("ios", settings({ iosCustomLink: "textastic://x-callback-url/open?path={fullPath}" }))).toBe("textastic");
	});

	it("falls back to a generic name when nothing is set", () => {
		expect(appLabel("windows", settings())).toBe("external app");
		expect(appLabel("other", settings())).toBe("external app");
	});
});
