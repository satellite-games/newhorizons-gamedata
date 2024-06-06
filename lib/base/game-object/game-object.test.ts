/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { GameObject } from '../game-object/game-object';
import type { Blueprint, GameObjectInit } from './types';
// Game objects are difficult to it with completely generic objects due to type-safety, so
// we import some actual game objects to it with
import { Modifier, PrimaryAttribute, SecondaryAttribute } from '@/main';
import { Dependency } from '../dependency';

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

  it('should properly create a blueprint and its corresponding game objects', () => {
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
  it('should return the owner of the game object', () => {
    class Parent extends GameObject {}
    class Child extends GameObject {}
    const parent = new Parent({ name: 'parent' });
    const child = new Child({ name: 'child', owner: parent });
    expect(child.getOwner<Parent>()).toBe(parent);
  });

  it("should return null if the game object doesn't have an owner", () => {
    class Child extends GameObject {}
    const child = new Child({ name: 'child' });
    expect(child.getOwner()).toBe(null);
  });
});

describe('getChildren', () => {
  it('should return the children of the game object by the given name', () => {
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

  it('should return an empty array if the game object has no children', () => {
    class Parent extends GameObject {}
    const parent = new Parent({ name: 'parent' });
    expect(parent.getChildren('child' as keyof typeof parent.children)).toEqual([]);
  });
});

describe('setChildren', () => {
  it('should set the children on the game object', () => {
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

describe('addChild', () => {
  it('should add a child to the game object', () => {
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
    // Let's add the children to the parent.
    parent.addChild<Parent, PrimaryAttribute>(child1);
    parent.addChild<Parent, PrimaryAttribute>(child2);
    expect(parent.getChildren<Parent, PrimaryAttribute>('character.primary-attribute')).toEqual([child1, child2]);
  });
});

describe('removeChild', () => {
  it('should remove a child from the game object', () => {
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
    // Let's add the children to the parent.
    parent.addChild<Parent, PrimaryAttribute>(child1);
    parent.addChild<Parent, PrimaryAttribute>(child2);
    expect(parent.getChildren<Parent, PrimaryAttribute>('character.primary-attribute')).toEqual([child1, child2]);
    // Let's remove the first child.
    parent.removeChild<Parent, PrimaryAttribute>(child1);
    expect(parent.getChildren<Parent, PrimaryAttribute>('character.primary-attribute')).toEqual([child2]);
  });
});

describe('findChildById', () => {
  it('should return the child with the given id', () => {
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
    const child2 = new PrimaryAttribute({ name: 'character.primary-attribute.2' });
    const child3 = new SecondaryAttribute({ name: 'character.secondary-attribute.1' });
    parent.addChild<Parent, PrimaryAttribute>(child1);
    parent.addChild<Parent, PrimaryAttribute>(child2);
    parent.addChild<Parent, SecondaryAttribute>(child3);
    expect(parent.findChildById(child1.id)).toBe(child1);
    expect(parent.findChildById(child2.id)).toBe(child2);
    expect(parent.findChildById(child3.id)).toBe(child3);
  });

  it("should return null if the child with the given id doesn't exist", () => {
    class Parent extends GameObject {
      children: {
        'character.primary-attribute': PrimaryAttribute[];
      } = {
        'character.primary-attribute': [],
      };
    }
    const parent = new Parent({ name: 'parent' });
    const child = new PrimaryAttribute({ name: 'character.primary-attribute.1' });
    parent.addChild<Parent, PrimaryAttribute>(child);
    expect(parent.findChildById('non-existing-id')).toBe(null);
  });
});

describe('getModifiedValue', () => {
  it('should fail when attempting to get modified value of a non-numeric property', () => {
    const train = new Train({ name: 'thomas', noise: 'toot toot' });
    expect(() => {
      // @ts-expect-error We are intentionally passing an illegal property key.
      train.getModifiedValue<typeof train>('noise', []);
    }).toThrowError();
  });

  it('should fail when attempting to get modified value of a non-existing property', () => {
    const train = new Train({ name: 'thomas', noise: 'toot toot' });
    expect(() => {
      // @ts-expect-error We are intentionally passing an illegal property key.
      train.getModifiedValue<typeof train>('does-not-exist', []);
    }).toThrowError();
  });
});

describe('serialize', () => {
  it("should properly serialize the game object's properties without functions and getters", () => {
    const train = new Train({
      name: 'Thomas',
      id: '1234',
      noise: 'toot toot',
    });
    const serializedTrain = train.serialize();
    expect(serializedTrain).toBe('{"name":"Thomas","id":"1234","noise":"toot toot"}');
  });

  it('should strip empty children from the game object, but keep non-empty children', () => {
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

  it('should be able a deep object with circular references', () => {
    class Child extends GameObject {}
    class Parent extends GameObject {
      children: Record<string, Child[]> = {
        child: [],
      };
      modifiers = [
        new Modifier<PrimaryAttribute>({
          cause: 'modifier',
          modifiedName: 'character.primary-attribute.courage',
          modifiedKeys: ['current'],
          amount: 1,
        }),
      ];
      dependencies = [
        new Dependency<PrimaryAttribute>({
          dependencyName: 'dependency',
          dependent: 'character.primary-attribute.courage',
        }),
      ];
    }
    const parent = new Parent({ name: 'parent', id: '1' });
    parent.addChild<Parent, Child>(new Child({ name: 'child', id: '2' }));
    // To make the assertion more readable we serialize and then perform a
    // flat parse. We don't perform an actual deserialization since it does
    // a bunch of stuff we're not interested in.
    const serialized = parent.serialize();
    expect(JSON.parse(serialized)).toEqual({
      name: 'parent',
      id: '1',
      children: {
        child: ['{"name":"child","id":"2"}'],
      },
      dependencies: [
        {
          dependent: 'character.primary-attribute.courage',
          dependencyName: 'dependency',
        },
      ],
      modifiers: [
        {
          cause: 'modifier',
          modifiedKeys: ['current'],
          modifiedName: 'character.primary-attribute.courage',
          amount: 1,
        },
      ],
    });
  });
});
