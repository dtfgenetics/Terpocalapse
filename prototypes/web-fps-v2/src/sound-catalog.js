export const SOUND_CATALOG = {
  ui_continue: "assets/audio/ui-continue.ogg",
  ui_pause: "assets/audio/ui-pause.ogg",
  pickup_basic: "assets/audio/pickup-basic.ogg",
  pickup_keycard: "assets/audio/pickup-keycard.ogg",
  pickup_lore: "assets/audio/pickup-lore.ogg",
  tool_shears: "assets/audio/tool-shears.ogg",
  tool_blaster: "assets/audio/tool-blaster.ogg",
  tool_spray: "assets/audio/tool-spray.ogg",
  tool_beam: "assets/audio/tool-beam.ogg",
  special_burst: "assets/audio/special-burst.ogg",
  player_hit: "assets/audio/player-hit.ogg",
  route_access: "assets/audio/route-access.ogg",
  level_complete: "assets/audio/level-complete.ogg",
  run_failed: "assets/audio/run-failed.ogg"
};

export function getSoundPath(id) {
  return SOUND_CATALOG[id] || null;
}
