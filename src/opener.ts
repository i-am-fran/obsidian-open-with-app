// Works out what to launch for the current file. No Obsidian imports, so it can be tested on its own.

export type PlatformKind = "mac" | "windows" | "linux" | "ios" | "other";

export interface OpenWithSettings {
	macApp: string;
	windowsPath: string;
	linuxCommand: string;
	// Name of the iA Writer Location that holds the vault.
	iosLocation: string;
	iosShowKeyboard: boolean;
}

export const DEFAULT_SETTINGS: OpenWithSettings = {
	macApp: "iA Writer",
	windowsPath: "",
	linuxCommand: "",
	iosLocation: "",
	iosShowKeyboard: true,
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

// `vaultPath` is the file's path inside the vault, e.g. "Notes/My Note.md".
// iA Writer's Library Path format is "Location: path/in/location".
export function iosUrl(settings: OpenWithSettings, vaultPath: string): string | null {
	const location = settings.iosLocation.trim();
	if (!location) return null;
	const url = `ia-writer://open?path=${encodeURIComponent(`${location}: ${vaultPath}`)}`;
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
			label = "iA Writer";
			break;
	}
	return label || "external app";
}

function lastPathPart(path: string): string {
	return path.trim().split(/[\\/]/).pop() ?? "";
}
