import type { Blueprint } from '@/base/game-object';
import { Character } from '@/character';
import { characterOrigins, type CharacterOrigin, type CharacterOriginName } from './game-objects/character/origin';
import { characterPresets, type CharacterPreset, type CharacterPresetName } from './game-objects/character/preset';
import {
  primaryAttributes,
  type PrimaryAttribute,
  type CharacterPrimaryAttributeName,
} from './game-objects/character/primary-attribute';
import {
  secondaryAttributes,
  type SecondaryAttribute,
  type CharacterSecondaryAttributeName,
} from './game-objects/character/secondary-attribute';
import { characterSkills, type CharacterSkill, type CharacterSkillName } from './game-objects/character/skill';
import {
  characterSkillSpecializations,
  type CharacterSkillSpecialization,
  type CharacterSkillSpecializationName,
} from './game-objects/character/skill-specialization';
import { characterAbilities, type CharacterAbility, type CharacterAbilityName } from './game-objects/character/ability';

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
  'character.ability': CharacterAbility;
}
export type GameObjectCollectionName = keyof GameObjectRegistry;
export type GameObjectName =
  | CharacterOriginName
  | CharacterPresetName
  | CharacterPrimaryAttributeName
  | CharacterSecondaryAttributeName
  | CharacterSkillName
  | CharacterSkillSpecializationName
  | CharacterAbilityName;

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
  'character.ability': characterAbilities as Blueprint<CharacterAbility>[],
} as const;
