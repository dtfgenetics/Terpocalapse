# Terpocalypse — Engine Requirements

## Purpose

The codebase must support a retro first-person shooter that feels like an old-school PC shooter while remaining an original cannabis parody game.

The goal is not to copy Doom. The goal is to support the genre mechanics players expect from a classic fast FPS, then replace the identity, art, terminology, enemies, weapons, levels, audio, and branding with original Terpocalypse / THC content.

## Core Direction

**Game:** Terpocalypse: Grow Room From Hell  
**Theme:** cannabis grow-room horror-comedy parody  
**Perspective:** first-person  
**Style:** retro / 2.5D / pixel-heavy / fast arcade shooter  
**Platform:** browser-first  
**First level:** Level 01 — The Veg Lab

## Required Movement Mechanics

The engine must support:

- first-person camera view
- WASD movement
- mouse look / pointer lock
- strafing
- forward and backward movement
- smooth turning
- collision against walls and solid props
- responsive acceleration/deceleration
- optional sprint later
- fast arcade-style movement rather than slow tactical movement

## Required Shooting / Weapon Mechanics

The engine must support:

- first-person weapon sprites
- weapon switching
- melee attacks
- hitscan shooting
- projectile support
- spread / shotgun-style attacks
- ammo counts
- cooldowns / fire rates
- weapon pickup unlocking
- weapon HUD icons
- muzzle flashes
- impact effects
- no-ammo feedback

## Starter Weapons

The first prototype must support:

- **Trim Shears** — melee fallback
- **pH Blaster** — starter pistol / hitscan weapon
- **Neem Cannon** — shotgun-style spread weapon

Later weapons to support:

- **CO2 Burst Rifle** — rapid-fire weapon
- **Terp Torch** — flame/projectile weapon
- **Rosin Railgun** — heavy precision weapon
- **Kief Grenades** — throwable explosive
- **Trichome Reaper** — super weapon

## Required Specials

The engine should support special abilities or temporary powerups.

Prototype special:

- **Trichome Burst** — short-range emergency shockwave that damages nearby enemies and consumes special charge.

Later specials:

- Grow Light Overdrive
- Dank Vision secret finder
- Terpene Rush speed boost
- Trichome Shield damage reduction

## Required Enemy Mechanics

The engine must support:

- billboard sprite enemies
- enemy idle state
- enemy movement state
- enemy attack state
- enemy pain/hit state
- enemy death state
- melee enemies
- ranged enemies
- simple line-of-sight or distance-based targeting
- enemy collision
- enemy damage to player
- enemy health bars
- enemy placement from level data
- enemy death rewards / score later

## Starter Enemies

The first prototype must support:

- **Spider Mite Swarm** — fast weak melee swarm
- **Powdery Mildew Ghoul** — slow medium close-range/spore enemy
- **Nute Burn Imp** — ranged toxic projectile enemy

## Required Pickup Mechanics

The engine must support:

- health pickups
- armor pickups
- ammo pickups
- weapon pickups
- keycards
- special-charge pickups
- secret collectibles later

Starter pickups:

- Cure Jar Health
- Kief Armor
- Light Ammo Box
- Heavy Ammo Box
- Green Keycard
- Purple Keycard
- Gold Keycard
- Grow Light Overdrive / Special Charge

## Required Level Mechanics

The engine must support:

- custom levels
- room/sector or grid layout
- textured walls or style-ready wall rendering
- textured floors and ceilings later
- doors
- locked doors
- keycard locks
- switches
- player spawn point
- enemy spawn points
- pickup placement
- level exit trigger
- secret rooms

## Required HUD / UI Mechanics

The engine must support:

- health display
- armor display
- ammo display
- current weapon display
- enemy health bars
- keycard indicators
- special charge display
- pickup notification
- damage feedback
- pause menu
- title screen
- death screen
- mission complete screen
- click-to-start overlay for browser audio/pointer-lock rules
- controls screen

## Required Asset Replacement System

The code must make reskinning easy.

Assets should be loaded from clear folders:

```text
assets/branding/
assets/ui/
assets/textures/walls/
assets/textures/floors/
assets/textures/ceilings/
assets/textures/decals/
assets/props/
assets/pickups/
assets/weapons/first_person/
assets/weapons/pickups/
assets/weapons/projectiles/
assets/weapons/icons/
assets/enemies/
assets/effects/
assets/audio/music/
assets/audio/sfx/
assets/story/
```

No important gameplay values should be hardcoded into image names when avoidable.

## Required Data Files

The game should be data-driven enough that Codex can modify it safely.

Recommended data files:

```text
data/enemies.json
data/weapons.json
data/pickups.json
data/levels.json
data/sounds.json
```

These should define stats, asset paths, animation states, sounds, and placement rules.

## Required Cannabis Parody Identity

The game must use original THC/Terpocalypse terms and assets:

- grow lab rooms
- mutated pests
- mold monsters
- nutrient hazards
- cure jars
- kief armor
- keycards
- seed vault objective
- THC / Teaching Healthy Cultivation branding
- Terpocalypse branding

This is the parody layer. It should replace sample content completely.

## Originality / IP Safety Requirements

The engine must not require or include:

- Doom WAD files
- Doom sprites
- Doom maps
- Doom music
- Doom sounds
- Doom logos
- Doom monster names
- Doom weapon names
- ripped commercial game assets

If open-source code is imported, license notes and attribution must be preserved.

## First Prototype Definition of Done

The first playable prototype is done when:

- game runs in browser
- no console errors
- title screen loads
- player can start the game
- player can move, strafe, turn, and collide with walls
- player can pick up pH Blaster
- player can shoot
- player can switch weapons
- enemy health bars display
- Spider Mite Swarm can attack and die
- Powdery Mildew Ghoul can attack and die
- Nute Burn Imp can fire a projectile and die
- Cure Jar Health works
- Kief Armor works
- ammo pickups work
- special charge works
- Trichome Burst special damages nearby enemies
- Green Keycard works
- Green Door opens only after keycard pickup
- player can reach exit chamber
- mission complete state appears
- all sample/demo names are replaced with Terpocalypse terms
- no copyrighted commercial shooter assets are present

## Recommended Codebase Approach

Use `benc-uk/doom-lite` as the preferred starting base or reference because it already aligns with the required retro browser FPS structure: JavaScript/WebGL, billboard sprites, custom JSON levels, texture mapping, collision, lighting, sprite animation, and pure HTML/JS modules.

If importing this code, preserve MIT license attribution and replace all sample identity and assets with original Terpocalypse assets.

Because forking was blocked during setup, the immediate fallback is an original no-dependency browser prototype inside `prototypes/web-fps/` that proves the required mechanics first. Later, we can still replace or merge with a stronger engine once the workflow is stable.
