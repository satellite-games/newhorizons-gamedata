import { GameObject } from 'lib/base/game-object';
import { PrimaryAttribute, PrimaryAttributeName } from './primary-attribute.go';
import { Character } from 'lib/character';

export type SecondaryAttributeName =
  | 'character/secondary-attribute/health-points'
  | 'character/secondary-attribute/stamina-points'
  | 'character/secondary-attribute/reaction'
  | 'character/secondary-attribute/defense'
  | 'character/secondary-attribute/speed'
  | 'character/secondary-attribute/critical-hit-threshold';

interface SecondaryAttributeFormula {
  /**
   * The primary attributes that are used to calculate the secondary attribute.
   */
  primaryAttributes: PrimaryAttributeName[];
  /**
   * The divisor used in the formula.
   */
  divisor: number;
}

export class SecondaryAttribute extends GameObject {
  declare name: SecondaryAttributeName;
  /**
   * The current difference between the total and remaining value of the secondary attribute.
   * Not all secondary attributes can be reduced like this.
   */
  declare difference: number;
  /**
   * The formula for calculating a secondary attribute based on primary attributes.
   */
  declare formula: SecondaryAttributeFormula;

  /**
   * The current total value of the secondary attribute.
   */
  get total(): number {
    const character = this.getOwner<Character>();
    if (!character) {
      throw new Error(`Cannot get ${this.constructor.name}.total without a character reference.`);
    }
    const primaryAttributes = this.getPrimaryAttributes(character);
    const primaryAttributeValues = primaryAttributes.map((primaryAttribute) =>
      primaryAttribute.getModifiedValue<PrimaryAttribute>(
        'current',
        character.getModifiers({ modifiedName: primaryAttribute.name }),
      ),
    );
    return Math.round(primaryAttributeValues.reduce((sum, value) => sum + value, 0) / this.formula.divisor);
  }

  get remaining(): number {
    const character = this.getOwner<Character>();
    if (!character) {
      throw new Error(`Cannot get ${this.constructor.name}.total without a character reference.`);
    }
    const total = this.getModifiedValue<SecondaryAttribute>('total', character.getModifiers<SecondaryAttribute>());
    return total - this.difference;
  }

  /**
   * Returns the list of primary attributes that are used to calculate the secondary attribute.
   * @param character The character that the secondary attribute belongs to.
   */
  getPrimaryAttributes(character: Character): PrimaryAttribute[] {
    const primaryAttributes: PrimaryAttribute[] = [];
    for (const primaryAttributeName of this.formula.primaryAttributes) {
      primaryAttributes.push(character.getPrimaryAttribute(primaryAttributeName));
    }
    return primaryAttributes;
  }
}
