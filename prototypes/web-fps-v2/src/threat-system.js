import { THREAT_BALANCE } from "./threat-balance.js";
import { applyPlayerPressure } from "./damage-system.js";
import { safeMove } from "./map.js";
import { sampleDepth } from "./depth-sampler.js";

export const THREAT_COLORS = {
  spider_mite_swarm: "#d94833",
  powdery_mildew_ghoul: "#dfe7df",
  nute_burn_sprayer: "#ff8c2f",
  root_rot_crawler: "#7a5f45",
  bud_rot_brute: "#8a6f57",
  compliance_drone: "#70c7ff",
  aphid_queen: "#b36bff",
  mold_mother: "#ffffff"
};

export function createThreats(level, spawnPlan) {
  const ids = [...(spawnPlan?.threats || [])];
  const tiles = findOpenTilesFromEnd(level);

  return ids.map((id, index) => {
    const tile = tiles[index] || { x: 1 + index, y: 1 };
    const balance = THREAT_BALANCE[id] || { health: 50, speed: 30, pressure: 5, range: 40, points: 100 };
    return {
      id: `${id}_${index}`,
      type: id,
      name: titleize(id),
      x: (tile.x + 0.5) * level.tileSize,
      y: (tile.y + 0.5) * level.tileSize,
      radius: Math.max(10, Math.min(18, level.tileSize * 0.2)),
      health: balance.health,
      maxHealth: balance.health,
      speed: balance.speed,
      pressure: balance.pressure,
      range: balance.range,
      points: balance.points,
      color: THREAT_COLORS[id] || "#ff8c2f",
      cleared: false,
      lastPressureAt: 0,
      lastAttackAt: 0,
      lastHitAt: 0,
      lastMoveAt: 0,
      animationFrames: 4,
      animationFrameMs: 140,
      animationPhase: index * 37
    };
  });
}

export function updateThreats(state, level, threats, dt, now = performance.now()) {
  if (state.mode !== "running") return;
  for (const threat of threats) {
    if (threat.cleared) continue;
    const dx = state.player.x - threat.x;
    const dy = state.player.y - threat.y;
    const dist = Math.hypot(dx, dy);
    if (dist <= 0.001) continue;

    const canSeePlayer = hasLineOfSight(state, level, threat.x, threat.y, state.player.x, state.player.y);

    if (dist > threat.range && dist < level.tileSize * 7 && canSeePlayer) {
      const step = Math.min(threat.speed * dt, dist);
      const beforeX = threat.x;
      const beforeY = threat.y;
      safeMove(level, threat, (dx / dist) * step, (dy / dist) * step, state);
      if (Math.hypot(threat.x - beforeX, threat.y - beforeY) > 0.01) threat.lastMoveAt = now;
    }

    if (dist <= threat.range && canSeePlayer && now - threat.lastPressureAt > 800) {
      threat.lastPressureAt = now;
      threat.lastAttackAt = now;
      applyPlayerPressure(state, threat.pressure, threat.name, now);
    }
  }
}

export function clearNearestThreat(state, threats, radius = 55) {
  let best = null;
  let bestDist = Infinity;
  for (const threat of threats) {
    if (threat.cleared) continue;
    const dist = Math.hypot(threat.x - state.player.x, threat.y - state.player.y);
    if (dist < radius && dist < bestDist) {
      best = threat;
      bestDist = dist;
    }
  }

  if (!best) return null;
  best.health = 0;
  best.cleared = true;
  state.stats.cleared += 1;
  state.player.score += best.points;
  state.message = `${best.name} cleared.`;
  return best;
}

function hasLineOfSight(state, level, fromX, fromY, toX, toY) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.001) return true;
  const hit = sampleDepth(level, fromX, fromY, Math.atan2(dy, dx), distance, state);
  return hit.distance >= distance - Math.max(6, state.player.radius || 14);
}

function findOpenTilesFromEnd(level) {
  const tiles = [];
  for (let y = level.map.length - 2; y > 0; y -= 1) {
    for (let x = level.map[y].length - 2; x > 0; x -= 1) {
      if (level.map[y][x] === ".") tiles.push({ x, y });
    }
  }
  return tiles;
}

function titleize(id) {
  return id.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
