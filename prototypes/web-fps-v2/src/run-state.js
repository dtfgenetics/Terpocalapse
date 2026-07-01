export function canRunWorld(state) {
  return state.mode === "running" && !state.storyPanel;
}

export function setPaused(state) {
  if (state.mode !== "running") return false;
  state.mode = "paused";
  state.message = "Paused.";
  return true;
}

export function setRunning(state) {
  if (state.mode !== "paused") return false;
  state.mode = "running";
  state.message = "Run resumed.";
  return true;
}

export function toggleRunPause(state) {
  return setPaused(state) || setRunning(state);
}
