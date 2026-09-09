export const ASSET_MANIFEST = Object.freeze({
  environment: Object.freeze({
    wallVegLab: asset("environment.wall.veg_lab", "assets/textures/veg-lab-wall.png", "#24482f"),
    wallContainment: asset("environment.wall.containment", "assets/textures/containment-wall.png", "#303b32"),
    doorRoute: asset("environment.door.route", "assets/textures/route-door.png", "#7cff5b"),
    floorVegLab: asset("environment.floor.veg_lab", "assets/textures/veg-lab-floor.png", "#101b13"),
    ceilingVegLab: asset("environment.ceiling.veg_lab", "assets/textures/veg-lab-ceiling.png", "#111513")
  }),
  pickups: Object.freeze({
    health: sprite("pickup.cure_jar_health", "assets/pickups/cure-jar-health.png", ["idle"]),
    armor: sprite("pickup.kief_armor", "assets/pickups/kief-armor.png", ["idle"]),
    lightAmmo: sprite("pickup.light_ammo_box", "assets/pickups/light-ammo-box.png", ["idle"]),
    heavyAmmo: sprite("pickup.heavy_ammo_box", "assets/pickups/heavy-ammo-box.png", ["idle"]),
    fuelAmmo: sprite("pickup.fuel_ammo_can", "assets/pickups/fuel-ammo-can.png", ["idle"]),
    grenadeAmmo: sprite("pickup.grenade_ammo_cache", "assets/pickups/grenade-ammo-cache.png", ["idle"]),
    greenKey: sprite("pickup.green_keycard", "assets/pickups/green-keycard.png", ["idle"]),
    purpleKey: sprite("pickup.purple_keycard", "assets/pickups/purple-keycard.png", ["idle"]),
    goldKey: sprite("pickup.gold_keycard", "assets/pickups/gold-keycard.png", ["idle"]),
    special: sprite("pickup.grow_light_overdrive", "assets/pickups/grow-light-overdrive.png", ["idle"]),
    rareSeed: sprite("pickup.rare_seed_pack", "assets/pickups/rare-seed-pack.png", ["idle"]),
    goldenNug: sprite("pickup.golden_nug", "assets/pickups/golden-nug.png", ["idle"]),
    loreNote: sprite("pickup.lore_note", "assets/pickups/lore-note.png", ["idle"])
  }),
  enemies: Object.freeze({
    spiderMite: sprite("enemy.spider_mite", "assets/enemies/spider-mite.png", ["idle", "chase", "attack", "hit", "death"]),
    mildewGhoul: sprite("enemy.mildew_ghoul", "assets/enemies/mildew-ghoul.png", ["idle", "chase", "attack", "hit", "death"]),
    nuteBurnSprayer: sprite("enemy.nute_burn_sprayer", "assets/enemies/nute-burn-sprayer.png", ["idle", "chase", "attack", "hit", "death"]),
    rootRotCrawler: sprite("enemy.root_rot_crawler", "assets/enemies/root-rot-crawler.png", ["idle", "chase", "attack", "hit", "death"]),
    budRotBrute: sprite("enemy.bud_rot_brute", "assets/enemies/bud-rot-brute.png", ["idle", "chase", "attack", "hit", "death"]),
    complianceDrone: sprite("enemy.compliance_drone", "assets/enemies/compliance-drone.png", ["idle", "chase", "attack", "hit", "death"]),
    aphidQueen: sprite("enemy.aphid_queen", "assets/enemies/aphid-queen.png", ["idle", "chase", "attack", "hit", "death"]),
    moldMother: sprite("enemy.mold_mother", "assets/enemies/mold-mother.png", ["idle", "chase", "attack", "hit", "death"])
  }),
  weapons: Object.freeze({
    trimShears: sprite("weapon.trim_shears", "assets/weapons/trim-shears.png", ["idle", "use"]),
    phBlaster: sprite("weapon.ph_blaster", "assets/weapons/ph-blaster.png", ["idle", "fire"]),
    neemCannon: sprite("weapon.neem_cannon", "assets/weapons/neem-cannon.png", ["idle", "fire"]),
    co2BurstRifle: sprite("weapon.co2_burst_rifle", "assets/weapons/co2-burst-rifle.png", ["idle", "fire"]),
    terpTorch: sprite("weapon.terp_torch", "assets/weapons/terp-torch.png", ["idle", "fire"]),
    rosinRailgun: sprite("weapon.rosin_railgun", "assets/weapons/rosin-railgun.png", ["idle", "fire"]),
    kiefGrenades: sprite("weapon.kief_grenades", "assets/weapons/kief-grenades.png", ["idle", "throw"]),
    trichomeReaper: sprite("weapon.trichome_reaper", "assets/weapons/trichome-reaper.png", ["idle", "fire"])
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
