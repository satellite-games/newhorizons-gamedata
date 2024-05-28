import type { Character } from '@/character';
import type { CharacterOrigin } from './game-objects/character/origin';
import type { CharacterPreset } from './game-objects/character/preset';
import type { PrimaryAttribute } from './game-objects/character/primary-attribute';
import type { SecondaryAttribute } from './game-objects/character/secondary-attribute';
import type { CharacterSkill } from './game-objects/character/skill';
import type { CharacterSkillCategory } from './game-objects/character/skill-category/skill-category.go';
import type { CharacterSkillSpecialization } from './game-objects/character/skill-specialization';

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
