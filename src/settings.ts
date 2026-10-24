import { App, PluginSettingTab, type SettingDefinitionItem } from "obsidian";
import type { OpenWithSettings } from "./opener";
import { currentPlatform } from "./platform";
import type OpenWithApp from "./main";

export class OpenWithSettingTab extends PluginSettingTab {
	constructor(app: App, private plugin: OpenWithApp) {
		super(app, plugin);
	}

	// Each kind of device keeps its own app, so only this one's setting is listed.
	getSettingDefinitions(): SettingDefinitionItem[] {
		const shortcut = "Run \"Open current file in…\" to open the note you're looking at. Give it a shortcut under Settings → Hotkeys. A new app name shows in the command after Obsidian restarts.";
		switch (currentPlatform()) {
			case "mac":
				return [
					{
						type: "group",
						items: [
							{
								name: "App",
								desc: `The app's name as it appears in your Applications folder. ${shortcut}`,
								control: { type: "text", key: "macApp", placeholder: "iA Writer" },
							},
						],
					},
				];
			case "windows":
				return [
					{
						type: "group",
						items: [
							{
								name: "Program",
								desc: `The full path to the program, e.g. C:\\Program Files\\iA Writer\\iAWriter.exe. ${shortcut}`,
								control: { type: "text", key: "windowsPath", placeholder: "C:\\Program Files\\…\\App.exe" },
							},
						],
					},
				];
			case "linux":
				return [
					{
						type: "group",
						items: [
							{
								name: "Command",
								desc: `The command or full path that starts the editor, e.g. ghostwriter. ${shortcut}`,
								control: { type: "text", key: "linuxCommand", placeholder: "ghostwriter" },
							},
						],
					},
				];
			case "ios":
				return [
					{
						type: "group",
						items: [
							{
								name: "Location",
								desc: "On iOS, notes open in iA Writer. In iA Writer, add your vault folder as a Location, then type its name here exactly as iA Writer shows it. If it doesn't match, iA Writer opens an empty document instead.",
								control: { type: "text", key: "iosLocation", placeholder: "Obsidian" },
							},
							{
								name: "Show keyboard",
								desc: "Start typing as soon as the note opens.",
								control: { type: "toggle", key: "iosShowKeyboard" },
							},
						],
					},
				];
			default:
				return [
					{
						type: "group",
						items: [{ name: "Not available here", desc: "This plugin works on desktop and iOS. It can't open other apps on this device." }],
					},
				];
		}
	}

	getControlValue(key: string): unknown {
		return this.plugin.settings[key as keyof OpenWithSettings];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		(this.plugin.settings as unknown as Record<string, unknown>)[key] = value;
		await this.plugin.saveSettings();
	}
}
