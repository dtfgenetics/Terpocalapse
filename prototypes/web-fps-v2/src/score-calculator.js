export function calculateScore(state) {
  const base = state.player?.score || 0;
  const pickupBonus = (state.stats?.pickups || 0) * 25;
  const healthBonus = Math.max(0, state.player?.hp || 0) * 5;
  const armorBonus = Math.max(0, state.player?.armor || 0) * 3;
  const finishBonus = state.mode === "complete" ? 1000 : 0;
  return base + pickupBonus + healthBonus + armorBonus + finishBonus;
}

export function calculateGrade(score) {
  if (score >= 9000) return "S";
  if (score >= 7000) return "A";
  if (score >= 5000) return "B";
  if (score >= 3000) return "C";
  return "D";
}
