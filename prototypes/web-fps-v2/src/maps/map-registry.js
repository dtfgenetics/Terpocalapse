import { MAP_01_VEG_LAB } from "./map-01-veg-lab.js";
import { MAP_02_CLONE_ROOM } from "./map-02-clone-room.js";
import { MAP_03_NUTRIENT_RESERVOIR } from "./map-03-nutrient-reservoir.js";
import { MAP_04_SPIDER_SECTOR } from "./map-04-spider-sector.js";
import { MAP_05_FLOWER_CHAMBER } from "./map-05-flower-chamber.js";
import { MAP_06_CURE_VAULT } from "./map-06-cure-vault.js";
import { MAP_07_ROSIN_REACTOR } from "./map-07-rosin-reactor.js";
import { MAP_08_SEED_BANK } from "./map-08-seed-bank.js";
import { MAP_09_MOLD_DEN } from "./map-09-mold-den.js";

export const MAP_REGISTRY = [
  MAP_01_VEG_LAB,
  MAP_02_CLONE_ROOM,
  MAP_03_NUTRIENT_RESERVOIR,
  MAP_04_SPIDER_SECTOR,
  MAP_05_FLOWER_CHAMBER,
  MAP_06_CURE_VAULT,
  MAP_07_ROSIN_REACTOR,
  MAP_08_SEED_BANK,
  MAP_09_MOLD_DEN
];

export function getMapById(id) {
  return MAP_REGISTRY.find((map) => map.id === id) || null;
}
