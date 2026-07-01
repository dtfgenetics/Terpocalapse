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
    stats: {
      shots: 0,
      pickups: 0,
      cleared: 0
    }
  };
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
