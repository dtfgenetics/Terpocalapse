# Terpocalypse V2 Structure Audit

## Current Status

V2 is now a structured gameplay prototype, not only a content shell. It still does not replace V1, but it now has enough systems to continue building toward the final game loop.

## Confirmed Runtime Structure

- V2 has its own folder and does not replace V1.
- V2 app loads Level 1 through `level-loader.js`.
- `level-loader.js` normalizes campaign maps from `layout/start` into runtime-ready `map/playerStart` data.
- V2 app stores current level, story, spawn plan, inventory, ammo, tools, pickups, threats, story panel, player state, and run state.
- V2 map helper supports cell lookup and collision movement.
- V2 renderer shows map, pickups, threats, player marker, HUD, mission text, and story panels.
- Story panels support intro, briefing, lore, and ending panel display.
- V2 app pauses gameplay while a story panel is open.

## Confirmed Gameplay Systems

- level loader
- map normalization
- player movement module
- facing-based movement
- strafing
- sprinting
- turn controls
- collision movement
- interaction system
- equipped tool system
- tool unlocks
- equip by slot
- cooldowns
- ammo spending
- pickup spawning from spawn plans
- lore note pickups from spawn plans
- pickup collection
- keycard route access
- threat spawning from spawn plans
- simple threat movement
- threat pressure against player health
- failed run state
- score rewards
- mission complete state

## Confirmed Content Systems

- nine level plans
- nine map skeletons
- nine spawn plans
- campaign registry
- map registry
- spawn registry
- story bible
- intro sequence
- mission briefings
- level story beats
- lore notes
- ending sequence
- player classes
- player loadout
- inventory rules
- gear list
- gear balance
- threat list
- threat balance
- pickup list
- encounter table
- reward table
- visual palettes
- room types
- audio cues
- UI copy
- accessibility requirements
- settings schema

## Validation Tools Added

- `prototypes/web-fps-v2/tools/validate-v2-content.mjs`
- `prototypes/web-fps-v2/tools/check-v2-routes.mjs`
- `prototypes/web-fps-v2/tools/validate-v2-references.mjs`
- `prototypes/web-fps-v2/tools/validate-v2-gear.mjs`

## Remaining Core Gaps

### 1. First-person renderer

V2 still uses a debug mini-map style view. It needs a real first-person rendering layer or a port of the V1 raycaster-style renderer.

### 2. Mouse look and pointer lock

Keyboard turning exists. Real FPS control needs mouse-look, pointer-lock start flow, sensitivity setting support, and fallback controls.

### 3. Door state mutation

Route access works logically, but the map still has a door marker. Door tiles should become open after access is granted or interaction succeeds.

### 4. Armor and damage resolver

Threat pressure currently affects health. Damage should flow through a resolver that supports armor absorption, invulnerability windows, low-health warnings, and game-over state.

### 5. Special ability system

The player has special charge, but V2 does not yet activate Grow Light Overdrive / Trichome-style special mechanics.

### 6. Tool effects

Tools have stats and damage, but no visual effect objects yet. Needed effects include spray, beam, flame, burst, throw, impact, and cooldown feedback.

### 7. Better threat intelligence

Threats move toward the player but do not yet use wall-aware pathing, line-of-sight checks, ranged behavior, windups, attack telegraphs, or role-specific logic.

### 8. Objective tracker

Mission objective data exists, but the HUD does not yet track individual objective completion.

### 9. Level select and campaign progress

Campaign data exists, but there is no level select, unlock state, persistent save data, or next-level transition.

### 10. Settings application

Settings schema exists, but settings are not yet rendered into a settings screen or applied to movement, audio, contrast, subtitles, motion, or flashing effects.

### 11. Audio system wiring

Audio cue data exists, but there are no loaded audio files or runtime cue triggers in V2.

### 12. Asset loading

Asset requirement lists exist, but V2 still renders simple shapes. It needs an asset registry, fallback sprites, and final original art/audio paths.

### 13. Pause/restart loop

The game needs pause, restart level, return to title, and resume states.

### 14. Build/run scripts

Validation files exist, but package scripts and a CI-style check command should run all V2 validators together.

## Recommended Next Build Order

1. Add pointer-lock mouse look.
2. Add damage resolver with armor support.
3. Add special ability system.
4. Add door mutation/open state.
5. Add objective tracker.
6. Add level-complete screen and next-level loader.
7. Add settings runtime application.
8. Add audio cue runtime hooks.
9. Add first-person renderer upgrade.
10. Add asset registry and final placeholder sprite pipeline.

## Rule

V1 remains stable until V2 can match or exceed every V1 gameplay feature.
