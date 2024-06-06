import { Character, GameObject, PrimaryAttribute, constants, type CharacterPrimaryAttributeName } from '@/main';
import type { CharacterSkillName } from './skill.registry';
import type { CharacterSkillCategoryName } from '../skill-category/skill-category.registry';

export class CharacterSkill extends GameObject {
  declare name: CharacterSkillName;
  /**
   * The category of the skill.
   */
  declare category: CharacterSkillCategoryName;
  /**
   * The leveling factor of the skill. Defines how expensive it is to level up the skill.
   */
  declare factor: number;
  /**
   * The constraint multiplier of the skill. Is multiplied with the character's
   * constraint value to determine how much the skill is being impacted by the constraint.
   */
  declare constraintMultiplier: number;
  /**
   * The current level of the skill.
   */
  current: number = 0;
  /**
   * The minimum level of the skill.
   */
  min: number = 0;
  /**
   * The primary attributes that make up the skill check.
   */
  declare primaryAttributes: CharacterPrimaryAttributeName[];
  /**
   * Whether the skill is a core skill. Core skills are given to every character on creation
   * with at least a level of 0.
   */
  declare isCoreSkill: boolean;
  /**
   * Special experience allows the skill to be leveled up for less experience points. Each point
   * of special experience allows for one level to be bought as if the factor was reduced by one.
   * Furthermore, if the character does not yet have the skill, the special experience allows
   * skill to be bought at a reduced factor and without the consent of the game master.
   */
  declare specialExperience?: number;

  /**
   * Returns the maximum level of the skill. The maximum level is determined by the highest
   * primary attribute that is part of the skill check. The maximum level is that attribute's
   * level times `SKILL_MAX_LEVEL_MULTIPLIER`.
   */
  get max(): number {
    const character = getOwnerCharacter(this);
    const primaryAttributes = character.getChildren<Character, PrimaryAttribute>('character.primary-attribute');
    const highestPrimaryAttribute = primaryAttributes.reduce((highest, attribute) => {
      return attribute.current > highest.current ? attribute : highest;
    });
    return highestPrimaryAttribute.current * constants.SKILL_MAX_LEVEL_MULTIPLIER;
  }

  serialize(): string {
    // When serializing the skill, the min level is set to the current level.
    const min = this.current;
    return super.serialize({ ...this, min });
  }
}
