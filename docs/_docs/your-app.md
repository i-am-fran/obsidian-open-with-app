---
title: Your app
slug: your-app
order: 2
headings:
  - id: app-mac
    label: Mac
  - id: app-windows
    label: Windows
  - id: app-linux
    label: Linux
  - id: app-ios
    label: iPhone and iPad
  - id: app-ios-custom
    label: Other apps on iOS
---

Choose your app under Settings → Open With App. Each kind of device keeps its own app, so one synced vault works everywhere, and the page only shows the current device's settings. Nothing is chosen until you set it.

### Mac {#app-mac}

Type the app's name as it appears in Applications, such as `Typora`, `Visual Studio Code` or `iA Writer`. If macOS can't find it, you get a notice.

### Windows {#app-windows}

Enter the full path to the program, such as `C:\Program Files\Typora\Typora.exe`.

### Linux {#app-linux}

Enter the command, such as `ghostwriter`, or its full path. Only the command: extra options are read as part of its name.

### iPhone and iPad {#app-ios}

Obsidian on iOS can only open other apps through their links, and the app needs access to your vault folder. Choose the app under **App**, and the settings show what it needs:

- **iA Writer:** add your vault folder as a Location in iA Writer, then type its name under **Location**, exactly as iA Writer shows it. If it doesn't match, iA Writer opens an empty document. **Show keyboard** opens the note ready for typing.
- **Textastic:** add your vault folder as an external folder in Textastic. Without it, Textastic opens but can't find the note.
- **Custom link:** any other app, see below.

### Other apps on iOS {#app-ios-custom}

Find the app's link for opening a file in its help (look for "URL scheme" or "x-callback-url"). Choose **Custom link** and enter it, with a placeholder where the note goes:

| Placeholder | Becomes |
| --- | --- |
| `{path}` | The note's path in the vault, e.g. `Notes/Reading list.md` |
| `{fullPath}` | The note's full path on the device |
| `{vault}` | The vault's name |

For example, Textastic's link is `textastic://x-callback-url/open?location=fullPath&path={fullPath}`. The command is named after the link's scheme, such as **Open current file in textastic**.
