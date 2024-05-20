import type { Blueprint } from '@/base/game-object/types';
import { CharacterPreset } from '@/game-objects/character/preset/preset.go';

export const characterPresets: Blueprint<CharacterPreset>[] = [
  {
    name: 'character.preset.default',
    attributePoints: 32,
    traitPoints: 0,
    interestPoints: 100,
    traitsMinimum: 5,
    traitsMaximum: 15,
    abilitiesMaximum: 4,
    bonusCredits: 0,
    startExperience: 0,
    startFatePoints: 1,
  },
  {
    name: 'character.preset.hero',
    attributePoints: 35,
    traitPoints: 10,
    interestPoints: 110,
    traitsMinimum: 5,
    traitsMaximum: 15,
    abilitiesMaximum: 6,
    bonusCredits: 0,
    startExperience: 0,
    startFatePoints: 2,
  },
];
export default characterPresets;
