import { Blueprint, BlueprintCollectionName, GameObject, getBlueprints } from 'lib/index';
import { expect, test } from 'vitest';

/**
 * Helper function to test blueprint collections.
 * @param collectionName The name of the collection to test.
 * @param blueprints The blueprint collection.
 */
export const testBlueprints = async <TGameObject extends GameObject>(
  collectionName: BlueprintCollectionName,
  blueprints: Blueprint<TGameObject>[],
) => {
  test(`should return the collection '${collectionName}'`, async () => {
    const collection = await getBlueprints<TGameObject>(collectionName);
    expect(collection).toEqual(blueprints);
  });
};
