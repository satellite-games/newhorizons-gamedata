import { expect, test } from 'vitest';
import { Character } from '.';

test('should initialize properly', () => {
  const character = new Character();
  expect(character.id).toBeDefined();
});
