import test from "node:test";
import assert from "node:assert/strict";
import { updateThreats } from "../src/threat-system.js";

const TILE = 64;

function makeState({ keyOpen = false } = {}) {
  return {
    mode: "running",
    keyOpen,
    player: { x: 3.5 * TILE, y: 1.5 * TILE, hp: 100, armor: 0, score: 0 },
    stats: { cleared: 0 },
    message: ""
  };
}

function makeThreat() {
  return {
    id: "mite_0",
    type: "spider_mite_swarm",
    name: "Spider Mite Swarm",
    x: 1.5 * TILE,
    y: 1.5 * TILE,
    radius: 12,
    health: 30,
    maxHealth: 30,
    speed: 96,
    pressure: 1,
    range: 10,
    points: 100,
    cleared: false,
    lastPressureAt: 0
  };
}

function runSteps(state, level, threat, count = 30) {
  for (let i = 0; i < count; i += 1) updateThreats(state, level, [threat], 0.1, 1_000 + i * 100);
}

test("threats cannot phase through solid walls while pursuing the player", () => {
  const level = {
    tileSize: TILE,
    map: [
      "#####",
      "#.#.#",
      "#...#",
      "#####"
    ]
  };
  const state = makeState();
  const threat = makeThreat();

  runSteps(state, level, threat);

  assert.ok(threat.x < 2 * TILE, `threat crossed wall boundary at x=${threat.x}`);
  assert.equal(Math.floor(threat.x / TILE), 1);
});

test("closed route doors block threats until route access is open", () => {
  const level = {
    tileSize: TILE,
    map: [
      "#####",
      "#.D.#",
      "#...#",
      "#####"
    ]
  };
  const state = makeState({ keyOpen: false });
  const threat = makeThreat();

  runSteps(state, level, threat, 20);
  assert.equal(Math.floor(threat.x / TILE), 1, "threat crossed a closed route door");

  state.keyOpen = true;
  runSteps(state, level, threat, 30);
  assert.ok(threat.x > 2.2 * TILE, "threat did not resume pursuit after route access opened");
});

test("threats still advance normally across open floor", () => {
  const level = {
    tileSize: TILE,
    map: [
      "#####",
      "#...#",
      "#...#",
      "#####"
    ]
  };
  const state = makeState();
  const threat = makeThreat();
  const startX = threat.x;

  updateThreats(state, level, [threat], 0.25, 1_000);

  assert.ok(threat.x > startX, "threat should move toward the player on open floor");
});
