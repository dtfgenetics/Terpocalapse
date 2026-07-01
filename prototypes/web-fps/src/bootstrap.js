import { preloadRegisteredAssets, getMissingAssets } from "./asset-registry.js";
import { AudioManager } from "./audio.js";
import { logPrototypeValidation } from "./runtime-checks.js";
import { emitGameHubEvent } from "./game-hub-api.js";

const validationPassed = logPrototypeValidation();
const audio = new AudioManager();
const assetCache = {};

preloadRegisteredAssets().then((loadedAssets) => {
  Object.assign(assetCache, loadedAssets);
  const missingAssets = getMissingAssets();
  window.terpocalypseRuntime = {
    validationPassed,
    audio,
    assetCache,
    missingAssets,
    emitGameHubEvent
  };
  console.info(`Terpocalypse runtime ready. Missing asset count: ${missingAssets.length}`);
});

window.terpocalypseRuntime = {
  validationPassed,
  audio,
  assetCache,
  missingAssets: getMissingAssets(),
  emitGameHubEvent
};

import "./main.js";
