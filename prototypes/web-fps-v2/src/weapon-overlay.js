export function drawFirstPersonTool(ctx, canvas, state, now = performance.now()) {
  if (state.storyPanel || state.mode === "menu") return;
  const tool = state.tools?.equipped || "trim_shears";
  const sinceUse = now - (state.tools?.lastUseAt || 0);
  const recoilWindow = 150;
  const recoilT = Math.max(0, Math.min(1, 1 - sinceUse / recoilWindow));
  const reducedMotion = state.settings?.reducedMotion === true;
  const recoil = reducedMotion ? 0 : Math.sin(recoilT * Math.PI) * 24;
  const bob = reducedMotion || !state.isSprinting ? 0 : Math.sin(now / 90) * 4;
  const recentUse = sinceUse < 90;
  const scale = Math.max(0.72, Math.min(1.25, canvas.width / 960));
  const x = canvas.width * 0.66 + bob * scale;
  const y = canvas.height - (18 + recoil + Math.abs(bob) * 0.6) * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(reducedMotion ? 0 : -recoil * 0.0015);
  ctx.scale(scale, scale);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#101610";
  ctx.shadowColor = "rgba(124, 255, 91, 0.24)";
  ctx.shadowBlur = 16;

  if (tool === "trim_shears") drawTrimShears(ctx);
  else if (tool === "ph_blaster") drawPhBlaster(ctx);
  else if (tool === "neem_cannon") drawNeemCannon(ctx);
  else if (tool === "co2_burst_rifle") drawCo2Rifle(ctx);
  else if (tool === "terp_torch") drawTerpTorch(ctx);
  else if (tool === "rosin_railgun") drawRosinRailgun(ctx);
  else if (tool === "kief_grenades") drawKiefGrenades(ctx);
  else if (tool === "trichome_reaper") drawTrichomeReaper(ctx);
  else drawGenericTool(ctx);

  if (recentUse) drawMuzzleFlash(ctx, tool);

  ctx.restore();
}

function drawTrimShears(ctx) {
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
}

function drawPhBlaster(ctx) {
  ctx.fillStyle = "#2f4858";
  ctx.fillRect(-55, -78, 130, 62);
  ctx.strokeRect(-55, -78, 130, 62);
  ctx.fillStyle = "#66d9ff";
  ctx.fillRect(-26, -63, 58, 14);
  ctx.fillStyle = "#17272e";
  ctx.fillRect(-14, -16, 42, 72);
  ctx.fillStyle = "#7cff5b";
  ctx.fillRect(72, -66, 45, 26);
}

function drawNeemCannon(ctx) {
  ctx.fillStyle = "#355d35";
  ctx.fillRect(-70, -92, 158, 74);
  ctx.strokeRect(-70, -92, 158, 74);
  ctx.fillStyle = "#9cff6e";
  ctx.fillRect(72, -78, 72, 40);
  ctx.fillStyle = "#213821";
  ctx.fillRect(-12, -20, 48, 82);
  ctx.fillStyle = "#ffc857";
  ctx.fillRect(-45, -72, 58, 18);
}

function drawCo2Rifle(ctx) {
  ctx.fillStyle = "#243b48";
  ctx.fillRect(-78, -76, 166, 50);
  ctx.strokeRect(-78, -76, 166, 50);
  ctx.fillStyle = "#70c7ff";
  ctx.fillRect(82, -65, 78, 24);
  ctx.fillStyle = "#d8f6ff";
  ctx.fillRect(-52, -92, 44, 18);
  ctx.fillStyle = "#17272e";
  ctx.fillRect(-6, -26, 44, 78);
}

function drawTerpTorch(ctx) {
  ctx.fillStyle = "#4f3424";
  ctx.fillRect(-58, -76, 128, 58);
  ctx.strokeRect(-58, -76, 128, 58);
  ctx.fillStyle = "#ff8c2f";
  ctx.fillRect(64, -64, 74, 28);
  ctx.fillStyle = "#ffc857";
  ctx.fillRect(-40, -63, 52, 14);
  ctx.fillStyle = "#271c14";
  ctx.fillRect(-10, -18, 46, 74);
}

function drawRosinRailgun(ctx) {
  ctx.fillStyle = "#3f3420";
  ctx.fillRect(-86, -82, 182, 54);
  ctx.strokeRect(-86, -82, 182, 54);
  ctx.fillStyle = "#ffc857";
  ctx.fillRect(78, -68, 92, 20);
  ctx.fillRect(-62, -96, 120, 10);
  ctx.fillStyle = "#1f1b13";
  ctx.fillRect(-2, -26, 52, 84);
}

function drawKiefGrenades(ctx) {
  ctx.fillStyle = "#4c4728";
  ctx.fillRect(-44, -54, 86, 40);
  ctx.strokeRect(-44, -54, 86, 40);
  ctx.fillStyle = "#ffd166";
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.arc(-22 + i * 28, -78, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.fillStyle = "#1f1b13";
  ctx.fillRect(-8, -14, 48, 66);
}

function drawTrichomeReaper(ctx) {
  ctx.fillStyle = "#dfe8df";
  ctx.fillRect(-76, -82, 150, 44);
  ctx.strokeRect(-76, -82, 150, 44);
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(82, -60, 34, -Math.PI * 0.7, Math.PI * 0.7);
  ctx.stroke();
  ctx.fillStyle = "#b36bff";
  ctx.fillRect(-38, -70, 82, 12);
  ctx.fillStyle = "#141b14";
  ctx.fillRect(-4, -32, 50, 90);
}

function drawGenericTool(ctx) {
  ctx.fillStyle = "#455a4a";
  ctx.fillRect(-65, -80, 150, 64);
  ctx.strokeRect(-65, -80, 150, 64);
}

function drawMuzzleFlash(ctx, tool) {
  ctx.fillStyle = tool === "terp_torch" ? "rgba(255, 140, 47, 0.86)" : "rgba(255, 200, 87, 0.82)";
  ctx.beginPath();
  ctx.moveTo(128, -78);
  ctx.lineTo(174, -102);
  ctx.lineTo(154, -62);
  ctx.lineTo(178, -38);
  ctx.lineTo(126, -48);
  ctx.closePath();
  ctx.fill();
}
