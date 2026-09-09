import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = join(root, "src");
const files = ["src/app.js", "src/render.js", "src/wall-view.js", "src/depth-sampler.js", "src/action-system.js", "src/tool-system.js"];
const failures = [];

for (const file of files) {
  const absolute = join(root, file);
  if (!existsSync(absolute)) {
    failures.push(`${file}: missing`);
    continue;
  }

  const source = readFileSync(absolute, "utf8");
  const importMatches = source.matchAll(/from\s+["'](\.\.?\/[^"']+)["']/g);
  for (const match of importMatches) {
    const target = normalize(join(dirname(absolute), match[1]));
    const targetFile = target.endsWith(".js") ? target : `${target}.js`;
    if (!targetFile.startsWith(srcRoot) || !existsSync(targetFile)) {
      failures.push(`${file}: unresolved import ${match[1]}`);
    }
  }
}

if (failures.length) {
  console.error("V2 import check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("V2 import check passed.");
}
