# V2 Line Audit — 2026-07-01

## Files Reviewed

- `prototypes/web-fps-v2/src/app.js`
- `prototypes/web-fps-v2/src/map.js`
- `prototypes/web-fps-v2/src/render.js`
- `prototypes/web-fps-v2/src/data.js`
- `prototypes/web-fps-v2/src/level-loader.js`
- `prototypes/web-fps-v2/src/maps/map-registry.js`
- `prototypes/web-fps-v2/src/spawn-plans/spawn-registry.js`
- `prototypes/web-fps-v2/src/story/story-index.js`

## Issues Found and Fixed

### 1. V2 app was not using campaign content

Problem:

`app.js` imported the old isolated `LEVEL` object from `data.js` instead of using the new campaign maps, spawn plans, and story files.

Fix:

`app.js` now imports `loadLevelByIndex()` from `level-loader.js`. It loads Level 1 through the loader and stores briefing, story, and spawn plan data in state.

Status: fixed.

### 2. Map data shape mismatch

Problem:

Campaign maps use `layout` and `start`, while the runtime expects `map` and `playerStart`.

Fix:

`level-loader.js` now normalizes map files into runtime-ready level objects with:

- `name`
- `goal`
- `tileSize`
- `map`
- `playerStart`

Status: fixed.

### 3. Player-facing mission feedback was hidden

Problem:

`app.js` set `state.message`, but `render.js` did not display it.

Fix:

`render.js` now shows:

- game title
- health and score
- keycard status
- current mission message

Status: fixed.

### 4. Accessibility requirements were missing from code settings

Problem:

The accessibility document required subtitles, reduced motion, flashing effects control, and screen shake control, but `settings-schema.js` did not include those options.

Fix:

`settings-schema.js` now includes:

- `subtitles`
- `reducedMotion`
- `screenShake`
- `flashingEffects`

Status: fixed.

### 5. No automated content completeness check

Problem:

The repo had many content modules but no V2-specific validation tool.

Fix:

Added `prototypes/web-fps-v2/tools/validate-v2-content.mjs`.

It checks:

- every map has an id
- every map has a title
- every map has rows
- every map has a start
- every map has a mission briefing
- every map has a spawn plan
- rows are consistent width
- every map has an exit marker

Status: fixed.

### 6. No automated route check

Problem:

A map could accidentally be impossible to finish.

Fix:

Added `prototypes/web-fps-v2/tools/check-v2-routes.mjs`.

It checks:

- start exists
- key marker exists
- exit marker exists
- key is reachable before door access
- exit is reachable after key access

Status: fixed.

## Confirmed Structure

- Map registry includes all nine maps.
- Spawn registry includes all nine spawn plans.
- Story index exports intro, briefings, level beats, lore, and ending.
- App now uses the loader.
- Loader normalizes campaign maps for runtime use.
- Renderer now displays gameplay feedback.

## Still Needs Next

### 1. Replace placeholder mini-map with first-person V2 renderer

Current V2 still renders as a top-down/debug shell. V1 has the better FPS prototype. V2 needs the FPS renderer ported or rebuilt.

### 2. Spawn pickups from spawn plans

Spawn plan data exists, but pickups do not appear in V2 yet.

### 3. Spawn threats from spawn plans

Threat lists and spawn plans exist, but V2 does not spawn active threats yet.

### 4. Add tool switching

Gear data and balance exist, but V2 does not yet switch tools or use tool stats.

### 5. Add story UI

Story files exist, but intro, briefing, lore notes, and ending are not displayed in panels yet.

### 6. Add save/progress system

Campaign flow exists, but level unlocks and progress persistence are not wired yet.

### 7. Run tools locally

These validation files exist, but must be run locally through Codex or a terminal:

- `node tools/validate-v2-content.mjs`
- `node tools/check-v2-routes.mjs`

## Recommendation

Next code pass should build the V2 pickup system first. Pickups are simpler than threats and will prove that spawn plans can become live gameplay objects.
