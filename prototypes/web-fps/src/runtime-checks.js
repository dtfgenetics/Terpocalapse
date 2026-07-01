import { TILE, MAP, PLAYER_START, WEAPONS, ENEMY_TYPES, ENEMY_SPAWNS, PICKUPS } from "./game-data.js";

const VALID_TILE_CHARS = new Set(["#", ".", "D", "X", "P", "A", "H", "K", "S", "N"]);

export function getTileAtWorld(x, y) {
  const tx = Math.floor(x / TILE);
  const ty = Math.floor(y / TILE);
  return MAP[ty]?.[tx] ?? "#";
}

export function validateMapShape(map = MAP) {
  const errors = [];
  if (!Array.isArray(map) || map.length === 0) {
    errors.push("MAP must be a non-empty array of strings.");
    return errors;
  }
  const width = map[0].length;
  map.forEach((row, y) => {
    if (typeof row !== "string") errors.push(`MAP row ${y} must be a string.`);
    if (row.length !== width) errors.push(`MAP row ${y} has width ${row.length}; expected ${width}.`);
    [...row].forEach((char, x) => {
      if (!VALID_TILE_CHARS.has(char)) errors.push(`MAP tile '${char}' at ${x},${y} is not defined.`);
    });
  });
  return errors;
}

export function validateMapBoundaries(map = MAP) {
  const errors = [];
  const h = map.length;
  const w = map[0]?.length ?? 0;
  for (let x = 0; x < w; x += 1) {
    if (map[0][x] !== "#") errors.push(`Top boundary at x=${x} must be wall '#'.`);
    if (map[h - 1][x] !== "#") errors.push(`Bottom boundary at x=${x} must be wall '#'.`);
  }
  for (let y = 0; y < h; y += 1) {
    if (map[y][0] !== "#") errors.push(`Left boundary at y=${y} must be wall '#'.`);
    if (map[y][w - 1] !== "#") errors.push(`Right boundary at y=${y} must be wall '#'.`);
  }
  return errors;
}

export function validateEntityPlacement() {
  const errors = [];
  const blocked = new Set(["#", "D"]);
  const check = (label, x, y) => {
    const tile = getTileAtWorld(x, y);
    if (blocked.has(tile)) errors.push(`${label} is placed on blocked tile '${tile}' at ${Math.floor(x / TILE)},${Math.floor(y / TILE)}.`);
  };

  check("Player start", PLAYER_START.x, PLAYER_START.y);
  ENEMY_SPAWNS.forEach((spawn, index) => {
    if (!ENEMY_TYPES[spawn.type]) errors.push(`Enemy spawn ${index} uses unknown type '${spawn.type}'.`);
    check(`Enemy spawn ${index}`, spawn.x, spawn.y);
  });
  PICKUPS.forEach((pickup) => {
    check(`Pickup '${pickup.id}'`, pickup.x, pickup.y);
    if (!pickup.label) errors.push(`Pickup '${pickup.id}' is missing label.`);
  });

  return errors;
}

export function validateWeapons() {
  const errors = [];
  Object.entries(WEAPONS).forEach(([id, weapon]) => {
    if (!weapon.name) errors.push(`Weapon '${id}' missing name.`);
    if (!Number.isFinite(weapon.damage)) errors.push(`Weapon '${id}' missing numeric damage.`);
    if (!Number.isFinite(weapon.cooldown)) errors.push(`Weapon '${id}' missing numeric cooldown.`);
    if (weapon.ammoType && !["light", "heavy", "fuel", "grenade"].includes(weapon.ammoType)) {
      errors.push(`Weapon '${id}' uses unknown ammo type '${weapon.ammoType}'.`);
    }
  });
  return errors;
}

export function validateEnemyTypes() {
  const errors = [];
  Object.entries(ENEMY_TYPES).forEach(([id, enemy]) => {
    if (!enemy.name) errors.push(`Enemy type '${id}' missing name.`);
    if (!Number.isFinite(enemy.maxHp) || enemy.maxHp <= 0) errors.push(`Enemy type '${id}' needs positive maxHp.`);
    if (!Number.isFinite(enemy.speed)) errors.push(`Enemy type '${id}' needs numeric speed.`);
    if (!Number.isFinite(enemy.damage)) errors.push(`Enemy type '${id}' needs numeric damage.`);
    if (!Number.isFinite(enemy.attackRange)) errors.push(`Enemy type '${id}' needs numeric attackRange.`);
  });
  return errors;
}

export function runPrototypeValidation() {
  return [
    ...validateMapShape(),
    ...validateMapBoundaries(),
    ...validateEntityPlacement(),
    ...validateWeapons(),
    ...validateEnemyTypes()
  ];
}

export function logPrototypeValidation() {
  const errors = runPrototypeValidation();
  if (errors.length === 0) {
    console.info("Terpocalypse validation passed.");
    return true;
  }
  console.group("Terpocalypse validation failed");
  errors.forEach((error) => console.warn(error));
  console.groupEnd();
  return false;
}
