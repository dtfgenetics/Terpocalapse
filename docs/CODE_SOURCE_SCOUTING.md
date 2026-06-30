# Terpocalypse — Code Source Scouting

This document tracks candidate open-source FPS projects that may be used as references or technical bases for Terpocalypse.

## Scouting Goal

Find code that can support an original cannabis-themed first-person shooter with minimal engine reinvention.

Priority requirements:

- browser playable
- simple enough for rapid reskinning
- permissive license preferred
- supports first-person movement
- supports enemies / sprites / weapons / pickups / doors
- assets must be replaceable
- no Doom WAD dependency
- no commercial shooter assets

## Current Best Candidate

### 1. benc-uk/doom-lite

Repository: https://github.com/benc-uk/doom-lite

Status: BEST CURRENT BASE

Why it fits:

- JavaScript + WebGL
- retro FPS style
- not an implementation of original Doom engine
- polygon-based 3D world
- billboard sprites for monsters/items
- custom JSON levels
- texture mapping
- sectors with different floor/ceiling heights
- collision detection
- lights and colored lighting
- sprite animation
- pure HTML/JS ES6 modules
- MIT license listed

How to use it:

- Use as the main prototype foundation or study base.
- Replace all graphics, terms, textures, levels, and sounds with original Terpocalypse assets.
- Keep license attribution if code is copied.
- Build our own `The Veg Lab` level from the Terpocalypse level scaffold.

Risk:

- Smaller repo/community.
- We must audit included libraries and asset sources before importing.

Verdict:

Use this first unless testing reveals a blocker.

## Strong Reference Candidates

### 2. phoboslab/q1k3

Repository: https://github.com/phoboslab/q1k3

Status: HIGH-VALUE REFERENCE, NOT FIRST BASE

Why it matters:

- tiny browser FPS
- 2 levels
- 5 enemy types
- 3 weapons
- 30 textures
- dynamic lighting
- doors
- collision detection
- enemy AI with line-of-sight checks
- spatial audio
- maps built with TrenchBroom
- MIT license listed

How to use it:

- Study enemy AI, weapon switching, doors, map building, and compact browser performance.
- Do not blindly import the compressed build pipeline unless we want extra complexity.

Risk:

- Built for js13k constraints, so code may be dense or optimized for size instead of easy editing.
- Uses extra tooling including map compiler and sound/music libraries.

Verdict:

Use as a reference, not the first codebase.

### 3. ThanosRestas/Theasis

Repository: https://github.com/ThanosRestas/Theasis

Status: MODERN WEB FPS REFERENCE

Why it matters:

- Browser FPS using BabylonJS
- 5 weapons
- 4 animated enemies
- consumables
- sprinting
- ammo packs
- HUD
- enemy health bars
- MIT license listed

How to use it:

- Study HUD, enemy health bars, consumables, weapon switching, and BabylonJS project structure.

Risk:

- Uses 3D model/animation workflow, which may not match the retro 2.5D pixel sprite direction.
- Assets were provided by Quaternius; asset licensing and attribution must be checked if reused.

Verdict:

Useful reference, but probably too modern for the first Terpocalypse pass.

### 4. Footprintarts/ThreeJS_FPS_2.0

Repository: https://github.com/Footprintarts/ThreeJS_FPS_2.0

Status: CONTROLS / FPS RIG REFERENCE

Why it matters:

- modular Three.js FPS template
- MIT license listed
- movement
- mouse look / pointer lock
- shooting mechanics
- sound and music integration
- GLTF loading
- Octree collision

How to use it:

- Study pointer-lock controls, sound hooks, camera rig, and modular Three.js structure.

Risk:

- It is more of a modern 3D FPS rig than a retro shooter game.
- Its credited FPS model uses CC-BY via Poly Pizza; keep attribution or replace.

Verdict:

Use for controls/audio reference only.

## General Engine Options

### Three.js

Useful if we build a custom web FPS from scratch or adapt a template.

Pros:

- MIT licensed
- common browser 3D library
- huge ecosystem
- good for WebGL browser deployment

Cons:

- We still need to build gameplay systems.

### Babylon.js

Useful if we want a more complete 3D game framework.

Pros:

- Apache 2.0 licensed
- full-featured browser 3D engine
- strong scene/material/audio/tooling support

Cons:

- Heavier than needed for a retro sprite-based shooter.

## Recommendation

Use this stack for the first playable prototype:

1. Primary base/reference: `benc-uk/doom-lite`
2. Enemy/weapon/door reference: `phoboslab/q1k3`
3. HUD/consumable reference: `ThanosRestas/Theasis`
4. Controls/audio reference: `Footprintarts/ThreeJS_FPS_2.0`

## Import Rules

Before importing external code:

- verify the repository license file
- add license notes to `docs/LICENSING_NOTES.md`
- preserve attribution
- remove or replace all original sample assets
- do not import Doom WAD data or copied commercial content

## Next Technical Step

Create a branch or prototype folder that tests `doom-lite` as the base/reference, then replace its identity with Terpocalypse placeholder assets and build `Level 01 — The Veg Lab`.
