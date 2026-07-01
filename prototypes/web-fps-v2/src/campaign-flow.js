export const CAMPAIGN_FLOW = [
  { level: "The Veg Lab", unlocks: ["ph_blaster", "green_keycard"] },
  { level: "Clone Room Panic", unlocks: ["neem_cannon"] },
  { level: "Nutrient Reservoir", unlocks: ["co2_burst_rifle"] },
  { level: "Spider Mite Sector", unlocks: ["kief_armor_bonus"] },
  { level: "Flower Chamber", unlocks: ["terp_torch", "purple_keycard"] },
  { level: "Cure Vault", unlocks: ["rare_seed_pack_bonus"] },
  { level: "Rosin Reactor", unlocks: ["rosin_railgun"] },
  { level: "Seed Bank Siege", unlocks: ["gold_keycard", "trichome_reaper"] },
  { level: "Mold Mother's Den", unlocks: ["episode_clear"] }
];

export function getCampaignStep(index) {
  return CAMPAIGN_FLOW[index] || null;
}
