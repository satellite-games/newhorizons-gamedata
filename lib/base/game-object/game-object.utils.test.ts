import { characterOrigins } from '@/main';
import { describe, expect, it } from 'vitest';
import { getCollectionName, getWikiPath } from './game-object.utils';

describe('getWikiPath', () => {
  it('should return the corect path for a blueprint', () => {
    const origin = characterOrigins[0];
    const path = getWikiPath(origin.name);
    expect(path).toEqual({ book: 'basic-rules', chapter: 'character-origin', article: 'earth-urban' });
  });
});

describe('getCollectionName', () => {
  it('should return the correct collection name for any given name', () => {
    expect(getCollectionName('foo')).toBe('foo');
    expect(getCollectionName('foo.bar')).toBe('foo');
    expect(getCollectionName('foo.bar.baz')).toBe('foo.bar');
    expect(getCollectionName('foo.foz.bar.baz')).toBe('foo.foz.bar');
    expect(getCollectionName('character.origin.earth-urban')).toBe('character.origin');
  });
});
