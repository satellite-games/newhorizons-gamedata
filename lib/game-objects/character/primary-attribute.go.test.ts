import primaryAttributes from 'lib/blueprints/character/primary-attribute.blueprints';
import { createNewCharacter } from 'lib/character';
import { testGameObject } from 'tests/vitest/helpers/test-game-object';
import { describe, expect, test } from 'vitest';
import { PrimaryAttribute } from './primary-attribute.go';
import { EventLog } from 'lib/events';

testGameObject(PrimaryAttribute, 'character/primary-attribute');

describe('changeValue', () => {
  test('should increase the current value of the primary attribute by the specified amount', () => {
    const character = createNewCharacter();
    const primaryAttribute = new PrimaryAttribute(primaryAttributes[0]);
    expect(primaryAttribute.changeValue(2, character)).toBe(10);
    expect(primaryAttribute.current).toBe(10);
    expect(EventLog.events.length).toBe(1);
  });

  test('should decrease the current value of the primary attribute by the specified amount', () => {
    const character = createNewCharacter();
    const primaryAttribute = new PrimaryAttribute({ ...primaryAttributes[0], current: 10 });
    expect(primaryAttribute.changeValue(-2, character)).toBe(8);
    expect(primaryAttribute.current).toBe(8);
    expect(EventLog.events.length).toBe(1);
  });

  test('should not decrease the current value of the primary attribute below the minimum value', () => {
    const character = createNewCharacter();
    const primaryAttribute = new PrimaryAttribute({ ...primaryAttributes[0] });
    expect(primaryAttribute.changeValue(-2, character)).toBeUndefined();
    expect(primaryAttribute.current).toBe(8);
    expect(EventLog.events.length).toBe(0);
  });
});
