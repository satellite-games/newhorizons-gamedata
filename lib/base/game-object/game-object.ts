/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import type { Blueprint, IGameObject, Saved } from './types';
import type { NumericProperty } from '@/types/private-types';
import { getModifiedValue, type Modifier } from '../modifier';
import type { GameObjectRegistry } from '@/game-objects/game-object.registry';

/**
 * A game object is an entity in the game world. It is a container for data and functions.
 * Game objects usually derive from a blueprint, which defines the schema of the game object.
 */
export class GameObject implements IGameObject {
  name: string;
  id: string;
  owner?: IGameObject | null;
  modifiers?: Modifier<any>[];
  modifiers?: Modifier<unknown>[];
  children?: Partial<Record<keyof GameObjectRegistry, Array<GameObjectRegistry[keyof GameObjectRegistry]>>>;

  constructor(init: {
    name: string;
    id?: string;
    owner?: IGameObject | null;
    modifiers?: Modifier<any>[];
    children?: Partial<Record<keyof GameObjectRegistry, Array<GameObjectRegistry[keyof GameObjectRegistry]>>>;
    [key: string]: any;
  }) {
    // Perform a shallow copy of the initialization object. This also covers
    // for any child classes that may have additional properties.
    Object.assign(this, init);
    // Assign the core GameObject properties specifically.
    this.name = init.name;
    this.id = init.id ?? uuidv4();
    this.owner = init.owner ?? null;
    this.modifiers = init.modifiers;
    this.children = init.children;
  }

  /**
   * Returns the owner of the game object or null if it has no owner.
   */
  getOwner<TGameObject extends IGameObject>(): TGameObject | null {
    return this.owner as TGameObject | null;
  }

  /**
   * Returns a specific type of children of the game object by the given name.
   * @param name The name of the children to return.
   */
  getChildren<TKey extends keyof GameObjectRegistry>(name: TKey): GameObjectRegistry[TKey][] {
    return (this.children?.[name] as GameObjectRegistry[TKey][]) ?? [];
  }

  /**
   * Serializes the game object. This is useful for saving the game state to a file.
   */
  serialize(): string {
    const object = { ...this };
    delete object.owner;
    return JSON.stringify(object);
  }

  /**
   * Returns all modifiers that are currently affecting the game object.
   * @param filter An optional filter to only return modifiers that match the filter.
   */
  getModifiers<TGameObject extends GameObject>(filter?: {
    modifiedName?: string;
    modifiedId?: string;
  }): Modifier<TGameObject>[] {
    if (!this.modifiers) return [];
    let modifiers = this.modifiers as Modifier<TGameObject>[];
    // Filter modifiers
    if (filter?.modifiedName) modifiers = modifiers.filter((modifier) => modifier.modifiedName === filter.modifiedName);
    if (filter?.modifiedId) modifiers = modifiers.filter((modifier) => modifier.modifiedId === filter.modifiedId);
    return modifiers;
  }

  /**
   * Returns the modified value of the specified key by applying all matching modifiers.
   * @param key The key of the value to get the modified value for.
   * @param modifiers The modifiers to apply to the value.
   * @returns The modified value.
   */
  getModifiedValue<TGameObject extends GameObject>(
    key: NumericProperty<TGameObject>,
    modifiers?: Modifier<TGameObject>[],
  ) {
    return getModifiedValue<TGameObject>(
      this as unknown as TGameObject,
      key,
      modifiers ?? (this.modifiers as Modifier<TGameObject>[]),
    );
  }
}

/**
 * Creates a new game object from the given blueprint or a saved object as well as
 * the `GameObject` class that should be used for instantiation.
 * @param blueprintOrSaved The blueprint or saved object to create the game object from.
 * @param constructor The constructor of the `GameObject` class that should be used for instantiation.
 * @returns The created game object.
 */
export const createGameObject = <TGameObject extends IGameObject>(
  blueprintOrSaved: Blueprint<TGameObject> | Saved<TGameObject>,
  constructor: new (...args: any[]) => TGameObject,
): TGameObject => {
  return new constructor(blueprintOrSaved);
};
