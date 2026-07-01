export function createEffectState() {
  return [];
}

export function addPulse(effects, x, y, color = "#ffffff", duration = 240) {
  effects.push({ type: "pulse", x, y, color, startedAt: performance.now(), duration });
}

export function addLine(effects, fromX, fromY, toX, toY, color = "#7cff5b", duration = 140) {
  effects.push({ type: "line", fromX, fromY, toX, toY, color, startedAt: performance.now(), duration });
}

export function pruneEffects(effects, now = performance.now()) {
  for (let i = effects.length - 1; i >= 0; i -= 1) {
    if (now - effects[i].startedAt > effects[i].duration) effects.splice(i, 1);
  }
}
