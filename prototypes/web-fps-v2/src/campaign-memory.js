import { readJson, writeJson } from "./browser-store.js";

const KEY = "terpocalypse_v2_campaign";

export function loadCampaignMemory() {
  return readJson(KEY, {
    unlocked: 0,
    finished: [],
    bestScore: 0,
    notes: []
  });
}

export function storeCampaignMemory(memory) {
  return writeJson(KEY, memory);
}

export function rememberScore(memory, score) {
  memory.bestScore = Math.max(memory.bestScore || 0, score || 0);
  storeCampaignMemory(memory);
}

export function rememberLevelFinished(memory, levelIndex, score = 0) {
  if (!memory.finished.includes(levelIndex)) memory.finished.push(levelIndex);
  memory.unlocked = Math.max(memory.unlocked || 0, levelIndex + 1);
  rememberScore(memory, score);
}

export function rememberLoreNote(memory, noteId) {
  if (!noteId) return;
  if (!memory.notes.includes(noteId)) memory.notes.push(noteId);
  storeCampaignMemory(memory);
}
