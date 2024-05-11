import { Blueprint, BlueprintCollectionName, GameObject } from 'lib/index';
import { expect, test } from 'vitest';

/**
 * Helper function to test game object instantiation.
 */
export const testGameObject = async <TGameObject extends GameObject>(
  constructor: new (...args: any[]) => TGameObject,
  collectionName: BlueprintCollectionName,
) => {
  test(`should instantiate a game object of '${collectionName}'`, async () => {
    const [folder, file] = collectionName.split('/');
    const path = `lib/blueprints/${folder}/${file}.blueprints.ts`;
    const module: { default: Blueprint<any>[] } = await import(path);
    const blueprints = module.default;
    const gameobject = new constructor(blueprints[0]);
    // Assertions
    expect(gameobject).toBeDefined();
    expect(gameobject).toBeInstanceOf(constructor);
  });
};
