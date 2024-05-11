export interface CharacterMetadata {
  /**
   * The version of the game that the character was last saved in.
   */
  gameVersion: string;
  /**
   * The name of the character preset that the character was created from.
   */
  characterPresetName: string;
}

export interface CharacterGeneralData {
  /**
   * The name of the character.
   */
  name: string;
  /**
   * The name of the character's origin.
   */
  originName: string;
  /**
   * The character's sex.
   */
  sex: string;
  /**
   * The character's age.
   */
  age: number;
  /**
   * The character's birthday stored as a string in the ISO 8601 format.
   */
  birthday: string;
  /**
   * The character's height in centimeters.
   */
  height: number;
  /**
   * The character's weight in kilograms.
   */
  weight: number;
  /**
   * A brief description of the character's general appearance.
   */
  appearance: string;
  /**
   * A brief description of the character's personality.
   */
  personality: string;
  /**
   * A brief description of the character's family background.
   */
  family: string;
  /**
   * The character's social status. This is a number between 0 and 10.
   */
  socialStatus: number;
}

export interface CharacterProgressData {
  /**
   * The total number of experience points that the character has earned.
   */
  experiencePointsTotal: number;
  /**
   * The number of experience points that the character has spent.
   */
  experiencePointsSpent: number;
}
