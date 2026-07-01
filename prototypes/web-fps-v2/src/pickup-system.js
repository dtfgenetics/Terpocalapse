export const PICKUP_COLORS = {
  green_keycard: "#7cff5b",
  purple_keycard: "#b36bff",
  gold_keycard: "#ffc857",
  cure_jar_health: "#ff5f7e",
  kief_armor: "#ffc857",
  light_ammo_box: "#70c7ff",
  heavy_ammo_box: "#dca2ff",
  grow_light_overdrive: "#ffffff",
  rare_seed_pack: "#9cff6e",
  golden_nug: "#ffd166",
  ph_blaster: "#66d9ff",
  neem_cannon: "#9cff6e",
  co2_burst_rifle: "#70c7ff",
  terp_torch: "#ff8c2f",
  rosin_railgun: "#ffc857",
  trichome_reaper: "#ffffff"
};

const MARKER_PREFS = {
  K: ["green_keycard", "purple_keycard", "gold_keycard"],
  A: ["kief_armor"],
  S: ["grow_light_overdrive", "rare_seed_pack", "golden_nug"]
};

export function createPickups(level, spawnPlan) {
  const wanted = [...(spawnPlan?.pickups || [])];
  const placed = [];
  const used = new Set();

  for (let y = 0; y < level.map.length; y += 1) {
    for (let x = 0; x < level.map[y].length; x += 1) {
      const cell = level.map[y][x];
      const choices = MARKER_PREFS[cell];
      if (!choices) continue;
      const id = choices.find((choice) => wanted.includes(choice) && !used.has(choice));
      if (!id) continue;
      placed.push(makePickup(level, id, x, y));
      used.add(id);
    }
  }

  const fallbackTiles = findOpenTiles(level);
  for (const id of wanted) {
    if (used.has(id)) continue;
    const tile = fallbackTiles.shift();
    if (!tile) break;
    placed.push(makePickup(level, id, tile.x, tile.y));
    used.add(id);
  }

  return placed;
}

export function collectNearbyPickups(state, pickups, radius = 28) {
  let collected = null;
  for (const pickup of pickups) {
    if (pickup.collected) continue;
    const dx = pickup.x - state.player.x;
    const dy = pickup.y - state.player.y;
    if (Math.hypot(dx, dy) > radius) continue;
    pickup.collected = true;
    applyPickup(state, pickup);
    collected = pickup;
    break;
  }
  return collected;
}

function applyPickup(state, pickup) {
  state.stats.pickups += 1;
  state.message = `${pickup.name} collected.`;
  state.inventory = state.inventory || { tools: [], keys: {}, items: [] };

  if (pickup.id.endsWith("keycard")) {
    const key = pickup.id.split("_")[0];
    state.inventory.keys[key] = true;
    if (key === "green") state.keyOpen = true;
    state.message = `${pickup.name} ready.`;
    return;
  }

  if (pickup.id.includes("health")) state.player.hp = Math.min(100, state.player.hp + 25);
  if (pickup.id.includes("armor")) state.player.armor = Math.min(100, state.player.armor + 25);
  if (pickup.id.includes("blaster") || pickup.id.includes("cannon") || pickup.id.includes("rifle") || pickup.id.includes("torch") || pickup.id.includes("railgun") || pickup.id.includes("reaper")) {
    if (!state.inventory.tools.includes(pickup.id)) state.inventory.tools.push(pickup.id);
  } else {
    state.inventory.items.push(pickup.id);
  }
}

function makePickup(level, id, tileX, tileY) {
  return {
    id,
    name: titleize(id),
    x: (tileX + 0.5) * level.tileSize,
    y: (tileY + 0.5) * level.tileSize,
    color: PICKUP_COLORS[id] || "#ffffff",
    collected: false
  };
}

function findOpenTiles(level) {
  const tiles = [];
  for (let y = 1; y < level.map.length - 1; y += 1) {
    for (let x = 1; x < level.map[y].length - 1; x += 1) {
      if (level.map[y][x] === ".") tiles.push({ x, y });
    }
  }
  return tiles;
}

function titleize(id) {
  return id.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
