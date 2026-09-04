import { GEAR_BALANCE } from "./gear-balance.js";
import { addLine, addPulse } from "./effect-system.js";
import { sampleDepth } from "./depth-sampler.js";

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

export function useEquippedTool(state, level, threats, now = performance.now()) {
  const toolId = state.tools.equipped;
  const balance = GEAR_BALANCE[toolId] || GEAR_BALANCE.trim_shears;
  if (now - state.tools.lastUseAt < balance.cooldownMs) return null;

  if (balance.ammo && !spendAmmo(state, balance.ammo)) {
    state.message = `${formatToolName(toolId)} needs ${balance.ammo} supply.`;
    return null;
  }

  state.tools.lastUseAt = now;
  state.hitConfirmUntil = 0;
  state.stats.shots = (state.stats.shots || 0) + 1;
  state.effects = state.effects || [];

  const target = findAimedThreat(state, level, threats, balance);
  if (!target) {
    addPulse(state.effects, state.player.x, state.player.y, "#7cff5b", 120);
    state.message = `${formatToolName(toolId)} missed.`;
    return null;
  }

  addLine(state.effects, state.player.x, state.player.y, target.x, target.y, "#7cff5b", 160);
  addPulse(state.effects, target.x, target.y, target.color || "#ffffff", 220);

  const hitCount = Math.max(1, balance.spread || 1);
  const damage = balance.power * hitCount;
  target.health = Math.max(0, target.health - damage);
  target.lastHitAt = now;
  state.stats.hits = (state.stats.hits || 0) + 1;
  state.hitConfirmUntil = now + 150;
  state.message = `${formatToolName(toolId)} hit ${target.name}.`;

  if (target.health <= 0 && !target.cleared) {
    target.cleared = true;
    state.stats.cleared += 1;
    state.player.score += target.points;
    state.message = `${target.name} cleared.`;
  }

  return target;
}

export function findAimedThreat(state, level, threats, balance) {
  const reach = balance.reach || 90;
  const aimCone = getAimCone(balance);
  let best = null;
  let bestScore = Infinity;

  for (const threat of threats) {
    if (threat.cleared) continue;
    const dx = threat.x - state.player.x;
    const dy = threat.y - state.player.y;
    const distance = Math.hypot(dx, dy);
    if (distance > reach || distance <= 0.001) continue;

    const targetAngle = Math.atan2(dy, dx);
    const angleError = Math.abs(normalizeAngle(targetAngle - state.player.angle));
    if (angleError > aimCone) continue;
    if (!hasLineOfSight(state, level, targetAngle, distance, threat.radius || 14)) continue;

    const score = angleError * 1000 + distance;
    if (score < bestScore) {
      best = threat;
      bestScore = score;
    }
  }

  return best;
}

function hasLineOfSight(state, level, angle, distance, targetRadius) {
  const hit = sampleDepth(level, state.player.x, state.player.y, angle, distance, state);
  return hit.distance >= distance - Math.max(6, targetRadius);
}

function getAimCone(balance) {
  if (!balance.ammo) return 0.62;
  if ((balance.spread || 1) > 1) return 0.30;
  return 0.13;
}

function normalizeAngle(angle) {
  let result = angle;
  while (result > Math.PI) result -= Math.PI * 2;
  while (result < -Math.PI) result += Math.PI * 2;
  return result;
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
