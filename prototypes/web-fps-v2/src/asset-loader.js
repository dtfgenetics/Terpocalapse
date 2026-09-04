import { listAssetEntries } from "./asset-manifest.js";

export function createAssetStore() {
  return new Map();
}

export const ASSET_STORE = createAssetStore();

export async function preloadAssets(store = ASSET_STORE, entries = listAssetEntries()) {
  if (typeof Image === "undefined") return store;
  await Promise.all(entries.map((entry) => loadImage(store, entry)));
  return store;
}

export function getLoadedImage(store, key) {
  const record = store?.get(key);
  return record?.status === "ready" ? record.image : null;
}

export function getAssetStatus(store, key) {
  return store?.get(key)?.status || "missing";
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

if (typeof window !== "undefined") preloadAssets();
