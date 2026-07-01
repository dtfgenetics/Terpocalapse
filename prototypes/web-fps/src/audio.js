export const SOUND_IDS = {
  start: "start",
  pickup: "pickup",
  denied: "denied",
  door: "door",
  playerHit: "playerHit",
  enemyHit: "enemyHit",
  enemyDeath: "enemyDeath",
  noAmmo: "noAmmo",
  special: "special",
  win: "win",
  loss: "loss",
  shears: "shears",
  phBlaster: "phBlaster",
  neemCannon: "neemCannon",
  nuteProjectile: "nuteProjectile"
};

export const AUDIO_MANIFEST = {
  start: { path: "../../assets/audio/sfx/ui-start-v01.mp3", status: "missing" },
  pickup: { path: "../../assets/audio/sfx/pickup-v01.mp3", status: "missing" },
  denied: { path: "../../assets/audio/sfx/door-denied-v01.mp3", status: "missing" },
  door: { path: "../../assets/audio/sfx/door-open-v01.mp3", status: "missing" },
  playerHit: { path: "../../assets/audio/sfx/player-hit-v01.mp3", status: "missing" },
  enemyHit: { path: "../../assets/audio/sfx/enemy-hit-v01.mp3", status: "missing" },
  enemyDeath: { path: "../../assets/audio/sfx/enemy-death-v01.mp3", status: "missing" },
  noAmmo: { path: "../../assets/audio/sfx/no-ammo-v01.mp3", status: "missing" },
  special: { path: "../../assets/audio/sfx/trichome-burst-v01.mp3", status: "missing" },
  win: { path: "../../assets/audio/sfx/mission-complete-v01.mp3", status: "missing" },
  loss: { path: "../../assets/audio/sfx/player-down-v01.mp3", status: "missing" },
  shears: { path: "../../assets/audio/sfx/trim-shears-v01.mp3", status: "missing" },
  phBlaster: { path: "../../assets/audio/sfx/ph-blaster-v01.mp3", status: "missing" },
  neemCannon: { path: "../../assets/audio/sfx/neem-cannon-v01.mp3", status: "missing" },
  nuteProjectile: { path: "../../assets/audio/sfx/nute-projectile-v01.mp3", status: "missing" }
};

export class AudioManager {
  constructor({ volume = 0.45 } = {}) {
    this.volume = volume;
    this.enabled = true;
    this.cache = new Map();
  }

  async preload(manifest = AUDIO_MANIFEST) {
    const entries = Object.entries(manifest);
    await Promise.all(entries.map(async ([id, info]) => {
      if (!info.path || info.status === "missing") return;
      const audio = new Audio(info.path);
      audio.preload = "auto";
      audio.volume = this.volume;
      this.cache.set(id, audio);
    }));
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    for (const audio of this.cache.values()) audio.volume = this.volume;
  }

  mute() {
    this.enabled = false;
  }

  unmute() {
    this.enabled = true;
  }

  play(id) {
    if (!this.enabled) return;
    const audio = this.cache.get(id);
    if (!audio) return;
    const instance = audio.cloneNode(true);
    instance.volume = this.volume;
    instance.play().catch(() => {});
  }
}
