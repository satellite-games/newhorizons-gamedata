import { EventLog } from './event-log';
import { GameEventInit, GameEventType } from './types';

/**
 * A game event. This is the base class for all game events.
 */
export abstract class GameEvent {
  /**
   * The type of event.
   */
  abstract type: GameEventType;
  /**
   * The message of the event.
   */
  message: string;
  /**
   * The timestamp of the event. This is an ISO 8601 string.
   */
  timestamp: string;

  constructor(init: GameEventInit<GameEvent>) {
    this.message = init.message;
    this.timestamp = new Date().toISOString();
    // Assign the rest of the properties that might be present on the child class.
    Object.assign(this, init);
    EventLog.addEvent(this);
  }
}
