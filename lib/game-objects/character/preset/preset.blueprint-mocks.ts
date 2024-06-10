import type { CharacterPreset } from './preset.go';

export const characterPresetMocks = {
  default: {
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
  } as CharacterPreset,
};
