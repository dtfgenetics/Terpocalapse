import { sampleDepth } from "./depth-sampler.js";

export function isProjectionVisible(state, level, item, margin = 18) {
  const dx = item.x - state.player.x;
  const dy = item.y - state.player.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.001) return true;

  const hit = sampleDepth(level, state.player.x, state.player.y, Math.atan2(dy, dx), distance, state);
  return hit.distance + margin >= distance;
}
