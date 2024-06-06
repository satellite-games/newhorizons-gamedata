import { describe, expect, it } from 'vitest';
import { Character } from '.';
import { constants } from '@/constants';

describe('initialize', () => {
  it('should initialize with default name', async () => {
    const character = Character.initialize();
    expect(character.general.name).toBe(constants.CHARACTER_DEFAULT_NAME);
  });
});
