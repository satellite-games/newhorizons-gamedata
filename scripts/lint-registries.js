/* eslint-disable no-console */
/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recursively get all files in a directory
const getFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let filePaths = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      filePaths = [...filePaths, ...getFiles(fullPath)];
    } else if (entry.name.endsWith('registry.ts')) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
};

// Extract names from a registry file
const getRegistryNames = (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /'([^']+)'/g;
  const names = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }

  return names;
};

// Check if all registry names exist in the corresponding blueprints file
const checkRegistry = (file) => {
  const registryNames = getRegistryNames(file);
  const dirName = path.dirname(file);
  const baseName = path.basename(file, '.registry.ts');
  const blueprintsFile = path.join(dirName, `${baseName}.blueprints.ts`);
  let success = true;

  if (!fs.existsSync(blueprintsFile)) {
    console.log('\x1b[31m%s\x1b[0m', `Error: No blueprints file found for '${file}'.`);
    success = false;
  }

  const blueprintsNames = getRegistryNames(blueprintsFile);

  for (const name of registryNames) {
    if (!blueprintsNames.includes(name)) {
      console.log('\x1b[31m%s\x1b[0m', `Error: Name '${name}' in '${file}' does not exist in '${blueprintsFile}'.`);
      success = false;
    }
  }
  return success;
};

// Get all registry files
const dirName = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirName, '..');
const registryFiles = getFiles(`${projectRoot}/lib/game-objects`);
console.log(`Found ${registryFiles.length} registry files.`);

// Check all registry files
let failed = false;
for (const file of registryFiles) {
  if (!checkRegistry(file)) failed = true;
}
if (failed) process.exit(1);

console.log('\x1b[32m%s\x1b[0m', 'All registry files are valid.');
