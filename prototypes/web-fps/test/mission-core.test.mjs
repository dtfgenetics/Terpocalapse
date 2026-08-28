import assert from "node:assert/strict";
import { accuracyPercent, calculateCompletionScore, canExtract, completionBlocker, formatRunTime, getMissionObjectives } from "../src/mission-core.js";

assert.equal(canExtract({ hasGreenKey: false, doorOpen: false, enemiesRemaining: 4 }), false);
assert.equal(completionBlocker({ hasGreenKey: false, doorOpen: false, enemiesRemaining: 4 }), "Recover the green keycard first.");
assert.equal(completionBlocker({ hasGreenKey: true, doorOpen: false, enemiesRemaining: 4 }), "Unlock the quarantine door first.");
assert.equal(completionBlocker({ hasGreenKey: true, doorOpen: true, enemiesRemaining: 1 }), "1 grow-room threat remains.");
assert.equal(completionBlocker({ hasGreenKey: true, doorOpen: true, enemiesRemaining: 3 }), "3 grow-room threats remain.");
assert.equal(completionBlocker({ hasGreenKey: true, doorOpen: true, enemiesRemaining: 0 }), null);
assert.equal(canExtract({ hasGreenKey: true, doorOpen: true, enemiesRemaining: 0 }), true);

const objectives = getMissionObjectives({ hasGreenKey: true, doorOpen: false, enemiesRemaining: 2 });
assert.equal(objectives.length, 4);
assert.equal(objectives[0].complete, true);
assert.equal(objectives[1].complete, false);
assert.match(objectives[2].label, /2 left/);

assert.equal(accuracyPercent(0, 0), 100);
assert.equal(accuracyPercent(10, 7), 70);
assert.equal(accuracyPercent(10, 99), 100);
assert.equal(formatRunTime(0), "0:00");
assert.equal(formatRunTime(61_900), "1:01");

const fast = calculateCompletionScore({ baseScore: 1000, hp: 100, armor: 50, timeMs: 30_000, shots: 10, hits: 10, pickups: 8 });
const slow = calculateCompletionScore({ baseScore: 1000, hp: 20, armor: 0, timeMs: 180_000, shots: 20, hits: 5, pickups: 2 });
assert.ok(fast.total > slow.total);
assert.equal(fast.accuracy, 100);
assert.equal(slow.accuracy, 25);

console.log("Terpocalypse mission-core tests passed.");
