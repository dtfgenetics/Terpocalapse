# Terpocalypse — Engine Selection

## Current Decision

Use the current static browser prototype as the immediate foundation.

Reason:

- It already runs as plain website code.
- It needs no backend.
- It fits dtfseeds.com / THC game hub hosting.
- It proves movement, combat, enemies, pickups, keycards, and win state.
- It avoids copied assets and licensing mistakes while the game identity is still being built.

## Current Engine Type

- Static HTML/CSS/JavaScript
- Canvas renderer
- Raycaster-style retro first-person view
- Code-drawn placeholder visuals
- Data-driven starter map, weapons, enemies, and pickups

## Upgrade Candidates

### 1. doom-lite

Best use: closer retro FPS engine reference or future import.

Why it matters:

- JavaScript/WebGL
- custom JSON levels
- billboard sprites
- collision
- texture mapping
- lighting
- browser friendly

Risk:

- Needs license attribution and code audit before import.
- Forking was blocked during setup.
- We should not import blindly.

### 2. Three.js

Best use: future polished 3D browser version.

Why it matters:

- MIT licensed
- WebGL browser library
- good for PointerLockControls, sprites, particles, post-processing, and better 3D spaces

Risk:

- More architecture work needed.
- It is a rendering library, not a complete game engine.

### 3. Babylon.js

Best use: larger professional browser game if we want full 3D, scene tools, physics, GUI, and WebXR later.

Why it matters:

- Apache 2.0 licensed
- full browser 3D engine
- strong tooling

Risk:

- Heavier than needed for the first version.
- More project structure complexity.

## Recommended Path

### Phase 1

Improve the current static prototype until the full loop is fun.

### Phase 2

Replace code-drawn visuals with real Terpocalypse assets.

### Phase 3

Refactor into modules and level loader.

### Phase 4

Only then decide whether to:

- keep the current custom raycaster,
- import/adapt doom-lite,
- upgrade to Three.js,
- or upgrade to Babylon.js.

## Professional Rule

Do not switch engines until the gameplay loop is proven. Engine switching too early creates drift and delays asset creation.
