import { MAP_REGISTRY } from "./maps/map-registry.js";
import { SPAWN_REGISTRY } from "./spawn-plans/spawn-registry.js";
import { MISSION_BRIEFINGS } from "./story/mission-briefings.js";
import { LEVEL_STORY_BEATS } from "./story/level-story-beats.js";

export function loadLevelByIndex(index = 0) {
  const sourceMap = MAP_REGISTRY[index] || MAP_REGISTRY[0];
  const level = normalizeMap(sourceMap);
  const spawnPlan = SPAWN_REGISTRY.find((plan) => plan.level === level.name) || null;
  const key = toStoryKey(level.name);

  return {
    level,
    sourceMap,
    spawnPlan,
    briefing: MISSION_BRIEFINGS[key] || level.notes || "Secure the route.",
    story: LEVEL_STORY_BEATS[key] || null
  };
}

export function normalizeMap(sourceMap) {
  const tileSize = sourceMap.tileSize || 64;
  const start = sourceMap.start || { x: 1.5, y: 1.5, angle: 0 };

  return {
    id: sourceMap.id,
    name: sourceMap.title,
    goal: sourceMap.notes || "Reach the exit chamber.",
    notes: sourceMap.notes || "",
    tileSize,
    map: sourceMap.layout || sourceMap.map || [],
    playerStart: {
      x: start.x * tileSize,
      y: start.y * tileSize,
      angle: start.angle || 0
    }
  };
}

export function toStoryKey(title) {
  return title.replaceAll(" ", "_").replaceAll("'", "");
}
