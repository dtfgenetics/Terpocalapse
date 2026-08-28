# Terpocalypse: Grow Room From Hell

Original cannabis-themed retro browser FPS for the THC / DTF game hub.

> Repo name: `Terpocalapse`  
> Public game title: **Terpocalypse: Grow Room From Hell**

## Status

**Playable browser vertical slice in active development.**

The repository now contains two browser prototypes. `prototypes/web-fps/` is the earlier playable proof, while `prototypes/web-fps-v2/` is the modular successor being hardened for DTFSeeds integration. V2 already contains player movement, a rendered game canvas, data-driven level loading, pickups, threats, tools, route access, story panels, scoring, campaign memory, settings, sound cues, objectives, and an end state.

The next release goal is to make V2 the canonical website build after its gameplay, QA, mobile controls, presentation, and content match or exceed the earlier prototype.

## Core Rule

This project must be original. Do not use Doom names, Doom logos, Doom sprites, Doom maps, Doom music, Doom sound effects, Doom WAD data, commercial shooter assets, or copied UI/font treatments from copyrighted games.

The goal is a cannabis-themed retro FPS inspired by old-school shooter design, not a clone of any commercial game.

## Current Vertical Slice

**Level 01 — The Veg Lab**

Implemented or represented in the current browser prototype:

- title/menu flow;
- retro HUD/canvas rendering;
- player movement and pointer look;
- tool/weapon switching and attacks;
- multiple grow-room threats;
- health, armor/ammo and route-access pickups;
- doors and route-access state;
- mission progression and story panels;
- scoring and campaign-memory hooks;
- win/end state;
- browser-local settings and audio cues;
- automated runtime syntax and gameplay-system tests.

## Repository Structure

```text
assets/                Original/approved asset production

docs/                  Game bible, IP rules, requirements and deployment controls

levels/                 Canonical level plans and notes

prototypes/web-fps/     Earlier playable prototype

prototypes/web-fps-v2/  Modular browser vertical slice under active development
```

## Local Development

V2 has no build step and runs as a static ES-module browser game. Serve the repository over HTTP, then open `prototypes/web-fps-v2/`.

Automated verification uses Node 22:

```bash
cd prototypes/web-fps-v2
npm run check
npm test
```

## Asset Workflow

- Create assets in small approved batches.
- Keep source files and final export files separated when possible.
- Prefer original pixel-style PNG/WebP assets for sprites and UI.
- Prefer seamless texture files for walls, floors, ceilings, and decals.
- Keep filenames lowercase, descriptive, and hyphenated.
- Do not overwrite approved assets without creating a versioned replacement.

## Build Philosophy

Keep the game simple, playable, expandable, and self-hostable. Improve the tested vertical slice in place rather than repeatedly starting new prototypes. Final DTFSeeds promotion should happen only after the canonical V2 source passes gameplay, accessibility/mobile, asset-rights, and deployment checks.
