import { MAP_REGISTRY } from "./maps/map-registry.js";
import { SPAWN_REGISTRY } from "./spawn-plans/spawn-registry.js";
import { MISSION_BRIEFINGS } from "./story/mission-briefings.js";
import { LEVEL_STORY_BEATS } from "./story/level-story-beats.js";

export function loadLevelByIndex(index = 0) {
  const map = MAP_REGISTRY[index] || MAP_REGISTRY[0];
  const spawnPlan = SPAWN_REGISTRY.find((plan) => plan.level === map.title) || null;
  const key = map.title.replaceAll(" ", "_").replaceAll("'", "");
  return {
    map,
    spawnPlan,
    briefing: MISSION_BRIEFINGS[key] || map.notes || "Secure the route.",
    story: LEVEL_STORY_BEATS[key] || null
  };
}
