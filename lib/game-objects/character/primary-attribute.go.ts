import { GameObject } from '@/base/game-object/game-object';
import { Character } from '@/character/character.go';
import { CharacterGameEvent } from '@/events/event-types/character.event';

export type PrimaryAttributeName =
  | 'character/primary-attribute/courage'
  | 'character/primary-attribute/cleverness'
  | 'character/primary-attribute/intuition'
  | 'character/primary-attribute/charisma'
  | 'character/primary-attribute/agility'
  | 'character/primary-attribute/dexterity'
  | 'character/primary-attribute/constitution'
  | 'character/primary-attribute/strength';

export class PrimaryAttribute extends GameObject {
  declare name: PrimaryAttributeName;
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
   * @param character The character that the primary attribute belongs to.
   */
  changeValue(amount: number, character: Character): number | void {
    const oldValue = this.current;
    const newValue = this.current + amount;
    if (newValue >= this.min && newValue <= this.max) {
      this.current = newValue;
      new CharacterGameEvent({
        characterId: character.id,
        message: `Primary attribute value changed from ${oldValue} to ${newValue}.`,
      });
      return this.current;
    }
  }
}
