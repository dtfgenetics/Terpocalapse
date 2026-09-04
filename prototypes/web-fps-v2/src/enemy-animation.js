const DEFAULT_FRAME_MS = 140;

export function getEnemyAnimationState(threat, now = performance.now()) {
  if (threat.cleared || threat.health <= 0) return "death";
  if (now - (threat.lastHitAt || 0) < 160) return "hit";
  if (now - (threat.lastAttackAt || 0) < 220) return "attack";
  if ((threat.speed || 0) > 0) return "chase";
  return "idle";
}

export function getAnimationFrame(now, frameCount, frameMs = DEFAULT_FRAME_MS, phase = 0) {
  if (!Number.isFinite(frameCount) || frameCount <= 1) return 0;
  return Math.floor((now + phase) / frameMs) % frameCount;
}

export function createEnemyAnimationDescriptor(threat, now = performance.now()) {
  return {
    state: getEnemyAnimationState(threat, now),
    frame: getAnimationFrame(now, threat.animationFrames || 1, threat.animationFrameMs || DEFAULT_FRAME_MS, threat.animationPhase || 0)
  };
}
