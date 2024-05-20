import { GameObject } from '@/base/game-object';
import type { PrimaryAttributeName } from '@/game-objects/character/primary-attribute';

/**
 * The character origin defines the cultural background of a character. It usually matches the
 * region where the character was born and raised, the region where the character has spent
 * most of their life or simply the culture that had the most influence on the character's identity.
 */
export class CharacterOrigin extends GameObject {
  /**
   * The list of primary attributes that the character will receive a bonus for.
   * Note: At this time, each origin only provides a bonus of +1 to a single primary attribute.
   */
  declare primaryAttributeBonuses: Partial<Record<PrimaryAttributeName, number>>;
  /**
   * The list of traits that usually suit characters of this origin. This is merely
   * a suggestion and is intended to help players create characters that fit the origin.
   */
  declare suitableTraits: string[];
  /**
   * The list of skill bonuses that the character will receive.
   */
  declare fixedSkillBonuses: Record<string, number>;
  /**
   * The list of selectable skill bonuses that the character can choose from. These allow
   * the player to choose which skills they want to receive a bonus for.
   */
  declare selectableSkillBonuses: { value: number; skills: string[] }[];
}
