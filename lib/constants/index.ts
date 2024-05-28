/**
 * Contains all the constants used in the game.
 */
export const constants = {
  /**
   * The maximum level of each skill is determined by the highest primary attribute
   * that is part of the skill check. The maximum level is that attribute's level times
   * this value.
   */
  SKILL_MAX_LEVEL_MULTIPLIER: 1.5,
} as const;
