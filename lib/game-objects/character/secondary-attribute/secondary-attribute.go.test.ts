import { describe, it, expect, beforeEach } from 'vitest';
import { Character } from '@/character/character.go';
import { Modifier } from '@/base/modifier';
import { SecondaryAttribute } from './secondary-attribute.go';
import { PrimaryAttribute } from '../primary-attribute';

let character: Character;

beforeEach(() => {
  character = Character.initialize();
  for (const primaryAttribute of character.getChildren<Character, PrimaryAttribute>('character.primary-attribute')) {
    primaryAttribute.current = 10;
  }
});

it('should foo', () => {
  expect(1).toBe(1);
});

describe('total', () => {
  it('should get the correct total value of the secondary attribute', () => {
    const healthPoints = character.getSecondaryAttribute('character.secondary-attribute.health-points');
    expect(healthPoints.total).toBe(20);
    const staminaPoints = character.getSecondaryAttribute('character.secondary-attribute.stamina-points');
    expect(staminaPoints.total).toBe(15);
    const reaction = character.getSecondaryAttribute('character.secondary-attribute.reaction');
    expect(reaction.total).toBe(8);
    const defense = character.getSecondaryAttribute('character.secondary-attribute.defense');
    expect(defense.total).toBe(6);
    const speed = character.getSecondaryAttribute('character.secondary-attribute.speed');
    expect(speed.total).toBe(5);
    const criticalHitThreshold = character.getSecondaryAttribute(
      'character.secondary-attribute.critical-hit-threshold',
    );
    expect(criticalHitThreshold.total).toBe(5);
  });

  it('should get the correct remaining value of the secondary attribute', () => {
    const healthPoints = character.getSecondaryAttribute('character.secondary-attribute.health-points');
    healthPoints.difference = 5;
    expect(healthPoints.getModifiedValue<SecondaryAttribute>('remaining', [])).toBe(15);
  });

  it('should get the correct total and remaining value of the secondary attribute when it is modified', () => {
    const healthPoints = character.getSecondaryAttribute('character.secondary-attribute.health-points');
    healthPoints.difference = 5;
    const modifier = new Modifier<SecondaryAttribute>({
      cause: 'modifier',
      modifiedName: 'character.secondary-attribute.health-points',
      modifiedKeys: ['total', 'remaining'],
      amount: -5,
    });
    expect(healthPoints.getModifiedValue<SecondaryAttribute>('total', [modifier])).toBe(15);
    expect(healthPoints.getModifiedValue<SecondaryAttribute>('remaining', [modifier])).toBe(10);
  });
});
