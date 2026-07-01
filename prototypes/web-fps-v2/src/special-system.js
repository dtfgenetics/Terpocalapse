export const SPECIAL_DEFAULTS = {
  cost: 50,
  radius: 180,
  power: 90,
  cooldownMs: 1800
};

export function activateSpecial(state, threats, now = performance.now()) {
  state.lastSpecialAt = state.lastSpecialAt || 0;
  if (now - state.lastSpecialAt < SPECIAL_DEFAULTS.cooldownMs) {
    state.message = "Grow Light Overdrive is cooling down.";
    return false;
  }

  if ((state.player.special || 0) < SPECIAL_DEFAULTS.cost) {
    state.message = "Grow Light Overdrive needs more charge.";
    return false;
  }

  state.lastSpecialAt = now;
  state.player.special = Math.max(0, state.player.special - SPECIAL_DEFAULTS.cost);

  let cleared = 0;
  for (const threat of threats) {
    if (threat.cleared) continue;
    const distance = Math.hypot(threat.x - state.player.x, threat.y - state.player.y);
    if (distance > SPECIAL_DEFAULTS.radius) continue;
    threat.health = Math.max(0, threat.health - SPECIAL_DEFAULTS.power);
    if (threat.health <= 0) {
      threat.cleared = true;
      state.stats.cleared += 1;
      state.player.score += threat.points;
      cleared += 1;
    }
  }

  state.specialFlashUntil = now + 300;
  state.message = cleared > 0 ? `Grow Light Overdrive cleared ${cleared}.` : "Grow Light Overdrive burst released.";
  return true;
}

export function addSpecialCharge(state, amount) {
  state.player.special = Math.min(100, (state.player.special || 0) + amount);
  state.message = "Grow Light Overdrive charged.";
}
