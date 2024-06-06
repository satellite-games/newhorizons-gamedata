/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect, describe } from 'vitest';
import { GameObject } from '../game-object/game-object';
import type { Blueprint, GameObjectInit } from './types';
// Game objects are difficult to test with completely generic objects due to type-safety, so
// we import some actual game objects to test with
import { PrimaryAttribute, SecondaryAttribute } from '@/main';

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
    expect(child.getOwner<Parent>()).toBe(parent);
  });

  test("should return null if the game object doesn't have an owner", () => {
    class Child extends GameObject {}
    const child = new Child({ name: 'child' });
    expect(child.getOwner()).toBe(null);
  });
});

describe('getChildren', () => {
  test('should return the children of the game object by the given name', () => {
    class Parent extends GameObject {
      children: {
        'character.primary-attribute': PrimaryAttribute[];
        'character.secondary-attribute': SecondaryAttribute[];
      } = {
        'character.primary-attribute': [],
        'character.secondary-attribute': [],
      };
    }
    const parent = new Parent({ name: 'parent' });
    const child1 = new PrimaryAttribute({ name: 'character.primary-attribute.1' });
    parent.setChildren<Parent, PrimaryAttribute>([child1]);
    expect(parent.getChildren<Parent, PrimaryAttribute>('character.primary-attribute')).toEqual([child1]);
    expect(parent.getChildren<Parent, SecondaryAttribute>('character.secondary-attribute')).toEqual([]);
  });

  test('should return an empty array if the game object has no children', () => {
    class Parent extends GameObject {}
    const parent = new Parent({ name: 'parent' });
    expect(parent.getChildren('child' as keyof typeof parent.children)).toEqual([]);
  });
});

describe('setChildren', () => {
  test('should set the children on the game object', () => {
    class Parent extends GameObject {
      children: {
        'character.primary-attribute': PrimaryAttribute[];
      } = {
        'character.primary-attribute': [],
      };
    }
    const parent = new Parent({ name: 'parent' });
    const child1 = new PrimaryAttribute({ name: 'character.primary-attribute.1' });
    const child2 = new PrimaryAttribute({ name: 'character.primary-attribute.2' });
    // Let's set the children on the parent.
    parent.setChildren<Parent, PrimaryAttribute>([child1, child2]);
    expect(parent.getChildren<Parent, PrimaryAttribute>('character.primary-attribute')).toEqual([child1, child2]);
    const child3 = new PrimaryAttribute({ name: 'character.primary-attribute.3' });
    // Let's replace the children with a new one.
    parent.setChildren<Parent, PrimaryAttribute>([child3]);
    expect(parent.getChildren<Parent, PrimaryAttribute>('character.primary-attribute')).toEqual([child3]);
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
      name: 'Thomas',
      id: '1234',
      noise: 'toot toot',
    });
    const serializedTrain = train.serialize();
    expect(serializedTrain).toBe('{"name":"Thomas","id":"1234","noise":"toot toot"}');
  });

  test('should strip empty children from the game object, but keep non-empty children', () => {
    class WithChildren extends GameObject {
      children: Record<string, any[]> = {
        trains: [],
      };
    }
    class WithoutChildren extends GameObject {}
    const withChildren = new WithChildren({ name: 'with-children', id: '1234' });
    const withoutChildren = new WithoutChildren({ name: 'without-children', id: '5678' });
    expect(withChildren.serialize()).toBe('{"name":"with-children","id":"1234","children":{"trains":[]}}');
    expect(withoutChildren.serialize()).toBe('{"name":"without-children","id":"5678"}');
  });
});
