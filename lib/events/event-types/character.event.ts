import { GameEvent } from '../event';
import { GameEventInit, GameEventType } from '../types';

/**
 * An event related to a specific character.
 */
export class CharacterGameEvent extends GameEvent {
  type: GameEventType = 'character';
  /**
   * The ID of the character that the event is related to.
   */
  characterId: string;

  constructor(init: GameEventInit<CharacterGameEvent>) {
    super(init);
    this.characterId = init.characterId;
  }
}
