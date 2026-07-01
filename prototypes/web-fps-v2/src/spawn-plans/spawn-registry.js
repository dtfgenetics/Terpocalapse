import { SPAWN_PLAN_01 } from "./spawn-plan-01.js";
import { SPAWN_PLAN_02 } from "./spawn-plan-02.js";
import { SPAWN_PLAN_03 } from "./spawn-plan-03.js";
import { SPAWN_PLAN_04 } from "./spawn-plan-04.js";
import { SPAWN_PLAN_05 } from "./spawn-plan-05.js";
import { SPAWN_PLAN_06 } from "./spawn-plan-06.js";
import { SPAWN_PLAN_07 } from "./spawn-plan-07.js";
import { SPAWN_PLAN_08 } from "./spawn-plan-08.js";
import { SPAWN_PLAN_09 } from "./spawn-plan-09.js";

export const SPAWN_REGISTRY = [
  SPAWN_PLAN_01,
  SPAWN_PLAN_02,
  SPAWN_PLAN_03,
  SPAWN_PLAN_04,
  SPAWN_PLAN_05,
  SPAWN_PLAN_06,
  SPAWN_PLAN_07,
  SPAWN_PLAN_08,
  SPAWN_PLAN_09
];

export function getSpawnPlan(levelTitle) {
  return SPAWN_REGISTRY.find((plan) => plan.level === levelTitle) || null;
}
