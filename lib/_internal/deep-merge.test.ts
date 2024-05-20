import { expect, test } from 'vitest';
import { deepMerge } from './deep-merge';

test('should merge objects deeply', () => {
  const presets = {
    character: {
      preset: {
        default: 'Standard',
        hero: 'Held:in',
      },
    },
  };

  const origins = {
    character: {
      origin: {
        earth: 'Erde',
        mars: 'Mars',
      },
    },
  };

  const expected = {
    character: {
      preset: {
        default: 'Standard',
        hero: 'Held:in',
      },
      origin: {
        earth: 'Erde',
        mars: 'Mars',
      },
    },
  };

  expect(deepMerge(presets, origins)).toEqual(expected);
});
