# Terpocalypse Blender game-asset pipeline

Terpocalypse remains a browser-first game. Blender is the canonical DCC for authored 3D models and animation, while browser runtime assets ship as optimized GLB/glTF. Unreal Engine or Unity should be introduced only if a specific runtime requirement justifies moving away from the browser-first vertical slice.

## Current vertical-slice target

Level 01: **The Veg Lab**.

First animation target: **Spider Mite Swarm / Veg Lab mite**. The initial generator at `tools/blender/generate_veg_lab_enemy.py` creates a deliberately simple, original placeholder asset with stable names and four animation clips:

- `Idle`
- `Scuttle`
- `Hit`
- `Death`

The generated asset is a pipeline proof, not approved final art.

## Blender authoring contract

- Metric units; 1 Blender meter = 1 runtime meter.
- Gameplay pivot at ground center.
- Positive Z is up in Blender. Export through glTF with Y-up conversion enabled.
- Stable object names. Runtime code must not depend on Blender-generated `.001` names.
- Apply mesh scale before final export.
- Prefer a single reusable material atlas per enemy family where practical.
- Keep collision meshes separate and named `COL_<asset>`.
- Animation names are API contracts. Renaming a clip requires updating the runtime asset manifest and tests.
- Source `.blend` files are authoring artifacts; runtime uses optimized `.glb`.

## Export contract

Raw export:

```bash
blender --background --python tools/blender/generate_veg_lab_enemy.py
```

Expected raw outputs:

```text
build/blender/veg-lab-mite.blend
build/blender/veg-lab-mite.glb
```

Before production shipping, run the GLB through the repository's optimization step (Meshopt/glTF Transform when available), inspect texture size and animation names, and place only the optimized runtime asset in the public build.

## Runtime integration stages

1. Keep current code-drawn enemy rendering as the fallback while GLB integration is developed.
2. Add an asset manifest with stable keys rather than hard-coded filenames.
3. Load the GLB asynchronously and keep gameplay simulation independent of the renderer.
4. Map simulation states to animation clips (`idle`, `chase`, `pain`, `dead`).
5. Verify no animation or asset-loading stall breaks the existing Level 01 win condition.
6. Retain mobile controls and a low-cost fallback renderer until 3D performance is measured on real mobile hardware.

## Performance budget for the first enemy

Initial target, to be tightened after visual approval:

- <= 10k triangles for a single hero enemy asset; swarm variants should be materially lower.
- <= 2 x 1024 textures or equivalent compressed atlas for the enemy family.
- <= 4 skinned/animated materials per enemy; target 1-2.
- Four required clips: Idle, Scuttle, Hit, Death.
- No missing textures, duplicate materials, unapplied scale, or accidental high-poly modifiers in the shipping GLB.

## Unreal / Unity policy

Do not port the prototype simply because those engines are available. A port becomes justified when the game requires features the browser-first implementation cannot meet within its performance and delivery targets (for example: significantly larger authored 3D environments, advanced skeletal/VFX requirements, or a downloadable build target). If that threshold is reached, Blender assets remain source assets and the game simulation/design contract must be migrated deliberately rather than rewritten ad hoc.
