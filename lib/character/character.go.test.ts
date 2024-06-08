/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import { Character } from '.';
import { constants } from '@/constants';
import { SecondaryAttribute, characterSkills, type PrimaryAttribute } from '@/main';
import type { CharacterSkill } from '@/game-objects/character/skill';

describe('initialize', () => {
  it('should initialize with default name', async () => {
    const character = Character.initialize();
    expect(character.general.name).toBe(constants.CHARACTER_DEFAULT_NAME);
    expect(character.getChildren<Character, PrimaryAttribute>('character.primary-attribute').length).toBe(8);
    expect(character.getChildren<Character, SecondaryAttribute>('character.secondary-attribute').length).toBe(6);
    expect(character.getChildren<Character, CharacterSkill>('character.skill').length).toBe(
      characterSkills.filter((skill) => skill.isCoreSkill).length,
    );
  });
});

describe('getPrimaryAttribute', () => {
  it('should return primary attribute by name', async () => {
    const character = Character.initialize();
    const primaryAttribute = character.getPrimaryAttribute('character.primary-attribute.cleverness');
    expect(primaryAttribute.name).toBe('character.primary-attribute.cleverness');
  });

  it('should throw error if primary attribute not found', async () => {
    const character = Character.initialize();
    expect(() => character.getPrimaryAttribute('character.primary-attribute.unknown' as any)).toThrow();
  });
});

describe('getSecondaryAttribute', () => {
  it('should return secondary attribute by name', async () => {
    const character = Character.initialize();
    const secondaryAttribute = character.getSecondaryAttribute('character.secondary-attribute.health');
    expect(secondaryAttribute.name).toBe('character.secondary-attribute.health');
  });

  it('should throw error if secondary attribute not found', async () => {
    const character = Character.initialize();
    expect(() => character.getSecondaryAttribute('character.secondary-attribute.unknown' as any)).toThrow();
  });
});

describe('getSkill', () => {
  it('should return skill by name', async () => {
    const character = Character.initialize();
    // Use a core skill that'll be available after initialization
    const skill = character.getSkill('character.skill.body-control');
    expect(skill).toBeDefined();
    expect(skill?.name).toBe('character.skill.body-control');
  });

  it('should return undefined if skill not found', async () => {
    const character = Character.initialize();
    const skill = character.getSkill('character.skill.unknown' as any);
    expect(skill).toBeUndefined();
  });
});
