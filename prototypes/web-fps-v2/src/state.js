export function createInitialState() {
  return {
    mode: "menu",
    startedAt: 0,
    elapsed: 0,
    player: {
      x: 120,
      y: 120,
      angle: 0,
      hp: 100,
      armor: 0,
      special: 50,
      score: 0
    },
    input: {
      forward: false,
      back: false,
      left: false,
      right: false,
      turningLeft: false,
      turningRight: false
    },
    stats: createFreshStats()
  };
}

export function createFreshStats() {
  return {
    shots: 0,
    hits: 0,
    pickups: 0,
    cleared: 0
  };
}

export function resetRunState(state) {
  state.mode = "menu";
  state.startedAt = 0;
  state.elapsed = 0;
  state.stats = createFreshStats();
  state.hitConfirmUntil = 0;
  state.damageFlashUntil = 0;
  state.specialFlashUntil = 0;
  state.lastHitAt = 0;
  state.lastSpecialAt = 0;
  return state;
}

export function startRun(state, now = performance.now()) {
  state.mode = "running";
  state.startedAt = now;
  state.elapsed = 0;
  return state;
}

export function updateClock(state, now = performance.now()) {
  if (state.mode !== "running") return state;
  state.elapsed = now - state.startedAt;
  return state;
}
