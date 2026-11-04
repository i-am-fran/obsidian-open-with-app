// Works out what to launch for the current file. No Obsidian imports, so it can be tested on its own.

export type PlatformKind = "mac" | "windows" | "linux" | "ios" | "other";

export interface OpenWithSettings {
	macApp: string;
	windowsPath: string;
	linuxCommand: string;
	// Name of the iA Writer Location that holds the vault.
	iosLocation: string;
	iosShowKeyboard: boolean;
	// A link to another iOS app, with {path}, {fullPath} and {vault} placeholders. Used instead of iA Writer when set.
	iosCustomLink: string;
}

export const DEFAULT_SETTINGS: OpenWithSettings = {
	macApp: "iA Writer",
	windowsPath: "",
	linuxCommand: "",
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

// Returns null when neither a custom link nor an iA Writer location is set.
export function iosUrl(settings: OpenWithSettings, file: IosFile): string | null {
	const customLink = settings.iosCustomLink.trim();
	if (customLink) {
		return customLink
			.replaceAll("{fullPath}", encodeURIComponent(file.fullPath))
			.replaceAll("{path}", encodeURIComponent(file.path))
			.replaceAll("{vault}", encodeURIComponent(file.vault));
	}

	// iA Writer's Library Path format is "Location: path/in/location".
	const location = settings.iosLocation.trim();
	if (!location) return null;
	const url = `ia-writer://open?path=${encodeURIComponent(`${location}: ${file.path}`)}`;
	return settings.iosShowKeyboard ? `${url}&edit=true` : url;
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
		case "ios":
			// A custom link is named after its scheme, e.g. "textastic" for textastic://…
			label = settings.iosCustomLink.trim() ? (settings.iosCustomLink.trim().split(":")[0] ?? "") : "iA Writer";
			break;
	}
	return label || "external app";
}

function lastPathPart(path: string): string {
	return path.trim().split(/[\\/]/).pop() ?? "";
}
