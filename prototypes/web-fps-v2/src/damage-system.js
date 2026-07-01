export const DAMAGE_DEFAULTS = {
  armorAbsorbRate: 0.65,
  invulnerabilityMs: 420,
  lowHealthThreshold: 25
};

export function applyPlayerPressure(state, amount, sourceName, now = performance.now()) {
  state.lastHitAt = state.lastHitAt || 0;
  if (now - state.lastHitAt < DAMAGE_DEFAULTS.invulnerabilityMs) return false;

  state.lastHitAt = now;
  const incoming = Math.max(0, amount);
  const armorAvailable = Math.max(0, state.player.armor || 0);
  const armorBlocked = Math.min(armorAvailable, Math.ceil(incoming * DAMAGE_DEFAULTS.armorAbsorbRate));
  const healthLoss = Math.max(0, incoming - armorBlocked);

  state.player.armor = Math.max(0, armorAvailable - armorBlocked);
  state.player.hp = Math.max(0, state.player.hp - healthLoss);
  state.damageFlashUntil = now + 180;

  if (state.player.hp <= 0) {
    state.mode = "failed";
    state.message = "Run failed. The facility pushed back too hard.";
    return true;
  }

  if (state.player.hp <= DAMAGE_DEFAULTS.lowHealthThreshold) {
    state.message = `${sourceName} pressure. Low health.`;
    return true;
  }

  if (armorBlocked > 0) {
    state.message = `${sourceName} pressure. Kief Armor absorbed ${armorBlocked}.`;
  } else {
    state.message = `${sourceName} pressure.`;
  }

  return true;
}
