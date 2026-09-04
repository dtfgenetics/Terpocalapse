export function drawThreatSprite(ctx, threat, x, y, size) {
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

export function drawPickupSprite(ctx, pickup, x, y, size) {
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
