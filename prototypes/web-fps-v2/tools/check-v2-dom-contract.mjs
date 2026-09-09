import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const requiredIds = [
  "game",
  "menu",
  "startButton",
  "touchControls",
  "gameHud",
  "hudObjective",
  "hudHp",
  "hudArmor",
  "hudSpecial",
  "hudTool",
  "hudAmmo",
  "hudScore",
  "hudMessage"
];

const missing = requiredIds.filter((id) => !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`));

if (missing.length) {
  console.error("V2 DOM contract check failed:");
  for (const id of missing) console.error(`- missing #${id}`);
  process.exitCode = 1;
} else {
  console.log("V2 DOM contract check passed.");
}
