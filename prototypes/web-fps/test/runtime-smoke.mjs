import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runPrototypeValidation } from "../src/runtime-checks.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const html = await readFile(resolve(root, "index.html"), "utf8");
const boot = await readFile(resolve(root, "src/boot-safe.js"), "utf8");
const app = await readFile(resolve(root, "src/main-v2.js"), "utf8");
const mission = await readFile(resolve(root, "src/mission-core.js"), "utf8");
const css = await readFile(resolve(root, "styles-v2.css"), "utf8");

assert.deepEqual(runPrototypeValidation(), []);
assert.match(boot, /main-v2\.js/);
assert.match(html, /styles-v2\.css/);
assert.match(html, /The Veg Lab/);
assert.match(app, /Terpocalypse Veg Lab release-candidate runtime initialized/);
assert.match(app, /calculateCompletionScore/);
assert.match(app, /createRunStats/);
assert.match(app, /saveBestRun/);
assert.match(app, /data-hold/);
assert.match(mission, /canExtract/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /pointer:coarse/);

for (const id of [
  "game","overlay","startButton","toast","missionPanel","objectiveList","missionTime","missionKills",
  "pauseButton","restartButton","gameMenu","runSummary","runSummaryTitle","runSummaryCopy","runSummaryStats","summaryRestart","mobileControls"
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `Missing required DOM id #${id}`);
}

for (const marker of ["KeyW","KeyA","KeyS","KeyD","TurnLeft","TurnRight","shoot","use","special","shears","phBlaster","neemCannon"]) {
  assert.ok(html.includes(marker), `Missing mobile/control marker ${marker}`);
}

console.log(JSON.stringify({
  ok: true,
  runtime: "Terpocalypse Veg Lab release candidate",
  mission: "keycard -> door -> threats -> extraction",
  mobileControls: true,
  prototypeValidationErrors: 0
}, null, 2));
