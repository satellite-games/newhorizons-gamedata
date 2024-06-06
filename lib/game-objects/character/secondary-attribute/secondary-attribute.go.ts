import { GameObject } from '@/base/game-object/game-object';
import { PrimaryAttribute, type CharacterPrimaryAttributeName } from '@/game-objects/character/primary-attribute';
import { type Character } from '@/character/character.go';
import type { CharacterSecondaryAttributeName } from './secondary-attribute.registry';
import { getOwnerCharacter } from '@/character';

interface SecondaryAttributeFormula {
  /**
   * The primary attributes that are used to calculate the secondary attribute.
   */
  primaryAttributes: CharacterPrimaryAttributeName[];
  /**
   * The divisor used in the formula.
   */
  divisor: number;
}

export class SecondaryAttribute extends GameObject {
  declare name: CharacterSecondaryAttributeName;
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
    const character = getOwnerCharacter(this);
    const primaryAttributes = this.getPrimaryAttributes(character);
    const primaryAttributeValues = primaryAttributes.map((primaryAttribute) =>
      primaryAttribute.getModifiedValue<PrimaryAttribute>(
        'current',
        character.getModifiers({ modifiedName: primaryAttribute.name }),
      ),
    );
    return Math.round(primaryAttributeValues.reduce((sum, value) => sum + value, 0) / this.formula.divisor);
  }

  /**
   * The remaining value of the secondary attribute.
   */
  get remaining(): number {
    const character = getOwnerCharacter(this);
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
