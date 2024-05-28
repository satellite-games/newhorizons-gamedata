import { GameObject, type GameObjectName } from '@/main';
import { expect, test } from 'vitest';

/**
 * Helper function to test game object instantiation.
 */
export const testGameObject = async <TGameObject extends GameObject>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: any[]) => TGameObject,
  gameObjectName: GameObjectName,
) => {
  test(`should instantiate a game object of '${gameObjectName}'`, async () => {
    const mainModule = await import('@/main');
    const blueprints = mainModule.blueprints[gameObjectName];
    if (!blueprints) throw new Error(`Unable to find blueprints for game object '${gameObjectName}'.`);
    const gameObject = new constructor(blueprints[0]);

    // Assertions
    expect(gameObject).toBeDefined();
    expect(gameObject).toBeInstanceOf(constructor);
  });
};
