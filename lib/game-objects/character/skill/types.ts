export const CharacterSkillCategory = {
  combat: 'character.skill-category.combat',
  physical: 'character.skill-category.physical',
  crafting: 'character.skill-category.crafting',
  vehicles: 'character.skill-category.vehicles',
  social: 'character.skill-category.social',
  knowledge: 'character.skill-category.knowledge',
} as const;
export type CharacterSkillCategory = (typeof CharacterSkillCategory)[keyof typeof CharacterSkillCategory];
