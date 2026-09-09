# Terpocalypse V2 Publish Manifest

Target live route:

- `/games/terpocalypse/`

Source folder:

- `prototypes/web-fps-v2/`

## Required files

- `index.html`
- `styles.css`
- `hud.css`
- `touch.css`
- `package.json`

## Required source tree

- `src/`
- `src/maps/`
- `src/spawn-plans/`
- `src/story/`
- `tools/`

## Pre-publish checks

Run from `prototypes/web-fps-v2/`:

```bash
npm run check
```

The publish should not proceed if syntax, imports, linked files, DOM contract, content, routes, references, or gear validation fails.

## Current status

V2 is now the active future build. It includes first-person wall rendering, projected pickups/threats, DOM HUD, touch controls, sound queue/player hooks, story panels, level sessions, level transitions, campaign memory, and validation scripts.

V1 remains stable as the fallback playable prototype until V2 is fully live-tested.
