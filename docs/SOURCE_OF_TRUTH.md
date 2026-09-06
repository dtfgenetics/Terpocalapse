# Terpocalypse: Grow Room From Hell — Source of Truth

`dtfgenetics/Terpocalapse` is the canonical code, game-design, and machine-readable production repository for Terpocalypse: Grow Room From Hell.

Google Drive `04 Games/Terpocalapse` is canonical for approved human-readable design masters, original artwork/source assets, playtest evidence, proofs, and release packages.

## Current controlled state

Status: **playable browser vertical slice in active development**.

The stable playable Level 01 — **The Veg Lab** implementation is:

```text
prototypes/web-fps/
```

That source currently supplies the verified DTFSeeds Terpocalypse integration. Future production gameplay repairs must be made and validated here first, then synchronized into the DTFSeeds public suite.

A second implementation exists at:

```text
prototypes/web-fps-v2/
```

V2 is an experimental next-generation architecture. Its own `CONTENT_STATUS.md` states that V1 remains the stable playable prototype until V2 matches or exceeds every V1 gameplay feature. **Do not switch production ownership to V2 or patch V2 as the live master until that parity gate is explicitly satisfied.**

## Current playable slice

The stable browser slice includes the current Veg Lab game loop and is expected to preserve:

- title/start flow;
- browser-ready Canvas FPS/raycaster presentation;
- keyboard/mouse and touch controls;
- player movement and shooting;
- Trim Shears, pH Blaster, and Neem Cannon;
- Spider Mite Swarm, Powdery Mildew Ghoul, and Nute Burn Imp threats;
- health, armor, ammo, keycard, and special pickups;
- locked-door/keycard progression;
- score and local best-score behavior;
- mission-complete and death states;
- pause/visibility handling;
- no release-blocking console/runtime errors.

This is a vertical slice, **not a finished full campaign**. Campaign expansion, final original art/audio, broader level content, balance, accessibility, and human playtesting remain active production work.

## DTFSeeds integration contract

Public route:

```text
https://dtfseeds.com/games/terpocalypse/
```

The DTFSeeds integration snapshot lives in `dtfgenetics/Thc` under:

```text
site/public-route-patch/games/terpocalypse/
```

That integration directory is a delivery snapshot, not the canonical gameplay owner. Never fix a gameplay defect only in the DTFSeeds snapshot if the same repair belongs in this repository.

## IP rule

The project is an original cannabis-themed retro browser FPS. Do not use Doom names, logos, sprites, maps, music, sound effects, WAD data, commercial shooter assets, copied interface/font treatments, or other protected game identity elements.

The visual direction may reference the broad language of old-school shooters, but the product must remain recognizably original Terpocalypse / DTF work.

## Release

A Terpocalypse release requires:

1. repair in the canonical stable source;
2. source-level syntax/runtime/static validation;
3. controls, HUD, weapons, enemies, pickups, doors, objective, win/lose, pause, and mobile/touch verification;
4. original/approved asset and licensing review;
5. exact-source synchronization into `dtfgenetics/Thc`;
6. DTFSeeds public-suite validation;
7. production deployment containing the intended canonical source revision;
8. exact live-route and essential-asset verification;
9. browser gameplay testing as a separate final evidence level.

Do not describe the full Terpocalypse project as finished merely because the current Veg Lab vertical slice is playable.
