import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";

// Obsidian can't resolve Node modules through a native import(), only through require().
// A plain `await import("child_process")` left in main.js fails at runtime with
// "Failed to resolve module specifier 'child_process'".
describe("built main.js", () => {
	it("loads child_process with require, not a native import()", () => {
		execFileSync("node", ["esbuild.config.mjs", "production"], { stdio: "ignore" });
		const bundle = readFileSync("main.js", "utf8");
		expect(bundle).not.toMatch(/import\(\s*["']child_process["']\s*\)/);
		expect(bundle).toMatch(/require\(\s*["']child_process["']\s*\)/);
	});
});
