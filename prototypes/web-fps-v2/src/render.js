import { buildHudLines } from "./hud-lines.js";
import { drawWallView } from "./wall-view.js";
import { projectWorldPoint } from "./projection-math.js";

export function fitCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function paint(ctx, canvas, state, level) {
  drawWallView(ctx, canvas, state, level);
  drawProjectedMarkers(ctx, canvas, state);

  if (state.damageFlashUntil && performance.now() < state.damageFlashUntil) {
    ctx.fillStyle = "rgba(255, 95, 126, 0.16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (state.specialFlashUntil && performance.now() < state.specialFlashUntil) {
    ctx.fillStyle = "rgba(124, 255, 91, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (state.settings?.debugMiniMap !== false) {
    drawDebugMap(ctx, state, level);
  }

  drawHudLines(ctx, canvas, state, level);

  if (state.storyPanel) drawStoryPanel(ctx, canvas, state.storyPanel);
}

function drawDebugMap(ctx, state, level) {
  ctx.fillStyle = "#071006";
  ctx.fillRect(20, 20, 220, 180);

  const size = 16;
  for (let y = 0; y < level.map.length; y += 1) {
    for (let x = 0; x < level.map[y].length; x += 1) {
      const cell = level.map[y][x];
      ctx.fillStyle = cell === "#" ? "#24482f" : cell === "D" ? "#7cff5b" : cell === "K" ? "#17351d" : cell === "X" ? "#ffc857" : "#111";
      ctx.fillRect(30 + x * size, 30 + y * size, size - 1, size - 1);
    }
  }

  for (const pickup of state.pickups || []) {
    if (pickup.collected) continue;
    ctx.fillStyle = pickup.color || "#ffffff";
    ctx.beginPath();
    ctx.arc(30 + (pickup.x / level.tileSize) * size, 30 + (pickup.y / level.tileSize) * size, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const threat of state.threats || []) {
    if (threat.cleared) continue;
    ctx.fillStyle = threat.color || "#ff8c2f";
    ctx.fillRect(30 + (threat.x / level.tileSize) * size - 4, 30 + (threat.y / level.tileSize) * size - 4, 8, 8);
  }

  drawMapEffects(ctx, state, level, size);

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(30 + (state.player.x / level.tileSize) * size, 30 + (state.player.y / level.tileSize) * size, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawProjectedMarkers(ctx, canvas, state) {
  const items = [];
  for (const pickup of state.pickups || []) if (!pickup.collected) items.push(pickup);
  for (const threat of state.threats || []) if (!threat.cleared) items.push(threat);
  items.sort((a, b) => Math.hypot(b.x - state.player.x, b.y - state.player.y) - Math.hypot(a.x - state.player.x, a.y - state.player.y));
  for (const item of items) {
    const projected = projectWorldPoint(state, canvas, item.x, item.y);
    if (!projected) continue;
    const size = Math.max(8, Math.min(80, projected.size));
    ctx.fillStyle = item.color || "#ffffff";
    ctx.fillRect(projected.screenX - size / 2, projected.screenY - size / 2, size, size);
  }
}

function drawMapEffects(ctx, state, level, size) {
  for (const effect of state.effects || []) {
    ctx.strokeStyle = effect.color || "#ffffff";
    ctx.lineWidth = 2;
    if (effect.type === "line") {
      ctx.beginPath();
      ctx.moveTo(30 + (effect.fromX / level.tileSize) * size, 30 + (effect.fromY / level.tileSize) * size);
      ctx.lineTo(30 + (effect.toX / level.tileSize) * size, 30 + (effect.toY / level.tileSize) * size);
      ctx.stroke();
    }
    if (effect.type === "pulse") {
      ctx.beginPath();
      ctx.arc(30 + (effect.x / level.tileSize) * size, 30 + (effect.y / level.tileSize) * size, 7, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawHudLines(ctx, canvas, state, level) {
  const lines = buildHudLines(state);
  ctx.fillStyle = "#7cff5b";
  ctx.font = "20px monospace";
  let y = canvas.height - 286;
  for (const line of lines) {
    ctx.fillText(line, 24, y);
    y += 28;
  }
  ctx.fillStyle = state.mode === "complete" ? "#ffc857" : state.mode === "failed" ? "#ff5f7e" : "#ffffff";
  ctx.fillText(state.message || level.goal, 24, canvas.height - 34);
}

function drawStoryPanel(ctx, canvas, panel) {
  const width = Math.min(canvas.width - 80, 820);
  const height = Math.min(canvas.height - 80, 360);
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  ctx.fillStyle = "rgba(0, 0, 0, 0.86)";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#7cff5b";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);

  ctx.fillStyle = "#ffc857";
  ctx.font = "28px monospace";
  ctx.fillText(panel.title, x + 28, y + 48);

  ctx.fillStyle = "#ffffff";
  ctx.font = "18px monospace";
  let lineY = y + 92;
  for (const line of panel.lines || []) {
    for (const wrapped of wrapText(ctx, line, width - 56)) {
      ctx.fillText(wrapped, x + 28, lineY);
      lineY += 26;
    }
    lineY += 8;
  }

  ctx.fillStyle = "#7cff5b";
  ctx.font = "16px monospace";
  ctx.fillText(panel.hint || "Press Enter", x + 28, y + height - 28);
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
