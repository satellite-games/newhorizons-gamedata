/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import type { Blueprint, Saved } from './types';
import type { ElementType, NumericProperty } from '@/types/private-types';
import { getModifiedValue, type Modifier } from '../modifier';
import type { Dependency } from '../dependency/dependency';
import type { GameObjectName, GameObjectRegistry } from '@/registry';
import { getCollectionName } from './game-object.utils';

/**
 * A game object is an entity in the game world. It is a container for data and functions.
 * Game objects usually derive from a blueprint, which defines the schema of the game object.
 */
export class GameObject implements GameObject {
  /**
   * The name of the game object's blueprint. This name is a unique key that identifies
   * the blueprint in the game database.
   */
  name: string;
  /**
   * The unique identifier of the game object.
   */
  id: string;
  /**
   * What game object owns this game object. May be null.
   */
  protected owner?: GameObject | null;
  /**
   * Any modifiers that are currently affecting the game object.
   */
  protected modifiers?: Modifier<any>[];
  /**
   * Any dependencies that the game object has.
   */
  dependencies?: Dependency<any>[];
  /**
   * Any child game objects that are stored on this game object.
   */
  children: Partial<Record<GameObjectName, Array<GameObjectRegistry[GameObjectName]>>>;

  constructor(init: {
    name: string;
    id?: string;
    owner?: GameObject | null;
    modifiers?: Modifier<any>[];
    dependencies?: Dependency<any>[];
    children?: Partial<Record<GameObjectName, Array<GameObjectRegistry[GameObjectName]>>>;
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
    this.dependencies = init.dependencies;
    this.children = init.children ?? {};
  }

  /**
   * Returns the owner of the game object or null if it has no owner.
   */
  getOwner<TGameObject extends GameObject>(): TGameObject | null {
    return this.owner as TGameObject | null;
  }

  /**
   * Returns a specific type of children of the game object by the given name.
   * @param name The name of the children to return.
   */
  getChildren<
    TGameObject extends GameObject,
    TChildren extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
    TKey = keyof TGameObject['children'],
  >(name: TKey): TChildren[] {
    return (this.children[name] as TChildren[]) ?? [];
  }

  /**
   * Sets a specific type of children on the game object.
   * @param children The children to set on the game object.
   */
  setChildren<
    TGameObject extends GameObject,
    TChildren extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
  >(children: TChildren[]) {
    const collectionName = getCollectionName((children[0] as GameObject).name);
    const oldChildren = this.children[collectionName as GameObjectName];
    if (!oldChildren) {
      throw new Error(
        `Collection name '${collectionName}' is not a valid child collection for game object '${this.name}'.`,
      );
    }
    if (!children || children.length === 0) {
      throw new Error('Cannot set an empty array of children on a game object.');
    }
    for (const child of children) (child as GameObject).owner = this;
    this.children[collectionName] = children as unknown as typeof oldChildren;
  }

  /**
   * Adds a child to the game object.
   * @param child The child to add to the game object.
   */
  addChild<
    TGameObject extends GameObject,
    TChild extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
  >(child: TChild) {
    const collectionName = getCollectionName((child as GameObject).name);
    const children = this.getChildren<TGameObject, TChild>(collectionName);
    children.push(child);
    (child as GameObject).owner = this;
    return children;
  }

  /**
   * Removes a child from the game object.
   * @param child The child to remove from the game object.
   */
  removeChild<
    TGameObject extends GameObject,
    TChild extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
  >(child: TChild) {
    const collectionName = getCollectionName((child as GameObject).name);
    const children = this.getChildren<TGameObject, TChild>(collectionName);
    const index = children.indexOf(child);
    if (index === -1) {
      throw new Error(`Child with ID '${(child as GameObject).id}' not found in collection '${collectionName}'.`);
    }
    children.splice(index, 1);
    (child as GameObject).owner = null;
    return children;
  }

  /**
   * Finds a child by its name. This method searches all children of the game object.
   * Returns `undefined` if the child is not found. If multiple children have the same name,
   * the first child found is returned.
   * @param name
   */
  findChildByName<TGameObject extends GameObject>(name: string): TGameObject | undefined {
    for (const collection of Object.values(this.children)) {
      const child = collection.find((child) => (child as GameObject).name === name);
      if (child) return child as TGameObject;
    }
    return undefined;
  }

  /**
   * Finds a child by its unique identifier. This method searches all children of the game object.
   * Returns `undefined` if the child is not found.
   * @param id The unique identifier of the child to find.
   */
  findChildById<TGameObject extends GameObject>(id: string): TGameObject | undefined {
    for (const collection of Object.values(this.children)) {
      const child = collection.find((child) => (child as GameObject).id === id);
      if (child) return child as TGameObject;
    }
    return undefined;
  }

  /**
   * Serializes the game object. This is useful for saving the game state to a file.
   * @param state The state of the game object to serialize. Defaults to the current state
   * (`this`) of the game object. A different state may be provided to apply changes to the
   * game object before serialization.
   */
  serialize(state?: typeof this): string {
    const object: typeof this = state ? { ...state } : { ...this };
    const preSerializedObject: Record<string, any> = { ...object };
    // Remove owner reference
    delete preSerializedObject.owner;
    if (Object.keys(object.children).length === 0) {
      // Remove empty children objects
      delete preSerializedObject.children;
    } else {
      // Or serialize children
      for (const key in object.children) {
        const children = object.children[key as any as keyof typeof object.children];
        if (!children) continue;
        preSerializedObject.children[key] = children.map((child) => child.serialize());
      }
    }
    return JSON.stringify(preSerializedObject);
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

  /**
   * Checks whether the given game object (e.g. the owner) meets all dependencies of this game object
   * or causes any conflicts.
   * @param gameObject The game object to check the dependencies against.
   * @returns `true` if all dependencies are met and no conflicts are present or a list of all dependencies
   * that failed the check.
   */
  checkDependencies<TTarget extends GameObject>(gameObject: TTarget): true | Dependency<unknown>[] {
    let result: true | Dependency<unknown>[] = true;
    if (this.dependencies) {
      for (const dependency of this.dependencies) {
        if (!dependency.check(gameObject)) {
          if (result === true) result = [];
          result.push(dependency);
          break;
        }
      }
    }
    return result;
  }
}

/**
 * Creates a new game object from the given blueprint or a saved object as well as
 * the `GameObject` class that should be used for instantiation.
 * @param blueprintOrSaved The blueprint or saved object to create the game object from.
 * @param constructor The constructor of the `GameObject` class that should be used for instantiation.
 * @returns The created game object.
 */
export const createGameObject = <TGameObject extends GameObject>(
  blueprintOrSaved: Blueprint<TGameObject> | Saved<TGameObject>,
  constructor: new (...args: any[]) => TGameObject,
): TGameObject => {
  return new constructor(blueprintOrSaved);
};
