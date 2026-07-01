import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

const requiredFiles = [
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

const forbiddenTerms = [
  "doom.wad",
  "id Software",
  "Imp",
  "Cacodemon",
  "Cyberdemon",
  "BFG",
  "Doomguy"
];

const failures = [];

for (const file of requiredFiles) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) failures.push(`Missing required file: ${file}`);
}

for (const file of requiredFiles.filter((file) => file.endsWith(".js") || file.endsWith(".html") || file.endsWith(".css") || file.endsWith(".md"))) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) continue;
  const content = readFileSync(fullPath, "utf8");
  for (const term of forbiddenTerms) {
    if (content.includes(term)) failures.push(`Forbidden term '${term}' found in ${file}`);
  }
}

if (failures.length > 0) {
  console.error("Terpocalypse project audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Terpocalypse project audit passed.");
