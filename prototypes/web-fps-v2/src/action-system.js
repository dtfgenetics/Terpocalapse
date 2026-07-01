import { getMapCell, getTilePoint } from "./map.js";
import { markGateOpen } from "./gate-map.js";

export function interact(state, level) {
  const lookX = state.player.x + Math.cos(state.player.angle) * level.tileSize * 0.65;
  const lookY = state.player.y + Math.sin(state.player.angle) * level.tileSize * 0.65;
  const cell = getMapCell(level, lookX, lookY);
  const tile = getTilePoint(level, lookX, lookY);

  if (cell === "D") {
    if (state.keyOpen) {
      markGateOpen(state.gates || [], tile.tx, tile.ty);
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
