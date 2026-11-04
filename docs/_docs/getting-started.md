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

Open With App adds one command to Obsidian: open the note you're looking at in another app. Both apps work on the same file, so whatever you write in one is in the other straight away.

### Install {#install}

You need Obsidian 1.13.0 or newer. It works on Mac, Windows, Linux, iPhone and iPad. Android isn't supported.

1. In Obsidian, open Settings → Community plugins → Browse.
2. Search for **Open With App**, then install it and turn it on.

<div class="actions not-prose">
  <a class="button button--primary" href="https://obsidian.md/plugins?id=open-with-app">Install in Obsidian{% include arrow-icon.html %}</a>
</div>

Other ways to install:

- **BRAT:** add `i-am-fran/obsidian-open-with-app` in the BRAT plugin to follow every release as soon as it's published.
- **By hand:** download `main.js` and `manifest.json` from the [latest release](https://github.com/i-am-fran/obsidian-open-with-app/releases/latest), put them in `<vault>/.obsidian/plugins/open-with-app/`, and turn on Open With App in Settings → Community plugins. If you want to check the files were built from this repository, run `gh attestation verify main.js --repo i-am-fran/obsidian-open-with-app`.

### First steps {#first-steps}

1. Open Settings → Open With App and enter [your app](#your-app). On a Mac it's already set to `iA Writer`.
2. Open Settings → Hotkeys, search for **Open current file in**, and give it a shortcut.
3. Open a note and press the shortcut. The note opens in your app.
