import { SETTINGS_SCHEMA } from "./settings-schema.js";

const STORAGE_KEY = "terpocalypse_v2_settings";

export function createDefaultSettings() {
  const settings = {};
  for (const [key, schema] of Object.entries(SETTINGS_SCHEMA)) {
    settings[key] = schema.default;
  }
  return settings;
}

export function loadSettings() {
  const defaults = createDefaultSettings();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw);
    return { ...defaults, ...saved };
  } catch {
    return defaults;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage can fail in private browsing or locked-down environments.
  }
}

export function getMouseLookScale(settings) {
  const sensitivity = Number(settings.mouseSensitivity ?? 5);
  return 0.0012 * Math.max(1, Math.min(10, sensitivity));
}

export function shouldShowLabels(settings) {
  return settings.showLabels !== false;
}

export function shouldUseHighContrast(settings) {
  return settings.highContrastHud === true;
}
