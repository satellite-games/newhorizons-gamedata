import type { Blueprint } from '@/main';
import type { CharacterSkillCategory } from './skill-category.go';

export const characterSkillCategories: Blueprint<CharacterSkillCategory>[] = [
  {
    name: 'character.skill-category.combat',
  },
  {
    name: 'character.skill-category.physical',
  },
  {
    name: 'character.skill-category.crafting',
  },
  {
    name: 'character.skill-category.vehicles',
  },
  {
    name: 'character.skill-category.social',
  },
  {
    name: 'character.skill-category.knowledge',
  },
];
