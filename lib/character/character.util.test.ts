/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import { GameObject } from '@satellite-games/orbit';
import { getOwnerCharacter } from './character.util';

describe('getOwnerCharacter', () => {
  it('should return the owner character of a game object', () => {
    class Child extends GameObject {}
    class Parent extends GameObject {
      children: Record<string, Child[]> = { child: [] };
    }
    const parent = new Parent({ name: 'parent' as any });
    const child = new Child({ name: 'child' as any });
    parent.addChild(child as never);
    expect(getOwnerCharacter(child)).toBe(parent);
  });

  it('should throw an error if the game object does not have an owner or the owner is not a character', () => {
    class Child extends GameObject {}
    const gameObject = new Child({ name: 'child' as any });
    expect(() => getOwnerCharacter(gameObject)).toThrow();
  });
});
