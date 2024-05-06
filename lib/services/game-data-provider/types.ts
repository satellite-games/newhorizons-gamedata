import { Blueprint } from 'lib/base/game-object';
import { CharacterPreset } from 'lib/game-objects';

export interface GameDataProviderStore {
  'character/preset'?: Blueprint<CharacterPreset>[];
}

export type BlueprintCollectionName = keyof GameDataProviderStore;
