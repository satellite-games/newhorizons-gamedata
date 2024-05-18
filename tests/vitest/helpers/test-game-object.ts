import { GameObject, type Blueprint, type BlueprintCollectionName } from '@/index';
import { expect, test } from 'vitest';

/**
 * Helper function to test game object instantiation.
 */
export const testGameObject = async <TGameObject extends GameObject>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: any[]) => TGameObject,
  collectionName: BlueprintCollectionName,
) => {
  test(`should instantiate a game object of '${collectionName}'`, async () => {
    const [folder, file] = collectionName.split('/');
    const path = `lib/blueprints/${folder}/${file}.blueprints.ts`;
    const module: { default: Blueprint<TGameObject>[] } = await import(path);
    const blueprints = module.default;
    const gameObject = new constructor(blueprints[0]);
    // Assertions
    expect(gameObject).toBeDefined();
    expect(gameObject).toBeInstanceOf(constructor);
  });
};
