import { drawWallView } from "./wall-view.js";
import { projectWorldPoint } from "./projection-math.js";
import { allowFlashes } from "./display-preferences.js";
import { gateIsOpen } from "./gate-map.js";
import { drawThreatSprite, drawPickupSprite } from "./runtime-sprites.js";
import { drawFirstPersonTool } from "./weapon-overlay.js";

export function fitCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function paint(ctx, canvas, state, level) {
  const now = performance.now();
  const view = drawWallView(ctx, canvas, state, level);
  drawProjectedMarkers(ctx, canvas, state, view, now);
  drawCrosshair(ctx, canvas, state, now);
  drawFirstPersonTool(ctx, canvas, state, now);

  if (allowFlashes(state.settings) && state.damageFlashUntil && now < state.damageFlashUntil) {
    ctx.fillStyle = "rgba(255, 95, 126, 0.16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (allowFlashes(state.settings) && state.specialFlashUntil && now < state.specialFlashUntil) {
    ctx.fillStyle = "rgba(124, 255, 91, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (state.settings?.debugMiniMap === true) drawDebugMap(ctx, state, level);
  if (state.storyPanel) drawStoryPanel(ctx, canvas, state.storyPanel);
}

function drawProjectedMarkers(ctx, canvas, state, view, now) {
  const items = [];
  for (const pickup of state.pickups || []) if (!pickup.collected) items.push({ ...pickup, renderKind: "pickup" });
  for (const threat of state.threats || []) if (!threat.cleared) items.push({ ...threat, renderKind: "threat" });

  items.sort((a, b) =>
    Math.hypot(b.x - state.player.x, b.y - state.player.y) -
    Math.hypot(a.x - state.player.x, a.y - state.player.y)
  );

  for (const item of items) {
    const projected = projectWorldPoint(state, canvas, item.x, item.y, view.fov);
    if (!projected) continue;

    const size = Math.max(12, Math.min(item.renderKind === "threat" ? 116 : 74, projected.size));
    drawDepthClippedSprite(ctx, canvas, view, projected, size, () => {
      if (item.renderKind === "threat") drawThreatSprite(ctx, item, projected.screenX, projected.screenY, size, now);
      else drawPickupSprite(ctx, item, projected.screenX, projected.screenY, size);
    });
  }
}

function drawDepthClippedSprite(ctx, canvas, view, projected, size, drawSprite) {
  if (!view?.depthBuffer?.length || !Number.isFinite(projected.cameraDepth)) {
    drawSprite();
    return;
  }

  const halfWidth = size * 0.56;
  const left = Math.max(0, projected.screenX - halfWidth);
  const right = Math.min(canvas.width, projected.screenX + halfWidth);
  if (right <= left) return;

  const firstColumn = Math.max(0, Math.floor((left / canvas.width) * view.columns));
  const lastColumn = Math.min(view.columns - 1, Math.floor((right / canvas.width) * view.columns));
  const columnWidth = canvas.width / view.columns;
  let runStart = null;

  const flushRun = (runEnd) => {
    if (runStart === null) return;
    const clipLeft = runStart * columnWidth;
    const clipRight = Math.min(canvas.width, (runEnd + 1) * columnWidth);
    ctx.save();
    ctx.beginPath();
    ctx.rect(clipLeft, Math.max(0, projected.screenY - size * 0.7), clipRight - clipLeft, size * 1.45);
    ctx.clip();
    drawSprite();
    ctx.restore();
    runStart = null;
  };

  for (let column = firstColumn; column <= lastColumn; column += 1) {
    const wallDepth = view.depthBuffer[column];
    const visible = !Number.isFinite(wallDepth) || projected.cameraDepth <= wallDepth + 10;
    if (visible && runStart === null) runStart = column;
    if (!visible && runStart !== null) flushRun(column - 1);
  }
  flushRun(lastColumn);
}

function drawCrosshair(ctx, canvas, state, now) {
  if (state.storyPanel || state.mode === "menu") return;
  const x = Math.round(canvas.width / 2);
  const y = Math.round(canvas.height / 2);
  const hitConfirmed = now < (state.hitConfirmUntil || 0);
  const spread = hitConfirmed ? 5 : 7;
  const arm = hitConfirmed ? 10 : 8;

  ctx.save();
  ctx.strokeStyle = hitConfirmed ? "rgba(255, 200, 87, 0.98)" : "rgba(240, 255, 233, 0.88)";
  ctx.lineWidth = hitConfirmed ? 3 : 2;
  ctx.beginPath();
  ctx.moveTo(x - spread - arm, y);
  ctx.lineTo(x - spread, y);
  ctx.moveTo(x + spread, y);
  ctx.lineTo(x + spread + arm, y);
  ctx.moveTo(x, y - spread - arm);
  ctx.lineTo(x, y - spread);
  ctx.moveTo(x, y + spread);
  ctx.lineTo(x, y + spread + arm);
  ctx.stroke();

  if (hitConfirmed) {
    const d = 10;
    const m = 4;
    ctx.beginPath();
    ctx.moveTo(x - d, y - d);
    ctx.lineTo(x - m, y - m);
    ctx.moveTo(x + d, y - d);
    ctx.lineTo(x + m, y - m);
    ctx.moveTo(x - d, y + d);
    ctx.lineTo(x - m, y + m);
    ctx.moveTo(x + d, y + d);
    ctx.lineTo(x + m, y + m);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDebugMap(ctx, state, level) {
  ctx.fillStyle = "#071006";
  ctx.fillRect(20, 20, 220, 180);

  const size = 16;
  for (let y = 0; y < level.map.length; y += 1) {
    for (let x = 0; x < level.map[y].length; x += 1) {
      const cell = level.map[y][x];
      const openGate = cell === "D" && gateIsOpen(state.gates || [], x, y);
      ctx.fillStyle = cell === "#"
        ? "#24482f"
        : openGate
          ? "#102414"
          : cell === "D"
            ? "#7cff5b"
            : cell === "K"
              ? "#17351d"
              : cell === "X"
                ? "#ffc857"
                : "#111";
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
