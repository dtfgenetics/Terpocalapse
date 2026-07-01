import { sampleDepth } from "./depth-sampler.js";
import { wallHeightFromDistance } from "./view-math.js";

const FOV = Math.PI / 3;
const COLUMNS = 96;

export function drawWallView(ctx, canvas, state, level) {
  const horizon = canvas.height * 0.45;
  ctx.fillStyle = "#06140b";
  ctx.fillRect(0, 0, canvas.width, horizon);
  ctx.fillStyle = "#10150f";
  ctx.fillRect(0, horizon, canvas.width, canvas.height - horizon);

  const columnWidth = canvas.width / COLUMNS;
  for (let i = 0; i < COLUMNS; i += 1) {
    const t = i / (COLUMNS - 1);
    const angle = state.player.angle - FOV / 2 + t * FOV;
    const hit = sampleDepth(level, state.player.x, state.player.y, angle, 900, state);
    const corrected = hit.distance * Math.cos(angle - state.player.angle);
    const wallHeight = wallHeightFromDistance(corrected, level.tileSize, 520, canvas.height);
    const shade = Math.max(38, 180 - corrected * 0.13);
    ctx.fillStyle = hit.cell === "D"
      ? `rgb(${Math.floor(shade * 0.65)}, ${Math.floor(shade)}, ${Math.floor(shade * 0.45)})`
      : `rgb(${Math.floor(shade * 0.3)}, ${Math.floor(shade * 0.72)}, ${Math.floor(shade * 0.42)})`;
    ctx.fillRect(i * columnWidth, horizon - wallHeight / 2, columnWidth + 1, wallHeight);
  }
}
