export const TOOL_SOUNDS = {
  trim_shears: "tool_shears",
  ph_blaster: "tool_blaster",
  neem_cannon: "tool_spray",
  co2_burst_rifle: "tool_blaster",
  terp_torch: "tool_spray",
  rosin_railgun: "tool_beam",
  kief_grenades: "tool_spray",
  trichome_reaper: "tool_beam"
};

export function soundForTool(toolId) {
  return TOOL_SOUNDS[toolId] || "tool_blaster";
}
