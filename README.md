# Open With App

Open With App lets you keep Obsidian as your default Markdown app, and open the note you're looking at in another app with a keyboard shortcut.

- **[Install in Obsidian](https://obsidian.md/plugins?id=open-with-app)**
- **[Documentation](https://i-am-fran.github.io/obsidian-open-with-app/)**
- **[Report a bug](https://github.com/i-am-fran/obsidian-open-with-app/issues)**

<a href="https://www.buymeacoffee.com/iamfran" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="41" width="148"></a>

I use it to write in [iA Writer](https://ia.net/writer). Obsidian is where my notes live, but when I want to focus on one of them, I press a shortcut and it opens in iA Writer, away from the sidebars, links and plugins. Both apps edit the same file, so whatever I write there is in Obsidian straight away.

That's all it does: one command, one app. It works with any editor, on Mac, Windows, Linux and iOS.

## How it works

Pick your app in the settings, give the command **Open current file in…** a shortcut in Settings → Hotkeys, and press it with a note open. The command is named after your app, so with iA Writer it reads **Open current file in iA Writer**.

There's also a button in the ribbon that does the same. On iPhone and iPad you can put it in the quick-access menu under Settings → Appearance → **Ribbon menu configuration**.

Each kind of device keeps its own app, because plugin settings live in the vault and a synced vault travels between computers. The settings page only shows the one for the device you're on:

| Device | What you enter | Example |
|---|---|---|
| Mac | The app's name | `iA Writer` (the default) |
| Windows | The full path to the program | `C:\Program Files\iA Writer\iAWriter.exe` |
| Linux | The command, or the full path to it | `ghostwriter` |
| iOS | The iA Writer Location that holds your vault | `Obsidian` |

**On iPhone and iPad**, notes open in iA Writer. First add your Obsidian vault folder to iA Writer as a Location, then type that Location's name in the settings, exactly as iA Writer shows it. If the name doesn't match, iA Writer opens an empty document instead of your note. Turn on **Show keyboard** to start typing as soon as it opens.

Android isn't supported.

## Installation

You need Obsidian 1.13.0 or newer.

1. In Obsidian, open Settings → Community plugins → Browse.
2. Search for **Open With App**, then install it and turn it on.
3. Choose your app under Settings → Open With App, and a shortcut under Settings → Hotkeys.

Other ways to install:

- **BRAT:** add `i-am-fran/obsidian-open-with-app` in the BRAT plugin to follow every release as soon as it's published.
- **By hand:** download `main.js` and `manifest.json` from the [latest release](https://github.com/i-am-fran/obsidian-open-with-app/releases/latest), put them in `<vault>/.obsidian/plugins/open-with-app/`, and turn on Open With App in Settings → Community plugins. If you want to check the files were built from this repository, run `gh attestation verify main.js --repo i-am-fran/obsidian-open-with-app`.

The documentation has [every feature, including the little ones](https://i-am-fran.github.io/obsidian-open-with-app/docs.html#all-features).

## Support

Open With App is free. If it helps you, you can buy me a coffee:

<a href="https://www.buymeacoffee.com/iamfran" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="60" width="217"></a>

## Development

```
npm install
npm run dev     # watch build to main.js
npm run build   # type-check and production build
npm test        # vitest
npm run lint    # eslint
```

Changes are listed in the [changelog](CHANGELOG.md).

## License

MIT. See [LICENSE](LICENSE).
