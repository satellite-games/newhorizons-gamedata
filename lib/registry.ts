import type { Character } from '@/character';
import { characterOrigins, type CharacterOrigin } from './game-objects/character/origin';
import { characterPresets, type CharacterPreset } from './game-objects/character/preset';
import { primaryAttributes, type PrimaryAttribute } from './game-objects/character/primary-attribute';
import { secondaryAttributes, type SecondaryAttribute } from './game-objects/character/secondary-attribute';
import { characterSkills, type CharacterSkill } from './game-objects/character/skill';
import type { CharacterSkillCategory } from './game-objects/character/skill-category/skill-category.go';
import {
  characterSkillSpecializations,
  type CharacterSkillSpecialization,
} from './game-objects/character/skill-specialization';
import type { Blueprint } from './main';
import { characterSkillCategories } from './game-objects/character/skill-category/skill-category.blueprints';

/**
 * The registry of all game objects.
 */
export interface GameObjectRegistry {
  character: Character;
  'character.origin': CharacterOrigin;
  'character.preset': CharacterPreset;
  'character.primary-attribute': PrimaryAttribute;
  'character.secondary-attribute': SecondaryAttribute;
  'character.skill': CharacterSkill;
  'character.skill-category': CharacterSkillCategory;
  'character.skill-specialization': CharacterSkillSpecialization;
}
export type GameObjectName = keyof GameObjectRegistry;

/**
 * The registry of all blueprint collections.
 */
export const blueprints: Partial<{
  [K in GameObjectName]: Blueprint<GameObjectRegistry[K]>[];
}> = {
  'character.origin': characterOrigins,
  'character.preset': characterPresets,
  'character.primary-attribute': primaryAttributes,
  'character.secondary-attribute': secondaryAttributes as Blueprint<SecondaryAttribute>[],
  'character.skill': characterSkills as Blueprint<CharacterSkill>[],
  'character.skill-category': characterSkillCategories,
  'character.skill-specialization': characterSkillSpecializations,
} as const;
