import { Platform } from "obsidian";
import type { PlatformKind } from "./opener";

export function currentPlatform(): PlatformKind {
	if (Platform.isIosApp) return "ios";
	if (!Platform.isDesktopApp) return "other";
	if (Platform.isMacOS) return "mac";
	if (Platform.isWin) return "windows";
	if (Platform.isLinux) return "linux";
	return "other";
}
