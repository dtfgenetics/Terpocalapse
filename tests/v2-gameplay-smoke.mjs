import assert from "node:assert/strict";
import { findGateTiles, markGateOpen } from "../prototypes/web-fps-v2/src/gate-map.js";
import { isSolid, safeMove } from "../prototypes/web-fps-v2/src/map.js";
import { sampleDepth } from "../prototypes/web-fps-v2/src/depth-sampler.js";
import { findAimedThreat } from "../prototypes/web-fps-v2/src/tool-system.js";
import { createProgress, advanceProgress, setProgressAtLeast } from "../prototypes/web-fps-v2/src/progress-system.js";
import { getEnemyAnimationState, getAnimationFrame } from "../prototypes/web-fps-v2/src/enemy-animation.js";
import { listAssetEntries } from "../prototypes/web-fps-v2/src/asset-manifest.js";

const TILE = 64;

function makeLevel(rows) {
  return { tileSize: TILE, map: rows.map((row) => row.split("")) };
}

function center(tx, ty) {
  return { x: (tx + 0.5) * TILE, y: (ty + 0.5) * TILE };
}

{
  const level = makeLevel(["#####", "#...#", "#.D.#", "#...#", "#####"]);
  const state = { keyOpen: true, gates: findGateTiles(level) };
  const door = center(2, 2);
  assert.equal(isSolid(level, door.x, door.y, state), true, "possessing a keycard must not make a closed gate non-solid");
  assert.equal(markGateOpen(state.gates, 2, 2), true, "the addressed gate should open");
  assert.equal(isSolid(level, door.x, door.y, state), false, "an explicitly opened gate must become passable");
}

{
  const level = makeLevel(["#####", "#...#", "#.D.#", "#...#", "#####"]);
  const state = { keyOpen: true, gates: findGateTiles(level) };
  const start = center(1, 2);
  const closedHit = sampleDepth(level, start.x, start.y, 0, TILE * 4, state);
  assert.equal(closedHit.cell, "D", "closed gates must block ray visibility even when the keycard is owned");
  markGateOpen(state.gates, 2, 2);
  const openHit = sampleDepth(level, start.x, start.y, 0, TILE * 4, state);
  assert.equal(openHit.cell, "#", "opened gates must allow rays to continue to the next wall");
  assert.ok(openHit.distance > closedHit.distance, "opening a gate must increase visible ray depth");
}

{
  const level = makeLevel(["#####", "#.#.#", "#...#", "#...#", "#####"]);
  const state = { gates: [], player: { ...center(1, 1), angle: 0, radius: 14 } };
  const item = { ...center(1, 1), radius: 14 };
  safeMove(level, item, TILE * 1.2, 0, state);
  assert.ok(item.x < TILE * 2, "collision movement must not phase an actor through a wall");
}

{
  const level = makeLevel(["######", "#....#", "#.##.#", "#....#", "######"]);
  const player = { ...center(1, 2), angle: 0, radius: 14 };
  const state = { gates: [], player };
  const blockedThreat = { ...center(4, 2), radius: 14, cleared: false };
  const balance = { reach: 520, ammo: "light", spread: 1 };
  assert.equal(findAimedThreat(state, level, [blockedThreat], balance), null, "weapons must not acquire targets through walls");
}

{
  const level = makeLevel(["######", "#....#", "#....#", "#....#", "######"]);
  const player = { ...center(1, 2), angle: 0, radius: 14 };
  const state = { gates: [], player };
  const visibleThreat = { ...center(3, 2), radius: 14, cleared: false };
  const offAxisThreat = { ...center(2, 3), radius: 14, cleared: false };
  const balance = { reach: 520, ammo: "light", spread: 1 };
  assert.equal(findAimedThreat(state, level, [offAxisThreat, visibleThreat], balance), visibleThreat, "weapons should prefer a visible threat inside the aim cone");
}

{
  const progress = createProgress(["Supply", "Access", "Exit"]);
  advanceProgress(progress);
  assert.equal(progress.current, 1, "the first real supply milestone should advance one objective");
  setProgressAtLeast(progress, 2);
  assert.equal(progress.current, 2, "route access should advance directly to the exit objective");
  setProgressAtLeast(progress, 1);
  assert.equal(progress.current, 2, "late lower milestones must never move mission progress backward");
  setProgressAtLeast(progress, 99);
  assert.equal(progress.current, 3, "mission completion must clamp to the objective count");
}

{
  const now = 1000;
  assert.equal(getEnemyAnimationState({ cleared: true, health: 0 }, now), "death", "cleared threats should use death state");
  assert.equal(getEnemyAnimationState({ cleared: false, health: 10, lastHitAt: 920 }, now), "hit", "recent damage should use hit state");
  assert.equal(getEnemyAnimationState({ cleared: false, health: 10, lastHitAt: 0, lastAttackAt: 900 }, now), "attack", "recent pressure should use attack state");
  assert.equal(getEnemyAnimationState({ cleared: false, health: 10, lastHitAt: 0, lastAttackAt: 0, lastMoveAt: 900 }, now), "chase", "recent real movement should use chase state");
  assert.equal(getEnemyAnimationState({ cleared: false, health: 10, lastHitAt: 0, lastAttackAt: 0, lastMoveAt: 0 }, now), "idle", "stationary threats should use idle state");
  assert.equal(getAnimationFrame(560, 4, 140, 0), 0, "animation frames should wrap deterministically");
}

{
  const entries = listAssetEntries();
  const keys = entries.map((entry) => entry.key);
  assert.ok(entries.length >= 11, "V2 asset manifest should cover environment, enemies and weapons");
  assert.equal(new Set(keys).size, keys.length, "asset manifest keys must remain unique");
  assert.ok(entries.every((entry) => entry.src && entry.key), "asset manifest entries require stable keys and source paths");
}

console.log("V2 gameplay smoke tests passed.");
