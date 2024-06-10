import { Character } from '@/character';
import { CharacterPreset, type Blueprint } from '@/main';

/**
 * The context for the character creation process. This context is used to store the character
 * during the creation process and keep track of the current progress. When creating a new
 * context, you must provide a `CharacterPreset` that will be used through the process.
 */
export class CharacterCreationContext {
  private _preset: CharacterPreset;
  private _character: Character;

  constructor(preset: Blueprint<CharacterPreset>) {
    this._preset = new CharacterPreset(preset);
    this._character = Character.initialize();
  }

  get preset() {
    return this._preset;
  }

  get character() {
    return this._character;
  }

  get originSelected() {
    return !!this.character.general.originName;
  }
}
