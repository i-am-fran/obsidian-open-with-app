---
layout: home
sections:
  - id: how-it-works
    label: How it works
  - id: features
    label: Features
  - id: explore
    label: Explore
---
<p class="lede">{{ site.tagline }}</p>

<div class="actions">
  <a class="button button--primary" href="https://obsidian.md/plugins?id=open-with-app">Install in Obsidian{% include arrow-icon.html %}</a>
  <a class="button" href="{{ site.github_url }}">View on GitHub</a>
</div>

I use it to write in [iA Writer](https://ia.net/writer). Obsidian is where my notes live, but when I want to focus on one of them, I press a shortcut and it opens in iA Writer, away from the sidebars, links and plugins. Both apps edit the same file, so whatever I write there is in Obsidian straight away.

That's all it does: one command, one app. It works with any editor, on Mac, Windows, Linux and iOS.

## How it works {#how-it-works}

Pick your app in Settings → Open With App, give the command **Open current file in…** a shortcut in Settings → Hotkeys, and press it with a note open. The command is named after your app, so with Typora it reads **Open current file in Typora**.

There's also a button in the ribbon that does the same. On iPhone and iPad you can put it in the quick-access menu.

[More about opening a note]({{ '/docs.html#opening' | relative_url }}).

***

## Features {#features}

**Any app on desktop.** Typora, VS Code, iA Writer, TextEdit: on a Mac you type the app's name, on Windows the path to the program, on Linux the command.

**iPhone and iPad too.** On iOS, notes open in iA Writer through a Location that holds your vault, with the keyboard up if you like.

**One vault, every device.** Each kind of device keeps its own app, so a vault synced between a Mac, a Windows PC and an iPad opens the right app on each.

[Every feature, including the little ones]({{ '/docs.html#all-features' | relative_url }}).

***

<div class="section-head">
  <h2 id="explore">Explore</h2>
  <a class="pill" href="{{ '/docs.html' | relative_url }}">All docs</a>
</div>

<ul class="arrow-list">
  <li><a class="arrow-card" href="{{ '/docs.html#getting-started' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Getting Started</span><span class="arrow-card__desc">Install it and open your first note.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#your-app' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Your app</span><span class="arrow-card__desc">What to enter on Mac, Windows, Linux and iOS.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#opening' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Opening a note</span><span class="arrow-card__desc">The shortcut, the ribbon button and the mobile quick menu.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#all-features' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">All features</span><span class="arrow-card__desc">Every feature, including the little ones.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#faq' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">FAQ</span><span class="arrow-card__desc">When the wrong thing opens, or nothing does.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="https://www.buymeacoffee.com/iamfran" target="_blank" rel="noopener noreferrer"><span class="arrow-card__text"><span class="arrow-card__title">Buy me a coffee</span><span class="arrow-card__desc">Open With App is free. If it helps you, say thanks.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ site.github_url }}" target="_blank" rel="noopener noreferrer"><span class="arrow-card__text"><span class="arrow-card__title">GitHub</span><span class="arrow-card__desc">Source, releases and issues.</span></span>{% include arrow-icon.html %}</a></li>
</ul>
