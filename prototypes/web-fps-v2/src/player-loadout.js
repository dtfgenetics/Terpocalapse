export const STARTING_LOADOUT = {
  profile: "Seed Runner",
  health: 100,
  armor: 0,
  special: 50,
  tools: ["trim_shears"],
  unlockedSlots: [1],
  ammo: {
    light: 24,
    heavy: 4,
    fuel: 0,
    grenade: 0,
    special: 1
  },
  keys: {
    green: false,
    purple: false,
    gold: false
  }
};

export const PLAYER_UPGRADES = [
  { id: "deep_pockets", name: "Deep Pockets", benefit: "carry more ammo" },
  { id: "steady_hands", name: "Steady Hands", benefit: "better precision" },
  { id: "trichome_charge", name: "Trichome Charge", benefit: "faster special recovery" },
  { id: "kief_plating", name: "Kief Plating", benefit: "stronger armor cap" }
];
