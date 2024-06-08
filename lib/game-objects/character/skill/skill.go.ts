import { GameObject } from '@satellite-games/orbit';
import { constants } from '@/constants';
import { Character, getOwnerCharacter } from '@/character';
import { CharacterGameEvent } from '@/events';
import type { CharacterSkillName } from './skill.registry';
import type { CharacterPrimaryAttributeName, PrimaryAttribute } from '../primary-attribute';
import type { CharacterSkillCategory } from './types';

export class CharacterSkill extends GameObject {
  declare name: CharacterSkillName;
  /**
   * The category of the skill.
   */
  declare category: CharacterSkillCategory;
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
    if (!primaryAttributes.length) throw new Error('The character does not have any primary attributes.');
    const highestPrimaryAttribute = primaryAttributes.reduce((highest, attribute) => {
      return attribute.current > highest.current ? attribute : highest;
    });
    return highestPrimaryAttribute.current * constants.SKILL_MAX_LEVEL_MULTIPLIER;
  }

  /**
   * Adds the skill to the given character and returns it. If the character already has the skill,
   * the existing skill is returned and nothing is added.
   * @param character The character to add the skill to.
   */
  addToCharacter(character: Character): CharacterSkill {
    const ownedSkill = character.findChildByName<CharacterSkill>(this.name);
    if (ownedSkill) return ownedSkill;
    character.addChild<Character, CharacterSkill>(this);
    new CharacterGameEvent({
      characterId: character.id,
      message: `Added skill '${this.name}'.`,
    });
    return this;
  }

  /**
   * Removes the skill from the given character. Will do nothing if the character does not have
   * the skill.
   * @param character The character to remove the skill from.
   */
  removeFromCharacter(character: Character): void {
    if (!character.findChildByName(this.name)) return;
    character.removeChild<Character, CharacterSkill>(this);
    new CharacterGameEvent({
      characterId: character.id,
      message: `Removed skill '${this.name}'.`,
    });
  }

  /**
   * Increases or decreases the current value of the skill by the specified amount.
   * If the new value is within the minimum and maximum values, the operation will succeed and
   * the new value is returned. Otherwise, the value will not change and nothing will be returned.
   * @param amount The amount to change the value by.
   */
  changeValue(amount: number): number | void {
    const oldValue = this.current;
    const newValue = this.current + amount;
    if (newValue >= this.min && newValue <= this.max) {
      this.current = newValue;
      if (this.owner)
        new CharacterGameEvent({
          characterId: this.owner.id,
          message: `Skill value changed from ${oldValue} to ${newValue}.`,
        });
      return this.current;
    }
  }

  beforeSerialize(state: CharacterSkill) {
    return { ...state, min: state.current };
  }
}
