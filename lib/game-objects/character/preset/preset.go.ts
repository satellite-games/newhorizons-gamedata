import { GameObject } from '@/base/game-object/game-object';
import type { CharacterPresetName } from './preset.registry';

/**
 * A character preset is a template for character creation. It defines certain parameters that will
 * impact the character's creation process.
 */
export class CharacterPreset extends GameObject {
  declare name: CharacterPresetName;
  /**
   * The number of attribute points that the character will have. Attribute points can be spent
   * to increase the character's attributes.
   */
  declare attributePoints: number;
  /**
   * The number of trait points that the character will have. Trait points can be spent to
   * acquire traits for the character.
   */
  declare traitPoints: number;
  /**
   * The number of interest points that the character will have. Interest points can be spent to
   * acquire skills for the character.
   */
  declare interestPoints: number;
  /**
   * The minimum number of traits that the character must acquire during character creation.
   */
  declare traitsMinimum: number;
  /**
   * The maximum number of traits that the character can acquire during character creation.
   */
  declare traitsMaximum: number;
  /**
   * The maximum number of abilities that the character can acquire during character creation.
   */
  declare abilitiesMaximum: number;
  /**
   * The amount of bonus credits that the character will start with. These credits will be added
   * on top of the credits that the character would normally start with.
   */
  declare bonusCredits: number;
  /**
   * The amount of bonus experience that the character will start with. Experience points can be
   * spent to enhance the character's capabilities after the character has been created.
   */
  declare startExperience: number;
  /**
   * The number of fate points that the character will start with. Fate points can be used to
   * influence the outcome of events in the game.
   */
  declare startFatePoints: number;
}
