import type { Blueprint, GameObjectKey, Registry } from '@satellite-games/orbit';
import { characterOrigins } from './game-objects/character/origin';
import { characterPresets } from './game-objects/character/preset';
import { primaryAttributes } from './game-objects/character/primary-attribute';
import { secondaryAttributes, type SecondaryAttribute } from './game-objects/character/secondary-attribute';
import { characterSkills, type CharacterSkill } from './game-objects/character/skill';
import { characterSkillSpecializations } from './game-objects/character/skill-specialization';
import { characterAbilities, type CharacterAbility } from './game-objects/character/ability';

/**
 * The registry of all blueprint collections.
 */
export const blueprints: {
  [K in GameObjectKey]: Blueprint<Registry[K]['type']>[];
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
