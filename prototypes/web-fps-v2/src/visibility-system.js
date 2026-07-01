import { sampleDepth } from "./depth-sampler.js";

export function canSeePoint(level, fromX, fromY, toX, toY) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const targetDistance = Math.hypot(toX - fromX, toY - fromY);
  const sample = sampleDepth(level, fromX, fromY, angle, targetDistance);
  return sample.distance + 8 >= targetDistance;
}
