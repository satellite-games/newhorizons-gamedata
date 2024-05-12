/* eslint-disable no-console */
import { GameEvent } from './event';

export class EventLog {
  private static _events: GameEvent[] = [];

  /**
   * Adds an event to the event log.
   */
  static addEvent(event: GameEvent): void {
    this._events.push(event);
    console.debug(`[game event] ${JSON.stringify(event)}`);
  }

  /**
   * Returns all events in the event log.
   */
  static get events(): GameEvent[] {
    return this._events;
  }

  /**
   * Clears all events from the event log.
   */
  static clearEvents(): void {
    this._events = [];
  }
}
