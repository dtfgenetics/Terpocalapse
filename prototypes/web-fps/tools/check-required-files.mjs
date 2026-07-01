import { existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const required = [
  "index.html",
  "styles.css",
  "README.md",
  "src/main.js",
  "src/game-data.js",
  "src/bootstrap.js",
  "src/asset-registry.js",
  "src/audio.js",
  "src/runtime-checks.js",
  "src/game-hub-api.js"
];

const missing = required.filter((file) => !existsSync(join(root, file)));

if (missing.length) {
  console.error("Missing required Terpocalypse files:");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exitCode = 1;
} else {
  console.log("All required Terpocalypse files are present.");
}
