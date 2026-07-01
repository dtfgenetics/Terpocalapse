export const ENEMY_TYPES = {
  spiderMiteSwarm: {
    id: "spiderMiteSwarm",
    name: "Spider Mite Swarm",
    role: "fast pest pressure",
    hp: 45,
    speed: 70,
    damage: 8,
    color: "#d94833"
  },
  powderyMildewGhoul: {
    id: "powderyMildewGhoul",
    name: "Powdery Mildew Ghoul",
    role: "slow mold pressure",
    hp: 95,
    speed: 36,
    damage: 14,
    color: "#dfe7df"
  },
  nuteBurnSprayer: {
    id: "nuteBurnSprayer",
    name: "Nute Burn Sprayer",
    role: "ranged nutrient pressure",
    hp: 75,
    speed: 30,
    damage: 12,
    color: "#ff8c2f"
  }
};

export const PICKUP_TYPES = {
  cureJarHealth: {
    id: "cureJarHealth",
    name: "Cure Jar Health",
    type: "health",
    amount: 35,
    color: "#ff5f7e"
  },
  kiefArmor: {
    id: "kiefArmor",
    name: "Kief Armor",
    type: "armor",
    amount: 35,
    color: "#ffc857"
  },
  growLightOverdrive: {
    id: "growLightOverdrive",
    name: "Grow Light Overdrive",
    type: "special",
    amount: 45,
    color: "#ffffff"
  },
  greenKeycard: {
    id: "greenKeycard",
    name: "Green Keycard",
    type: "key",
    key: "green",
    color: "#7cff5b"
  }
};
