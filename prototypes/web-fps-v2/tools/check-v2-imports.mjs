import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = join(root, "src");
const files = collectJsFiles(srcRoot).map((file) => relative(root, file));
const failures = [];

for (const file of files) {
  const absolute = join(root, file);
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
  console.log(`V2 import check passed for ${files.length} files.`);
}

function collectJsFiles(dir) {
  const entries = readdirSync(dir).map((name) => join(dir, name));
  const files = [];
  for (const entry of entries) {
    if (statSync(entry).isDirectory()) files.push(...collectJsFiles(entry));
    else if (entry.endsWith(".js")) files.push(entry);
  }
  return files;
}
