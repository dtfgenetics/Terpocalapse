import { readJson, writeJson } from "./browser-store.js";

const KEY = "terpocalypse_v2_campaign";

export function loadCampaignMemory() {
  return normalizeMemory(readJson(KEY, freshMemory()));
}

export function freshMemory() {
  return {
    unlocked: 0,
    finished: [],
    bestScore: 0,
    notes: []
  };
}

export function normalizeMemory(memory) {
  const fresh = freshMemory();
  return {
    ...fresh,
    ...memory,
    unlocked: Number.isFinite(memory?.unlocked) ? memory.unlocked : fresh.unlocked,
    finished: Array.isArray(memory?.finished) ? memory.finished : fresh.finished,
    bestScore: Number.isFinite(memory?.bestScore) ? memory.bestScore : fresh.bestScore,
    notes: Array.isArray(memory?.notes) ? memory.notes : fresh.notes
  };
}

export function storeCampaignMemory(memory) {
  return writeJson(KEY, normalizeMemory(memory));
}

export function rememberScore(memory, score) {
  memory.bestScore = Math.max(memory.bestScore || 0, score || 0);
  storeCampaignMemory(memory);
}

export function rememberLevelFinished(memory, levelIndex, score = 0) {
  memory.finished = Array.isArray(memory.finished) ? memory.finished : [];
  if (!memory.finished.includes(levelIndex)) memory.finished.push(levelIndex);
  memory.unlocked = Math.max(memory.unlocked || 0, levelIndex + 1);
  rememberScore(memory, score);
}

export function rememberLoreNote(memory, noteId) {
  if (!noteId) return;
  memory.notes = Array.isArray(memory.notes) ? memory.notes : [];
  if (!memory.notes.includes(noteId)) memory.notes.push(noteId);
  storeCampaignMemory(memory);
}
