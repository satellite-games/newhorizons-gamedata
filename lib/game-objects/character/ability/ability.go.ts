import { GameObject, type GameObjectInit } from '@satellite-games/orbit';
import type { CharacterAbilityCategory, CharacterAbilityUsageType } from './types';
import type { CharacterAbilityName } from './ability.registry';
import type { Character } from '@/character';
import { CharacterGameEvent } from '@/events';

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
  declare needsDetails: boolean;
  /**
   * The details of the ability that were specified when the ability was bought.
   */
  declare details: string;
  /**
   * The number of actions it takes to cast the ability (assuming it is not passive)
   * Defaults to `0`.
   */
  declare castTime: number;
  /**
   * The amount of stamina or power points points it uses to cast the ability (assuming it
   * is not passive). Defaults to `0`.
   */
  declare resourceUse: number;
  /**
   * How much experience points the ability costs to buy.
   */
  declare cost: number;

  constructor(
    init: GameObjectInit<CharacterAbility, 'needsDetails' | 'details' | 'castTime' | 'resourceUse'> & {
      needsDetails?: boolean;
      details?: string;
      castTime?: number;
      resourceUse?: number;
    },
  ) {
    super(init);
  }

  defaultValues(): Partial<CharacterAbility> {
    return {
      needsDetails: false,
      details: '',
      castTime: 0,
      resourceUse: 0,
    };
  }

  /**
   * Adds the ability to the given character and returns it. If the character already has the ability,
   * the existing ability is returned and nothing is added.
   * @param character The character to add the ability to.
   */
  addToCharacter(character: Character): CharacterAbility {
    const ownedAbility = character.findChildByName<CharacterAbility>(this.name);
    if (ownedAbility) return ownedAbility;
    character.addChild<Character, CharacterAbility>(this);
    new CharacterGameEvent({
      characterId: character.id,
      message: `Added ability '${this.name}'.`,
    });
    return this;
  }

  /**
   * Removes the ability from the given character. Will do nothing if the character does not have
   * the ability.
   * @param character The character to remove the ability from.
   */
  removeFromCharacter(character: Character): void {
    if (!character.findChildByName(this.name)) return;
    character.removeChild<Character, CharacterAbility>(this);
    new CharacterGameEvent({
      characterId: character.id,
      message: `Removed ability '${this.name}'.`,
    });
  }
}

declare module '@satellite-games/orbit' {
  interface Registry {
    'character.ability': RegistryEntry<CharacterAbility, CharacterAbilityName>;
  }
}
