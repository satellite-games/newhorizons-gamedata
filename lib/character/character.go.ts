import { GameObject, type GameObjectInit } from '@satellite-games/orbit';
import {
  primaryAttributes,
  PrimaryAttribute,
  type CharacterPrimaryAttributeName,
} from '@/game-objects/character/primary-attribute';
import {
  secondaryAttributes,
  SecondaryAttribute,
  type CharacterSecondaryAttributeName,
} from '@/game-objects/character/secondary-attribute';
import type { CharacterGeneralData, CharacterMetadata, CharacterProgressData } from './types';
import { characterSkills, CharacterSkill, type CharacterSkillName } from '@/game-objects/character/skill';
import { constants } from '@/constants';
import type { CharacterAbility, CharacterAbilityName } from '@/game-objects/character/ability';
import { CharacterGameEvent } from '@/events';

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
    'character.ability': CharacterAbility[];
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
    'character.ability': [],
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
   * Initializes a new character. This method should be called at the beginning of the character
   * creation process. It should be followed up by applying a `CharacterOrigin` to the character.
   * @param name The name of the character. Defaults to `constants.CHARACTER_DEFAULT_NAME`.
   * @returns The newly initialized character.
   */
  static initialize(name?: string) {
    const character = new Character();
    // Set name
    character.general.name = name ?? constants.CHARACTER_DEFAULT_NAME;
    // Add primary and secondary attributes
    character.setChildren<Character, PrimaryAttribute>(
      // 'character.primary-attribute',
      primaryAttributes.map((blueprint) => new PrimaryAttribute({ ...blueprint, owner: character })),
    );
    character.setChildren<Character, SecondaryAttribute>(
      secondaryAttributes.map((blueprint) => new SecondaryAttribute({ ...blueprint, owner: character })),
    );
    // Add core skills
    const coreSkills = characterSkills.filter((skill) => skill.isCoreSkill);
    character.setChildren<Character, CharacterSkill>(
      coreSkills.map((blueprint) => new CharacterSkill({ ...blueprint, owner: character })),
    );
    new CharacterGameEvent({
      characterId: character.id,
      message: `Character initialized.`,
    });
    return character;
  }

  /**
   * Updates the character's secondary attributes based on the primary attributes.
   */
  // updateSecondaryAttributes() {
  //   this.secondaryAttributes.forEach((secondaryAttribute) => secondaryAttribute.calculateTotal(this));
  // }

  /**
   * Returns a primary attribute by its name. Throws an error if the primary attribute is not found.
   * @param name The name of the primary attribute.
   */
  getPrimaryAttribute(name: CharacterPrimaryAttributeName): PrimaryAttribute {
    const primaryAttribute = this.getChildren('character.primary-attribute').find(
      (primaryAttribute) => primaryAttribute.name === name,
    ) as PrimaryAttribute | undefined;
    // Since primary attributes are required, we throw an error if the primary attribute is not found.
    if (!primaryAttribute) {
      throw new Error(`Primary attribute '${name}' not found.`);
    }
    return primaryAttribute;
  }

  /**
   * Returns a secondary attribute by its name. Throws an error if the secondary attribute is not found.
   * @param name The name of the secondary attribute.
   */
  getSecondaryAttribute(name: CharacterSecondaryAttributeName): SecondaryAttribute {
    const secondaryAttribute = this.getChildren('character.secondary-attribute').find(
      (secondaryAttribute) => secondaryAttribute.name === name,
    ) as SecondaryAttribute | undefined;
    // Since secondary attributes are required, we throw an error if the secondary attribute is not found.
    if (!secondaryAttribute) {
      throw new Error(`Secondary attribute '${name}' not found.`);
    }
    return secondaryAttribute;
  }

  /**
   * Returns a skill by its name. Returns `undefined` if the skill is not found.
   * @param name The name of the skill.
   */
  getSkill(name: CharacterSkillName): CharacterSkill | undefined {
    return this.getChildren('character.skill').find((skill) => skill.name === name) as CharacterSkill | undefined;
  }

  /**
   * Returns an ability by its name. Returns `undefined` if the ability is not found.
   * @param name The name of the ability.
   */
  getAbility(name: CharacterAbilityName): CharacterAbility | undefined {
    return this.getChildren('character.ability').find((ability) => ability.name === name) as
      | CharacterAbility
      | undefined;
  }
}

declare module '@satellite-games/orbit' {
  interface Registry {
    character: RegistryEntry<Character, 'character'>;
  }
}
