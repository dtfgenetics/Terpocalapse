# Terpocalypse V2 Structure Audit

## Pass Date

Current V2 audit pass after campaign, story, map, spawn, and accessibility additions.

## Confirmed Working Structure

- V2 has its own folder and does not replace V1.
- V2 app imports data, state, map helpers, renderer, and starts a simple canvas loop.
- V2 map helper exports `getMapCell` and `safeMove`, and `app.js` imports both.
- V2 render file now shows mission feedback and keycard state.
- Story index exports intro sequence, mission briefings, level story beats, lore notes, and ending sequence.
- Map registry imports all nine map skeletons.
- Spawn registry imports all nine spawn plans.
- Settings schema now includes subtitles, reduced motion, screen shake, and flashing effects.

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

## Known Gaps

- V2 still uses the simple `LEVEL` object from `data.js` instead of the full map registry.
- V2 does not yet spawn threats from spawn plans.
- V2 does not yet spawn pickups from spawn plans.
- V2 does not yet display story intro, mission briefing, or lore pickups in the UI.
- V2 does not yet support tool switching.
- V2 does not yet support player health changes from encounters.
- V2 does not yet have level select.
- V2 does not yet persist campaign progress.
- V2 does not yet load final art or audio.

## Next Fix Order

1. Add V2 level loader using `MAP_REGISTRY`.
2. Add current-level state.
3. Add mission briefing panel using story data.
4. Add pickup placement and pickup collection.
5. Add threat placement and simple encounter behavior.
6. Add HUD objective tracker.
7. Add level complete screen.
8. Add campaign unlock/save system.

## Rule

V1 remains stable until V2 can match the V1 playable loop.
