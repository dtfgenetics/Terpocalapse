import { GEAR_BALANCE } from "../src/gear-balance.js";
import { STARTING_LOADOUT } from "../src/player-loadout.js";
import { PICKUP_LIST } from "../src/pickup-list.js";

const failures = [];
const pickupIds = new Set(PICKUP_LIST.map((item) => item.id));
const supplyByAmmo = {
  light: "light_ammo_box",
  heavy: "heavy_ammo_box",
  fuel: "fuel_ammo_can",
  grenade: "grenade_ammo_cache"
};

for (const [toolId, balance] of Object.entries(GEAR_BALANCE)) {
  if (!Number.isInteger(balance.slot)) failures.push(`${toolId}: missing numeric slot`);
  if (!Number.isFinite(balance.power)) failures.push(`${toolId}: missing power`);
  if (!Number.isFinite(balance.reach)) failures.push(`${toolId}: missing reach`);
  if (!Number.isFinite(balance.cooldownMs)) failures.push(`${toolId}: missing cooldownMs`);

  if (!balance.ammo) continue;
  if (balance.ammo === "special") continue;

  if (!(balance.ammo in STARTING_LOADOUT.ammo)) {
    failures.push(`${toolId}: ammo type ${balance.ammo} missing from starting loadout ammo object`);
  }

  const pickupId = supplyByAmmo[balance.ammo];
  if (!pickupId) failures.push(`${toolId}: ammo type ${balance.ammo} has no supply mapping`);
  else if (!pickupIds.has(pickupId)) failures.push(`${toolId}: supply pickup ${pickupId} missing from pickup list`);
}

if (failures.length) {
  console.error("V2 ammo check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("V2 ammo check passed.");
}
