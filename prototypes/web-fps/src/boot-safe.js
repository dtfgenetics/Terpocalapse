import { preloadRegisteredAssets, getMissingAssets } from "./asset-registry.js";
import { AudioManager } from "./audio.js";
import { logPrototypeValidation } from "./runtime-checks.js";
import { emitGameHubEvent } from "./game-hub-api.js";

const runtime = {
  validationPassed: logPrototypeValidation(),
  audio: new AudioManager(),
  assetCache: {},
  missingAssets: getMissingAssets(),
  emitGameHubEvent,
  build: "veg-lab-release-candidate"
};

window.terpocalypseRuntime = runtime;

preloadRegisteredAssets().then((loadedAssets) => {
  Object.assign(runtime.assetCache, loadedAssets);
  runtime.missingAssets = getMissingAssets();
  const script = document.createElement("script");
  script.type = "module";
  script.src = "./src/main-v2.js";
  document.body.appendChild(script);
}).catch((error) => {
  console.error("Terpocalypse asset preload failed", error);
  const script = document.createElement("script");
  script.type = "module";
  script.src = "./src/main-v2.js";
  document.body.appendChild(script);
});
