import characterOrigin from '@/game-objects/character/origin/locales/de.yaml';
import characterPreset from '@/game-objects/character/preset/locales/de.yaml';
import primaryAttribute from '@/game-objects/character/primary-attribute/locales/de.yaml';
import secondaryAttribute from '@/game-objects/character/skill/locales/de.yaml';
import skill from '@/game-objects/character/secondary-attribute/locales/de.yaml';
import trait from '@/game-objects/character/trait/locales/de.yaml';
import { deepMerge } from '@spuxx/browser-utils';

export const de: Record<string, unknown> = deepMerge(
  characterOrigin,
  characterPreset,
  primaryAttribute,
  secondaryAttribute,
  skill,
  trait,
);
