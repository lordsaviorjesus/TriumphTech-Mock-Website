# TriumphTech — Mock Marketing Site

A small, static mock website for TriumphTech used as a marketing/demo landing page.

This repository contains a simple front-end project (HTML/CSS/JS) with assets and web fonts bundled for local preview and development.

## Contents

-   `index.html` — the site's main entry.
-   `css/styles.css` — project styles.
-   `js/main.js` — site scripts and interactive behavior.
-   `assets/` — images and other static media.
-   `fonts/Inter/` — included Inter font files and license.

## Purpose

The site is a lightweight template used to showcase TriumphTech's product/service messaging, visuals, and basic interactivity. It's intended for prototypes, demos, or as a starting point for a static marketing site.

## Technology

-   HTML5
-   CSS3 (plain stylesheet located in `css/styles.css`)
-   JavaScript (vanilla) in `js/main.js`
-   Local static assets and bundled web fonts

## Run locally

There are two simple ways to open the site locally:

1. Open `index.html` directly in your web browser (suitable for quick checks).
2. Serve the folder with a lightweight HTTP server (recommended for correct font/asset loading):

    - With Python 3 (PowerShell):

        python -m http.server 8000

    - Or use a Node static server if you prefer (e.g. `npx http-server`)

Then open http://localhost:8000 in your browser.

## Project structure

Top-level files and folders:

-   `index.html` — entry page
-   `css/` — CSS files
-   `js/` — JavaScript
-   `assets/` — images and media
-   `fonts/` — bundled fonts and licenses

## Development notes

-   Keep styles in `css/styles.css`. Small projects can remain single-file for simplicity.
-   Keep interactive logic in `js/main.js` and avoid bundlers unless the project grows.
-   Add new assets under `assets/` and reference them with relative paths.

## Contributing

This is a small mock project. For changes:

1. Fork or create a branch.
2. Make adjustments, test locally, and open a pull request describing the change.

## License & credits

Fonts: Inter (included under its license in `fonts/Inter/`). Check `fonts/Inter/OFL.txt` for details.

Other assets: review the `assets/` folder for any external-attribution requirements.
