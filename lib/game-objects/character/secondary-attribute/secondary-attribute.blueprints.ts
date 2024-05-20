import type { Blueprint } from '@/base/game-object/types';
import { SecondaryAttribute } from './secondary-attribute.go';

export const secondaryAttributes: Blueprint<SecondaryAttribute, 'total' | 'remaining'>[] = [
  {
    name: 'character.secondary-attribute.health-points',
    difference: 0,
    formula: {
      primaryAttributes: ['character.primary-attribute.constitution', 'character.primary-attribute.constitution'],
      divisor: 1.0,
    },
  },
  {
    name: 'character.secondary-attribute.stamina-points',
    difference: 0,
    formula: {
      primaryAttributes: [
        'character.primary-attribute.constitution',
        'character.primary-attribute.constitution',
        'character.primary-attribute.agility',
      ],
      divisor: 2.0,
    },
  },
  {
    name: 'character.secondary-attribute.reaction',
    difference: 0,
    formula: {
      primaryAttributes: [
        'character.primary-attribute.courage',
        'character.primary-attribute.courage',
        'character.primary-attribute.intuition',
        'character.primary-attribute.agility',
      ],
      divisor: 5.0,
    },
  },
  {
    name: 'character.secondary-attribute.defense',
    difference: 0,
    formula: {
      primaryAttributes: [
        'character.primary-attribute.intuition',
        'character.primary-attribute.agility',
        'character.primary-attribute.agility',
      ],
      divisor: 5.0,
    },
  },
  {
    name: 'character.secondary-attribute.speed',
    difference: 0,
    formula: {
      primaryAttributes: [
        'character.primary-attribute.agility',
        'character.primary-attribute.agility',
        'character.primary-attribute.constitution',
      ],
      divisor: 6.0,
    },
  },
  {
    name: 'character.secondary-attribute.critical-hit-threshold',
    difference: 0,
    formula: {
      primaryAttributes: ['character.primary-attribute.constitution'],
      divisor: 2.0,
    },
  },
];
