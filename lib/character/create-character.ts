import { primaryAttributes } from '@/game-objects/character/primary-attribute';
import { PrimaryAttribute } from '@/game-objects/character/primary-attribute/primary-attribute.go';
import { secondaryAttributes } from '@/game-objects/character/secondary-attribute';
import { SecondaryAttribute } from '@/game-objects/character/secondary-attribute/secondary-attribute.go';
import { Character } from './character.go';

/**
 * Creates a new character.
 * @param name The name of the character. Can be left blank to use the default name.
 */
export const createNewCharacter = (name?: string): Character => {
  const character = new Character();
  // Set name
  character.general.name = name || 'Anonymous';
  // Add primary and secondary attributes
  character.setChildren(
    'character.primary-attribute',
    primaryAttributes.map((blueprint) => new PrimaryAttribute({ ...blueprint, owner: character })),
  );
  character.setChildren(
    'character.secondary-attribute',
    secondaryAttributes.map((blueprint) => new SecondaryAttribute({ ...blueprint, owner: character })),
  );
  return character;
};
