import { CharacterPreset } from 'lib/game-objects';
import { blueprints } from './preset.blueprints';
import { testBlueprints } from 'tests/vitest/helpers/test-blueprints';

testBlueprints<CharacterPreset>('character/preset', blueprints);
