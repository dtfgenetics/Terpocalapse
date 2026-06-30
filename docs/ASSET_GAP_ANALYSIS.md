# Terpocalypse — Asset Gap Analysis

This document identifies important asset categories that were not fully covered in the first asset bible.

## Purpose

The first asset bible identified the obvious art assets: logo, HUD, weapons, enemies, pickups, textures, props, effects, and audio.

This gap analysis adds the production assets needed to make the game actually work in code, scale cleanly, and avoid legal or workflow problems.

## Missing / Underdefined Asset Categories

## 1. Asset Source Manifest

Need a tracked file listing every non-original source.

Recommended file:

```text
assets/ASSET_MANIFEST.md
```

Fields:

- filename
- asset type
- status
- creator/source
- license
- attribution required
- approved for commercial use yes/no
- replacement needed yes/no

## 2. Sprite Sheet Specifications

We need standard sprite dimensions and frame rules.

Define:

- enemy frame size
- pickup sprite size
- weapon sprite canvas size
- effect sprite frame size
- frame naming rules
- transparent background requirement
- pixel scale rules

Suggested first-pass sizes:

- enemy billboard frame: 256x256 PNG
- pickup sprite: 128x128 PNG
- weapon first-person frame: 512x512 or 768x512 PNG
- effect frame: 128x128 or 256x256 PNG
- UI icon: 64x64 PNG
- keycard icon: 64x64 PNG
- wall/floor/ceiling textures: 256x256 or 512x512 tileable PNG/WebP

## 3. Animation State Maps

Each enemy and weapon needs an animation definition file, not just loose images.

Examples:

```text
assets/enemies/spider_mite_swarm/animation.json
assets/weapons/ph_blaster/weapon.json
```

Enemy animation states:

- idle
- move
- attack
- pain
- death

Weapon animation states:

- idle
- fire
- cooldown
- reload/pump if used
- empty/no-ammo if used

## 4. Gameplay Data Files

We need data files that connect art to gameplay.

Recommended folders:

```text
data/
  enemies.json
  weapons.json
  pickups.json
  levels.json
  sounds.json
```

These files should define stats, behavior, asset paths, sounds, and unlock rules.

## 5. Collision / Blocking Metadata

Props need collision notes so the engine knows what blocks movement.

Each prop should be tagged:

- decorative only
- blocks player
- blocks enemy
- can be shot
- can explode
- pickup / interactable

## 6. Door and Switch Asset System

We need more than a door image.

Required:

- door closed texture
- door opening frame/animation
- door open state
- locked state indicator
- keycard reader idle
- keycard reader denied
- keycard reader accepted
- switch idle
- switch pressed
- locked door sound
- accepted door sound

## 7. Map / Level Editor Pipeline

The project needs to decide how levels are created.

Possible approaches:

- JSON hand-authored levels
- custom grid editor
- TrenchBroom-style map workflow
- adapted doom-lite level format

Missing asset/doc items:

- map format spec
- texture naming map
- entity placement rules
- room naming convention
- spawn point convention
- exit trigger convention

## 8. Loading / Error / Fallback Screens

Needed for website deployment.

Assets:

- loading screen
- click-to-start overlay
- browser unsupported message
- mobile warning screen
- asset loading failed screen
- pause overlay
- credits screen

## 9. Controls / Input UI

Needed:

- controls screen
- keyboard/mouse diagram
- optional controller icons
- sensitivity slider UI
- volume sliders
- fullscreen button
- mute button

## 10. Accessibility / Settings Assets

Needed later but should be planned now:

- high-contrast HUD mode
- subtitles/captions style
- crosshair options
- reduced screen shake option
- brightness/gamma slider
- audio volume categories

## 11. Audio Metadata

Audio needs a manifest.

Recommended file:

```text
assets/audio/AUDIO_MANIFEST.md
```

Fields:

- sound id
- filename
- category
- length
- loop yes/no
- source/license
- usage trigger

## 12. Attribution / Credits Assets

Needed:

- credits screen text
- third-party license screen
- README license section
- source list for assets and code

## 13. Marketing / Game Hub Assets

Needed for dtfseeds.com / THC game hub.

Assets:

- game card thumbnail
- game hero banner
- square social image
- horizontal social image
- animated teaser GIF/WebP
- small icon
- coming-soon tile
- playable-now tile

## 14. Save / Progress / Score Assets

If the prototype adds progression or scoring, plan for:

- score icon
- secret found icon
- level complete stats screen
- timer icon
- best time screen
- local high score UI

## 15. Debug / Development Assets

Useful for testing:

- placeholder enemy sprite
- placeholder weapon sprite
- missing texture checker pattern
- collision box visual overlay
- spawn marker icon
- pickup marker icon
- door marker icon

## 16. Source Files

Final exported PNGs are not enough.

Need folders for editable source files:

```text
source-assets/
  branding/
  ui/
  sprites/
  textures/
  audio/
```

Do not require source files for every generated asset, but preserve them whenever possible.

## Updated First Prototype Asset Minimum

The first playable version should include these categories at minimum:

1. game identity assets
2. HUD assets
3. weapon sprites
4. enemy sprites
5. pickup sprites
6. wall/floor/ceiling textures
7. door/keycard assets
8. prop sprites
9. combat FX
10. placeholder SFX/music
11. asset manifest
12. enemy data JSON
13. weapon data JSON
14. pickup data JSON
15. level data JSON
16. credits/license notes
17. loading/click-to-start overlay
18. controls screen

## Highest Priority Gaps To Fix Next

1. Add `assets/ASSET_MANIFEST.md`.
2. Add `data/enemies.json`, `data/weapons.json`, `data/pickups.json`, and `data/sounds.json`.
3. Define sprite/export sizes in `docs/STYLE_GUIDE.md` or a new `docs/SPRITE_SPEC.md`.
4. Create `docs/MAP_FORMAT.md` after selecting the codebase.
5. Create `assets/audio/AUDIO_MANIFEST.md` before adding sounds.
