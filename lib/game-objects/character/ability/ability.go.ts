import { GameObject } from '@satellite-games/orbit';
import type { CharacterAbilityCategory, CharacterAbilityUsageType } from './types';
import type { CharacterAbilityName } from './ability.registry';

export class CharacterAbility extends GameObject {
  declare name: CharacterAbilityName;
  /**
   * The category of the ability.
   */
  declare category: CharacterAbilityCategory;
  /**
   * Describes how the ability is being used. Passive abilities provide passive effects.
   * Abilities that use stamina or power require the character to spend stamina or (vehicle)
   * power to use them.
   */
  declare usageType: CharacterAbilityUsageType;
  /**
   * Whether the ability needs details to be specified when being bought. Default is `false`.
   */
  needsDetails: boolean = false;
  /**
   * The details of the ability that were specified when the ability was bought.
   */
  details: string = '';
  /**
   * The number of actions it takes to cast the ability (assuming it is not passive)
   * Defaults to `0`.
   */
  castTime: number = 0;
  /**
   * The amount of stamina or power points points it uses to cast the ability (assuming it
   * is not passive). Defaults to `0`.
   */
  resourceUse: number = 0;
  /**
   * How much experience points the ability costs to buy.
   */
  declare cost: number;
}

declare module '@satellite-games/orbit' {
  interface Registry {
    'character.ability': RegistryEntry<CharacterAbility, CharacterAbilityName>;
  }
}
