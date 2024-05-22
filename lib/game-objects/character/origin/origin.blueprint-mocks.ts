import type { Blueprint } from '@/base/game-object';
import type { CharacterOrigin } from './origin.go';
import type { CharacterOriginName } from './origin.registry';

export const characterOriginMocks: Blueprint<CharacterOrigin>[] = [
  {
    name: 'character.origin.vulcan' as unknown as CharacterOriginName,
    suitableTraits: [],
    primaryAttributeBonuses: { 'character.primary-attribute.cleverness': 1 },
    fixedSkillBonuses: {
      'skill.crafting.computers': 2,
      'skill.knowledge.general-knowledge': 3,
      'skill.social.soft-skills': -1,
    },
    selectableSkillBonuses: [
      {
        value: 1,
        skills: ['skill.vehicles.extraplanetary-flying', 'skill.vehicles.intraplanetary-flying'],
      },
      {
        value: 1,
        skills: ['skill.knowledge.astronomy', 'skill.knowledge.biology-and-medicine'],
      },
    ],
  },
];
