import { ASSET_MANIFEST, listAssetEntries } from "../src/asset-manifest.js";
import { GEAR_LIST } from "../src/gear-list.js";
import { PICKUP_LIST } from "../src/pickup-list.js";
import { THREAT_LIST } from "../src/threat-list.js";

const failures = [];
const entries = listAssetEntries();
const keys = new Set();

for (const entry of entries) {
  if (!entry.key) failures.push("asset entry missing key");
  if (!entry.src) failures.push(`${entry.key || "unknown"}: missing src`);
  if (entry.key && keys.has(entry.key)) failures.push(`${entry.key}: duplicate asset key`);
  if (entry.key) keys.add(entry.key);
}

for (const gear of GEAR_LIST) {
  if (!keys.has(`weapon.${gear.id}`)) failures.push(`${gear.id}: missing weapon asset entry`);
}

for (const pickup of PICKUP_LIST) {
  if (!keys.has(`pickup.${pickup.id}`)) failures.push(`${pickup.id}: missing pickup asset entry`);
}

for (const threat of THREAT_LIST) {
  const key = `enemy.${threat.id.replace("spider_mite_swarm", "spider_mite").replace("powdery_mildew_ghoul", "mildew_ghoul")}`;
  if (!keys.has(key)) failures.push(`${threat.id}: missing enemy asset entry`);
}

if (!ASSET_MANIFEST.environment) failures.push("missing environment asset group");
if (!ASSET_MANIFEST.pickups) failures.push("missing pickup asset group");
if (!ASSET_MANIFEST.enemies) failures.push("missing enemy asset group");
if (!ASSET_MANIFEST.weapons) failures.push("missing weapon asset group");

if (failures.length) {
  console.error("V2 asset check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`V2 asset check passed for ${entries.length} entries.`);
}
