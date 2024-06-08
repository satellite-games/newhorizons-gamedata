import { GameObject } from '@satellite-games/orbit';
import type { CharacterSkillName } from '../skill/skill.registry';
import type { CharacterSkillSpecializationName } from './skill-specialization.registry';

export class CharacterSkillSpecialization extends GameObject {
  declare name: CharacterSkillSpecializationName;
  /**
   * The base skill that the specialization is based on.
   */
  declare skill: CharacterSkillName;
  /**
   * Whether the specialization requires details to be specified.
   */
  declare requiresDetails?: boolean;
  /**
   * The details of the specialization.
   */
  declare details?: string;
}
