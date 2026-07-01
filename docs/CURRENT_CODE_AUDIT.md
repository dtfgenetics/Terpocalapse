# Terpocalypse — Current Code Audit

This audit reviews the current playable prototype and identifies what is working, what is missing, and what has been added to close gaps.

## Source Reviewed

- `prototypes/web-fps/index.html`
- `prototypes/web-fps/styles.css`
- `prototypes/web-fps/src/game-data.js`
- `prototypes/web-fps/src/main.js`
- `prototypes/web-fps/README.md`

## Audit Summary

The current prototype proves a playable loop, but it is still a prototype. It needs modular systems, asset loading, sound hooks, validation, website integration hooks, asset manifests, and a real build/deployment plan before it can be considered a professional browser game foundation.

## What Exists Now

### Core Runtime

`main.js` imports the game data, initializes the canvas, defines field-of-view/raycast constants, tracks input, player state, enemy state, pickups, and projectile state.

Status: WORKING PROTOTYPE

Issue: Too many responsibilities are in one file.

Needed improvement:

- split rendering, input, combat, enemy AI, pickups, audio, and state into modules
- add map validation
- add asset loading
- add website/game hub event hooks

### Movement / Collision

The prototype supports WASD movement, strafing, arrow turning, mouse look, sprint, and collision against wall/door tiles.

Status: WORKING PROTOTYPE

Missing:

- player acceleration tuning
- collision with solid props
- step/glide polish
- configurable movement constants
- mobile fallback controls

### Renderer

The prototype raycasts walls and draws enemies/pickups/projectiles as billboards.

Status: WORKING PROTOTYPE

Missing:

- real texture loading
- z-buffer/depth buffer for more accurate sprite occlusion
- floor/ceiling texture projection
- animated sprite frame system
- lighting zones
- palette/post-processing options
- asset fallback detection

### Weapons

The prototype supports Trim Shears, pH Blaster, and Neem Cannon. It supports melee, hitscan, spread fire, ammo, cooldowns, pickup unlocks, muzzle flash placeholder, and weapon switching.

Status: WORKING PROTOTYPE

Missing:

- real first-person sprite frame assets
- weapon animation states
- recoil/weapon bob
- weapon pickup sprites
- projectile weapon support for player weapons
- reload or pump states if desired
- weapon data manifest
- audio hooks in active gameplay file

### Enemies

The prototype supports Spider Mite Swarm, Powdery Mildew Ghoul, and Nute Burn Imp. It supports enemy health, health bars, melee attacks, ranged projectile attacks, movement toward player, line-of-sight checks, hit reactions, and death.

Status: WORKING PROTOTYPE

Missing:

- enemy animation state machine
- enemy patrol/idle state
- enemy sound triggers
- ranged attack windup frames
- projectile impact effects
- enemy collision between enemies
- death animation timers
- per-enemy asset manifests

### Pickups

The prototype supports health, armor, ammo, weapon pickup, keycard, and special charge.

Status: WORKING PROTOTYPE

Missing:

- pickup sprite assets
- pickup respawn rules if needed
- pickup sound hooks in active gameplay file
- pickup notification styling polish
- secret collectible support

### Doors / Interactions

The prototype supports a locked green keycard door and exit interaction.

Status: WORKING PROTOTYPE

Missing:

- multiple door instances
- door animation state
- switch objects
- colored lock system for purple/gold keycards
- locked/accepted/denied UI feedback assets
- door sounds in active gameplay file

### HUD / UI

The prototype supports health, armor, ammo, weapon name, special charge, green key indicator, score, crosshair, damage flash, pause panel, death panel, and mission complete panel.

Status: WORKING PROTOTYPE

Missing:

- real HUD art
- weapon icons
- keycard icons
- settings screen
- volume controls
- mouse sensitivity option
- fullscreen control
- high contrast option
- level stats screen
- best time/score display

### Audio

Originally missing. Now added:

- `prototypes/web-fps/src/audio.js`
- audio ID manifest
- AudioManager class
- preload/play/setVolume/mute/unmute hooks

Status: STRUCTURE ADDED, NOT WIRED INTO MAIN LOOP YET

Next step:

- import AudioManager into the active game loop
- play hooks on shoot, pickup, door, damage, win, loss, and enemy events
- add final licensed audio files later

### Asset Registry

Originally missing. Now added:

- `prototypes/web-fps/src/asset-registry.js`
- asset status constants
- sprite specs
- paths for branding, UI, weapons, enemies, pickups, and effects
- preload helpers
- missing asset report helpers

Status: STRUCTURE ADDED, NOT WIRED INTO MAIN LOOP YET

Next step:

- preload asset registry before game start
- draw loaded images when present
- fall back to code-drawn placeholder visuals when missing

### Runtime Validation

Originally missing. Now added:

- `prototypes/web-fps/src/runtime-checks.js`
- map shape validation
- map boundary validation
- entity placement validation
- weapon stat validation
- enemy stat validation

Also added:

- `prototypes/web-fps/tools/validate-game-data.mjs`

Status: ADDED

Note:

The package script update was blocked by the connector, but the command can still be run directly:

```bash
node tools/validate-game-data.mjs
```

### Website / Game Hub Hooks

Originally missing. Now added:

- `prototypes/web-fps/src/game-hub-api.js`

Includes:

- local best run storage
- game event emitter
- run stats creation
- run stats completion helper

Status: STRUCTURE ADDED, NOT WIRED INTO MAIN LOOP YET

Next step:

- emit `start`, `pickup`, `enemyKilled`, `levelComplete`, and `playerDown` events from active gameplay
- display best score/time on title or mission complete screen

## Major Remaining Missing Pieces

### Must Add Next

1. Wire `audio.js` into `main.js`.
2. Wire `asset-registry.js` into `main.js`.
3. Wire `game-hub-api.js` into `main.js`.
4. Add real fallback asset preloader before start.
5. Add real sprite draw paths if assets load.
6. Add multiple door/key system.
7. Add player projectile weapon support.
8. Add enemy animation state data.
9. Add level stats screen.
10. Add `docs/MAP_FORMAT.md`.
11. Add `assets/ASSET_MANIFEST.md`.
12. Add `assets/audio/AUDIO_MANIFEST.md`.
13. Add `docs/DEPLOYMENT_PLAN.md` for the website.
14. Add CI or at least a validation command once connector allows package update.
15. Add a professional code import plan for doom-lite/Three.js/Babylon.js if upgrading.

## Engine Direction

Short-term:

- Continue improving the original no-dependency prototype inside `prototypes/web-fps/`.

Medium-term:

- Evaluate importing/adapting `benc-uk/doom-lite` with license attribution.

Long-term:

- Upgrade to Three.js or Babylon.js only if the project needs true 3D models, lighting, mobile controls, physics, or larger content scale.

## Verdict

The project is no longer only an idea. It now has a playable browser prototype and multiple professional support layers, but the current active gameplay file still needs integration work. The next coding pass should wire the new modules into the active game loop instead of adding more disconnected files.
