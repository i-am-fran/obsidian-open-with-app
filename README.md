# Open With App

Open With App lets you keep Obsidian as your default Markdown app, and open the note you're looking at in any other app with a keyboard shortcut.

- **[Install in Obsidian](https://obsidian.md/plugins?id=open-with-app)**
- **[Documentation](https://i-am-fran.github.io/obsidian-open-with-app/)**
- **[Report a bug](https://github.com/i-am-fran/obsidian-open-with-app/issues)**

<a href="https://www.buymeacoffee.com/iamfran" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="41" width="148"></a>

I use it to write in [iA Writer](https://ia.net/writer). Obsidian is where my notes live, but when I want to focus on one of them, I press a shortcut and it opens in iA Writer, away from the sidebars, links and plugins. Both apps edit the same file, so whatever I write there is in Obsidian straight away.

It's tested on macOS and iOS only. Windows and Linux should work too, and feedback and contributions are welcome.

## How it works

Choose your app under Settings → Open With App, give the command **Open current file in…** a shortcut under Settings → Hotkeys, and press it with a note open. There's also a ribbon button, which on iPhone and iPad you can add to the quick-access menu.

Each kind of device keeps its own app, so one synced vault works everywhere:

| Device | What you enter | Example |
|---|---|---|
| Mac | The app's name | `Typora` |
| Windows | The full path to the program | `C:\Program Files\Typora\Typora.exe` |
| Linux | The command | `ghostwriter` |
| iOS | iA Writer, Textastic, or any app's link | Textastic |

On iOS, Obsidian can only open other apps through their links, so the settings walk you through setting up the app you choose. Android isn't supported.

## Installation

You need Obsidian 1.13.0 or newer.

1. In Obsidian, open Settings → Community plugins → Browse.
2. Search for **Open With App**, then install it and turn it on.
3. Choose your app under Settings → Open With App.

Other ways to install, such as BRAT, are in the [documentation](https://i-am-fran.github.io/obsidian-open-with-app/docs.html#install).

## Feedback and contributing

Found a bug, or tried it on Windows or Linux? [Open an issue](https://github.com/i-am-fran/obsidian-open-with-app/issues). Pull requests are welcome too.

## Development

```
npm install
npm run dev     # watch build to main.js
npm run build   # type-check and production build
npm test        # vitest
npm run lint    # eslint
```

Changes are in the [changelog](CHANGELOG.md).

## License

MIT. See [LICENSE](LICENSE).
