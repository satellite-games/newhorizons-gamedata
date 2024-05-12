import { test, expect, describe } from 'vitest';
import { Blueprint, GameObject, GameObjectInit } from './game-object';

/**
 * A simple train with a property, getter and a function.
 */
class Train extends GameObject {
  declare noise: string;

  get nameLength() {
    return this.name.length;
  }

  makeNoise() {
    return this.noise;
  }

  constructor(init: GameObjectInit<Train, 'nameLength'>) {
    super(init);
  }
}

describe('constructor', () => {
  const trainBlueprints: Blueprint<Train, 'nameLength'>[] = [
    {
      name: 'hogwarts-express',
      noise: 'choo choo',
    },
    { name: 'thomas', noise: 'toot toot' },
  ];

  const trains: Train[] = [];
  for (const trainBlueprint of trainBlueprints) {
    trains.push(new Train(trainBlueprint));
  }

  test('should properly create a blueprint and its corresponding game objects', () => {
    expect(trains[0]).toBeInstanceOf(Train);
    expect(trains[0].name).toBe(trainBlueprints[0].name);
    expect(trains[0].id).toBeDefined();
    expect(trains[0].makeNoise()).toBe(trainBlueprints[0].noise);
    expect(trains[0].nameLength).toBe(trainBlueprints[0].name.length);
    expect(trains[1]).toBeInstanceOf(Train);
    expect(trains[1].name).toBe(trainBlueprints[1].name);
    expect(trains[1].id).toBeDefined();
    expect(trains[1].makeNoise()).toBe(trainBlueprints[1].noise);
    expect(trains[1].nameLength).toBe(trainBlueprints[1].name.length);
  });
});

describe('getOwner', () => {
  test('should return the owner of the game object', () => {
    class Parent extends GameObject {}
    class Child extends GameObject {}
    const parent = new Parent({ name: 'parent' });
    const child = new Child({ name: 'child', owner: parent });
    expect(child.owner).toBe(parent);
    expect(child.getOwner<Parent>()).toBe(parent);
  });

  test("should return null if the game object doesn't have an owner", () => {
    class Child extends GameObject {}
    const child = new Child({ name: 'child' });
    expect(child.owner).toBe(null);
    expect(child.getOwner()).toBe(null);
  });
});

describe('getModifiedValue', () => {
  test('should fail when attempting to get modified value of a non-numeric property', () => {
    const train = new Train({ name: 'thomas', noise: 'toot toot' });
    expect(() => {
      // @ts-expect-error We are intentionally passing an illegal property key.
      train.getModifiedValue<typeof train>('noise', []);
    }).toThrowError();
  });

  test('should fail when attempting to get modified value of a non-existing property', () => {
    const train = new Train({ name: 'thomas', noise: 'toot toot' });
    expect(() => {
      // @ts-expect-error We are intentionally passing an illegal property key.
      train.getModifiedValue<typeof train>('does-not-exist', []);
    }).toThrowError();
  });
});

describe('serialize', () => {
  test("should properly serialize the game object's properties without functions and getters", () => {
    const train = new Train({
      name: 'thomas',
      id: '1234',
      noise: 'toot toot',
    });
    const serializedTrain = train.serialize();
    expect(serializedTrain).toBe('{"name":"thomas","id":"1234","noise":"toot toot"}');
  });
});
