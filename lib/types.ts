import { Blueprint } from 'lib/base/game-object';
import { CharacterPreset } from 'lib/game-objects/character/preset.go';

/**
 * The `BlueprintRegistry` contains all registered blueprints. Blueprint
 * collections need to registered with this interface manually.
 */
export interface BlueprintCollectionRegistry {
  'character/preset': Blueprint<CharacterPreset>[];
}

/**
 * The unique name of a blueprint collection.
 */
export type BlueprintCollectionName = keyof BlueprintCollectionRegistry;
