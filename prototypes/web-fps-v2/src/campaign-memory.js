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
