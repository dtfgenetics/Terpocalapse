export function projectWorldPoint(state, canvas, worldX, worldY, fov = Math.PI / 3) {
  const dx = worldX - state.player.x;
  const dy = worldY - state.player.y;
  const distance = Math.hypot(dx, dy);
  const angleToPoint = Math.atan2(dy, dx);
  const relative = normalizeSigned(angleToPoint - state.player.angle);

  if (Math.abs(relative) > fov / 2) return null;

  const screenX = canvas.width * (0.5 + relative / fov);
  const cameraDepth = distance * Math.cos(relative);
  const size = Math.min(canvas.height, 18000 / Math.max(1, cameraDepth));
  const screenY = canvas.height * 0.5 - size * 0.35;

  return { screenX, screenY, size, distance, cameraDepth, relative };
}

export function normalizeSigned(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}
