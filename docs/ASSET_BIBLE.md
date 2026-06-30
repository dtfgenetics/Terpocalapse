# Terpocalypse — Asset Bible

## Asset Direction

The art direction is a gritty 1990s-inspired retro FPS with cannabis grow-room horror comedy. Assets should feel pixel-heavy, chunky, readable, and game-ready.

Avoid polished modern realism. Avoid copying any commercial shooter assets. The look should be original: industrial grow lab, mold, pests, resin, amber lighting, toxic green UI, bunker walls, and over-the-top cannabis parody worldbuilding.

## First Locked Vertical-Slice Asset List

### Branding

1. Terpocalypse logo
2. Title screen background
3. THC / Teaching Healthy Cultivation badge

### UI / HUD

4. HUD frame
5. Health icon
6. Armor icon
7. Ammo icon
8. Green keycard icon
9. Purple keycard icon
10. Gold keycard icon
11. Crosshair
12. Pause menu panel
13. Death screen panel
14. Mission complete panel

### Pickups

15. Cure Jar Health pickup
16. Kief Armor pickup
17. Light ammo box
18. Heavy ammo box
19. Green keycard pickup
20. Purple keycard pickup
21. Gold keycard pickup

### Weapons

22. Trim Shears first-person sprite
23. Trim Shears pickup sprite
24. pH Blaster first-person sprite
25. pH Blaster pickup sprite
26. Neem Cannon first-person sprite
27. Neem Cannon pickup sprite
28. pH projectile / bullet impact FX
29. Neem Cannon muzzle flash

### Enemies

30. Spider Mite Swarm concept
31. Spider Mite Swarm idle frames
32. Spider Mite Swarm attack frames
33. Spider Mite Swarm death frames
34. Powdery Mildew Ghoul concept
35. Powdery Mildew Ghoul idle frames
36. Powdery Mildew Ghoul attack frames
37. Powdery Mildew Ghoul death frames
38. Nute Burn Imp concept
39. Nute Burn Imp idle frames
40. Nute Burn Imp attack frames
41. Nute Burn Imp projectile
42. Nute Burn Imp death frames

### Environment — Level 01: The Veg Lab

43. Veg Lab wall texture A — clean grow wall
44. Veg Lab wall texture B — dirty grow wall
45. Veg Lab wall texture C — mylar wall
46. Veg Lab wall texture D — warning panel
47. Veg Lab floor texture A — concrete
48. Veg Lab floor texture B — wet concrete
49. Veg Lab floor texture C — soil spill floor
50. Veg Lab ceiling texture A — industrial ceiling
51. Veg Lab ceiling texture B — grow light ceiling

### Props

52. Grow light prop
53. Nutrient tank prop
54. Oscillating fan prop
55. Clone tray prop
56. Irrigation pipe prop
57. Cure jar shelf prop
58. Warning sign decal
59. Keycard reader panel
60. Lab crate

### Effects

61. Muzzle flash
62. Bullet impact
63. Toxic splash
64. Mold burst
65. Smoke puff
66. Door open effect
67. Pickup sparkle

### Audio Placeholders

68. Title music placeholder note
69. Level action loop placeholder note
70. Weapon fire placeholder notes
71. Enemy alert placeholder notes
72. Door / switch placeholder notes

## File Naming Rules

Use lowercase, descriptive, hyphenated filenames.

Examples:

```text
terpocalypse-logo-main.png
hud-frame-v01.png
green-keycard-pickup-v01.png
spider-mite-swarm-idle-01.png
veg-lab-wall-mylar-v01.png
```

## Asset Versioning Rules

- Use `v01`, `v02`, `v03` for iterative exports.
- Do not overwrite approved files unless replacing with a final locked version.
- Keep source files separate when possible.
- Add notes when an asset is approved, rejected, or needs revision.

## Sprite Rules

- Enemies should have strong silhouettes.
- Enemy colors must be readable against green/bunker backgrounds.
- First-person weapons should sit at the bottom center or bottom right depending on engine needs.
- Weapon sprites must leave room for HUD at the bottom.
- Pickups should be visually simple and readable at small size.

## Texture Rules

- Wall/floor/ceiling textures should be tileable when possible.
- Avoid text that becomes unreadable at game scale.
- Use decals for signs instead of baking too much text into walls.
- Keep high-contrast variants for dark areas.

## UI Rules

- HUD must be readable on mobile-sized browser windows if the game hub needs it later.
- Use short labels: HP, ARM, AMMO, KEYS.
- Keep THC/DTF branding subtle during gameplay and stronger on menus/title screens.

## Approval Status Legend

- `PLANNED` — needed but not created
- `DRAFT` — created but not approved
- `APPROVED` — locked for prototype
- `REPLACE` — exists but needs redo
- `FINAL` — production ready
