#!/usr/bin/env node
import { execFileSync } from "node:child_process";

const requiredFiles = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/components/TestClient.tsx",
  "src/lib/game.ts",
  "scripts/generate.mjs",
  "scripts/smoke.mjs",
  "next.config.ts",
  "tsconfig.json",
  "README.md",
  "LICENSE",
  "SECURITY.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
];

const output = execFileSync("npm", ["pack", "--dry-run", "--json"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "inherit"],
});

const [pack] = JSON.parse(output);
const packedFiles = new Set(pack.files.map((file) => file.path));
const missing = requiredFiles.filter((file) => !packedFiles.has(file));

if (missing.length > 0) {
  console.error(`Package smoke failed; missing ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`Package smoke passed with ${pack.files.length} files.`);
