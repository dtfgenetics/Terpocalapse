export function buildHudLines(state) {
  const equipped = state.tools?.equipped || "trim_shears";
  const ammo = state.ammo || {};
  const activeThreats = (state.threats || []).filter((item) => !item.cleared).length;
  const goal = state.progress?.labels?.[state.progress.current] || "Reach the exit chamber";
  const best = state.memory?.bestScore || 0;

  return [
    "Terpocalypse V2",
    `Goal ${goal}`,
    `Tool ${label(equipped)}`,
    `Ammo L${ammo.light || 0} H${ammo.heavy || 0} F${ammo.fuel || 0} G${ammo.grenade || 0}`,
    `HP ${state.player.hp} Armor ${state.player.armor} Special ${state.player.special || 0}`,
    `Score ${state.player.score} Best ${best}`,
    `Pickups ${state.stats.pickups} Threats ${activeThreats}`,
    `Cleared ${state.stats.cleared} Keycard ${state.keyOpen ? "READY" : "NEEDED"}`,
    `Mouse ${state.pointerLocked ? "LOCKED" : "CLICK CANVAS"}`
  ];
}

function label(id) {
  return id.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
