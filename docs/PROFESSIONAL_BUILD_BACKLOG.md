# Terpocalypse — Professional Build Backlog

This backlog defines the work needed to turn the current prototype into a quality browser FPS.

## Current Reality

The project now has a playable static browser prototype, but it is not yet a professional-quality game. The current game loop works, but it still needs modular architecture, final assets, better controls, better combat feel, stronger enemy behavior, settings, audio, level loading, and website deployment QA.

## Build Standard

The target is not just "it runs." The target is:

- fun within 30 seconds
- readable combat
- fast movement
- clear objective
- original cannabis parody identity
- website-ready performance
- no copied Doom or commercial shooter assets
- easy asset replacement
- easy level expansion
- clear QA checklist

## Confirmed Existing Systems

- static HTML/CSS/JS prototype
- canvas-based raycaster-style rendering
- WASD movement
- mouse look / pointer lock
- collision
- shooting
- weapon switching
- Trim Shears
- pH Blaster
- Neem Cannon
- Spider Mite Swarm
- Powdery Mildew Ghoul
- Nute Burn Imp
- health bars
- projectiles
- pickups
- green keycard
- locked door
- special ability
- HUD
- death state
- win state
- asset registry file
- audio hook file
- runtime validation file
- game hub API file
- deployment plan
- asset manifest

## Missing Critical Systems

### 1. Modular Runtime

Current issue: too much gameplay code lives in `main.js`.

Need modules:

- `input.js`
- `renderer.js`
- `combat.js`
- `enemy-ai.js`
- `pickup-system.js`
- `door-system.js`
- `hud.js`
- `level-loader.js`
- `game-state.js`

### 2. Asset Integration

Current issue: visuals are mostly code-drawn placeholders.

Need:

- preload registered assets
- draw real images if loaded
- fallback to placeholder if missing
- missing asset report on title screen
- sprite size enforcement
- animation state definitions

### 3. Weapon Feel

Current issue: weapons function, but feel basic.

Need:

- weapon bob
- recoil
- fire animation
- screen shake toggle
- stronger muzzle flash
- impact feedback
- better melee range feedback
- shotgun pellet decals or sparks
- ammo balancing

### 4. Enemy AI

Current issue: enemies move and attack, but behavior is basic.

Need:

- idle state
- alert state
- chase state
- attack windup
- retreat/strafe for ranged enemies
- pain stun
- death state timing
- pathing around corners
- collision between enemies

### 5. Level System

Current issue: level is hardcoded in `game-data.js`.

Need:

- level JSON loader
- tile legend parser
- spawn parser
- pickup parser
- door parser
- exit parser
- secret parser
- validation before load

### 6. Settings Menu

Need:

- volume
- mute
- mouse sensitivity
- fullscreen
- high contrast HUD
- show/hide enemy health bars
- show/hide pickup labels
- reduced motion
- reset save data

### 7. Audio

Current issue: audio hooks exist but final sound assets are missing.

Need:

- title loop
- level loop
- pickup sound
- door sound
- locked door sound
- player damage sound
- weapon sounds
- enemy sounds
- mission complete sound

### 8. Website Integration

Need:

- static deploy folder
- game route
- iframe/full-page option
- mobile fallback warning
- game hub event listener
- best run display
- no secret keys
- no absolute local paths

### 9. Art Production

Need final assets for:

- title screen
- HUD
- weapons
- enemies
- pickups
- props
- textures
- effects
- icons

### 10. QA Automation

Need:

- run validation command
- check no missing core files
- check map is closed
- check exit is reachable
- check all enemy types exist
- check all pickups are valid
- check all asset paths are registered

## Next Work Order

1. Wire `bootstrap.js` as the page entrypoint.
2. Wire runtime validation into game launch.
3. Wire audio hooks into gameplay events.
4. Wire game hub events into gameplay events.
5. Refactor `main.js` into smaller modules.
6. Add level loader.
7. Add settings screen.
8. Add real placeholder image assets.
9. Add website deployment bundle instructions.
10. Start visual asset creation.

## Important Note

Some JavaScript write attempts through the connector were blocked by the platform safety layer even when the code was normal game code. If direct edits are blocked, use this backlog as the Codex handoff and apply the code locally through the connected development environment.
