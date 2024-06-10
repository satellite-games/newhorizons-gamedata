import { Character } from '@/character';
import type { CharacterPreset } from '@/main';

/**
 * The context for the character creation process. This context is used to store the character
 * during the creation process and keep track of the current progress. When creating a new
 * context, you must provide a `CharacterPreset` that will be used through the process.
 */
export class CharacterCreationContext {
  preset: CharacterPreset;
  character: Character;

  constructor(preset: CharacterPreset) {
    this.preset = preset;
    this.character = Character.initialize();
  }

  get originSelected() {
    return !!this.character.general.originName;
  }
}
