import { GEAR_LIST } from "../src/gear-list.js";
import { GEAR_BALANCE } from "../src/gear-balance.js";
import { STARTING_LOADOUT } from "../src/player-loadout.js";

const failures = [];
const gearIds = new Set(GEAR_LIST.map((gear) => gear.id));

for (const gear of GEAR_LIST) {
  const balance = GEAR_BALANCE[gear.id];
  if (!balance) failures.push(`${gear.id}: missing balance data`);
  if (balance && !Number.isFinite(balance.slot)) failures.push(`${gear.id}: missing slot`);
  if (balance && !Number.isFinite(balance.power)) failures.push(`${gear.id}: missing power`);
  if (balance && !Number.isFinite(balance.reach)) failures.push(`${gear.id}: missing reach`);
  if (balance && !Number.isFinite(balance.cooldownMs)) failures.push(`${gear.id}: missing cooldownMs`);
}

for (const id of Object.keys(GEAR_BALANCE)) {
  if (!gearIds.has(id)) failures.push(`${id}: balance exists but gear list entry is missing`);
}

for (const tool of STARTING_LOADOUT.tools) {
  if (!gearIds.has(tool)) failures.push(`${tool}: starting tool is not in gear list`);
}

if (failures.length > 0) {
  console.error("V2 gear validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("V2 gear validation passed.");
}
