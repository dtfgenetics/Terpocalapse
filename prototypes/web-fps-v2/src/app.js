import { LEVEL, PLAYER_DEFAULTS } from "./data.js";
import { createInitialState, startRun, updateClock } from "./state.js";
import { safeMove } from "./map.js";
import { fitCanvas, paint } from "./render.js";

const canvas = document.getElementById("game");
const menu = document.getElementById("menu");
const startButton = document.getElementById("startButton");
const ctx = canvas.getContext("2d");
const state = createInitialState();
const keys = new Set();
let last = performance.now();

state.player.x = LEVEL.playerStart.x;
state.player.y = LEVEL.playerStart.y;
state.player.angle = LEVEL.playerStart.angle;
state.player.radius = PLAYER_DEFAULTS.radius;
state.player.hp = PLAYER_DEFAULTS.hp;
state.player.armor = PLAYER_DEFAULTS.armor;
state.player.special = PLAYER_DEFAULTS.special;

window.addEventListener("resize", () => fitCanvas(canvas));
window.addEventListener("keydown", (event) => keys.add(event.code));
window.addEventListener("keyup", (event) => keys.delete(event.code));

startButton.addEventListener("click", () => {
  startRun(state);
  menu.classList.add("hidden");
});

function update(dt) {
  if (state.mode !== "running") return;
  const speed = PLAYER_DEFAULTS.moveSpeed * dt;
  let dx = 0;
  let dy = 0;
  if (keys.has("KeyW") || keys.has("ArrowUp")) dy -= speed;
  if (keys.has("KeyS") || keys.has("ArrowDown")) dy += speed;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) dx -= speed;
  if (keys.has("KeyD") || keys.has("ArrowRight")) dx += speed;
  safeMove(LEVEL, state.player, dx, dy, false);
  updateClock(state);
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  update(dt);
  paint(ctx, canvas, state, LEVEL);
  requestAnimationFrame(frame);
}

fitCanvas(canvas);
requestAnimationFrame(frame);
