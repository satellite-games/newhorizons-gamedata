import { characterOrigins } from '@/main';
import { describe, expect, it } from 'vitest';
import { getWikiPath } from './game-object.utils';

describe('getWikiPath', () => {
  it('should return the corect path for a blueprint', () => {
    const origin = characterOrigins[0];
    const path = getWikiPath(origin.name);
    expect(path).toEqual(['basic-rules', 'appendix-character-origin', 'earth-urban']);
  });
});
