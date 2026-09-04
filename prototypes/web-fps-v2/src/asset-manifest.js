export const ASSET_MANIFEST = Object.freeze({
  environment: Object.freeze({
    wallVegLab: asset("environment.wall.veg_lab", "assets/textures/veg-lab-wall.png", "#24482f"),
    wallContainment: asset("environment.wall.containment", "assets/textures/containment-wall.png", "#303b32"),
    doorRoute: asset("environment.door.route", "assets/textures/route-door.png", "#7cff5b"),
    floorVegLab: asset("environment.floor.veg_lab", "assets/textures/veg-lab-floor.png", "#101b13"),
    ceilingVegLab: asset("environment.ceiling.veg_lab", "assets/textures/veg-lab-ceiling.png", "#111513")
  }),
  enemies: Object.freeze({
    spiderMite: sprite("enemy.spider_mite", "assets/enemies/spider-mite.png", ["idle", "chase", "attack", "hit", "death"]),
    mildewGhoul: sprite("enemy.mildew_ghoul", "assets/enemies/mildew-ghoul.png", ["idle", "chase", "attack", "hit", "death"]),
    nuteBurnSprayer: sprite("enemy.nute_burn_sprayer", "assets/enemies/nute-burn-sprayer.png", ["idle", "chase", "attack", "hit", "death"])
  }),
  weapons: Object.freeze({
    trimShears: sprite("weapon.trim_shears", "assets/weapons/trim-shears.png", ["idle", "use"]),
    phBlaster: sprite("weapon.ph_blaster", "assets/weapons/ph-blaster.png", ["idle", "fire"]),
    neemCannon: sprite("weapon.neem_cannon", "assets/weapons/neem-cannon.png", ["idle", "fire"])
  })
});

export function getAsset(key) {
  for (const group of Object.values(ASSET_MANIFEST)) {
    for (const entry of Object.values(group)) if (entry.key === key) return entry;
  }
  return null;
}

export function listAssetEntries() {
  return Object.values(ASSET_MANIFEST).flatMap((group) => Object.values(group));
}

function asset(key, src, fallback) {
  return Object.freeze({ key, src, fallback });
}

function sprite(key, src, states) {
  return Object.freeze({ key, src, states: Object.freeze([...states]), fallback: "procedural" });
}
