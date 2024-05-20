// create-registry.ts
import fs from 'fs';
import path from 'path';
import { argv } from 'process';

const gameObjectName = argv[2];
const [foo, bar] = gameObjectName.split('.');

const blueprintsPath = path.join(__dirname, 'lib', 'game-objects', foo, bar, `${bar}.blueprints.ts`);
const registryPath = path.join(__dirname, 'lib', 'game-objects', foo, bar, `${bar}.registry.ts`);

import blueprints from blueprintsPath;

const names = blueprints.map((obj: { name: string }) => obj.name);

let content = `export const ${bar.charAt(0).toUpperCase() + bar.slice(1)}Name = {\n`;
names.forEach(name => {
  content += `  ${name}: '${gameObjectName}.${name}',\n`;
});
content += '} as const;\n';
content += `export type ${bar.charAt(0).toUpperCase() + bar.slice(1)}Name = (typeof ${bar.charAt(0).toUpperCase() + bar.slice(1)}Name)[keyof typeof ${bar.charAt(0).toUpperCase() + bar.slice(1)}Name];\n`;

fs.writeFileSync(registryPath, content);