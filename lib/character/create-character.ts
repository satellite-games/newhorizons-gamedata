import { PrimaryAttribute, primaryAttributes } from '@/game-objects/character/primary-attribute';
import { SecondaryAttribute, secondaryAttributes } from '@/game-objects/character/secondary-attribute';
import { Character } from './character.go';

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
