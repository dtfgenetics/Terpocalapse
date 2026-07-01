import { getSoundPath } from "./sound-catalog.js";
import { drainSounds } from "./sound-queue.js";

export function createSoundPlayer(settings = {}) {
  return {
    muted: false,
    volume: Math.max(0, Math.min(1, Number(settings.soundVolume ?? 6) / 10)),
    cache: new Map()
  };
}

export function playQueuedSounds(player, queue) {
  if (!player || player.muted) return;
  for (const cue of drainSounds(queue)) {
    const path = getSoundPath(cue.id);
    if (!path) continue;
    const audio = getAudio(player, path);
    if (!audio) continue;
    audio.volume = player.volume;
    audio.currentTime = 0;
    audio.play?.().catch?.(() => {});
  }
}

function getAudio(player, path) {
  if (player.cache.has(path)) return player.cache.get(path);
  try {
    const audio = new Audio(path);
    player.cache.set(path, audio);
    return audio;
  } catch {
    return null;
  }
}
