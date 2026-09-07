# Terpocalypse Engine Reference Notes

These references are for architecture, rendering concepts, and performance patterns. Terpocalypse must keep its own original cannabis-horror world, art, audio, names, maps, UI, and gameplay presentation.

## Reference projects

### ZeroDayArcade / HTML5_Raycaster

- Repository: https://github.com/ZeroDayArcade/HTML5_Raycaster
- License: MIT
- Useful concepts: browser Canvas raycasting, vector-based camera math, wall projection, sprite/item projection, first-person weapon overlays.
- Rule for this project: study concepts and reimplement them within Terpocalypse modules; do not import third-party game sprites or tribute assets.

### sysprog21 / raycaster

- Repository: https://github.com/sysprog21/raycaster
- License: MIT
- Useful concepts: lean first-hit ray traversal, explicit renderer separation, performance-minded raycasting implementation.
- Rule for this project: use as an algorithm/performance reference only; Terpocalypse remains browser-native JavaScript.

### maxsun / rayCastJS

- Repository: https://github.com/maxsun/rayCastJS
- Useful concepts: first-hit raycasting, wall collision, Canvas-based 2.5D scene construction, avoiding work proportional to every wall block.
- Rule for this project: use the documented performance lessons as reference; do not copy repository assets or code without verifying licensing first.

## Patterns adopted in Terpocalypse V2

- DDA-style grid traversal for wall rays instead of fixed-distance stepping.
- First blocking wall/door terminates each ray.
- Per-column camera-depth buffer returned by the wall renderer.
- Enemy and pickup projections compare camera depth against the wall depth buffer before drawing.
- Distance and wall-side shading remain renderer-owned presentation details.
- First-person weapon art is rendered as an overlay after the world view.
- Enemy/pickup art is original procedural placeholder art until final DTF-created sprites are approved.
- Keyboard and touch inputs converge into the same gameplay actions.
- Menus and accessibility-sensitive controls remain DOM UI; the Canvas remains the playfield.

## Next rendering targets

1. Texture manifest for original wall, floor, ceiling, door and prop art.
2. Texture-coordinate calculation from DDA wall-hit position.
3. Sprite-sheet manifest and animation state for original enemies.
4. Multi-column sprite clipping instead of center-point occlusion for large sprites near wall edges.
5. Weapon bob/recoil and hit-confirm feedback driven by game state, not renderer-owned gameplay rules.
6. Performance counters behind a debug setting.
7. Phone-landscape playtest and input-zone tuning.

## IP boundary

Do not use Doom/Wolfenstein names, logos, sprites, maps, music, sound effects, WAD/IWAD/PWAD data, copied UI treatments, or commercial shooter assets. Genre conventions and raycasting techniques are acceptable; Terpocalypse content must remain original.
