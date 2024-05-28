import type { Character } from '@/character';
import type { CharacterOrigin } from './character/origin';
import type { CharacterPreset } from './character/preset';
import type { PrimaryAttribute } from './character/primary-attribute';
import type { SecondaryAttribute } from './character/secondary-attribute';
import type { CharacterSkill } from './character/skill';
import type { CharacterSkillCategory } from './character/skill-category/skill-category.go';
import type { CharacterSkillSpecialization } from './character/skill-specialization';

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
