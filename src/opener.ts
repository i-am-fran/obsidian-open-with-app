// Works out what to launch for the current file. No Obsidian imports, so it can be tested on its own.

export type PlatformKind = "mac" | "windows" | "linux" | "ios" | "other";

// The apps the plugin knows how to open on iOS, or "custom" for any app's own link. "" means none chosen yet.
export type IosApp = "" | "ia-writer" | "textastic" | "custom";

export const IOS_APP_NAMES: Record<Exclude<IosApp, "">, string> = {
	"ia-writer": "iA Writer",
	textastic: "Textastic",
	custom: "Custom link",
};

export interface OpenWithSettings {
	macApp: string;
	windowsPath: string;
	linuxCommand: string;
	iosApp: IosApp;
	// iA Writer: name of the Location that holds the vault.
	iosLocation: string;
	// iA Writer: open the note ready for typing.
	iosShowKeyboard: boolean;
	// Custom: an app's link with {path}, {fullPath} and {vault} placeholders.
	iosCustomLink: string;
}

export const DEFAULT_SETTINGS: OpenWithSettings = {
	macApp: "",
	windowsPath: "",
	linuxCommand: "",
	iosApp: "",
	iosLocation: "",
	iosShowKeyboard: true,
	iosCustomLink: "",
};

export interface Launch {
	command: string;
	args: string[];
}

// `fullPath` is the file's absolute path on disk. Returns null when this system's app isn't set.
export function desktopLaunch(platform: PlatformKind, settings: OpenWithSettings, fullPath: string): Launch | null {
	switch (platform) {
		case "mac": {
			const app = settings.macApp.trim();
			return app ? { command: "open", args: ["-a", app, fullPath] } : null;
		}
		case "windows": {
			const program = settings.windowsPath.trim();
			return program ? { command: program, args: [fullPath] } : null;
		}
		case "linux": {
			const command = settings.linuxCommand.trim();
			return command ? { command, args: [fullPath] } : null;
		}
		default:
			return null;
	}
}

// The file to open on iOS.
export interface IosFile {
	// The path inside the vault, e.g. "Notes/My Note.md".
	path: string;
	// The absolute path on the device.
	fullPath: string;
	// The vault's name.
	vault: string;
}

// The iOS app in use. Settings saved before the App choice existed only have a location or a custom link.
export function iosApp(settings: OpenWithSettings): IosApp {
	if (settings.iosApp) return settings.iosApp;
	if (settings.iosCustomLink.trim()) return "custom";
	if (settings.iosLocation.trim()) return "ia-writer";
	return "";
}

// Textastic's documented link for opening a file it can reach by its full path.
const TEXTASTIC_LINK = "textastic://x-callback-url/open?location=fullPath&path={fullPath}";

// Returns null when no app is chosen, or the chosen one isn't set up yet.
export function iosUrl(settings: OpenWithSettings, file: IosFile): string | null {
	switch (iosApp(settings)) {
		case "ia-writer": {
			// iA Writer's Library Path format is "Location: path/in/location".
			const location = settings.iosLocation.trim();
			if (!location) return null;
			const url = `ia-writer://open?path=${encodeURIComponent(`${location}: ${file.path}`)}`;
			return settings.iosShowKeyboard ? `${url}&edit=true` : url;
		}
		case "textastic":
			return fillLink(TEXTASTIC_LINK, file);
		case "custom": {
			const link = settings.iosCustomLink.trim();
			return link ? fillLink(link, file) : null;
		}
		default:
			return null;
	}
}

function fillLink(link: string, file: IosFile): string {
	return link
		.replaceAll("{fullPath}", encodeURIComponent(file.fullPath))
		.replaceAll("{path}", encodeURIComponent(file.path))
		.replaceAll("{vault}", encodeURIComponent(file.vault));
}

// A short name for the app, used in the command name and notices.
export function appLabel(platform: PlatformKind, settings: OpenWithSettings): string {
	let label = "";
	switch (platform) {
		case "mac":
			label = settings.macApp.trim();
			break;
		case "windows":
			label = lastPathPart(settings.windowsPath).replace(/\.exe$/i, "");
			break;
		case "linux":
			label = lastPathPart(settings.linuxCommand);
			break;
		case "ios": {
			const app = iosApp(settings);
			// A custom link is named after its scheme, e.g. "onewriter" for onewriter://…
			if (app === "custom") label = settings.iosCustomLink.trim().split(":")[0] ?? "";
			else if (app) label = IOS_APP_NAMES[app];
			break;
		}
	}
	return label || "external app";
}

function lastPathPart(path: string): string {
	return path.trim().split(/[\\/]/).pop() ?? "";
}
