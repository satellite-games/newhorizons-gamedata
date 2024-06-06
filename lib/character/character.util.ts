import type { GameObject } from '@/main';
import { Character } from './character.go';

/**
 * Returns the owner character of a game object. Will throw an error if the game object
 * does not have an owner or the owner is not a character.
 * @param gameObject The game object to get the owner character of.
 * @returns The owner character.
 */
export function getOwnerCharacter(gameObject: GameObject): Character {
  const owner = gameObject.getOwner();
  if (!owner && !((owner as unknown) instanceof Character)) {
    throw new Error('Attempted to get the owner character of a game object that does not have a character owner.');
  }
  return owner as Character;
}
