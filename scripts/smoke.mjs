import fs from 'node:fs';
const required = ['.next/app-build-manifest.json', '.next/build-manifest.json'];
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing build artifact: ${file}`);
    process.exit(1);
  }
}
console.log('Smoke OK');
