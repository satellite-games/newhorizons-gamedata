import { primaryAttributes } from 'lib/blueprints/character/primary-attribute.blueprints';
import { PrimaryAttribute } from 'lib/game-objects/character/primary-attribute.go';
import { Character } from './character.go';
import { secondaryAttributes } from 'lib/blueprints/character/secondary-attribute.blueprints';
import { SecondaryAttribute } from 'lib/game-objects/character/secondary-attribute.go';

/**
 * Creates a new character.
 */
export const createNewCharacter = (): Character => {
  const character = new Character();
  // Add primary and secondary attributes
  character.primaryAttributes = primaryAttributes.map(
    (blueprint) => new PrimaryAttribute({ ...blueprint, owner: character }),
  );
  character.secondaryAttributes = secondaryAttributes.map(
    (blueprint) => new SecondaryAttribute({ ...blueprint, owner: character }),
  );
  return character;
};
