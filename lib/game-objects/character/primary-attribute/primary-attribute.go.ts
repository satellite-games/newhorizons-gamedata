import { GameObject } from '@satellite-games/orbit';
import { CharacterGameEvent } from '@/events/character.event';
import type { CharacterPrimaryAttributeName } from './primary-attribute.registry';

export class PrimaryAttribute extends GameObject {
  declare name: CharacterPrimaryAttributeName;
  /**
   * The current value of the primary attribute.
   */
  declare current: number;
  /**
   * The starting value of the primary attribute.
   */
  declare start: number;
  /**
   * The minimum value of the primary attribute.
   */
  declare min: number;
  /**
   * The maximum value of the primary attribute.
   */
  declare max: number;

  /**
   * Increases or decreases the current value of the primary attribute by the specified amount.
   * If the new value is within the minimum and maximum values, the operation will succeed and
   * the new value is returned. Otherwise, the value will not change and nothing will be returned.
   * @param amount The amount to change the value by.
   */
  changeValue(amount: number): number | void {
    const oldValue = this.current;
    const newValue = this.current + amount;
    if (newValue >= this.min && newValue <= this.max) {
      this.current = newValue;
      if (this.owner)
        new CharacterGameEvent({
          characterId: this.owner.id,
          message: `Primary attribute value changed from ${oldValue} to ${newValue}.`,
        });
      return this.current;
    }
  }

  beforeSerialize(state: PrimaryAttribute) {
    return { ...state, min: state.current };
  }
}

declare module '@satellite-games/orbit' {
  interface Registry {
    'character.primary-attribute': RegistryEntry<PrimaryAttribute, CharacterPrimaryAttributeName>;
  }
}
