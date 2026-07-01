export const GAME_TITLE = "Terpocalypse";
export const GAME_SUBTITLE = "Grow Room From Hell";

export const LEVEL = {
  id: "veg_lab",
  name: "The Veg Lab",
  goal: "Find the green keycard and reach the exit chamber.",
  tileSize: 64,
  map: [
    "##########",
    "#........#",
    "#..K.....#",
    "#........#",
    "#....D...#",
    "#........#",
    "#.......X#",
    "##########"
  ],
  playerStart: { x: 96, y: 96, angle: 0 }
};

export const PLAYER_DEFAULTS = {
  radius: 14,
  moveSpeed: 145,
  turnSpeed: 2.3,
  hp: 100,
  armor: 0,
  ammo: 24,
  special: 50
};
