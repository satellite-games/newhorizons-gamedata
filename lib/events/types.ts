import { NonFunctionPropertyNames } from 'lib/types/private-types';
import { GameEvent } from './event';

export const GameEventType = {
  /**
   * An event related to a specific character.
   */
  character: 'character',
} as const;
export type GameEventType = (typeof GameEventType)[keyof typeof GameEventType];

export type GameEventInit<TEvent extends GameEvent> = Omit<
  Pick<TEvent, NonFunctionPropertyNames<TEvent>>,
  'timestamp' | 'type'
>;
