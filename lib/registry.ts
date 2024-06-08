import { Character } from '@/character';
import { characterOrigins, CharacterOrigin } from './game-objects/character/origin';
import { characterPresets, CharacterPreset } from './game-objects/character/preset';
import { primaryAttributes, PrimaryAttribute } from './game-objects/character/primary-attribute';
import { secondaryAttributes, SecondaryAttribute } from './game-objects/character/secondary-attribute';
import { characterSkills, CharacterSkill } from './game-objects/character/skill';
import {
  characterSkillSpecializations,
  CharacterSkillSpecialization,
} from './game-objects/character/skill-specialization';
import type { Blueprint } from './main';

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
  'character.skill-specialization': CharacterSkillSpecialization;
}
export type GameObjectCollectionName = keyof GameObjectRegistry;

/**
 * The registry of all blueprint collections.
 */
export const blueprints: {
  [K in GameObjectCollectionName]: Blueprint<GameObjectRegistry[K]>[];
} = {
  character: [],
  'character.origin': characterOrigins,
  'character.preset': characterPresets,
  'character.primary-attribute': primaryAttributes,
  'character.secondary-attribute': secondaryAttributes as Blueprint<SecondaryAttribute>[],
  'character.skill': characterSkills as Blueprint<CharacterSkill>[],
  'character.skill-specialization': characterSkillSpecializations,
} as const;
