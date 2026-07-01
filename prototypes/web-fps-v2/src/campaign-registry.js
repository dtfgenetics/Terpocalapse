import { LEVEL_ONE_PLAN } from "./level-one-plan.js";
import { LEVEL_TWO_PLAN } from "./level-two-plan.js";
import { LEVEL_THREE_PLAN } from "./level-three-plan.js";
import { LEVEL_FOUR_PLAN } from "./level-four-plan.js";
import { LEVEL_FIVE_PLAN } from "./level-five-plan.js";
import { LEVEL_SIX_PLAN } from "./level-six-plan.js";
import { LEVEL_SEVEN_PLAN } from "./level-seven-plan.js";
import { LEVEL_EIGHT_PLAN } from "./level-eight-plan.js";
import { LEVEL_NINE_PLAN } from "./level-nine-plan.js";

export const CAMPAIGN_REGISTRY = [
  LEVEL_ONE_PLAN,
  LEVEL_TWO_PLAN,
  LEVEL_THREE_PLAN,
  LEVEL_FOUR_PLAN,
  LEVEL_FIVE_PLAN,
  LEVEL_SIX_PLAN,
  LEVEL_SEVEN_PLAN,
  LEVEL_EIGHT_PLAN,
  LEVEL_NINE_PLAN
];

export function getCampaignLevel(index) {
  return CAMPAIGN_REGISTRY[index] || null;
}
