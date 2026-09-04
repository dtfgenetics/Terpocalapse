export function drawFirstPersonTool(ctx, canvas, state) {
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
