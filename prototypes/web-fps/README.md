# Web FPS Prototype

This folder contains the first playable browser prototype for **Terpocalypse: Grow Room From Hell**.

## Current Status

Implemented as an original no-dependency static browser prototype. It is not a Doom fork and does not include Doom assets, WAD data, sprites, maps, music, or sounds.

The goal of this pass is to prove the core gameplay systems before moving into a heavier engine or importing an open-source engine base.

## Included Systems

- Static website-ready HTML/CSS/JS
- Canvas-based retro raycaster-style rendering
- First-person movement
- Mouse look / pointer lock
- Wall and door collision
- Shooting mechanics
- Weapon switching
- Three starter weapons:
  - Trim Shears
  - pH Blaster
  - Neem Cannon
- Three enemy archetypes:
  - Spider Mite Swarm
  - Powdery Mildew Ghoul
  - Nute Burn Imp
- Enemy health bars
- Melee enemy attacks
- Ranged enemy projectile attacks
- Player health and armor
- Ammo pickups
- Weapon pickups
- Green keycard pickup
- Locked green keycard door
- Special ability:
  - Trichome Burst
- Pickup notifications
- HUD
- Death state
- Mission complete state
- Level 01: The Veg Lab

## Run Locally

From this folder:

```bash
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

On Windows where `python3` is unavailable:

```bash
python -m http.server 5173
```

## Controls

```text
WASD          Move / strafe
Mouse         Turn / look
Click         Shoot
Space         Shoot
1             Trim Shears
2             pH Blaster, after pickup
3             Neem Cannon, after pickup
E             Interact / use door
Q             Trichome Burst special
Esc           Pause
Enter         Restart after win/death
Shift         Sprint
```

## Important

This is a prototype foundation. The current enemies, pickups, weapons, and walls are rendered through code placeholders, not final art. Next steps should replace code-drawn visuals with assets from the `assets/` folder.

Before importing any external code, update `docs/LICENSING_NOTES.md` with the source repository and license.
