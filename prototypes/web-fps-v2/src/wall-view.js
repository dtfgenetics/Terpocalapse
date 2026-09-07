import { sampleDepth } from "./depth-sampler.js";
import { wallHeightFromDistance } from "./view-math.js";

export const VIEW_FOV = Math.PI / 3;
export const VIEW_COLUMNS = 128;

export function drawWallView(ctx, canvas, state, level) {
  const horizon = canvas.height * 0.45;
  ctx.fillStyle = "#06140b";
  ctx.fillRect(0, 0, canvas.width, horizon);
  ctx.fillStyle = "#10150f";
  ctx.fillRect(0, horizon, canvas.width, canvas.height - horizon);

  const columnWidth = canvas.width / VIEW_COLUMNS;
  const depthBuffer = new Float32Array(VIEW_COLUMNS);

  for (let i = 0; i < VIEW_COLUMNS; i += 1) {
    const t = i / (VIEW_COLUMNS - 1);
    const angle = state.player.angle - VIEW_FOV / 2 + t * VIEW_FOV;
    const hit = sampleDepth(level, state.player.x, state.player.y, angle, 900, state);
    const corrected = Math.max(0.001, hit.distance * Math.cos(angle - state.player.angle));
    depthBuffer[i] = corrected;

    const wallHeight = wallHeightFromDistance(corrected, level.tileSize, 520, canvas.height);
    const distanceShade = Math.max(38, 188 - corrected * 0.13);
    const sideShade = hit.side === "y" ? 0.78 : 1;
    const shade = distanceShade * sideShade;

    ctx.fillStyle = hit.cell === "D"
      ? `rgb(${Math.floor(shade * 0.68)}, ${Math.floor(shade)}, ${Math.floor(shade * 0.43)})`
      : `rgb(${Math.floor(shade * 0.3)}, ${Math.floor(shade * 0.72)}, ${Math.floor(shade * 0.42)})`;
    ctx.fillRect(i * columnWidth, horizon - wallHeight / 2, columnWidth + 1, wallHeight);

    const seam = Math.max(0, Math.min(1, ((hit.x + hit.y) / level.tileSize) % 1));
    if (seam < 0.06 || seam > 0.94) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(i * columnWidth, horizon - wallHeight / 2, Math.max(1, columnWidth * 0.18), wallHeight);
    }
  }

  return { depthBuffer, fov: VIEW_FOV, columns: VIEW_COLUMNS };
}
