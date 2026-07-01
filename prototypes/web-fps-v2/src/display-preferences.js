export function allowFlashes(settings = {}) {
  return settings.flashingEffects !== false;
}

export function allowMotion(settings = {}) {
  return settings.reducedMotion !== true;
}

export function useHighContrast(settings = {}) {
  return settings.highContrastHud === true;
}
