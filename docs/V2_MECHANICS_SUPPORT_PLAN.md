# Terpocalypse V2 Mechanics Support Plan

This plan identifies what must be added, created, or modified to support the target game: a cannabis-themed retro browser FPS with campaign levels, tools, enemies, pickups, story, accessibility, and website-ready play.

## Current Systems Already Created

### Runtime Core

Existing files:

- `prototypes/web-fps-v2/src/app.js`
- `prototypes/web-fps-v2/src/state.js`
- `prototypes/web-fps-v2/src/data.js`
- `prototypes/web-fps-v2/src/map.js`
- `prototypes/web-fps-v2/src/level-loader.js`
- `prototypes/web-fps-v2/src/render.js`

Status:

The game boots, loads Level 1 through the loader, runs a canvas loop, moves the player, renders map/HUD/story panels, and tracks state.

### Campaign and Content

Existing files:

- level plans
- map registry
- spawn plans
- spawn registry
- campaign registry
- mission objectives
- story system
- lore notes
- pickups
- threats
- gear
- player loadout
- settings schema

Status:

Content is structured and usable by code.

### Player Actions

Existing files:

- `movement-system.js`
- `action-system.js`
- `tool-system.js`
- `pickup-system.js`
- `threat-system.js`

Status:

The player can move, turn, strafe, sprint, interact, use equipped tools, collect pickups, unlock tools, open route access, and receive threat pressure.

## Systems Still Needed

## 1. Mouse Look and Pointer Lock

Need to create:

- `input-system.js`

Need to modify:

- `app.js`
- `settings-schema.js`
- `render.js`

Required features:

- pointer lock on canvas click after game starts
- mouse horizontal look
- mouse sensitivity setting
- keyboard fallback turning
- lock/unlock feedback message
- pause when pointer lock is lost if needed

Why:

Keyboard turning works, but a browser FPS needs mouse look.

## 2. Damage Resolver and Armor Formula

Need to create:

- `damage-system.js`

Need to modify:

- `threat-system.js`
- `tool-system.js`
- `render.js`

Required features:

- armor absorbs part of incoming pressure
- health receives remaining pressure
- low-health warning
- short invulnerability window after hit
- failed-run state when health reaches zero
- readable feedback messages

Why:

Threat pressure currently subtracts health too directly. Armor exists but does not meaningfully protect the player yet.

## 3. Special Ability System

Need to create:

- `special-system.js`

Need to modify:

- `app.js`
- `render.js`
- `pickup-system.js`
- `settings-schema.js` if effects need reduced motion handling

Required features:

- activate with a dedicated key
- spend special charge
- apply area clear, slow, shield, or burst effect
- support Grow Light Overdrive pickups
- show special cooldown/charge in HUD
- respect reduced motion setting later

Why:

Special charge exists, but there is no active special mechanic.

## 4. Door State and Switch System

Need to create:

- `door-system.js`
- later `switch-system.js`

Need to modify:

- `action-system.js`
- `map.js`
- `render.js`
- map data files

Required features:

- track opened doors separately from map source data
- door interaction opens when required key exists
- locked door feedback
- open doors become passable
- doors render differently once open
- future switches can open specific doors

Why:

Route access works, but map door markers do not mutate into open doors.

## 5. Objective Tracker

Need to create:

- `objective-system.js`

Need to modify:

- `app.js`
- `render.js`
- `mission-objectives.js`
- pickup/action/threat systems where objective events happen

Required features:

- load objectives for current level
- mark objective complete on pickup, interaction, clear, or exit
- show active objective in HUD
- show mission complete only after required objectives are met

Why:

Mission objective text exists, but there is no active objective state.

## 6. Level Completion and Campaign Progress

Need to create:

- `campaign-state.js`
- `save-system.js`

Need to modify:

- `app.js`
- `campaign-flow.js`
- `render.js`

Required features:

- complete current level
- unlock next level
- persist progress to localStorage
- level select reads unlocked levels
- replay completed levels
- mission-complete panel shows rewards

Why:

The campaign exists as data, but V2 only loads Level 1.

## 7. Threat AI Upgrade

Need to create:

- `threat-behaviors.js`
- `line-of-sight.js`

Need to modify:

- `threat-system.js`
- `map.js`
- `render.js`

Required features:

- line-of-sight checks
- wall-aware movement
- role-specific behavior
- melee pressure behavior
- ranged pressure behavior
- boss behavior hooks
- windup/telegraph state
- cooldown state

Why:

Threats move toward the player, but they are not yet intelligent enough for quality gameplay.

## 8. Tool Effects and Projectile Runtime

Need to create:

- `effect-system.js`
- `projectile-system.js`

Need to modify:

- `tool-system.js`
- `render.js`
- `audio-cues.js`

Required features:

- hit flashes
- range beams
- spray cones
- flame/area zones
- projectile travel
- thrown stash arc for Kief Grenades
- impact markers
- cooldown feedback

Why:

Tools have stats, but no visual/action feedback beyond messages.

## 9. Story and Lore Improvements

Need to create or modify:

- `story-ui.js`
- `render.js`
- `pickup-system.js`
- `mission-objectives.js`

Required features:

- lore collection log
- panel history
- skip/continue controls
- subtitles always available
- story panels use readable width and line wrapping
- intro should appear before title start or after start consistently

Why:

Story panels work, but need polish and player review support.

## 10. Settings Runtime

Need to create:

- `settings-system.js`

Need to modify:

- `settings-schema.js`
- `movement-system.js`
- `render.js`
- future audio system

Required features:

- load defaults
- save settings to localStorage
- apply mouse sensitivity
- apply high contrast HUD
- apply labels/subtitles
- apply reduced motion
- apply flashing effects toggle
- apply volume when audio exists

Why:

Settings schema exists, but settings do not affect gameplay yet.

## 11. Pause, Restart, and State Flow

Need to create:

- `game-state-system.js`

Need to modify:

- `app.js`
- `render.js`

Required features:

- pause with Escape
- resume
- restart level
- return to title
- failed-run panel
- mission-complete panel
- prevent inputs from firing while paused/panel open

Why:

The game needs stable state transitions before it can be website-ready.

## 12. Audio Runtime

Need to create:

- `audio-system.js`

Need to modify:

- `audio-cues.js`
- pickup/tool/threat/action/story systems

Required features:

- play cue by name
- missing audio fallback
- mute/volume support
- menu music loop
- level music loop
- pickup, door, tool, threat, failure, mission complete cues

Why:

Audio cue names exist, but runtime playback is not wired.

## 13. Asset Registry and Placeholder Pipeline

Need to create:

- `asset-registry.js`
- `sprite-system.js`

Need to modify:

- `render.js`
- asset-needs files

Required features:

- register sprite/icon/texture placeholders
- load assets safely
- fallback to generated shapes if missing
- draw pickup sprites
- draw threat sprites
- draw tool HUD art
- draw wall/floor textures later

Why:

V2 currently uses shapes. It needs an asset-safe pipeline before final art generation.

## 14. First-Person Renderer Upgrade

Need to create:

- `fps-renderer.js`
- possibly `raycast-system.js`

Need to modify:

- `render.js`
- `map.js`
- movement/action systems

Required features:

- wall raycasting or simplified first-person projection
- floor/ceiling colors
- wall distance shading
- door rendering
- pickups/threats as billboards
- weapon/tool overlay
- mini-map as debug option only

Why:

The current V2 view is still a top-down/debug shell. The final target is a retro browser FPS.

## 15. Test and Validation Aggregator

Need to create:

- `tools/validate-all-v2.mjs`

Need to modify:

- `package.json` later if connector allows

Required features:

- run content validator
- run route validator
- run reference validator
- run gear validator
- report all failures cleanly

Why:

Multiple validators exist, but there is no one-command V2 check.

## Highest Priority Next Steps

1. Add mouse-look / pointer-lock support.
2. Add armor-aware damage resolver.
3. Add special ability system.
4. Add door state mutation.
5. Add objective tracker.
6. Add first-person renderer upgrade.

## Professional Recommendation

Continue building V2 in systems. Do not generate final art or switch the website route until the following are working together:

- FPS-style movement
- tool use
- threat pressure
- pickups
- key/door progression
- mission objectives
- story/lore panels
- failure and completion panels
- at least one fully playable Level 1 loop
