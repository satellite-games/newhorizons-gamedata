import { GameObject } from '@/main';
import type { CharacterSkillCategoryName } from './skill-category.registry';

export class CharacterSkillCategory extends GameObject {
  declare name: CharacterSkillCategoryName;
}
