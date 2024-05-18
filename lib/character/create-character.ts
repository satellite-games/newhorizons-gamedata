import { primaryAttributes } from '@/blueprints/character/primary-attribute.blueprints';
import { PrimaryAttribute } from '@/game-objects/character/primary-attribute.go';
import { Character } from './character.go';
import { secondaryAttributes } from '@/blueprints/character/secondary-attribute.blueprints';
import { SecondaryAttribute } from '@/game-objects/character/secondary-attribute.go';

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
