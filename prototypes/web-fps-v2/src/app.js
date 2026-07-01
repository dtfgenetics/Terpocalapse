import { PLAYER_DEFAULTS } from "./data.js";
import { STARTING_LOADOUT } from "./player-loadout.js";
import { loadLevelByIndex } from "./level-loader.js";
import { createInitialState, startRun, updateClock } from "./state.js";
import { safeMove, getMapCell } from "./map.js";
import { createPickups, collectNearbyPickups } from "./pickup-system.js";
import { createThreats, updateThreats } from "./threat-system.js";
import { createToolState, equipToolBySlot, useEquippedTool } from "./tool-system.js";
import { fitCanvas, paint } from "./render.js";

const canvas = document.getElementById("game");
const menu = document.getElementById("menu");
const startButton = document.getElementById("startButton");
const ctx = canvas.getContext("2d");
const loadedLevel = loadLevelByIndex(0);
const LEVEL = loadedLevel.level;
const state = createInitialState();
const pickups = createPickups(LEVEL, loadedLevel.spawnPlan);
const threats = createThreats(LEVEL, loadedLevel.spawnPlan);
const keys = new Set();
let last = performance.now();

state.keyOpen = false;
state.message = loadedLevel.briefing;
state.currentLevel = LEVEL.name;
state.story = loadedLevel.story;
state.spawnPlan = loadedLevel.spawnPlan;
state.inventory = { tools: [...STARTING_LOADOUT.tools], keys: { ...STARTING_LOADOUT.keys }, items: [] };
state.ammo = { ...STARTING_LOADOUT.ammo };
state.tools = createToolState(STARTING_LOADOUT);
state.pickups = pickups;
state.threats = threats;
state.player.x = LEVEL.playerStart.x;
state.player.y = LEVEL.playerStart.y;
state.player.angle = LEVEL.playerStart.angle;
state.player.radius = PLAYER_DEFAULTS.radius;
state.player.hp = STARTING_LOADOUT.health;
state.player.armor = STARTING_LOADOUT.armor;
state.player.special = STARTING_LOADOUT.special;

window.addEventListener("resize", () => fitCanvas(canvas));
window.addEventListener("keydown", (event) => {
  keys.add(event.code);
  if (event.code === "Space") useEquippedTool(state, threats);
  if (event.code.startsWith("Digit")) equipToolBySlot(state, Number(event.code.replace("Digit", "")));
});
window.addEventListener("keyup", (event) => keys.delete(event.code));

startButton.addEventListener("click", () => {
  startRun(state);
  menu.classList.add("hidden");
  state.message = state.story?.entry || loadedLevel.briefing;
});

function update(dt, now) {
  if (state.mode !== "running") return;
  const speed = PLAYER_DEFAULTS.moveSpeed * dt;
  let dx = 0;
  let dy = 0;
  if (keys.has("KeyW") || keys.has("ArrowUp")) dy -= speed;
  if (keys.has("KeyS") || keys.has("ArrowDown")) dy += speed;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) dx -= speed;
  if (keys.has("KeyD") || keys.has("ArrowRight")) dx += speed;
  safeMove(LEVEL, state.player, dx, dy, state.keyOpen);

  const collected = collectNearbyPickups(state, pickups);
  if (collected?.id?.endsWith("keycard")) state.keyOpen = true;

  updateThreats(state, LEVEL, threats, dt, now);

  const cell = getMapCell(LEVEL, state.player.x, state.player.y);
  if (cell === "X") {
    state.mode = "complete";
    state.message = state.story?.exit || "Mission complete. The route is secured.";
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
