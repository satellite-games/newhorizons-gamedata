import { describe, expect, test, beforeEach } from 'vitest';
import { Character, createNewCharacter } from 'lib/character';
import { SecondaryAttribute } from './secondary-attribute.go';
import { Modifier } from '../general/modifier.go';

let character: Character;

beforeEach(() => {
  character = createNewCharacter();
  for (const primaryAttribute of character.primaryAttributes) {
    primaryAttribute.current = 10;
  }
});

describe('total', () => {
  test('should get the correct total value of the secondary attribute', () => {
    const healthPoints = character.getSecondaryAttribute('character/secondary-attribute/health-points');
    expect(healthPoints.total).toBe(20);
    const staminaPoints = character.getSecondaryAttribute('character/secondary-attribute/stamina-points');
    expect(staminaPoints.total).toBe(15);
    const reaction = character.getSecondaryAttribute('character/secondary-attribute/reaction');
    expect(reaction.total).toBe(8);
    const defense = character.getSecondaryAttribute('character/secondary-attribute/defense');
    expect(defense.total).toBe(6);
    const speed = character.getSecondaryAttribute('character/secondary-attribute/speed');
    expect(speed.total).toBe(5);
    const criticalHitThreshold = character.getSecondaryAttribute(
      'character/secondary-attribute/critical-hit-threshold',
    );
    expect(criticalHitThreshold.total).toBe(5);
  });

  test('should get the correct remaining value of the secondary attribute', () => {
    const healthPoints = character.getSecondaryAttribute('character/secondary-attribute/health-points');
    healthPoints.difference = 5;
    expect(healthPoints.getModifiedValue<SecondaryAttribute>('remaining', [])).toBe(15);
  });

  test('should get the correct total and remaining value of the secondary attribute when it is modified', () => {
    const healthPoints = character.getSecondaryAttribute('character/secondary-attribute/health-points');
    healthPoints.difference = 5;
    const modifier = new Modifier<SecondaryAttribute>({
      name: 'modifier',
      modifiedName: 'character/secondary-attribute/health-points',
      modifiedKeys: ['total', 'remaining'],
      amount: -5,
    });
    expect(healthPoints.getModifiedValue<SecondaryAttribute>('total', [modifier])).toBe(15);
    expect(healthPoints.getModifiedValue<SecondaryAttribute>('remaining', [modifier])).toBe(10);
  });
});
