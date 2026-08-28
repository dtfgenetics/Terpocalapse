import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const port = 4173;
const server = spawn("python3", ["-m", "http.server", String(port), "--directory", root], { stdio: "ignore" });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error("Terpocalypse test server did not start.");
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  desktop.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  desktop.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
  await desktop.goto(`http://127.0.0.1:${port}/?qa=1`, { waitUntil: "networkidle" });
  await desktop.waitForFunction(() => Boolean(window.terpocalypseQa));
  await desktop.click("#startButton");
  await desktop.waitForFunction(() => window.terpocalypseQa?.snapshot().mode === "running");

  const start = await desktop.evaluate(() => window.terpocalypseQa.snapshot());
  assert.equal(start.mode, "running");
  assert.equal(start.enemiesRemaining, 4);
  assert.equal(start.greenKey, false);
  assert.equal(await desktop.locator("#missionPanel").isVisible(), true);

  await desktop.evaluate(() => window.terpocalypseQa.completeMission());
  await desktop.waitForFunction(() => window.terpocalypseQa?.snapshot().mode === "win");
  assert.equal(await desktop.locator("#runSummary").isVisible(), true);
  const finished = await desktop.evaluate(() => window.terpocalypseQa.snapshot());
  assert.equal(finished.enemiesRemaining, 0);
  assert.ok(finished.score > 0);
  assert.deepEqual(errors, []);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobileErrors = [];
  mobile.on("pageerror", (error) => mobileErrors.push(error.message));
  mobile.on("console", (message) => { if (message.type() === "error") mobileErrors.push(message.text()); });
  await mobile.goto(`http://127.0.0.1:${port}/?qa=1`, { waitUntil: "networkidle" });
  await mobile.waitForFunction(() => Boolean(window.terpocalypseQa));
  await mobile.click("#startButton");
  await mobile.waitForFunction(() => window.terpocalypseQa?.snapshot().mode === "running");
  const display = await mobile.locator("#mobileControls").evaluate((node) => getComputedStyle(node).display);
  assert.notEqual(display, "none");
  const overflow = await mobile.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth));
  assert.ok(overflow <= 1, `Mobile overflow is ${overflow}px`);
  assert.deepEqual(mobileErrors, []);

  console.log(JSON.stringify({
    ok: true,
    desktop: "1280x900",
    mobile: "390x844",
    missionStartThreats: start.enemiesRemaining,
    completionScore: finished.score,
    consoleErrors: errors.length,
    mobileOverflowPx: overflow
  }, null, 2));
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
