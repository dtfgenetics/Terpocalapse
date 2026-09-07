export const MOVEMENT_DEFAULTS = {
  walkSpeed: 145,
  sprintMultiplier: 1.45,
  turnSpeed: 2.4,
  strafeMultiplier: 0.86
};

export function updatePlayerMovement({ state, level, keys, dt, moveFn }) {
  const sprinting = keys.has("ShiftLeft") || keys.has("ShiftRight");
  const speed = MOVEMENT_DEFAULTS.walkSpeed * (sprinting ? MOVEMENT_DEFAULTS.sprintMultiplier : 1) * dt;
  const turnStep = MOVEMENT_DEFAULTS.turnSpeed * dt;

  if (keys.has("ArrowLeft") || keys.has("KeyQ")) state.player.angle -= turnStep;
  if (keys.has("ArrowRight") || keys.has("KeyE")) state.player.angle += turnStep;

  const forward = Number(keys.has("KeyW") || keys.has("ArrowUp")) - Number(keys.has("KeyS") || keys.has("ArrowDown"));
  const strafe = Number(keys.has("KeyD")) - Number(keys.has("KeyA"));

  const cos = Math.cos(state.player.angle);
  const sin = Math.sin(state.player.angle);
  const forwardX = cos * forward * speed;
  const forwardY = sin * forward * speed;
  const strafeX = Math.cos(state.player.angle + Math.PI / 2) * strafe * speed * MOVEMENT_DEFAULTS.strafeMultiplier;
  const strafeY = Math.sin(state.player.angle + Math.PI / 2) * strafe * speed * MOVEMENT_DEFAULTS.strafeMultiplier;

  moveFn(level, state.player, forwardX + strafeX, forwardY + strafeY, state);
  state.isSprinting = sprinting;
}
