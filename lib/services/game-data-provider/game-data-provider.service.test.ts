import { describe, test, expect } from 'vitest';
import { BlueprintCollectionName, createGameObject, getBlueprints } from '.';
import { Blueprint, GameObject, Saved } from 'lib/base/game-object';

describe('getBlueprints', () => {
  test("should throw an error if the collection doesn't exist", async () => {
    expect(getBlueprints('non-existent' as unknown as BlueprintCollectionName)).rejects.toThrowError(
      "Blueprint collection 'non-existent' not found.",
    );
  });
});

describe('createGameObject', async () => {
  class Train extends GameObject {
    declare sound: string;

    makeSound = () => {
      return `The train goes ${this.sound}!`;
    };
  }

  test('should create a new game object from the given blueprint and constructor', () => {
    const blueprint: Blueprint<Train> = {
      name: 'train/thomas',
      sound: 'choo-choo',
    };

    const train = createGameObject<Train>(blueprint, Train);
    expect(train).toBeDefined();
    expect(train).toBeInstanceOf(Train);
    expect(train.name).toBe('train/thomas');
    expect(train.id).toBeDefined();
    expect(train.makeSound()).toBe('The train goes choo-choo!');
  });

  test('should create a game object from an existing set of saved data', () => {
    const savedTrain: Saved<Train> = {
      name: 'train/thomas',
      sound: 'choo-choo',
      id: '1234',
    };

    const train = createGameObject<Train>(savedTrain, Train);
    expect(train).toBeDefined();
    expect(train).toBeInstanceOf(Train);
    expect(train.name).toBe('train/thomas');
    expect(train.id).toBe('1234');
    expect(train.makeSound()).toBe('The train goes choo-choo!');
  });
});
