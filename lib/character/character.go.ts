import { SecondaryAttribute, type SecondaryAttributeName } from '@/game-objects/character/secondary-attribute.go';
import type { CharacterGeneralData, CharacterMetadata, CharacterProgressData } from './types';
import { PrimaryAttribute, type PrimaryAttributeName } from '@/game-objects/character/primary-attribute.go';
import { GameObject } from '@/base/game-object';
import type { Saved } from '@/base/game-object/types';

export class Character extends GameObject {
  /**
   * The character's metadata such as game version and character preset name.
   */
  meta!: CharacterMetadata;
  /**
   * The character's general data such as name and appearance.
   */
  general!: CharacterGeneralData;
  /**
   * The character's progress data such as experience points.
   */
  progress: CharacterProgressData = {
    experiencePointsSpent: 0,
    experiencePointsTotal: 0,
  };
  /**
   * The character's primary attributes.
   */
  primaryAttributes: PrimaryAttribute[] = [];
  /**
   * The character's secondary attributes.
   */
  secondaryAttributes: SecondaryAttribute[] = [];
  /**
   * The character's traits.
   */
  traits = [];
  /**
   * The character's skills.
   */
  skills = [];
  /**
   * The character's abilities.
   */
  abilities = [];
  /**
   * The character's apps.
   */
  apps = [];
  /**
   * The character's equipment.
   */
  equipment = [];
  /**
   * The character's implants.
   */
  implants = [];
  /**
   * The character's inventory.
   */
  inventory = [];
  /**
   * The character's active status effects.
   */
  statusEffects = [];

  constructor(init?: Partial<Saved<Character>>) {
    super({ name: 'character', ...init });
  }

  /**
   * Updates the character's secondary attributes based on the primary attributes.
   */
  // updateSecondaryAttributes() {
  //   this.secondaryAttributes.forEach((secondaryAttribute) => secondaryAttribute.calculateTotal(this));
  // }

  /**
   * Returns a primary attribute by its name.
   * @param name The name of the primary attribute.
   */
  getPrimaryAttribute(name: PrimaryAttributeName): PrimaryAttribute {
    return this.primaryAttributes.find((primaryAttribute) => primaryAttribute.name === name) as PrimaryAttribute;
  }

  /**
   * Returns a secondary attribute by its name.
   * @param name The name of the secondary attribute.
   */
  getSecondaryAttribute(name: SecondaryAttributeName): SecondaryAttribute {
    return this.secondaryAttributes.find(
      (secondaryAttribute) => secondaryAttribute.name === name,
    ) as SecondaryAttribute;
  }
}
