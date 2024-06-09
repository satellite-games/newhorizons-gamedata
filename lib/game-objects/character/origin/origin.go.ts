import { GameObject } from '@satellite-games/orbit';
import type { CharacterPrimaryAttributeName } from '@/game-objects/character/primary-attribute';
import type { CharacterOriginName } from './origin.registry';
import type { Character } from '@/character';
import { CharacterSkill, characterSkills, type CharacterSkillName } from '../skill';
import { CharacterGameEvent } from '@/events';

/**
 * The character origin defines the cultural background of a character. It usually matches the
 * region where the character was born and raised, the region where the character has spent
 * most of their life or simply the culture that had the most influence on the character's identity.
 */
export class CharacterOrigin extends GameObject {
  declare name: CharacterOriginName;
  /**
   * The list of primary attributes that the character will receive a bonus for.
   * Note: At this time, each origin only provides a bonus of +1 to a single primary attribute.
   */
  declare primaryAttributeBonuses: Partial<Record<CharacterPrimaryAttributeName, number>>;
  /**
   * The list of traits that usually suit characters of this origin. This is merely
   * a suggestion and is intended to help players create characters that fit the origin.
   */
  declare suitableTraits: string[];
  /**
   * The list of skill bonuses that the character will receive.
   */
  declare fixedSkillBonuses: Partial<Record<CharacterSkillName, number>>;
  /**
   * The list of selectable skill bonuses that the character can choose from. These allow
   * the player to choose which skills they want to receive a bonus for.
   */
  declare selectableSkillBonuses: { value: number; skills: CharacterSkillName[] }[];

  /**
   * Applies the origin to the character. This method should be called during character creation
   * to apply the origin's bonuses. It should be called after the character has been initialized.
   * @param character The character the origin should be applied to.
   * @param selectedSkillBonuses The selected skill bonuses that the user has chosen from
   * the list of `selectableSkillBonuses`.
   * @param firstLanguage The first language that the character should receive.
   */
  apply(
    character: Character,
    selectedSkillBonuses: Partial<Record<CharacterSkillName, number>>,
    firstLanguage: string,
  ): void {
    character.general.originName = this.name;

    // Apply primary attribute bonuses
    for (const [primaryAttributeName, bonus] of Object.entries(this.primaryAttributeBonuses)) {
      const primaryAttribute = character.getPrimaryAttribute(primaryAttributeName as CharacterPrimaryAttributeName);
      if (!primaryAttribute) {
        throw new Error(`Primary attribute '${primaryAttributeName}' not found.`);
      }
      primaryAttribute.min += bonus;
      primaryAttribute.max += bonus;
      primaryAttribute.changeValue(bonus);
    }

    // Apply fixed skill bonuses
    for (const [skillName, bonus] of Object.entries(this.fixedSkillBonuses)) {
      const blueprint = characterSkills.find((blueprint) => blueprint.name === skillName);
      if (!blueprint) {
        throw new Error(`Skill '${skillName}' not found.`);
      }
      let skill = new CharacterSkill({ ...blueprint });
      skill = skill.addToCharacter(character);
      skill.min += bonus;
      skill.changeValue(bonus);
    }

    // Apply selected skill bonuses
    for (const [skillName, bonus] of Object.entries(selectedSkillBonuses)) {
      const blueprint = characterSkills.find((blueprint) => blueprint.name === skillName);
      if (!blueprint) {
        throw new Error(`Skill '${skillName}' not found.`);
      }
      let skill = new CharacterSkill({ ...blueprint });
      skill = skill.addToCharacter(character);
      skill.min += bonus;
      skill.changeValue(bonus);
    }

    new CharacterGameEvent({
      characterId: character.id,
      message: `Applied origin '${this.name}'.`,
    });
  }
}

declare module '@satellite-games/orbit' {
  interface Registry {
    'character.origin': RegistryEntry<CharacterOrigin, CharacterOriginName>;
  }
}
