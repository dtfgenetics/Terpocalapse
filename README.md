# Terpocalypse: Grow Room From Hell

Original cannabis-themed retro browser FPS for the THC / DTF game hub.

> Repo name: `Terpocalapse`  
> Public game title: **Terpocalypse: Grow Room From Hell**

## Status

**Level 01 — The Veg Lab is now a playable browser vertical-slice release candidate.**

The current implementation is an original, no-dependency Canvas2D ray-caster. It does not use Doom code, names, logos, sprites, maps, music, sound effects, WAD data, commercial shooter assets, or copied UI treatments.

The release-candidate runtime lives in `prototypes/web-fps/` and is validated by repository CI before promotion.

## The Veg Lab gameplay

The current slice includes:

- Title / mission screen
- Retro first-person ray-cast renderer
- Desktop pointer-lock aiming
- Keyboard movement and weapon controls
- Touch movement, turning, firing, interaction, special, and weapon controls
- Three weapons:
  - Trim Shears
  - pH Blaster
  - Neem Cannon
- Three enemy archetypes:
  - Spider Mite Swarm
  - Powdery Mildew Ghoul
  - Nute Burn Imp
- Melee and ranged enemy attacks
- Player health and armor
- Light and heavy ammo
- Weapon pickups
- Cure Jar health pickup
- Kief Armor pickup
- Grow Light Overdrive special pickup
- Green keycard objective
- Locked quarantine door
- Trichome Burst special ability
- Mission objective tracker
- Required threat-clear before extraction
- Run timer, kills, accuracy, pickup count, score bonuses, and best-run storage
- Pause, restart, death, and mission-complete states
- Game Hub event hooks
- Mobile-safe HUD layout

## Mission sequence

1. Recover the green keycard.
2. Unlock the quarantine door.
3. Clear every grow-room threat.
4. Reach the extraction chamber.

The exit does not complete the level until the required objectives are satisfied.

## Local development

```bash
cd prototypes/web-fps
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Verification

From `prototypes/web-fps/`:

```bash
npm run verify
```

The repository CI additionally installs Chromium and runs the browser smoke test. That test starts the game, verifies the mission/runtime state, completes the controlled QA path, checks the run summary, checks browser console/page errors, and performs a 390×844 touch/mobile overflow pass.

## Controls

```text
WASD          Move / strafe
Mouse         Turn / look
Click         Shoot
Space         Shoot
1 / 2 / 3     Switch unlocked weapons
E             Interact / use door / extraction
Q             Trichome Burst special
Esc           Pause / resume
R             Restart run
Shift         Sprint
```

Touch controls are shown automatically on coarse-pointer devices.

## Asset status

The gameplay slice is functional with code-drawn prototype visuals. Final production art/audio remains a separate release gate. The asset registry and art directories are intentionally preserved so approved original assets can replace placeholders without rewriting the simulation.

## Core rule

This project must remain original. Do not introduce Doom assets/data or unlicensed commercial game material. See `docs/NO_DOOM_IP_RULES.md` and `docs/LICENSING_NOTES.md` before adding external code or media.

## Next release gates

- Pass the Veg Lab CI/browser playthrough on the readiness PR.
- Replace code-drawn enemies/weapons/pickups with approved original art in controlled batches.
- Add original audio with documented licensing/provenance.
- Package the standalone build into the DTFSeeds `/games/terpocalypse/` production route.
- Run production browser/mobile verification after deployment.
