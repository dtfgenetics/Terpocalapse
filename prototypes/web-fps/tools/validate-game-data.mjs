import { runPrototypeValidation } from "../src/runtime-checks.js";

const errors = runPrototypeValidation();

if (errors.length > 0) {
  console.error("Terpocalypse prototype validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Terpocalypse prototype validation passed.");
