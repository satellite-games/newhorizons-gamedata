export const CharacterAbilityCategory = {
  general: 'character.ability-category.general',
  meleeCombat: 'character.ability-category.melee-combat',
  rangedCombat: 'character.ability-category.ranged-combat',
} as const;
export type CharacterAbilityCategory = (typeof CharacterAbilityCategory)[keyof typeof CharacterAbilityCategory];

export const CharacterAbilityUsageType = {
  passive: 'character.ability-usage-type.passive',
  usesStamina: 'character.ability-usage-type.uses-stamina',
  usesPower: 'character.ability-usage-type.uses-power',
} as const;
export type CharacterAbilityUsageType = (typeof CharacterAbilityUsageType)[keyof typeof CharacterAbilityUsageType];
