import { STARTING_LOADOUT } from "./player-loadout.js";
import { loadLevelByIndex } from "./level-loader.js";
import { createInitialState, startRun, updateClock } from "./state.js";
import { safeMove, getMapCell } from "./map.js";
import { updatePlayerMovement } from "./movement-system.js";
import { interact } from "./action-system.js";
import { createPickups, collectNearbyPickups } from "./pickup-system.js";
import { createThreats, updateThreats } from "./threat-system.js";
import { createToolState, equipToolBySlot, useEquippedTool } from "./tool-system.js";
import { activateSpecial } from "./special-system.js";
import { createProgress, advanceProgress } from "./progress-system.js";
import { createEffectState, pruneEffects } from "./effect-system.js";
import { canRunWorld, toggleRunPause } from "./run-state.js";
import { createIntroPanel, createBriefingPanel, createLorePanel, createEndingPanel } from "./story-ui.js";
import { loadSettings } from "./settings-system.js";
import { bindPointerLook } from "./input-system.js";
import { fitCanvas, paint } from "./render.js";

const canvas = document.getElementById("game");
const menu = document.getElementById("menu");
const startButton = document.getElementById("startButton");
const ctx = canvas.getContext("2d");
const loadedLevel = loadLevelByIndex(0);
const LEVEL = loadedLevel.level;
const state = createInitialState();
const settings = loadSettings();
const pickups = createPickups(LEVEL, loadedLevel.spawnPlan);
const threats = createThreats(LEVEL, loadedLevel.spawnPlan);
const keys = new Set();
let last = performance.now();

state.keyOpen = false;
state.message = loadedLevel.briefing;
state.currentLevel = LEVEL.name;
state.story = loadedLevel.story;
state.spawnPlan = loadedLevel.spawnPlan;
state.settings = settings;
state.progress = createProgress(["Find the first supply pickup", "Collect route access", "Reach the exit chamber"]);
state.effects = createEffectState();
state.inventory = { tools: [...STARTING_LOADOUT.tools], keys: { ...STARTING_LOADOUT.keys }, items: [] };
state.ammo = { ...STARTING_LOADOUT.ammo };
state.tools = createToolState(STARTING_LOADOUT);
state.pickups = pickups;
state.threats = threats;
state.storyPanel = createIntroPanel();
state.pendingBriefing = createBriefingPanel(LEVEL.name, loadedLevel.briefing);
state.player.x = LEVEL.playerStart.x;
state.player.y = LEVEL.playerStart.y;
state.player.angle = LEVEL.playerStart.angle;
state.player.radius = 14;
state.player.hp = STARTING_LOADOUT.health;
state.player.armor = STARTING_LOADOUT.armor;
state.player.special = STARTING_LOADOUT.special;

bindPointerLook({ canvas, state, settings });

window.addEventListener("resize", () => fitCanvas(canvas));
window.addEventListener("keydown", (event) => {
  keys.add(event.code);
  if (event.code === "Enter" && state.storyPanel) {
    advanceStoryPanel();
    return;
  }
  if (event.code === "Escape" && !state.storyPanel) {
    toggleRunPause(state);
    return;
  }
  if (!canRunWorld(state)) return;
  if (event.code === "Space") useEquippedTool(state, threats);
  if (event.code === "KeyF") interact(state, LEVEL);
  if (event.code === "KeyR") activateSpecial(state, threats);
  if (event.code.startsWith("Digit")) equipToolBySlot(state, Number(event.code.replace("Digit", "")));
});
window.addEventListener("keyup", (event) => keys.delete(event.code));

startButton.addEventListener("click", () => {
  menu.classList.add("hidden");
  state.storyPanel = state.pendingBriefing;
});

function advanceStoryPanel() {
  if (state.storyPanel?.type === "intro") {
    state.storyPanel = state.pendingBriefing;
    return;
  }
  if (state.storyPanel?.type === "briefing") {
    state.storyPanel = null;
    startRun(state);
    state.message = state.story?.entry || loadedLevel.briefing;
    return;
  }
  if (state.storyPanel?.type === "lore") {
    state.storyPanel = null;
    state.message = "Lore note saved.";
    return;
  }
}

function update(dt, now) {
  pruneEffects(state.effects, now);
  if (!canRunWorld(state)) return;

  updatePlayerMovement({ state, level: LEVEL, keys, dt, moveFn: safeMove });

  const collected = collectNearbyPickups(state, pickups);
  if (collected) advanceProgress(state.progress);
  if (collected?.id?.endsWith("keycard")) state.keyOpen = true;
  if (collected?.id?.startsWith("note_")) state.storyPanel = createLorePanel(collected.id);

  updateThreats(state, LEVEL, threats, dt, now);

  const cell = getMapCell(LEVEL, state.player.x, state.player.y);
  if (cell === "X") {
    state.mode = "complete";
    state.message = state.story?.exit || "Mission complete. The route is secured.";
    state.storyPanel = createEndingPanel();
  }
  updateClock(state);
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  update(dt, now);
  paint(ctx, canvas, state, LEVEL);
  requestAnimationFrame(frame);
}

fitCanvas(canvas);
requestAnimationFrame(frame);
