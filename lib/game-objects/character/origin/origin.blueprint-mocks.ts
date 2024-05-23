import type { Blueprint } from '@/base/game-object';
import type { CharacterOrigin } from './origin.go';

export const characterOriginMocks: Blueprint<CharacterOrigin>[] = [
  {
    name: 'character.origin.earth-urban',
    suitableTraits: ['character.trait.academic-education', 'character.trait.arrogance'],
    primaryAttributeBonuses: { 'character.primary-attribute.cleverness': 1 },
    fixedSkillBonuses: {
      'character.skill.computers': 2,
      'character.skill.general-knowledge': 3,
      'character.skill.soft-skills': -1,
    },
    selectableSkillBonuses: [
      {
        value: 1,
        skills: ['character.skill.spaceships', 'character.skill.airplanes'],
      },
      {
        value: -1,
        skills: ['character.skill.astronomy', 'character.skill.biology-and-medicine', 'character.skill.chemistry'],
      },
    ],
  },
];
