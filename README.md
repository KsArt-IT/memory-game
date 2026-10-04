# Memory Game

[Play online](https://ksart-it.github.io/memory-game/)

A memory card game with a space theme: find all 8 pairs of space icons in as few moves as possible.

## How to play

1. The field has 16 face-down cards: 8 pairs of space objects (rocket, astronaut, satellite, UFO, comet, Saturn, Earth, Moon).
2. Click a card to flip it, then click a second one.
3. If the two cards match, they stay open. If not, they flip back after about a second.
4. The game is won when all pairs are found. Your result (number of moves) is shown in a window and saved to the leaderboard.
5. **New Game** shuffles the cards and starts over at any moment.

The header shows the timer, the number of moves and the number of found pairs.

## Leaderboard

The top 10 results (fewest moves first, ties are ordered by the earlier game) are stored in the browser's `localStorage` under the key `memory-game:leaderboard`. Each result has a place, the number of moves and the date in `DD.MM.YYYY` format.

## Features

- Pure HTML, CSS and JavaScript (ES modules), no frameworks and no build step
- Interface is built with `document.createElement` only
- Responsive layout: the card size is calculated to fit the screen, from phones to desktops
- Hover highlight and flip animation, with `prefers-reduced-motion` support
- Modal windows close by the button, by a click on the backdrop or with `Esc`
- Own SVG card set, drawn for this project

## Run locally

The game uses ES modules, so it must be opened through a local web server (opening `index.html` by double-click will not work because of browser restrictions on `file://`).

1. Clone the repository and switch to the branch:

```bash
   git clone https://github.com/KsArt-IT/memory-game.git
   cd memory-game
   git checkout memory-game
```

2. Start any static server in the project folder, for example:

```bash
   python3 -m http.server 8000
```

   or

```bash
   npx serve
```

   or use the **Live Server** extension in VS Code.

3. Open `http://localhost:8000` in your browser.

## Project structure

- `index.html` - entry page, the whole interface is created from `js/main.js`
- `css/` - styles
- `js/game.js`, `js/card.js` - game logic and card model
- `js/render.js`, `js/interface.js` - DOM creation and rendering
- `js/modal.js`, `js/win-modal.js`, `js/leaderboard-modal.js` - modal windows
- `js/leaderboard.js` - saving and loading results
- `assets/images/` - SVG cards
