import { GameObject, GameObjectInit } from 'lib/base/game-object';
import { test, expect } from 'vitest';
import { Modifier } from './modifier.go';
import { createNewCharacter } from 'lib/character';
import { PrimaryAttribute } from '../character/primary-attribute.go';

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

test('should return the unmodified value', () => {
  const train = new Train({ name: 'thomas', noise: 'toot toot' });
  expect(train.getModifiedValue<typeof train>('nameLength', [])).toBe(6);
});

test('should return the positively modified value', () => {
  const train = new Train({ name: 'thomas', noise: 'toot toot' });
  const modifier = new Modifier<Train>({
    name: 'modifier',
    modifiedName: 'thomas',
    modifiedKeys: 'nameLength',
    amount: 1,
  });
  expect(train.getModifiedValue<typeof train>('nameLength', [modifier])).toBe(7);
});

test('should return the negatively modified value', () => {
  const train = new Train({ name: 'thomas', noise: 'toot toot' });
  const modifier = new Modifier<Train>({
    name: 'modifier',
    modifiedName: 'thomas',
    modifiedKeys: 'nameLength',
    amount: -2,
  });
  expect(train.getModifiedValue<typeof train>('nameLength', [modifier])).toBe(4);
});

test('should match the modifier using the game object id', () => {
  const train = new Train({ name: 'thomas', noise: 'toot toot' });
  const modifier = new Modifier<Train>({
    name: 'modifier',
    modifiedName: 'thomas',
    modifiedId: train.id,
    modifiedKeys: 'nameLength',
    amount: 1,
  });
  expect(train.getModifiedValue<typeof train>('nameLength', [modifier])).toBe(7);
});

test('should modify multiple keys', () => {
  const character = createNewCharacter();
  const strength = character.getPrimaryAttribute('character/primary-attribute/strength');
  const modifier = new Modifier<PrimaryAttribute>({
    name: 'modifier',
    modifiedName: strength.name,
    modifiedKeys: ['current', 'start', 'min', 'max'],
    amount: 1,
  });
  expect(strength.getModifiedValue<PrimaryAttribute>('current', [modifier])).toBe(9);
  expect(strength.getModifiedValue<PrimaryAttribute>('start', [modifier])).toBe(9);
  expect(strength.getModifiedValue<PrimaryAttribute>('min', [modifier])).toBe(9);
  expect(strength.getModifiedValue<PrimaryAttribute>('max', [modifier])).toBe(15);
});

test('should sum up multiple matching modifiers', () => {
  const train = new Train({ name: 'thomas', noise: 'toot toot' });
  const modifiers: Modifier<Train>[] = [
    new Modifier<Train>({
      name: 'matching modifier',
      modifiedName: 'thomas',
      modifiedKeys: 'nameLength',
      amount: -2,
    }),
    new Modifier<Train>({
      name: 'non-matching modifier',
      modifiedName: 'hogwarts-express',
      modifiedKeys: 'nameLength',
      amount: 1,
    }),
    new Modifier<Train>({
      name: 'matching modifier',
      modifiedName: 'thomas',
      modifiedKeys: 'nameLength',
      amount: 5,
    }),
  ];
  expect(train.getModifiedValue<typeof train>('nameLength', modifiers)).toBe(9);
});

test('should return the unmodified value if no modifier matches', () => {
  const train = new Train({ name: 'thomas', noise: 'toot toot' });
  const modifiers: Modifier<Train>[] = [
    new Modifier<Train>({
      name: 'non-matching modifier',
      modifiedName: 'hogwarts-express',
      modifiedKeys: 'nameLength',
      amount: 1,
    }),
    new Modifier<Train>({
      name: 'non-matching modifier',
      modifiedName: 'thomas',
      // @ts-expect-error We are intentionally passing an illegal property key.
      modifiedKey: 'non-matching key',
      amount: 1,
    }),
    new Modifier<Train>({
      name: 'non-matching modifier',
      modifiedName: 'thomas',
      modifiedId: 'non-matching id',
      modifiedKeys: 'nameLength',
      amount: 1,
    }),
  ];
  expect(train.getModifiedValue<typeof train>('nameLength', modifiers)).toBe(6);
});
