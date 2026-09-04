import { buildHudLines } from "./hud-lines.js";
import { drawWallView } from "./wall-view.js";
import { projectWorldPoint } from "./projection-math.js";
import { allowFlashes } from "./display-preferences.js";
import { gateIsOpen } from "./gate-map.js";

export function fitCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function paint(ctx, canvas, state, level) {
  drawWallView(ctx, canvas, state, level);
  drawProjectedMarkers(ctx, canvas, state);
  drawCrosshair(ctx, canvas, state);
  drawFirstPersonTool(ctx, canvas, state);

  if (allowFlashes(state.settings) && state.damageFlashUntil && performance.now() < state.damageFlashUntil) {
    ctx.fillStyle = "rgba(255, 95, 126, 0.16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (allowFlashes(state.settings) && state.specialFlashUntil && performance.now() < state.specialFlashUntil) {
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
      const openGate = cell === "D" && gateIsOpen(state.gates || [], x, y);
      ctx.fillStyle = cell === "#" ? "#24482f" : openGate ? "#102414" : cell === "D" ? "#7cff5b" : cell === "K" ? "#17351d" : cell === "X" ? "#ffc857" : "#111";
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
  for (const pickup of state.pickups || []) if (!pickup.collected) items.push({ ...pickup, renderKind: "pickup" });
  for (const threat of state.threats || []) if (!threat.cleared) items.push({ ...threat, renderKind: "threat" });
  items.sort((a, b) => Math.hypot(b.x - state.player.x, b.y - state.player.y) - Math.hypot(a.x - state.player.x, a.y - state.player.y));

  for (const item of items) {
    const projected = projectWorldPoint(state, canvas, item.x, item.y);
    if (!projected) continue;
    const size = Math.max(12, Math.min(item.renderKind === "threat" ? 116 : 74, projected.size));
    if (item.renderKind === "threat") drawThreatSprite(ctx, item, projected.screenX, projected.screenY, size);
    else drawPickupSprite(ctx, item, projected.screenX, projected.screenY, size);
  }
}

function drawThreatSprite(ctx, threat, x, y, size) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.imageSmoothingEnabled = false;
  ctx.lineWidth = Math.max(2, size * 0.035);
  ctx.strokeStyle = "#101610";

  if (threat.type === "spider_mite_swarm") {
    ctx.strokeStyle = "#35150f";
    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i += 1) {
        const yy = -size * 0.18 + i * size * 0.12;
        ctx.beginPath();
        ctx.moveTo(side * size * 0.12, yy);
        ctx.lineTo(side * size * (0.32 + i * 0.025), yy - size * 0.1 + i * size * 0.035);
        ctx.stroke();
      }
    }
    ctx.fillStyle = threat.color || "#d94833";
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.21, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffe76a";
    ctx.fillRect(-size * 0.09, -size * 0.13, size * 0.05, size * 0.05);
    ctx.fillRect(size * 0.04, -size * 0.13, size * 0.05, size * 0.05);
  } else if (threat.type === "powdery_mildew_ghoul") {
    ctx.fillStyle = "rgba(223, 231, 223, 0.18)";
    for (let i = 0; i < 7; i += 1) {
      const angle = i * 2.39;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * size * 0.34, Math.sin(angle) * size * 0.25, size * 0.06, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = threat.color || "#dfe7df";
    ctx.beginPath();
    ctx.moveTo(-size * 0.28, size * 0.32);
    ctx.lineTo(-size * 0.2, -size * 0.12);
    ctx.quadraticCurveTo(0, -size * 0.42, size * 0.2, -size * 0.12);
    ctx.lineTo(size * 0.3, size * 0.32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#6f2d87";
    ctx.fillRect(-size * 0.11, -size * 0.1, size * 0.07, size * 0.05);
    ctx.fillRect(size * 0.04, -size * 0.1, size * 0.07, size * 0.05);
  } else if (threat.type === "nute_burn_sprayer") {
    ctx.fillStyle = "#4e361e";
    ctx.fillRect(-size * 0.24, -size * 0.18, size * 0.48, size * 0.54);
    ctx.strokeRect(-size * 0.24, -size * 0.18, size * 0.48, size * 0.54);
    ctx.fillStyle = threat.color || "#ff8c2f";
    ctx.fillRect(-size * 0.17, -size * 0.08, size * 0.34, size * 0.24);
    ctx.fillStyle = "#d4ff4f";
    ctx.fillRect(-size * 0.12, -size * 0.02, size * 0.24, size * 0.06);
    ctx.fillStyle = "#8dff69";
    ctx.fillRect(size * 0.18, -size * 0.12, size * 0.32, size * 0.08);
    ctx.fillRect(size * 0.42, -size * 0.17, size * 0.08, size * 0.18);
  } else {
    ctx.fillStyle = threat.color || "#ff8c2f";
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  const healthRatio = threat.maxHealth ? Math.max(0, threat.health / threat.maxHealth) : 1;
  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(-size * 0.34, size * 0.43, size * 0.68, Math.max(4, size * 0.055));
  ctx.fillStyle = healthRatio > 0.35 ? "#7cff5b" : "#ff5f7e";
  ctx.fillRect(-size * 0.34, size * 0.43, size * 0.68 * healthRatio, Math.max(4, size * 0.055));
  ctx.restore();
}

function drawPickupSprite(ctx, pickup, x, y, size) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.imageSmoothingEnabled = false;
  ctx.lineWidth = Math.max(2, size * 0.035);
  ctx.strokeStyle = "rgba(4, 10, 5, 0.95)";
  ctx.shadowColor = pickup.color || "#ffffff";
  ctx.shadowBlur = Math.max(5, size * 0.18);

  if (pickup.id.endsWith("keycard")) {
    ctx.fillStyle = pickup.color;
    ctx.fillRect(-size * 0.32, -size * 0.18, size * 0.64, size * 0.36);
    ctx.strokeRect(-size * 0.32, -size * 0.18, size * 0.64, size * 0.36);
    ctx.fillStyle = "#0d1a0e";
    ctx.fillRect(-size * 0.2, -size * 0.04, size * 0.4, size * 0.08);
  } else if (pickup.id.includes("health") || pickup.id.includes("jar")) {
    ctx.fillStyle = "rgba(225, 246, 228, 0.9)";
    ctx.fillRect(-size * 0.23, -size * 0.2, size * 0.46, size * 0.5);
    ctx.strokeRect(-size * 0.23, -size * 0.2, size * 0.46, size * 0.5);
    ctx.fillStyle = pickup.color;
    ctx.fillRect(-size * 0.18, -size * 0.04, size * 0.36, size * 0.2);
    ctx.fillStyle = "#333";
    ctx.fillRect(-size * 0.27, -size * 0.29, size * 0.54, size * 0.11);
  } else if (pickup.id.includes("ammo_box")) {
    ctx.fillStyle = pickup.color;
    ctx.fillRect(-size * 0.3, -size * 0.22, size * 0.6, size * 0.44);
    ctx.strokeRect(-size * 0.3, -size * 0.22, size * 0.6, size * 0.44);
    ctx.fillStyle = "#102016";
    ctx.fillRect(-size * 0.06, -size * 0.16, size * 0.12, size * 0.32);
    ctx.fillRect(-size * 0.16, -size * 0.06, size * 0.32, size * 0.12);
  } else if (pickup.id.startsWith("note_")) {
    ctx.fillStyle = "#e8f1df";
    ctx.fillRect(-size * 0.26, -size * 0.34, size * 0.52, size * 0.68);
    ctx.strokeRect(-size * 0.26, -size * 0.34, size * 0.52, size * 0.68);
    ctx.fillStyle = "#6f825f";
    for (let i = 0; i < 4; i += 1) ctx.fillRect(-size * 0.16, -size * 0.18 + i * size * 0.11, size * 0.32, size * 0.025);
  } else {
    ctx.fillStyle = pickup.color || "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.38);
    ctx.lineTo(size * 0.3, 0);
    ctx.lineTo(0, size * 0.38);
    ctx.lineTo(-size * 0.3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawCrosshair(ctx, canvas, state) {
  if (state.storyPanel || state.mode === "menu") return;
  const x = Math.round(canvas.width / 2);
  const y = Math.round(canvas.height / 2);
  const spread = 7;
  const arm = 8;
  ctx.save();
  ctx.strokeStyle = "rgba(240, 255, 233, 0.88)";
  ctx.lineWidth = 2;
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
  ctx.restore();
}

function drawFirstPersonTool(ctx, canvas, state) {
  if (state.storyPanel || state.mode === "menu") return;
  const tool = state.tools?.equipped || "trim_shears";
  const recentUse = performance.now() - (state.tools?.lastUseAt || 0) < 120;
  const scale = Math.max(0.72, Math.min(1.25, canvas.width / 960));
  const x = canvas.width * 0.66;
  const y = canvas.height - (recentUse ? 32 : 18) * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#101610";
  ctx.shadowColor = "rgba(124, 255, 91, 0.24)";
  ctx.shadowBlur = 16;

  if (tool === "trim_shears") {
    ctx.strokeStyle = "#dce8dd";
    ctx.beginPath();
    ctx.moveTo(-34, -12);
    ctx.lineTo(42, -104);
    ctx.moveTo(14, -10);
    ctx.lineTo(68, -94);
    ctx.stroke();
    ctx.strokeStyle = "#7cff5b";
    ctx.beginPath();
    ctx.arc(-18, -2, 24, 0, Math.PI * 2);
    ctx.arc(32, -2, 24, 0, Math.PI * 2);
    ctx.stroke();
  } else if (tool === "ph_blaster") {
    ctx.fillStyle = "#2f4858";
    ctx.fillRect(-55, -78, 130, 62);
    ctx.strokeRect(-55, -78, 130, 62);
    ctx.fillStyle = "#66d9ff";
    ctx.fillRect(-26, -63, 58, 14);
    ctx.fillStyle = "#17272e";
    ctx.fillRect(-14, -16, 42, 72);
    ctx.fillStyle = "#7cff5b";
    ctx.fillRect(72, -66, 45, 26);
  } else if (tool === "neem_cannon") {
    ctx.fillStyle = "#355d35";
    ctx.fillRect(-70, -92, 158, 74);
    ctx.strokeRect(-70, -92, 158, 74);
    ctx.fillStyle = "#9cff6e";
    ctx.fillRect(72, -78, 72, 40);
    ctx.fillStyle = "#213821";
    ctx.fillRect(-12, -20, 48, 82);
    ctx.fillStyle = "#ffc857";
    ctx.fillRect(-45, -72, 58, 18);
  } else {
    ctx.fillStyle = "#455a4a";
    ctx.fillRect(-65, -80, 150, 64);
    ctx.strokeRect(-65, -80, 150, 64);
  }

  if (recentUse) {
    ctx.fillStyle = "rgba(255, 200, 87, 0.82)";
    ctx.beginPath();
    ctx.moveTo(128, -78);
    ctx.lineTo(174, -102);
    ctx.lineTo(154, -62);
    ctx.lineTo(178, -38);
    ctx.lineTo(126, -48);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
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
