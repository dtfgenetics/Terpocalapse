import { createInitialState } from "../src/state.js";
import { createLevelSession } from "../src/level-session.js";
import { createToolState } from "../src/tool-system.js";
import { STARTING_LOADOUT } from "../src/player-loadout.js";
import { createProgress } from "../src/progress-system.js";
import { createEffectState } from "../src/effect-system.js";
import { createSoundQueue } from "../src/sound-queue.js";

const failures = [];

try {
  const session = createLevelSession(0);
  const state = createInitialState();
  state.tools = createToolState(STARTING_LOADOUT);
  state.progress = createProgress(["Find supplies", "Open route", "Reach exit"]);
  state.effects = createEffectState();
  state.sounds = createSoundQueue();
  state.pickups = session.pickups;
  state.threats = session.threats;
  state.gates = session.gates;

  if (!session.level?.map?.length) failures.push("level session missing map rows");
  if (!session.level?.playerStart) failures.push("level session missing player start");
  if (!state.tools?.equipped) failures.push("tool state missing equipped tool");
  if (!Array.isArray(state.pickups)) failures.push("pickup state not created");
  if (!Array.isArray(state.threats)) failures.push("threat state not created");
  if (!Array.isArray(state.gates)) failures.push("gate state not created");
} catch (error) {
  failures.push(error?.stack || String(error));
}

if (failures.length) {
  console.error("V2 smoke check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("V2 smoke check passed.");
}
