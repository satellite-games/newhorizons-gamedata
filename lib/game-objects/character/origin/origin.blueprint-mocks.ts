import type { Blueprint } from '@/base/game-object';
import type { CharacterOrigin } from './origin.go';

export const characterOriginMocks: Blueprint<CharacterOrigin>[] = [
  {
    name: 'character.origin.earth-urban',
    suitableTraits: ['character.trait.academic-education', 'character.trait.arrogance'],
    primaryAttributeBonuses: { 'character.primary-attribute.cleverness': 1 },
    fixedSkillBonuses: {
      'character.skill.crafting.computers': 2,
      'character.skill.knowledge.general-knowledge': 3,
      'character.skill.social.soft-skills': -1,
    },
    selectableSkillBonuses: [
      {
        value: 1,
        skills: ['character.skill.vehicles.spaceships', 'character.skill.vehicles.airplanes'],
      },
      {
        value: -1,
        skills: [
          'character.skill.knowledge.astronomy',
          'character.skill.knowledge.biology-and-medicine',
          'character.skill.knowledge.chemistry',
        ],
      },
    ],
  },
];
