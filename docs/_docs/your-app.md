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
  - id: app-ios-ia-writer
    label: iA Writer
  - id: app-ios-textastic
    label: Textastic
  - id: app-ios-custom
    label: Other apps on iOS
  - id: app-per-device
    label: One vault, every device
---

On desktop, any app that can open a Markdown file works. On iPhone and iPad, iA Writer, Textastic, or any app with a link for opening files. You choose it under Settings → Open With App, which only shows the settings for the device you're on. Nothing is chosen until you set it.

| Device | Setting | What you enter | Default |
| --- | --- | --- | --- |
| Mac | **App** | The app's name | empty |
| Windows | **Program** | The full path to the program | empty |
| Linux | **Command** | The command, or the full path to it | empty |
| iOS | **App** | iA Writer, Textastic or Custom link | none |
| iOS, iA Writer | **Location** | The iA Writer Location that holds your vault | empty |
| iOS, iA Writer | **Show keyboard** | Start typing as soon as the note opens | on |
| iOS, Custom link | **Custom link** | The app's link, with placeholders | empty |

### Mac {#app-mac}

Type the app's name as it appears in your Applications folder, such as `Typora`, `Visual Studio Code`, `iA Writer` or `TextEdit`. The note opens with `open -a`, the same as choosing the app from Open With in the Finder. If macOS can't find an app with that name, you get a notice asking you to check it.

### Windows {#app-windows}

Enter the full path to the program, for example `C:\Program Files\Typora\Typora.exe`. The plugin starts the program with the note's full path.

### Linux {#app-linux}

Enter the command that starts your editor, such as `ghostwriter`, or its full path. The plugin runs it with the note's full path. Enter only the command: anything after it, like extra options, is read as part of its name.

### iPhone and iPad {#app-ios}

On iOS, Obsidian can't start other apps, only open their links, and an app can only open a note it has access to. Under **App**, choose the app you use. The settings then show only what that app needs:

- **iA Writer** and **Textastic**: the plugin knows their links, so you only give the app access to your vault folder.
- **Custom link**: any other app, with a link you enter yourself.

Until you choose an app, the command shows a notice asking you to.

### iA Writer {#app-ios-ia-writer}

1. In iA Writer, add your Obsidian vault folder as a Location.
2. In Settings → Open With App, type that Location's name in **Location**, exactly as iA Writer shows it.

If the name doesn't match, iA Writer opens an empty document instead of your note. With **Show keyboard** on, the note opens ready for typing.

### Textastic {#app-ios-textastic}

In Textastic, add your Obsidian vault folder as an external folder. The plugin opens the note by its full path, using the link Textastic documents for that. Without the external folder, Textastic opens but can't find the note.

### Other apps on iOS {#app-ios-custom}

Any app with a link that opens a file can be used. Check the app's help for its "URL scheme" or "x-callback-url" commands, choose **Custom link** under **App**, and enter the link with these placeholders where the note should go:

| Placeholder | Becomes |
| --- | --- |
| `{path}` | The note's path inside the vault, e.g. `Notes/Reading list.md` |
| `{fullPath}` | The note's full path on your iPhone or iPad |
| `{vault}` | The vault's name |

Each one is encoded for a link, so spaces and slashes come through safely. For example, Textastic's link, which the plugin uses for you, looks like this:

```
textastic://x-callback-url/open?location=fullPath&path={fullPath}
```

The app needs access to your vault folder, as iA Writer and Textastic do. The command is named after the link's scheme, such as **Open current file in onewriter** for a link starting `onewriter://`, after Obsidian restarts.

### One vault, every device {#app-per-device}

Plugin settings live in the vault, and a synced vault travels between your devices. That's why each kind of device has its own setting: a Mac opens an app by name, a Windows PC runs a program path and an iPad uses its chosen app, all from the same vault.
