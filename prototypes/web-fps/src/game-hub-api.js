const STORAGE_PREFIX = "terpocalypse";

export function readBestRun(levelId = "level_01_the_veg_lab") {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:best:${levelId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBestRun({ levelId = "level_01_the_veg_lab", score = 0, timeMs = 0, kills = 0, pickups = 0 }) {
  const current = readBestRun(levelId);
  const candidate = { levelId, score, timeMs, kills, pickups, savedAt: new Date().toISOString() };
  const shouldSave = !current || score > current.score || (score === current.score && timeMs < current.timeMs);
  if (shouldSave) {
    localStorage.setItem(`${STORAGE_PREFIX}:best:${levelId}`, JSON.stringify(candidate));
    return candidate;
  }
  return current;
}

export function emitGameHubEvent(type, detail = {}) {
  const event = new CustomEvent("terpocalypse:game-event", {
    detail: {
      type,
      game: "terpocalypse",
      timestamp: Date.now(),
      ...detail
    }
  });
  window.dispatchEvent(event);
}

export function createRunStats() {
  return {
    levelId: "level_01_the_veg_lab",
    startedAt: performance.now(),
    endedAt: null,
    shotsFired: 0,
    hits: 0,
    kills: 0,
    pickups: 0,
    damageTaken: 0,
    secretsFound: 0,
    score: 0
  };
}

export function completeRunStats(stats, score) {
  const endedAt = performance.now();
  return {
    ...stats,
    endedAt,
    score,
    timeMs: Math.round(endedAt - stats.startedAt)
  };
}
