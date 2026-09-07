import { GEAR_BALANCE } from "./gear-balance.js";

export function bindHud(root) {
  if (!root) return () => {};

  const objective = root.querySelector("#hudObjective");
  const hp = root.querySelector("#hudHp");
  const armor = root.querySelector("#hudArmor");
  const special = root.querySelector("#hudSpecial");
  const tool = root.querySelector("#hudTool");
  const ammo = root.querySelector("#hudAmmo");
  const score = root.querySelector("#hudScore");
  const message = root.querySelector("#hudMessage");

  return function updateHud(state) {
    const visible = state.mode !== "menu" && !state.storyPanel;
    root.hidden = !visible;
    if (!visible) return;

    const goal = state.progress?.labels?.[state.progress.current] || "Containment route secured";
    const toolId = state.tools?.equipped || "trim_shears";
    const balance = GEAR_BALANCE[toolId] || GEAR_BALANCE.trim_shears;

    objective.textContent = goal;
    hp.textContent = String(Math.max(0, Math.round(state.player.hp || 0)));
    armor.textContent = String(Math.max(0, Math.round(state.player.armor || 0)));
    special.textContent = String(Math.max(0, Math.round(state.player.special || 0)));
    tool.textContent = label(toolId);
    ammo.textContent = balance.ammo ? String(state.ammo?.[balance.ammo] || 0) : "∞";
    score.textContent = String(state.player.score || 0);
    message.textContent = state.message || "";

    root.classList.toggle("is-danger", (state.player.hp || 0) <= 30);
    root.classList.toggle("is-complete", state.mode === "complete");
  };
}

function label(id) {
  return String(id || "")
    .split("_")
    .map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1) : "")
    .join(" ");
}
