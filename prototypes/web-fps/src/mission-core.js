export const LEVEL_ID = "level_01_the_veg_lab";

export function getMissionObjectives({ hasGreenKey = false, doorOpen = false, enemiesRemaining = 0 } = {}) {
  return [
    { id: "keycard", label: "Recover the green keycard", complete: Boolean(hasGreenKey) },
    { id: "door", label: "Unlock the quarantine door", complete: Boolean(doorOpen) },
    {
      id: "threats",
      label: enemiesRemaining > 0 ? `Clear grow-room threats (${enemiesRemaining} left)` : "Clear grow-room threats",
      complete: enemiesRemaining === 0
    },
    { id: "extract", label: "Reach the extraction chamber", complete: false }
  ];
}

export function canExtract({ hasGreenKey = false, doorOpen = false, enemiesRemaining = 0 } = {}) {
  return Boolean(hasGreenKey && doorOpen && enemiesRemaining === 0);
}

export function completionBlocker(state = {}) {
  if (!state.hasGreenKey) return "Recover the green keycard first.";
  if (!state.doorOpen) return "Unlock the quarantine door first.";
  if ((state.enemiesRemaining ?? 0) > 0) {
    const count = state.enemiesRemaining;
    return `${count} grow-room ${count === 1 ? "threat remains" : "threats remain"}.`;
  }
  return null;
}

export function accuracyPercent(shots = 0, hits = 0) {
  if (!shots) return 100;
  return Math.max(0, Math.min(100, Math.round((hits / shots) * 100)));
}

export function calculateCompletionScore({ baseScore = 0, hp = 0, armor = 0, timeMs = 0, shots = 0, hits = 0, pickups = 0 } = {}) {
  const accuracy = accuracyPercent(shots, hits);
  const survivalBonus = Math.max(0, Math.round(hp)) * 4 + Math.max(0, Math.round(armor)) * 2;
  const accuracyBonus = accuracy * 5;
  const pickupBonus = Math.max(0, pickups) * 35;
  const seconds = Math.max(0, timeMs) / 1000;
  const speedBonus = Math.max(0, Math.round(1500 - seconds * 8));
  return {
    total: Math.max(0, Math.round(baseScore + survivalBonus + accuracyBonus + pickupBonus + speedBonus)),
    baseScore: Math.round(baseScore), survivalBonus, accuracyBonus, pickupBonus, speedBonus, accuracy
  };
}

export function formatRunTime(timeMs = 0) {
  const totalSeconds = Math.max(0, Math.floor(timeMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
