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

It's tested on macOS and iOS only. Windows and Linux should work too, and [feedback and contributions]({{ '/docs.html#feedback' | relative_url }}) are welcome.

## How it works {#how-it-works}

Choose your app under Settings → Open With App, give the command **Open current file in…** a shortcut, and press it with a note open. There's also a ribbon button, which on iPhone and iPad you can add to the quick-access menu.

***

## Features {#features}

**Any app on desktop.** Type the app's name on a Mac, the program's path on Windows, the command on Linux.

**iPhone and iPad too.** Choose iA Writer or Textastic and follow the setup step, or use any app's link.

**One vault, every device.** Each kind of device keeps its own app.

[Every feature, including the little ones]({{ '/docs.html#all-features' | relative_url }}).

***

<div class="section-head">
  <h2 id="explore">Explore</h2>
  <a class="pill" href="{{ '/docs.html' | relative_url }}">All docs</a>
</div>

<ul class="arrow-list">
  <li><a class="arrow-card" href="{{ '/docs.html#getting-started' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Getting Started</span><span class="arrow-card__desc">Install it and open your first note.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#your-app' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Your app</span><span class="arrow-card__desc">What to enter on Mac, Windows, Linux and iOS.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#opening' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Opening a note</span><span class="arrow-card__desc">The command and the ribbon button.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#all-features' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">All features</span><span class="arrow-card__desc">Every feature, including the little ones.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#feedback' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Feedback and contributing</span><span class="arrow-card__desc">Tested on macOS and iOS. Tell me how it works for you.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="https://www.buymeacoffee.com/iamfran" target="_blank" rel="noopener noreferrer"><span class="arrow-card__text"><span class="arrow-card__title">Buy me a coffee</span><span class="arrow-card__desc">Open With App is free. If it helps you, say thanks.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ site.github_url }}" target="_blank" rel="noopener noreferrer"><span class="arrow-card__text"><span class="arrow-card__title">GitHub</span><span class="arrow-card__desc">Source, releases and issues.</span></span>{% include arrow-icon.html %}</a></li>
</ul>
