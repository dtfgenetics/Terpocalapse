import { calculateScore, calculateGrade } from "./score-calculator.js";

export function buildResultSummary(state) {
  const score = calculateScore(state);
  return {
    title: state.mode === "failed" ? "Run Failed" : "Mission Complete",
    level: state.currentLevel,
    score,
    grade: calculateGrade(score),
    pickups: state.stats?.pickups || 0,
    cleared: state.stats?.cleared || 0,
    health: state.player?.hp || 0,
    armor: state.player?.armor || 0
  };
}
