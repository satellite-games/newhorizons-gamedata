import type { Blueprint } from '@/main';
import type { CharacterSkill } from './skill.go';

type Keys = 'coreSkill';

export const characterSkillMocks: Record<Keys, Blueprint<CharacterSkill, 'min' | 'current' | 'max'>> = {
  coreSkill: {
    name: 'character.skill.body-control',
    category: 'character.skill-category.physical',
    factor: 1,
    constraintMultiplier: 2,
    primaryAttributes: [
      'character.primary-attribute.agility',
      'character.primary-attribute.agility',
      'character.primary-attribute.constitution',
    ],
    isCoreSkill: true,
  },
};
