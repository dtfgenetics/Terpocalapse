import { MAP_REGISTRY } from "./maps/map-registry.js";
import { LEVEL_PRESENTATIONS } from "./level-presentations.js";

export function getLevelSelectItems(memory = {}) {
  const unlocked = memory.unlocked || 0;
  return MAP_REGISTRY.map((map, index) => {
    const key = map.title.replaceAll(" ", "_").replaceAll("'", "");
    const presentation = LEVEL_PRESENTATIONS[key] || {};
    return {
      index,
      id: map.id,
      title: map.title,
      label: presentation.label || `Level ${index + 1}`,
      wing: presentation.wing || "Facility Wing",
      locked: index > unlocked
    };
  });
}
