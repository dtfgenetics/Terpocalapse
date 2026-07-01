export const ASSET_STATUS = {
  missing: "missing",
  placeholder: "placeholder",
  draft: "draft",
  approved: "approved",
  final: "final"
};

export const SPRITE_SPECS = {
  enemyBillboard: { width: 256, height: 256, format: "png", transparent: true },
  pickup: { width: 128, height: 128, format: "png", transparent: true },
  weaponFirstPerson: { width: 768, height: 512, format: "png", transparent: true },
  weaponPickup: { width: 256, height: 256, format: "png", transparent: true },
  projectile: { width: 128, height: 128, format: "png", transparent: true },
  effect: { width: 128, height: 128, format: "png", transparent: true },
  hudIcon: { width: 64, height: 64, format: "png", transparent: true },
  texture: { width: 256, height: 256, format: "png/webp", tileable: true }
};

export const ASSETS = {
  branding: {
    logoMain: {
      id: "logoMain",
      label: "Terpocalypse main logo",
      path: "../../assets/branding/terpocalypse-logo-main-v01.png",
      status: ASSET_STATUS.missing
    },
    titleBackground: {
      id: "titleBackground",
      label: "Title screen background",
      path: "../../assets/branding/title-screen-grow-room-v01.png",
      status: ASSET_STATUS.missing
    },
    thcBadge: {
      id: "thcBadge",
      label: "THC Teaching Healthy Cultivation badge",
      path: "../../assets/branding/thc-badge-v01.png",
      status: ASSET_STATUS.missing
    }
  },
  ui: {
    hudFrame: { id: "hudFrame", path: "../../assets/ui/hud-frame-v01.png", status: ASSET_STATUS.missing },
    crosshair: { id: "crosshair", path: "../../assets/ui/crosshair-v01.png", status: ASSET_STATUS.missing },
    healthIcon: { id: "healthIcon", path: "../../assets/ui/icon-health-cure-jar-v01.png", status: ASSET_STATUS.missing },
    armorIcon: { id: "armorIcon", path: "../../assets/ui/icon-armor-kief-v01.png", status: ASSET_STATUS.missing },
    ammoIcon: { id: "ammoIcon", path: "../../assets/ui/icon-ammo-v01.png", status: ASSET_STATUS.missing },
    keyGreen: { id: "keyGreen", path: "../../assets/ui/keycard-green-icon-v01.png", status: ASSET_STATUS.missing },
    keyPurple: { id: "keyPurple", path: "../../assets/ui/keycard-purple-icon-v01.png", status: ASSET_STATUS.missing },
    keyGold: { id: "keyGold", path: "../../assets/ui/keycard-gold-icon-v01.png", status: ASSET_STATUS.missing }
  },
  weapons: {
    shearsIdle: { id: "shearsIdle", path: "../../assets/weapons/first_person/trim-shears-first-person-idle-v01.png", status: ASSET_STATUS.missing },
    shearsSlash: { id: "shearsSlash", path: "../../assets/weapons/first_person/trim-shears-slash-v01.png", status: ASSET_STATUS.missing },
    phBlasterIdle: { id: "phBlasterIdle", path: "../../assets/weapons/first_person/ph-blaster-first-person-idle-v01.png", status: ASSET_STATUS.missing },
    phBlasterFire: { id: "phBlasterFire", path: "../../assets/weapons/first_person/ph-blaster-first-person-fire-v01.png", status: ASSET_STATUS.missing },
    neemCannonIdle: { id: "neemCannonIdle", path: "../../assets/weapons/first_person/neem-cannon-first-person-idle-v01.png", status: ASSET_STATUS.missing },
    neemCannonFire: { id: "neemCannonFire", path: "../../assets/weapons/first_person/neem-cannon-first-person-fire-v01.png", status: ASSET_STATUS.missing }
  },
  enemies: {
    spiderMiteIdle: { id: "spiderMiteIdle", path: "../../assets/enemies/spider_mite_swarm/spider-mite-swarm-idle-v01.png", status: ASSET_STATUS.missing },
    spiderMiteAttack: { id: "spiderMiteAttack", path: "../../assets/enemies/spider_mite_swarm/spider-mite-swarm-attack-v01.png", status: ASSET_STATUS.missing },
    spiderMiteDeath: { id: "spiderMiteDeath", path: "../../assets/enemies/spider_mite_swarm/spider-mite-swarm-death-v01.png", status: ASSET_STATUS.missing },
    mildewIdle: { id: "mildewIdle", path: "../../assets/enemies/powdery_mildew_ghoul/powdery-mildew-ghoul-idle-v01.png", status: ASSET_STATUS.missing },
    mildewAttack: { id: "mildewAttack", path: "../../assets/enemies/powdery_mildew_ghoul/powdery-mildew-ghoul-attack-v01.png", status: ASSET_STATUS.missing },
    mildewDeath: { id: "mildewDeath", path: "../../assets/enemies/powdery_mildew_ghoul/powdery-mildew-ghoul-death-v01.png", status: ASSET_STATUS.missing },
    nuteImpIdle: { id: "nuteImpIdle", path: "../../assets/enemies/nute_burn_imp/nute-burn-imp-idle-v01.png", status: ASSET_STATUS.missing },
    nuteImpAttack: { id: "nuteImpAttack", path: "../../assets/enemies/nute_burn_imp/nute-burn-imp-attack-v01.png", status: ASSET_STATUS.missing },
    nuteImpDeath: { id: "nuteImpDeath", path: "../../assets/enemies/nute_burn_imp/nute-burn-imp-death-v01.png", status: ASSET_STATUS.missing }
  },
  pickups: {
    cureJarHealth: { id: "cureJarHealth", path: "../../assets/pickups/pickup-cure-jar-health-v01.png", status: ASSET_STATUS.missing },
    kiefArmor: { id: "kiefArmor", path: "../../assets/pickups/pickup-kief-armor-v01.png", status: ASSET_STATUS.missing },
    greenKeycard: { id: "greenKeycard", path: "../../assets/pickups/pickup-green-keycard-v01.png", status: ASSET_STATUS.missing },
    lightAmmo: { id: "lightAmmo", path: "../../assets/pickups/pickup-light-ammo-box-v01.png", status: ASSET_STATUS.missing },
    heavyAmmo: { id: "heavyAmmo", path: "../../assets/pickups/pickup-heavy-ammo-box-v01.png", status: ASSET_STATUS.missing }
  },
  effects: {
    muzzleFlash: { id: "muzzleFlash", path: "../../assets/effects/fx-muzzle-flash-v01.png", status: ASSET_STATUS.missing },
    bulletImpact: { id: "bulletImpact", path: "../../assets/effects/fx-bullet-impact-v01.png", status: ASSET_STATUS.missing },
    toxicSplash: { id: "toxicSplash", path: "../../assets/effects/fx-toxic-splash-v01.png", status: ASSET_STATUS.missing },
    moldBurst: { id: "moldBurst", path: "../../assets/effects/fx-mold-burst-v01.png", status: ASSET_STATUS.missing }
  }
};

export function flattenAssetRegistry(registry = ASSETS) {
  return Object.values(registry).flatMap((group) => Object.values(group));
}

export function getMissingAssets(registry = ASSETS) {
  return flattenAssetRegistry(registry).filter((asset) => asset.status === ASSET_STATUS.missing);
}

export async function preloadImageAsset(asset) {
  return new Promise((resolve) => {
    if (!asset?.path || asset.status === ASSET_STATUS.missing) {
      resolve({ ...asset, loaded: false, reason: "missing-placeholder" });
      return;
    }
    const image = new Image();
    image.onload = () => resolve({ ...asset, image, loaded: true });
    image.onerror = () => resolve({ ...asset, loaded: false, reason: "load-error" });
    image.src = asset.path;
  });
}

export async function preloadRegisteredAssets(registry = ASSETS) {
  const entries = await Promise.all(flattenAssetRegistry(registry).map(preloadImageAsset));
  return Object.fromEntries(entries.map((entry) => [entry.id, entry]));
}
