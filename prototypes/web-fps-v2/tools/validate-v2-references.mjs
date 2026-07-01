import { SPAWN_REGISTRY } from "../src/spawn-plans/spawn-registry.js";
import { THREAT_LIST } from "../src/threat-list.js";
import { PICKUP_LIST } from "../src/pickup-list.js";
import { GEAR_LIST } from "../src/gear-list.js";
import { LORE_NOTES } from "../src/story/lore-notes.js";

const threatIds = new Set(THREAT_LIST.map((item) => item.id));
const pickupIds = new Set(PICKUP_LIST.map((item) => item.id));
const gearIds = new Set(GEAR_LIST.map((item) => item.id));
const loreIds = new Set(LORE_NOTES.map((item) => item.id));
const failures = [];

for (const plan of SPAWN_REGISTRY) {
  for (const id of plan.threats || []) {
    if (!threatIds.has(id)) failures.push(`${plan.level}: unknown threat ${id}`);
  }

  for (const id of plan.pickups || []) {
    if (!pickupIds.has(id) && !gearIds.has(id)) failures.push(`${plan.level}: unknown pickup or gear ${id}`);
  }

  for (const id of plan.lore || []) {
    if (!loreIds.has(id)) failures.push(`${plan.level}: unknown lore note ${id}`);
  }
}

if (failures.length > 0) {
  console.error("V2 reference validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("V2 reference validation passed.");
}
