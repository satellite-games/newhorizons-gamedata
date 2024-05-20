import { deepMerge } from '@/_internal/deep-merge';
import characterOrigin from '@/game-objects/character/origin/locales/de.yaml';
import characterPreset from '@/game-objects/character/preset/locales/de.yaml';
import primaryAttribute from '@/game-objects/character/primary-attribute/locales/de.yaml';
import secondaryAttribute from '@/game-objects/character/secondary-attribute/locales/de.yaml';

export const de: Record<string, unknown> = deepMerge(
  characterOrigin,
  characterPreset,
  primaryAttribute,
  secondaryAttribute,
);
