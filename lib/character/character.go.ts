import { SecondaryAttribute, SecondaryAttributeName } from 'lib/game-objects/character/secondary-attribute.go';
import { GameObject, Saved } from '..';
import { CharacterGeneralData, CharacterMetadata, CharacterProgressData } from './types';
import { PrimaryAttribute, PrimaryAttributeName } from 'lib/game-objects/character/primary-attribute.go';
import { Modifier } from 'lib/game-objects/general/modifier.go';

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

  /**
   * The list of all modifiers that are currently affecting the character.
   */
  get modifiers() {
    const modifiers: Modifier[] = [];
    return modifiers;
  }

  /**
   * Returns all modifiers that are currently affecting the character.
   * @param filter An optional filter to only return modifiers that match the filter.
   */
  getModifiers<TGameObject = GameObject>(filter?: {
    modifiedName?: string;
    modifiedId?: string;
    modifiedKey?: keyof TGameObject;
  }): Modifier<TGameObject>[] {
    const { modifiedName, modifiedId, modifiedKey } = { ...filter };
    let modifiers = this.modifiers as unknown as Modifier<TGameObject>[];
    // Filter modifiers
    if (modifiedName) modifiers = modifiers.filter((modifier) => modifier.modifiedName === modifiedName);
    if (modifiedId) modifiers = modifiers.filter((modifier) => modifier.modifiedId === modifiedId);
    if (modifiedKey) modifiers = modifiers.filter((modifier) => modifier.modifiedKey === modifiedKey);
    return modifiers;
  }
}
