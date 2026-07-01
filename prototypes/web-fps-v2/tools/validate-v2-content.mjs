import { MAP_REGISTRY } from "../src/maps/map-registry.js";
import { SPAWN_REGISTRY } from "../src/spawn-plans/spawn-registry.js";
import { MISSION_BRIEFINGS } from "../src/story/mission-briefings.js";

const failures = [];

for (const map of MAP_REGISTRY) {
  const rows = map.layout || map.map || [];
  const width = rows[0]?.length || 0;
  const key = map.title.replaceAll(" ", "_").replaceAll("'", "");

  if (!map.id) failures.push(`${map.title || "unknown"}: missing id`);
  if (!map.title) failures.push(`${map.id || "unknown"}: missing title`);
  if (!Array.isArray(rows) || rows.length === 0) failures.push(`${map.title}: missing layout rows`);
  if (!map.start) failures.push(`${map.title}: missing start`);
  if (!MISSION_BRIEFINGS[key]) failures.push(`${map.title}: missing mission briefing`);
  if (!SPAWN_REGISTRY.find((plan) => plan.level === map.title)) failures.push(`${map.title}: missing spawn plan`);

  rows.forEach((row, index) => {
    if (row.length !== width) failures.push(`${map.title}: row ${index} width mismatch`);
  });

  if (!rows.some((row) => row.includes("X"))) failures.push(`${map.title}: missing exit marker`);
}

if (failures.length > 0) {
  console.error("V2 content validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("V2 content validation passed.");
}
