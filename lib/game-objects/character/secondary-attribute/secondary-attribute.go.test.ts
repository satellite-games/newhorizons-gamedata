import { Modifier } from '@satellite-games/orbit';
import { describe, it, expect, beforeEach } from 'vitest';
import { Character } from '@/character/character.go';
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
    const health = character.getSecondaryAttribute('character.secondary-attribute.health');
    expect(health.total).toBe(20);
    const stamina = character.getSecondaryAttribute('character.secondary-attribute.stamina');
    expect(stamina.total).toBe(15);
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
    const health = character.getSecondaryAttribute('character.secondary-attribute.health');
    health.difference = 5;
    expect(health.getModifiedValue<SecondaryAttribute>('remaining', character)).toBe(15);
  });

  it('should get the correct total and remaining value of the secondary attribute when it is modified', () => {
    const health = character.getSecondaryAttribute('character.secondary-attribute.health');
    expect(health.getModifiedValue<SecondaryAttribute>('total', character)).toBe(20);
    expect(health.getModifiedValue<SecondaryAttribute>('remaining', character)).toBe(20);
    health.difference = 5;
    expect(health.getModifiedValue<SecondaryAttribute>('total', character)).toBe(20);
    expect(health.getModifiedValue<SecondaryAttribute>('remaining', character)).toBe(15);
    const modifier = new Modifier<SecondaryAttribute>({
      targetName: 'character.secondary-attribute.health',
      keys: ['total'],
      amount: -5,
    });
    character.modifiers = [modifier];
    expect(health.getModifiedValue<SecondaryAttribute>('total', character)).toBe(15);
    expect(health.getModifiedValue<SecondaryAttribute>('remaining', character)).toBe(10);
  });
});
