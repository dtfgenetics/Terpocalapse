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
      ctx.fillStyle = cell === "#" ? "#24482f" : cell === "D" ? "#7cff5b" : cell === "X" ? "#ffc857" : "#111";
      ctx.fillRect(30 + x * size, 30 + y * size, size - 1, size - 1);
    }
  }

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(30 + (state.player.x / level.tileSize) * size, 30 + (state.player.y / level.tileSize) * size, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#7cff5b";
  ctx.font = "20px monospace";
  ctx.fillText("Terpocalypse V2", 24, canvas.height - 72);
  ctx.fillText(`HP ${state.player.hp}  Score ${state.player.score}`, 24, canvas.height - 42);
}
