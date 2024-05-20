/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

// Check if a valid game object name was provided
const gameObjectName = argv[2];
if (!gameObjectName) {
  throw new Error('You must provide a game object name.');
}
const [foo, bar] = gameObjectName.split('.');
if (!foo || !bar) {
  throw new Error("You must provide a valid game object name like 'foo.bar'");
}

// Get the paths to the blueprints and registry files
const dirName = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirName, '..');
const folderPath = path.join(projectRoot, 'lib', 'game-objects', foo, bar);
const blueprintsPath = `${folderPath}/${bar}.blueprints.ts`;
const registryPath = `${folderPath}/${bar}.registry.ts`;

// Check if the blueprints file exists
if (!fs.existsSync(blueprintsPath)) {
  throw new Error(`Blueprints file does not exist at '${blueprintsPath}'.`);
}
console.log(`Found blueprints file at '${blueprintsPath}'.`);

// Read the blueprints file
const blueprintsFileContent = fs.readFileSync(blueprintsPath, 'utf8');

// Extract the names from the blueprints file
const nameRegex = /name: '([^']+)'/g;
let match;
const names = [];
while ((match = nameRegex.exec(blueprintsFileContent)) !== null) {
  names.push(match[1]);
}
if (names.length === 0) {
  throw new Error(`No names found in blueprints file at '${blueprintsPath}'.`);
}

// Convert foo-foz.bar-baz to FooFozBarBaz
const toPascalCase = (str) => {
  return str
    .split(/[-.]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};
const transformedName = toPascalCase(gameObjectName);

// Create the content for the registry file
let content = `export type ${transformedName}Name = '`;
content += names.join("' | '") + "';\n";
console.log('Type has been created. Formatting content...');

// Load Prettier config
const prettierConfig = await prettier.resolveConfig('./.prettierrc');

// Format the content with Prettier
const formattedContent = await prettier.format(content, { ...prettierConfig, parser: 'typescript' });

// Save the content to the registry file
fs.writeFileSync(registryPath, formattedContent);
console.log('\x1b[32m%s\x1b[0m', `Created registry file at '${registryPath}'.`);
