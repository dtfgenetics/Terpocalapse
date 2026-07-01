import { getMapCell } from "./map.js";

export function interact(state, level) {
  const lookX = state.player.x + Math.cos(state.player.angle) * level.tileSize * 0.65;
  const lookY = state.player.y + Math.sin(state.player.angle) * level.tileSize * 0.65;
  const cell = getMapCell(level, lookX, lookY);

  if (cell === "D") {
    if (state.keyOpen) {
      state.message = "Access route is open.";
      return "door_open";
    }
    state.message = "Keycard access required.";
    return "door_locked";
  }

  if (cell === "X") {
    state.message = "Exit chamber reached.";
    return "exit";
  }

  state.message = "Nothing to interact with.";
  return null;
}
