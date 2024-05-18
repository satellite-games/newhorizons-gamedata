import { type Blueprint } from '@/base/game-object';
import { CharacterPreset } from '@/game-objects/character/preset.go';
import { PrimaryAttribute } from '../game-objects/character/primary-attribute.go';

/**
 * The `BlueprintRegistry` contains all registered blueprints. Blueprint
 * collections need to registered with this interface manually.
 */
export interface BlueprintCollectionRegistry {
  'character/preset': Blueprint<CharacterPreset>[];
  'character/primary-attribute': Blueprint<PrimaryAttribute>[];
}

/**
 * The unique name of a blueprint collection.
 */
export type BlueprintCollectionName = keyof BlueprintCollectionRegistry;
