import { readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = collectJsFiles(join(root, "src"));
let failed = false;

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    failed = true;
    console.error(result.stderr || result.stdout);
  }
}

if (failed) {
  console.error("V2 syntax check failed.");
  process.exitCode = 1;
} else {
  console.log(`V2 syntax check passed for ${files.length} files.`);
}

function collectJsFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...collectJsFiles(path));
    else if (path.endsWith(".js")) out.push(path);
  }
  return out;
}
