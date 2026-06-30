# Codex Handoff — Terpocalypse

## Current Mission

Build the repository into a working browser-based retro FPS prototype for **Terpocalypse: Grow Room From Hell**.

The first milestone is not a full game. It is a clean, playable vertical slice.

## Hard Rules

- Do not use Doom assets.
- Do not use Doom WAD data.
- Do not use commercial shooter sprites, sounds, maps, or music.
- Keep assets replaceable.
- Keep code simple enough to maintain.
- The first version must run in a browser.
- Prefer original project structure over messy one-off files.

## Recommended Technical Direction

Use a lightweight JavaScript/WebGL retro FPS approach. The project may reference open-source browser FPS examples for architecture, but any copied code must preserve license attribution.

Possible technical references to evaluate before importing code:

- `benc-uk/doom-lite` — lightweight JS/WebGL retro FPS, MIT license
- `phoboslab/q1k3` — tiny browser FPS, MIT license, useful reference
- `ThanosRestas/Theasis` — BabylonJS FPS, MIT license, useful gameplay reference
- `Footprintarts/ThreeJS_FPS_2.0` — Three.js FPS mechanics template, MIT license

Do not import code until license notes are added.

## First Prototype Scope

Create:

```text
prototypes/web-fps/
  package.json
  index.html
  src/
  public/
```

Minimum gameplay:

- pointer-lock movement
- simple map
- collision
- enemy placeholder sprites
- shooting
- health and damage
- ammo pickup
- keycard pickup
- locked door
- level exit
- HUD
- restart after death

## First Level

Level 01: **The Veg Lab**

Include:

- starting room
- grow-light corridor
- first enemy room
- locked green keycard door
- secret stash room
- exit room

## Placeholder Asset Policy

Temporary placeholder art is allowed only if:

- it is original or generated for this project
- it is named clearly as placeholder
- it does not come from Doom or another game
- it is easy to replace later

## Commit Strategy

Use clear commits:

- `Set up Terpocalypse asset production structure`
- `Add first web FPS prototype scaffold`
- `Add Veg Lab level placeholder`
- `Add HUD and pickup placeholders`
- `Add enemy prototype behavior`

## Definition of Done for First Prototype

- Runs locally.
- No console errors.
- Player can move and shoot.
- Player can take damage.
- At least one enemy can be defeated.
- Player can collect one keycard.
- Keycard opens one door.
- Player can reach level exit.
- README has exact local run commands.
- Any imported code/license has attribution.
