# Terpocalypse: Grow Room From Hell

Original cannabis-themed retro browser FPS for the THC / DTF game hub.

> Repo name: `Terpocalapse`  
> Public game title: **Terpocalypse: Grow Room From Hell**

## Status

Asset planning and prototype setup.

The project is currently being structured as an asset-first game production repo before final gameplay code is added. The first goal is a playable browser vertical slice called **The Veg Lab**.

## Core Rule

This project must be original. Do not use Doom names, Doom logos, Doom sprites, Doom maps, Doom music, Doom sound effects, Doom WAD data, commercial shooter assets, or copied UI/font treatments from copyrighted games.

The goal is a cannabis-themed retro FPS parody inspired by the old-school shooter genre, not a Doom clone.

## First Playable Target

**Vertical Slice:** Level 01 — The Veg Lab

Minimum playable goals:

- Title screen
- Retro HUD
- Player movement and shooting
- Three weapons
- Three enemies
- Health, armor, ammo, and keycard pickups
- Doors and keycard panels
- Win condition
- No console errors
- Browser-ready deployment path

## Initial Asset Groups

1. Terpocalypse logo
2. Title screen background
3. THC / Teaching Healthy Cultivation badge
4. HUD frame
5. Health / armor / ammo icons
6. Green / purple / gold keycards
7. Cure Jar Health pickup
8. Kief Armor pickup
9. pH Blaster weapon
10. Neem Cannon weapon
11. Spider Mite Swarm enemy
12. Powdery Mildew Ghoul enemy
13. Nute Burn Imp enemy
14. Veg Lab wall textures
15. Veg Lab floor textures
16. Grow room prop set
17. Muzzle flash / impact FX
18. Door / keycard panel assets

## Repo Structure

```text
assets/
  branding/
  ui/
  textures/
    walls/
    floors/
    ceilings/
    decals/
  props/
  pickups/
  weapons/
    first_person/
    pickups/
    projectiles/
    icons/
  enemies/
    spider_mite_swarm/
    powdery_mildew_ghoul/
    nute_burn_imp/
  effects/
  audio/
    music/
    sfx/
  story/

docs/
  GAME_BIBLE.md
  ASSET_BIBLE.md
  STYLE_GUIDE.md
  NO_DOOM_IP_RULES.md
  CODEX_HANDOFF.md
  QA_CHECKLIST.md
  LICENSING_NOTES.md

levels/
  level_01_the_veg_lab/
    level.json
    notes.md

prototypes/
  web-fps/
```

## Local Development

No playable code has been added yet. Once the web FPS prototype is introduced, local instructions should be added here with exact commands.

Expected future direction:

```bash
cd prototypes/web-fps
npm install
npm run dev
```

## Asset Workflow

- Create assets in small approved batches.
- Keep source files and final export files separated when possible.
- Prefer original pixel-style PNG/WebP assets for sprites and UI.
- Prefer seamless texture files for walls, floors, ceilings, and decals.
- Keep filenames lowercase, descriptive, and hyphenated.
- Do not overwrite approved assets without creating a versioned replacement.

## Build Philosophy

Make the game simple, playable, and expandable. The first version should be a clean vertical slice, not an overbuilt engine rewrite.
