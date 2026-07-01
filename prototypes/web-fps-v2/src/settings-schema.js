export const SETTINGS_SCHEMA = {
  mouseSensitivity: { label: "Mouse Sensitivity", type: "range", min: 1, max: 10, default: 5 },
  soundVolume: { label: "Sound Volume", type: "range", min: 0, max: 10, default: 6 },
  musicVolume: { label: "Music Volume", type: "range", min: 0, max: 10, default: 5 },
  fullscreen: { label: "Fullscreen", type: "toggle", default: false },
  highContrastHud: { label: "High Contrast HUD", type: "toggle", default: false },
  showLabels: { label: "Show Item Labels", type: "toggle", default: true },
  subtitles: { label: "Subtitles", type: "toggle", default: true },
  reducedMotion: { label: "Reduced Motion", type: "toggle", default: false },
  screenShake: { label: "Screen Shake", type: "toggle", default: true },
  flashingEffects: { label: "Flashing Effects", type: "toggle", default: true }
};
