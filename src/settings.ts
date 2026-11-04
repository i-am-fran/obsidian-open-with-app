import { App, PluginSettingTab, type SettingDefinitionItem } from "obsidian";
import { IOS_APP_NAMES, iosApp, type OpenWithSettings } from "./opener";
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
								control: { type: "text", key: "macApp", placeholder: "Typora" },
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
								desc: `The full path to the program, e.g. C:\\Program Files\\Typora\\Typora.exe. ${shortcut}`,
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
			case "ios": {
				const chosen = (app: string) => () => iosApp(this.plugin.settings) === app;
				return [
					{
						type: "group",
						items: [
							{
								name: "App",
								desc: `Obsidian on iOS can only open other apps through their links, so pick one it knows, or enter any app's link. ${shortcut}`,
								control: { type: "dropdown", key: "iosApp", options: { "": "Choose an app", ...IOS_APP_NAMES } },
							},
							{
								name: "Set up iA Writer",
								desc: "In iA Writer, add your vault folder as a Location. Then type the Location's name below, exactly as iA Writer shows it. If it doesn't match, iA Writer opens an empty document instead.",
								visible: chosen("ia-writer"),
							},
							{
								name: "Location",
								desc: "The iA Writer Location that holds your vault.",
								control: { type: "text", key: "iosLocation", placeholder: "Obsidian" },
								visible: chosen("ia-writer"),
							},
							{
								name: "Show keyboard",
								desc: "Start typing as soon as the note opens.",
								control: { type: "toggle", key: "iosShowKeyboard" },
								visible: chosen("ia-writer"),
							},
							{
								name: "Set up Textastic",
								desc: "In Textastic, add your vault folder as an external folder, so it can open the note by its full path. Without it, Textastic opens but can't find the note.",
								visible: chosen("textastic"),
							},
							{
								name: "Custom link",
								desc: "The app's link for opening a file, from its help on URL schemes. Put {path} (the note's path in the vault), {fullPath} (its full path on this device) or {vault} (the vault's name) where the note goes. The app needs access to your vault folder.",
								control: { type: "text", key: "iosCustomLink", placeholder: "app://open?path={fullPath}" },
								visible: chosen("custom"),
							},
						],
					},
				];
			}
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
		// Settings saved before the App choice existed still show the app they use.
		if (key === "iosApp") return iosApp(this.plugin.settings);
		return this.plugin.settings[key as keyof OpenWithSettings];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		(this.plugin.settings as unknown as Record<string, unknown>)[key] = value;
		await this.plugin.saveSettings();
		// Show the chosen app's fields.
		if (key === "iosApp") this.update();
	}
}
