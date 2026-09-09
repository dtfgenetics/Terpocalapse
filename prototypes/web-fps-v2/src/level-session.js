import { loadLevelByIndex } from "./level-loader.js";
import { createPickups } from "./pickup-system.js";
import { createThreats } from "./threat-system.js";
import { findGateTiles } from "./gate-map.js";

export function createLevelSession(index = 0) {
  const loaded = loadLevelByIndex(index);
  return {
    index,
    loaded,
    level: loaded.level,
    pickups: createPickups(loaded.level, loaded.spawnPlan),
    threats: createThreats(loaded.level, loaded.spawnPlan),
    gates: findGateTiles(loaded.level)
  };
}

export function applyLevelSession(state, session) {
  state.keyOpen = false;
  state.currentLevel = session.level.name;
  state.story = session.loaded.story;
  state.spawnPlan = session.loaded.spawnPlan;
  state.pickups = session.pickups;
  state.threats = session.threats;
  state.gates = session.gates;
  state.message = session.loaded.briefing;
  state.player.x = session.level.playerStart.x;
  state.player.y = session.level.playerStart.y;
  state.player.angle = session.level.playerStart.angle;
}
