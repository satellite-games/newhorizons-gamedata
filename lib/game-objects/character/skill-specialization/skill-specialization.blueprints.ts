import type { Blueprint } from '@satellite-games/orbit';
import type { CharacterSkillSpecialization } from './skill-specialization.go';

export const characterSkillSpecializations: Blueprint<CharacterSkillSpecialization>[] = [
  {
    name: 'character.skill-specialization.ballistic-cannons',
    skill: 'character.skill.onboard-weapons',
  },
  {
    name: 'character.skill-specialization.gauss-cannons',
    skill: 'character.skill.onboard-weapons',
  },
  {
    name: 'character.skill-specialization.torpedo-launchers',
    skill: 'character.skill.onboard-weapons',
  },
  {
    name: 'character.skill-specialization.automatic-rifles',
    skill: 'character.skill.rifles',
  },
  {
    name: 'character.skill-specialization.semi-automatic-rifles',
    skill: 'character.skill.rifles',
  },
  {
    name: 'character.skill-specialization.shotguns',
    skill: 'character.skill.rifles',
  },
  {
    name: 'character.skill-specialization.animal-handling',
    skill: 'character.skill.animal-handling',
    requiresDetails: true,
  },
  {
    name: 'character.skill-specialization.drink-preparation',
    skill: 'character.skill.cooking',
  },
  {
    name: 'character.skill-specialization.food-preparation',
    skill: 'character.skill.cooking',
  },
  {
    name: 'character.skill-specialization.calligraphy',
    skill: 'character.skill.drawing',
  },
  {
    name: 'character.skill-specialization.painting',
    skill: 'character.skill.drawing',
  },
  {
    name: 'character.skill-specialization.technical-drawing',
    skill: 'character.skill.drawing',
  },
  {
    name: 'character.skill-specialization.computer-engineering',
    skill: 'character.skill.electrical-engineering',
  },
  {
    name: 'character.skill-specialization.control-engineering',
    skill: 'character.skill.electrical-engineering',
  },
  {
    name: 'character.skill-specialization.cybernetics',
    skill: 'character.skill.electrical-engineering',
  },
  {
    name: 'character.skill-specialization.mechatronics',
    skill: 'character.skill.electrical-engineering',
  },
  {
    name: 'character.skill-specialization.power-engineering',
    skill: 'character.skill.electrical-engineering',
  },
  {
    name: 'character.skill-specialization.ammunition',
    skill: 'character.skill.explosives',
  },
  {
    name: 'character.skill-specialization.disarming',
    skill: 'character.skill.explosives',
  },
  {
    name: 'character.skill-specialization.explosives-production',
    skill: 'character.skill.explosives',
  },
  {
    name: 'character.skill-specialization.fuels',
    skill: 'character.skill.explosives',
  },
  {
    name: 'character.skill-specialization.making-music',
    skill: 'character.skill.making-music',
    requiresDetails: true,
  },
  {
    name: 'character.skill-specialization.metal-processing',
    skill: 'character.skill.material-processing',
  },
  {
    name: 'character.skill-specialization.plastics-processing',
    skill: 'character.skill.material-processing',
  },
  {
    name: 'character.skill-specialization.stone-cutting',
    skill: 'character.skill.material-processing',
  },
  {
    name: 'character.skill-specialization.tailoring',
    skill: 'character.skill.material-processing',
  },
  {
    name: 'character.skill-specialization.woodworking',
    skill: 'character.skill.material-processing',
  },
  {
    name: 'character.skill-specialization.machinery-construction',
    skill: 'character.skill.mechanical-engineering',
  },
  {
    name: 'character.skill-specialization.structural-engineering',
    skill: 'character.skill.mechanical-engineering',
  },
  {
    name: 'character.skill-specialization.vehicle-construction',
    skill: 'character.skill.mechanical-engineering',
  },
  {
    name: 'character.skill-specialization.weapon-smithing',
    skill: 'character.skill.mechanical-engineering',
  },
  {
    name: 'character.skill-specialization.internal-medicine',
    skill: 'character.skill.medical-care',
  },
  {
    name: 'character.skill-specialization.neurology',
    skill: 'character.skill.medical-care',
  },
  {
    name: 'character.skill-specialization.psychology',
    skill: 'character.skill.medical-care',
  },
  {
    name: 'character.skill-specialization.veterinary-medicine',
    skill: 'character.skill.medical-care',
  },
  {
    name: 'character.skill-specialization.pharmacology',
    skill: 'character.skill.pharmaceutics',
  },
  {
    name: 'character.skill-specialization.toxicology',
    skill: 'character.skill.pharmaceutics',
  },
  {
    name: 'character.skill-specialization.gambling',
    skill: 'character.skill.playing-games',
  },
  {
    name: 'character.skill-specialization.video-gaming',
    skill: 'character.skill.playing-games',
  },
  {
    name: 'character.skill-specialization.software-engineering',
    skill: 'character.skill.programming',
  },
  {
    name: 'character.skill-specialization.hacking',
    skill: 'character.skill.programming',
  },
  {
    name: 'character.skill-specialization.fictional-writing',
    skill: 'character.skill.writing',
  },
  {
    name: 'character.skill-specialization.journalistic-writing',
    skill: 'character.skill.writing',
  },
  {
    name: 'character.skill-specialization.scientific-writing',
    skill: 'character.skill.writing',
  },
];
