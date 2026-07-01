export function fitCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function paint(ctx, canvas, state, level) {
  ctx.fillStyle = "#020503";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  ctx.fillStyle = "#7cff5b";
  ctx.font = "20px monospace";
  ctx.fillText("Terpocalypse V2", 24, canvas.height - 230);
  ctx.fillText("Tool " + equippedLabel, 24, canvas.height - 202);
  ctx.fillText("Ammo L" + (ammo.light || 0) + " H" + (ammo.heavy || 0) + " F" + (ammo.fuel || 0) + " G" + (ammo.grenade || 0), 24, canvas.height - 174);
  ctx.fillText("HP " + state.player.hp + "  Armor " + state.player.armor, 24, canvas.height - 146);
  ctx.fillText("Score " + state.player.score + "  Pickups " + state.stats.pickups, 24, canvas.height - 118);
  ctx.fillText("Threats " + activeThreats + "  Cleared " + state.stats.cleared, 24, canvas.height - 90);
  ctx.fillText("Keycard: " + (state.keyOpen ? "READY" : "NEEDED"), 24, canvas.height - 62);
  ctx.fillStyle = state.mode === "complete" ? "#ffc857" : state.mode === "failed" ? "#ff5f7e" : "#ffffff";
  ctx.fillText(state.message || level.goal, 24, canvas.height - 34);
}
