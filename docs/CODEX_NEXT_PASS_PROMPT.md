# Codex Next Pass Prompt — Terpocalypse Quality Build

Use this as the next local development prompt.

You are working in `dtfgenetics/Terpocalapse` on **Terpocalypse: Grow Room From Hell**.

## Goal

Improve the current browser FPS prototype into a cleaner, higher-quality game foundation without breaking the playable loop.

## Hard Rules

- Do not use Doom assets, WAD data, names, sprites, maps, music, or sounds.
- Do not use ripped commercial shooter assets.
- Keep the game static-host friendly for dtfseeds.com / THC game hub.
- Preserve existing gameplay before refactoring.
- Work in small, testable commits.

## Current Prototype Folder

`prototypes/web-fps/`

## Existing Important Files

- `index.html`
- `styles.css`
- `src/main.js`
- `src/game-data.js`
- `src/asset-registry.js`
- `src/audio.js`
- `src/runtime-checks.js`
- `src/game-hub-api.js`
- `tools/validate-game-data.mjs`

## Required Next Pass

1. Verify the prototype runs locally with a static file server.
2. Confirm `index.html` loads `src/bootstrap.js` only if that entrypoint works.
3. Make `bootstrap.js` initialize validation, asset registry, audio, and game hub helpers before loading the active game loop.
4. Connect audio hooks to player actions, pickups, doors, enemy events, special use, level clear, and player failure.
5. Connect game hub events for start, pickup, enemy cleared, special use, door unlocked, player failure, and level clear.
6. Add run stats for shots, hits, cleared enemies, pickups, damage taken, score, and completion time.
7. Add best run storage using `game-hub-api.js`.
8. Add lightweight settings for sensitivity, volume, mute, enemy bars, pickup labels, and high contrast HUD.
9. Add F3 debug overlay showing FPS, player tile, active enemies, active projectiles, current mode, and missing asset count.
10. Update the prototype README with actual current status and next pass tasks.

## Refactor Rule

Do not rewrite the entire game loop at once. Extract one module at a time and test after every extraction.

## Definition of Done

- Game starts.
- Player moves correctly.
- Combat works.
- Enemies can harm the player and be cleared.
- Pickups work.
- Green key and green door work.
- Special ability works.
- Win state works.
- No console errors.
- Missing assets do not crash the game.
- No copyrighted assets are introduced.
