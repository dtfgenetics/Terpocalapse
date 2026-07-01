import { GEAR_BALANCE } from "./gear-balance.js";

export function createToolState(loadout) {
  const tools = [...(loadout?.tools || ["trim_shears"])]
    .filter((id) => GEAR_BALANCE[id]);
  return {
    equipped: tools[0] || "trim_shears",
    unlocked: new Set(tools.length ? tools : ["trim_shears"]),
    lastUseAt: 0
  };
}

export function unlockTool(state, toolId) {
  if (!GEAR_BALANCE[toolId]) return false;
  state.tools.unlocked.add(toolId);
  state.tools.equipped = toolId;
  state.message = `${formatToolName(toolId)} equipped.`;
  return true;
}

export function equipToolBySlot(state, slot) {
  const match = Object.entries(GEAR_BALANCE).find(([, balance]) => balance.slot === slot);
  if (!match) return false;
  const [toolId] = match;
  if (!state.tools.unlocked.has(toolId)) return false;
  state.tools.equipped = toolId;
  state.message = `${formatToolName(toolId)} ready.`;
  return true;
}

export function useEquippedTool(state, threats, now = performance.now()) {
  const toolId = state.tools.equipped;
  const balance = GEAR_BALANCE[toolId] || GEAR_BALANCE.trim_shears;
  if (now - state.tools.lastUseAt < balance.cooldownMs) return null;

  if (balance.ammo && !spendAmmo(state, balance.ammo)) {
    state.message = `${formatToolName(toolId)} needs ${balance.ammo} supply.`;
    return null;
  }

  state.tools.lastUseAt = now;
  state.stats.shots = (state.stats.shots || 0) + 1;

  const target = findNearestThreat(state, threats, balance.reach);
  if (!target) {
    state.message = `${formatToolName(toolId)} used.`;
    return null;
  }

  const hitCount = Math.max(1, balance.spread || 1);
  const damage = balance.power * hitCount;
  target.health = Math.max(0, target.health - damage);
  state.message = `${formatToolName(toolId)} hit ${target.name}.`;

  if (target.health <= 0 && !target.cleared) {
    target.cleared = true;
    state.stats.cleared += 1;
    state.player.score += target.points;
    state.message = `${target.name} cleared.`;
  }

  return target;
}

function findNearestThreat(state, threats, reach) {
  let best = null;
  let bestDistance = Infinity;
  for (const threat of threats) {
    if (threat.cleared) continue;
    const distance = Math.hypot(threat.x - state.player.x, threat.y - state.player.y);
    if (distance <= reach && distance < bestDistance) {
      best = threat;
      bestDistance = distance;
    }
  }
  return best;
}

function spendAmmo(state, ammoType) {
  state.ammo = state.ammo || {};
  state.ammo[ammoType] = state.ammo[ammoType] ?? 0;
  if (state.ammo[ammoType] <= 0) return false;
  state.ammo[ammoType] -= 1;
  return true;
}

export function formatToolName(toolId) {
  return toolId.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
