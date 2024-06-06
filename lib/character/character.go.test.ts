import { describe, expect, it } from 'vitest';
import { Character } from '.';
import { constants } from '@/constants';
import { SecondaryAttribute, type PrimaryAttribute } from '@/main';

describe('initialize', () => {
  it('should initialize with default name', async () => {
    const character = Character.initialize();
    expect(character.general.name).toBe(constants.CHARACTER_DEFAULT_NAME);
    expect(character.getChildren<Character, PrimaryAttribute>('character.primary-attribute').length).toBe(8);
    expect(character.getChildren<Character, SecondaryAttribute>('character.secondary-attribute').length).toBe(6);
  });
});
