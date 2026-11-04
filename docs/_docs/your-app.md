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
  - id: app-per-device
    label: One vault, every device
---

You choose your app under Settings → Open With App. The page only shows the setting for the device you're on.

| Device | Setting | What you enter | Default |
| --- | --- | --- | --- |
| Mac | **App** | The app's name | `iA Writer` |
| Windows | **Program** | The full path to the program | empty |
| Linux | **Command** | The command, or the full path to it | empty |
| iOS | **Location** | The iA Writer Location that holds your vault | empty |
| iOS | **Show keyboard** | Start typing as soon as the note opens | on |

### Mac {#app-mac}

Type the app's name as it appears in your Applications folder, such as `iA Writer`, `Typora` or `TextEdit`. The note opens with `open -a`, the same as choosing the app from Open With in the Finder. If macOS can't find an app with that name, you get a notice asking you to check it.

### Windows {#app-windows}

Enter the full path to the program, for example `C:\Program Files\iA Writer\iAWriter.exe`. The plugin starts the program with the note's full path.

### Linux {#app-linux}

Enter the command that starts your editor, such as `ghostwriter`, or its full path. The plugin runs it with the note's full path. Enter only the command: anything after it, like extra options, is read as part of its name.

### iPhone and iPad {#app-ios}

On iOS, notes open in iA Writer. iA Writer can only open files in its Locations, so set one up first:

1. In iA Writer, add your Obsidian vault folder as a Location.
2. In Settings → Open With App, type that Location's name in **Location**, exactly as iA Writer shows it.

If the name doesn't match, iA Writer opens an empty document instead of your note. With **Show keyboard** on, the note opens ready for typing.

### One vault, every device {#app-per-device}

Plugin settings live in the vault, and a synced vault travels between your devices. That's why each kind of device has its own setting: a Mac opens iA Writer by name, a Windows PC runs its program path and an iPad uses its Location, all from the same vault.
