# Terpocalypse — Map Format

## Purpose

This document defines the current prototype map format so Codex and future developers can add levels without breaking the game.

## Current Format

The prototype currently uses an ASCII tile map exported from `prototypes/web-fps/src/game-data.js`.

Each character represents one tile. One tile equals `TILE`, currently 64 world units.

## Tile Legend

| Character | Meaning | Blocks Movement | Notes |
|---|---:|---:|---|
| `#` | Solid wall | Yes | Main wall/collision tile |
| `.` | Open floor | No | Normal walkable floor |
| `D` | Green locked door | Yes until unlocked | Opens after green keycard interaction |
| `X` | Exit chamber / exit trigger | No | Touching this tile completes the level |
| `P` | Planning marker / player-related marker | No | Currently not parsed as spawn; player start is separate data |
| `A` | Planning marker / armor-related marker | No | Currently not parsed; pickup data is separate |
| `H` | Planning marker / health-related marker | No | Currently not parsed; pickup data is separate |
| `K` | Planning marker / key-related marker | No | Currently not parsed; pickup data is separate |
| `S` | Planning marker / special-related marker | No | Currently not parsed; pickup data is separate |
| `N` | Planning marker / Neem-related marker | No | Currently not parsed; pickup data is separate |

## Important Current Limitation

The current map contains marker letters, but the actual player, pickup, and enemy locations are defined separately in JS objects.

This is intentional for now, but it means map markers are currently only visual/planning helpers unless future code parses them.

## Required Map Rules

1. Every row must be the same length.
2. The outer boundary must be solid wall `#`.
3. Player spawn cannot be inside a blocked tile.
4. Enemy spawns cannot be inside blocked tiles.
5. Pickups cannot be inside blocked tiles.
6. Door tiles should not be used as spawn locations.
7. Exit tile `X` must be reachable from player spawn.
8. Locked doors must have a corresponding keycard somewhere reachable before the door.

## Future Better Format

The current ASCII map is fine for a prototype, but the professional version should move toward a richer JSON level format:

```json
{
  "id": "level_01_the_veg_lab",
  "title": "The Veg Lab",
  "tileSize": 64,
  "map": ["################", "#..............#"],
  "playerStart": { "x": 2.4, "y": 2.5, "angle": 0 },
  "doors": [
    { "id": "green_door_01", "tile": [7, 4], "requiresKey": "green", "state": "locked" }
  ],
  "pickups": [],
  "enemies": [],
  "secrets": [],
  "exit": { "tile": [13, 9] }
}
```

## Next Code Task

Build a level loader that converts the existing `levels/level_01_the_veg_lab/level.json` into active runtime game data. That will let the asset bible, level design docs, and code use the same source of truth.
