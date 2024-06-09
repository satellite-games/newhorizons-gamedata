import type { Blueprint, Dependency, Modifier } from '@satellite-games/orbit';
import type { CharacterSkill, PrimaryAttribute, SecondaryAttribute } from '@/main';
import type { CharacterAbility } from './ability.go';

export const characterAbilities: Array<
  Blueprint<CharacterAbility, 'needsDetails' | 'details' | 'castTime' | 'resourceUse'> & {
    needsDetails?: boolean;
    castTime?: number;
    resourceUse?: number;
  }
> = [
  {
    name: 'character.ability.armor-habituation-1',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.armor-habituation-2',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.armor-habituation-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.armor-habituation-3',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 300,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.armor-habituation-2',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.combat-experience',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 400,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 8,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.implant-habituation-1',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.implant-habituation-2',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.implant-habituation-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.language',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    needsDetails: true,
    cost: 100,
  },
  {
    name: 'character.ability.local-knowledge',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    needsDetails: true,
    cost: 100,
  },
  {
    name: 'character.ability.master-of-improvisation',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.mid-hacking',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 300,
    dependencies: [
      {
        dependencyName: 'skill/knowledge/information-technology',
        key: 'current',
        value: 7,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'skill/crafting/programming',
        key: 'current',
        value: 3,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.quick-drawing',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 10,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.reflexes-1',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 300,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.secondary-attribute.reaction',
        key: 'total',
        value: 10,
      } as Dependency<SecondaryAttribute>,
    ],
    modifiers: [
      {
        targetName: 'character.secondary-attribute.reaction',
        keys: 'total',
        amount: 4,
      } as Modifier<SecondaryAttribute>,
    ],
  },
  {
    name: 'character.ability.reflexes-2',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill/knowledge/tactics-and-strategy',
        key: 'current',
        value: 3,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'character.ability.reflexes-1',
      } as Dependency<CharacterAbility>,
    ],
    modifiers: [
      {
        targetName: 'character.secondary-attribute.reaction',
        keys: ['total'],
        amount: 2,
      } as Modifier<SecondaryAttribute>,
    ],
  },
  {
    name: 'character.ability.steady',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.strong-nerves',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.vti-commanding',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 300,
    dependencies: [
      {
        dependencyName: 'skill/knowledge/tactics-and-strategy',
        key: 'current',
        value: 7,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.wealth-of-knowledge',
    category: 'character.ability-category.general',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.cleverness',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.aimed-strike',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 1,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.breakaway',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 3,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.power-attack',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.disarming',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 123,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.improved-parrying',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.evasion-1',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 300,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 10,
      },
    ] as Dependency<PrimaryAttribute>[],
  },
  {
    name: 'character.ability.evasion-2',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.evasion-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.evasion-3',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.evasion-2',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.feint',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 1,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.ability.aimed-strike',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.full-attack',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 2,
    resourceUse: 4,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.power-attack',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.improved-parrying',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 2,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 8,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.knock-down',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 2,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.power-attack',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.power-attack',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 2,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.resist',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.improved-parrying',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.stunning-strike',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 2,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.power-attack',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.two-handed-melee',
    category: 'character.ability-category.melee-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 400,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.aimed-strike',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.accurate',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.ability.precision-shot-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.barrage-fire',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 2,
    resourceUse: 4,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.precision-shot-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.experienced-heavy-weapons-user',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.strength',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.focus',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 300,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.precision-shot-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.precision-shot-1',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 1,
    resourceUse: 1,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
    ],
  },
  {
    name: 'character.ability.precision-shot-2',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 2,
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.precision-shot-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.precision-shot-3',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    castTime: 3,
    resourceUse: 3,
    cost: 400,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.precision-shot-2',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.prepare-attack',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-stamina',
    resourceUse: 1,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.reflexes-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.two-handed-ranged',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.passive',
    cost: 500,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.agility',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.dexterity',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.reflexes-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.barrel-roll',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    resourceUse: 1,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill.vehicles.spaceships',
        key: 'current',
        value: 5,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'skill.vehicles.airplanes',
        key: 'current',
        value: 3,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.broadside',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    resourceUse: 1,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill.vehicles.spaceships',
        key: 'current',
        value: 5,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'skill.vehicles.airplanes',
        key: 'current',
        value: 3,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.dive-attack',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill.vehicles.spaceships',
        key: 'current',
        value: 5,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'skill.vehicles.airplanes',
        key: 'current',
        value: 3,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.flying-ace',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.passive',
    cost: 500,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 13,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill.vehicles.spaceships',
        key: 'current',
        value: 10,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'skill.vehicles.airplanes',
        key: 'current',
        value: 5,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.low-level-flight',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    resourceUse: 2,
    cost: 300,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.outmaneuvering-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.luring-flight',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    castTime: 1,
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 14,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.barrel-roll',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.onboard-marksman-1',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-power',
    castTime: 1,
    resourceUse: 1,
    cost: 100,
    dependencies: [
      {
        dependencyName: 'skill/combat/onboard-weapons',
        key: 'current',
        value: 5,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.onboard-marksman-2',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-power',
    castTime: 2,
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'skill/combat/onboard-weapons',
        key: 'current',
        value: 7,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'character.ability.onboard-marksman-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.onboard-marksman-3',
    category: 'character.ability-category.ranged-combat',
    usageType: 'character.ability-usage-type.uses-power',
    castTime: 3,
    resourceUse: 3,
    cost: 400,
    dependencies: [
      {
        dependencyName: 'skill/combat/onboard-weapons',
        key: 'current',
        value: 10,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'character.ability.onboard-marksman-2',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.outmaneuvering-1',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    resourceUse: 2,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill.vehicles.spaceships',
        key: 'current',
        value: 7,
      } as Dependency<CharacterSkill>,
      {
        dependencyName: 'skill.vehicles.airplanes',
        key: 'current',
        value: 5,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.outmaneuvering-2',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    resourceUse: 3,
    cost: 200,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.constitution',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.outmaneuvering-1',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.rapid-turnaround',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.uses-power',
    castTime: 2,
    resourceUse: 3,
    cost: 300,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 15,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.ability.barrel-roll',
      } as Dependency<CharacterAbility>,
    ],
  },
  {
    name: 'character.ability.save-driving-land-vehicles',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.passive',
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill/vehicles/land-vehicles',
        key: 'current',
        value: 7,
      } as Dependency<CharacterSkill>,
    ],
  },
  {
    name: 'character.ability.save-driving-water-vehicles',
    category: 'character.ability-category.vehicles',
    usageType: 'character.ability-usage-type.passive',
    cost: 100,
    dependencies: [
      {
        dependencyName: 'character.primary-attribute.courage',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'character.primary-attribute.intuition',
        key: 'current',
        value: 12,
      } as Dependency<PrimaryAttribute>,
      {
        dependencyName: 'skill/vehicles/water-vehicles',
        key: 'current',
        value: 7,
      } as Dependency<CharacterSkill>,
    ],
  },
];
