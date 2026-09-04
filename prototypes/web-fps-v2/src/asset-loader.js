import { listAssetEntries } from "./asset-manifest.js";

export function createAssetStore() {
  return new Map();
}

export async function preloadAssets(store, entries = listAssetEntries()) {
  if (typeof Image === "undefined") return store;
  await Promise.all(entries.map((entry) => loadImage(store, entry)));
  return store;
}

export function getLoadedImage(store, key) {
  const record = store?.get(key);
  return record?.status === "ready" ? record.image : null;
}

function loadImage(store, entry) {
  return new Promise((resolve) => {
    const image = new Image();
    store.set(entry.key, { status: "loading", image: null, entry });
    image.onload = () => {
      store.set(entry.key, { status: "ready", image, entry });
      resolve();
    };
    image.onerror = () => {
      store.set(entry.key, { status: "fallback", image: null, entry });
      resolve();
    };
    image.src = entry.src;
  });
}
