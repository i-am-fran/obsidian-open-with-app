---
title: Getting Started
slug: getting-started
order: 1
headings:
  - id: install
    label: Install
  - id: first-steps
    label: First steps
---

Open With App adds one command to Obsidian: open the note you're looking at in any other app. Both apps edit the same file.

### Install {#install}

You need Obsidian 1.13.0 or newer. It works on Mac, Windows, Linux, iPhone and iPad, but is tested on macOS and iOS only. Android isn't supported.

1. In Obsidian, open Settings → Community plugins → Browse.
2. Search for **Open With App**, then install it and turn it on.

<div class="actions not-prose">
  <a class="button button--primary" href="https://obsidian.md/plugins?id=open-with-app">Install in Obsidian{% include arrow-icon.html %}</a>
</div>

Other ways to install:

- **BRAT:** add `i-am-fran/obsidian-open-with-app` in the BRAT plugin to get every release as soon as it's out.
- **By hand:** download `main.js` and `manifest.json` from the [latest release](https://github.com/i-am-fran/obsidian-open-with-app/releases/latest) into `<vault>/.obsidian/plugins/open-with-app/`, then turn on the plugin. To check the files were built from this repository, run `gh attestation verify main.js --repo i-am-fran/obsidian-open-with-app`.

### First steps {#first-steps}

1. Set up [your app](#your-app) under Settings → Open With App.
2. Give **Open current file in…** a shortcut under Settings → Hotkeys.
3. Open a note and press it.
