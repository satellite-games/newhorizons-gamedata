import { Blueprint } from 'lib/base/game-object';
import { PrimaryAttribute } from 'lib/game-objects/character/primary-attribute.go';

export const primaryAttributes: Blueprint<PrimaryAttribute>[] = [
  {
    name: 'character/primary-attribute/courage',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/cleverness',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/intuition',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/charisma',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/agility',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/dexterity',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/constitution',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
  {
    name: 'character/primary-attribute/strength',
    current: 8,
    start: 8,
    min: 8,
    max: 14,
  },
];
export default primaryAttributes;
