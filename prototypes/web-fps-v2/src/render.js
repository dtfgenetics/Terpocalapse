export function fitCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function paint(ctx, canvas, state, level) {
  ctx.fillStyle = "#020503";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (state.damageFlashUntil && performance.now() < state.damageFlashUntil) {
    ctx.fillStyle = "rgba(255, 95, 126, 0.16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (state.specialFlashUntil && performance.now() < state.specialFlashUntil) {
    ctx.fillStyle = "rgba(124, 255, 91, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

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

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(30 + (state.player.x / level.tileSize) * size, 30 + (state.player.y / level.tileSize) * size, 4, 0, Math.PI * 2);
  ctx.fill();

  const activeThreats = (state.threats || []).filter((threat) => !threat.cleared).length;
  const equipped = state.tools?.equipped || "trim_shears";
  const equippedLabel = equipped.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const ammo = state.ammo || {};
  const progress = state.progress?.labels?.[state.progress.current] || "Reach the exit chamber";

  ctx.fillStyle = "#7cff5b";
  ctx.font = "20px monospace";
  ctx.fillText("Terpocalypse V2", 24, canvas.height - 286);
  ctx.fillText("Goal " + progress, 24, canvas.height - 258);
  ctx.fillText("Tool " + equippedLabel, 24, canvas.height - 230);
  ctx.fillText("Ammo L" + (ammo.light || 0) + " H" + (ammo.heavy || 0) + " F" + (ammo.fuel || 0) + " G" + (ammo.grenade || 0), 24, canvas.height - 202);
  ctx.fillText("HP " + state.player.hp + "  Armor " + state.player.armor + "  Special " + (state.player.special || 0), 24, canvas.height - 174);
  ctx.fillText("Score " + state.player.score + "  Pickups " + state.stats.pickups, 24, canvas.height - 146);
  ctx.fillText("Threats " + activeThreats + "  Cleared " + state.stats.cleared, 24, canvas.height - 118);
  ctx.fillText("Keycard: " + (state.keyOpen ? "READY" : "NEEDED"), 24, canvas.height - 90);
  ctx.fillText("Mouse: " + (state.pointerLocked ? "LOCKED" : "CLICK CANVAS"), 24, canvas.height - 62);
  ctx.fillStyle = state.mode === "complete" ? "#ffc857" : state.mode === "failed" ? "#ff5f7e" : "#ffffff";
  ctx.fillText(state.message || level.goal, 24, canvas.height - 34);

  if (state.storyPanel) drawStoryPanel(ctx, canvas, state.storyPanel);
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
