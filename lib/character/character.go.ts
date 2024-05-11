import { GameObject, Saved } from '..';
import { CharacterGeneralData, CharacterMetadata, CharacterProgressData } from './types';

export default class Character extends GameObject {
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
  primaryAttributes = [];
  /**
   * The character's secondary attributes.
   */
  secondaryAttributes = [];
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
   * The character's inventory.
   */
  inventory = [];

  constructor(init: Partial<Saved<Character>>) {
    super({ name: 'character', ...init });
  }
}
