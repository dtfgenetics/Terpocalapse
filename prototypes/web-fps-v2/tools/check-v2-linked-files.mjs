import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const failures = [];

for (const href of html.matchAll(/<link[^>]+href=["']([^"']+)["']/g)) {
  checkPath(href[1], "stylesheet");
}

for (const src of html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)) {
  checkPath(src[1], "script");
}

function checkPath(path, label) {
  if (!path.startsWith("./")) return;
  const absolute = normalize(join(root, path));
  if (!absolute.startsWith(root) || !existsSync(absolute)) {
    failures.push(`missing ${label}: ${path}`);
  }
}

if (failures.length) {
  console.error("V2 linked-file check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("V2 linked-file check passed.");
}
