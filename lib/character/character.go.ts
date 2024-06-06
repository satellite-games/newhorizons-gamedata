import { GameObject } from '@/base/game-object';
import type { GameObjectInit } from '@/base/game-object/types';
import { PrimaryAttribute, type CharacterPrimaryAttributeName } from '@/game-objects/character/primary-attribute';
import { SecondaryAttribute, type CharacterSecondaryAttributeName } from '@/game-objects/character/secondary-attribute';
import type { CharacterGeneralData, CharacterMetadata, CharacterProgressData } from './types';
import type { CharacterSkill } from '@/game-objects/character/skill';

export class Character extends GameObject {
  /**
   * The character's metadata such as game version and character preset name.
   */
  meta!: CharacterMetadata;
  /**
   * The character's general data such as name and appearance.
   */
  general: CharacterGeneralData = {
    name: '',
    originName: '',
    sex: '',
    age: 0,
    birthday: '',
    height: 0,
    weight: 0,
    appearance: '',
    personality: '',
    family: '',
    socialStatus: 1,
  };
  /**
   * The character's progress data such as experience points.
   */
  progress: CharacterProgressData = {
    experiencePointsSpent: 0,
    experiencePointsTotal: 0,
  };

  children: {
    'character.primary-attribute': PrimaryAttribute[];
    'character.secondary-attribute': SecondaryAttribute[];
    // 'character.trait': [];
    'character.skill': CharacterSkill[];
    // 'character.abilities': [];
    // 'character.app': [];
    // 'character.equipment': [];
    // 'character.implant': [];
    // 'character.inventory': [];
    // 'character.status-effect': [];
  } = {
    'character.primary-attribute': [],
    'character.secondary-attribute': [],
    // 'character.trait': [],
    'character.skill': [],
    // 'character.abilities': [],
    // 'character.app': [],
    // 'character.equipment': [],
    // 'character.implant': [],
    // 'character.inventory': [],
    // 'character.status-effect': [],
  };

  constructor(init?: GameObjectInit<Character>) {
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
  getPrimaryAttribute(name: CharacterPrimaryAttributeName): PrimaryAttribute {
    return this.getChildren('character.primary-attribute').find(
      (primaryAttribute) => primaryAttribute.name === name,
    ) as PrimaryAttribute;
  }

  /**
   * Returns a secondary attribute by its name.
   * @param name The name of the secondary attribute.
   */
  getSecondaryAttribute(name: CharacterSecondaryAttributeName): SecondaryAttribute {
    return this.getChildren('character.secondary-attribute').find(
      (secondaryAttribute) => secondaryAttribute.name === name,
    ) as SecondaryAttribute;
  }
}
