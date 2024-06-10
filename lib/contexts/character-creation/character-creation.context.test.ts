import { characterPresetMocks } from '@/mocks';
import { describe, expect, it } from 'vitest';
import { CharacterCreationContext } from './character-creation.context';
import { constants } from '@/constants';

describe('constructor', () => {
  it('should create a new context with the provided preset and initialize the character', () => {
    const preset = characterPresetMocks.default;
    const context = new CharacterCreationContext(preset);
    expect(context.preset).toEqual(preset);
    expect(context.character).toBeDefined();
    expect(context.character.general.name).toBe(constants.CHARACTER_DEFAULT_NAME);
  });
});
