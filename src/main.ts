import { FileSystemAdapter, Notice, Platform, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, Launch, OpenWithSettings, appLabel, desktopLaunch, iosUrl } from "./opener";
import { currentPlatform } from "./platform";
import { OpenWithSettingTab } from "./settings";

export default class OpenWithApp extends Plugin {
	settings: OpenWithSettings = { ...DEFAULT_SETTINGS };

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new OpenWithSettingTab(this.app, this));

		// The name is fixed when the plugin loads, so a renamed app shows up after a restart.
		const name = `Open current file in ${appLabel(currentPlatform(), this.settings)}`;
		this.addCommand({
			id: "open-current-file",
			name,
			callback: () => void this.openCurrentFile(),
		});
		// A ribbon icon is what lists the action under the mobile ribbon menu configuration
		// (Settings → Appearance), so it can go in the mobile quick-access menu.
		this.addRibbonIcon("external-link", name, () => void this.openCurrentFile());
	}

	async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...((await this.loadData()) as Partial<OpenWithSettings> | null) };
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private async openCurrentFile() {
		const file = this.app.workspace.getActiveFile();
		if (!file) {
			new Notice("No file is open.");
			return;
		}

		const platform = currentPlatform();
		if (platform === "ios") {
			const url = iosUrl(this.settings, file.path);
			if (!url) {
				new Notice("Set the location in this plugin's settings first.");
				return;
			}
			window.open(url);
			return;
		}

		const adapter = this.app.vault.adapter;
		if (platform === "other" || !(adapter instanceof FileSystemAdapter)) {
			new Notice("This plugin can't open other apps on this device.");
			return;
		}

		const launch = desktopLaunch(platform, this.settings, adapter.getFullPath(file.path));
		if (!launch) {
			new Notice("Choose an app in this plugin's settings first.");
			return;
		}

		const child = await spawnDetached(launch);
		if (!child) return;
		child.on("error", (err) => new Notice(`Couldn't open ${appLabel(platform, this.settings)}: ${err.message}`));
		if (platform === "mac") {
			// `open -a` returns straight away, with 1 when macOS can't find an app by that name.
			// On Windows and Linux the editor itself is the child, so its exit code means nothing here.
			child.on("exit", (code) => {
				if (code) new Notice(`Couldn't open ${appLabel(platform, this.settings)}. Check the app name in this plugin's settings.`);
			});
		}
		child.unref();
	}
}

// child_process is loaded here rather than imported at the top, because it doesn't exist on iOS.
// The lint rule wants the desktop check as the function's first statement.
async function spawnDetached(launch: Launch) {
	if (!Platform.isDesktop) {
		return null;
	}
	const { spawn } = await import("child_process");
	return spawn(launch.command, launch.args, { detached: true, stdio: "ignore" });
}
