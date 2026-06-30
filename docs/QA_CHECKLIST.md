# Terpocalypse — QA Checklist

Use this checklist before calling any prototype pass complete.

## Repository Health

- [ ] README explains what the project is.
- [ ] Repo structure is organized.
- [ ] No random loose assets in root.
- [ ] Placeholder files are clearly named.
- [ ] External code licenses are documented.
- [ ] No copyrighted commercial game assets are present.

## IP / Asset Safety

- [ ] No Doom sprites.
- [ ] No Doom maps.
- [ ] No Doom music.
- [ ] No Doom sound effects.
- [ ] No Doom WAD data.
- [ ] No commercial ripped assets.
- [ ] No copied logos or title treatments.
- [ ] Asset sources are recorded when not original.

## Browser Prototype

- [ ] Game launches in browser.
- [ ] No console errors on load.
- [ ] Player can start game from title screen.
- [ ] Pointer lock works.
- [ ] WASD movement works.
- [ ] Mouse look works.
- [ ] Shooting works.
- [ ] Collision prevents walking through walls.
- [ ] HUD updates correctly.
- [ ] Restart works.

## Level 01 — The Veg Lab

- [ ] Player spawns correctly.
- [ ] Level is navigable.
- [ ] Lighting/readability is acceptable.
- [ ] Green keycard can be picked up.
- [ ] Green door requires keycard.
- [ ] Secret room exists.
- [ ] Exit condition works.

## Combat

- [ ] At least one enemy spawns.
- [ ] Enemy can damage player.
- [ ] Player can damage enemy.
- [ ] Enemy can die.
- [ ] Player can die.
- [ ] Death state is clear.

## Pickups

- [ ] Cure Jar Health increases health.
- [ ] Kief Armor increases armor.
- [ ] Ammo box increases ammo.
- [ ] Keycard updates HUD.

## Performance

- [ ] Game runs smoothly on desktop browser.
- [ ] Asset file sizes are reasonable.
- [ ] No runaway memory/CPU usage.
- [ ] No repeated console warnings.

## Build / Deployment

- [ ] Local run instructions work.
- [ ] Build command works if applicable.
- [ ] Output can be hosted statically or integrated into game hub.
- [ ] No absolute local paths.
- [ ] No secret keys or private tokens committed.

## Approval Passes

- [ ] Pass 1 — functionally playable.
- [ ] Pass 2 — IP/asset safe.
- [ ] Pass 3 — ready for THC/DTF game hub integration.
