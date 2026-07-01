# Terpocalypse — Local Development Commands

Run these commands from `prototypes/web-fps/`.

## Start Local Static Server

```bash
python3 -m http.server 5173
```

Windows fallback:

```bash
python -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Validate Game Data

```bash
node tools/validate-game-data.mjs
```

This checks map shape, boundaries, entity placement, weapon data, and enemy data.

## Audit Project Files

```bash
node tools/project-audit.mjs
```

This checks that required prototype files exist and scans for forbidden commercial-shooter terms.

## Manual Browser QA

After launching the local server:

1. Click Start Prototype.
2. Confirm pointer lock works.
3. Move with WASD.
4. Shoot with click or Space.
5. Pick up pH Blaster.
6. Pick up Neem Cannon.
7. Clear all three enemy types.
8. Pick up Cure Jar Health.
9. Pick up Kief Armor.
10. Pick up green keycard.
11. Open green door with E.
12. Use Trichome Burst with Q.
13. Reach the exit chamber.
14. Confirm mission complete screen appears.
15. Confirm there are no console errors.

## Current Known Limitation

The prototype still uses code-drawn placeholder visuals. Missing final art should not block code testing.
