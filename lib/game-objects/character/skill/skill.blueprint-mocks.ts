import type { Blueprint, Dependency } from '@satellite-games/orbit';
import type { CharacterSkill } from './skill.go';

type Keys = 'coreSkill' | 'nonCoreSkill' | 'withDependency';

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
  nonCoreSkill: {
    name: 'character.skill.chemistry',
    category: 'character.skill-category.knowledge',
    factor: 3,
    constraintMultiplier: 0,
    primaryAttributes: [
      'character.primary-attribute.cleverness',
      'character.primary-attribute.cleverness',
      'character.primary-attribute.intuition',
    ],
    isCoreSkill: false,
  },
  withDependency: {
    name: 'character.skill.explosives',
    category: 'character.skill-category.crafting',
    factor: 3,
    constraintMultiplier: 0,
    primaryAttributes: [
      'character.primary-attribute.courage',
      'character.primary-attribute.intuition',
      'character.primary-attribute.dexterity',
    ],
    isCoreSkill: false,
    dependencies: [
      {
        name: 'character.skill.chemistry',
        key: 'current',
        value: 3,
      },
    ] as Dependency<CharacterSkill>[],
  },
};
