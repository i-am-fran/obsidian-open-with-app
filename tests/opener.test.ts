import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, OpenWithSettings, appLabel, desktopLaunch, iosUrl } from "../src/opener";

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
		expect(iosUrl(settings({ iosLocation: "Obsidian", iosShowKeyboard: false }), "Notes/My Note.md")).toBe(
			"ia-writer://open?path=Obsidian%3A%20Notes%2FMy%20Note.md",
		);
	});

	it("asks iA Writer to show the keyboard when that's on", () => {
		expect(iosUrl(settings({ iosLocation: "Obsidian", iosShowKeyboard: true }), "Note.md")).toBe(
			"ia-writer://open?path=Obsidian%3A%20Note.md&edit=true",
		);
	});

	it("returns null when no location is set", () => {
		expect(iosUrl(settings({ iosLocation: "" }), "Note.md")).toBeNull();
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

	it("is always iA Writer on iOS", () => {
		expect(appLabel("ios", settings())).toBe("iA Writer");
	});

	it("falls back to a generic name when nothing is set", () => {
		expect(appLabel("windows", settings())).toBe("external app");
		expect(appLabel("other", settings())).toBe("external app");
	});
});
