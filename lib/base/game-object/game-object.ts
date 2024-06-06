/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import type { Blueprint, IGameObject, Saved } from './types';
import type { ElementType, NumericProperty } from '@/types/private-types';
import { getModifiedValue, type Modifier } from '../modifier';
import type { Dependency } from '../dependency/dependency';
import type { GameObjectName, GameObjectRegistry } from '@/registry';
import { getCollectionName } from './game-object.utils';

/**
 * A game object is an entity in the game world. It is a container for data and functions.
 * Game objects usually derive from a blueprint, which defines the schema of the game object.
 */
export class GameObject implements IGameObject {
  name: string;
  id: string;
  owner?: IGameObject | null;
  modifiers?: Modifier<any>[];
  dependencies?: Dependency<any>[];
  children: Partial<Record<GameObjectName, Array<GameObjectRegistry[GameObjectName]>>>;

  constructor(init: {
    name: string;
    id?: string;
    owner?: IGameObject | null;
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

  getOwner<TGameObject extends IGameObject>(): TGameObject | null {
    return this.owner as TGameObject | null;
  }

  // addToGameObject(newOwner: IGameObject): void {
  //   const collectionName = getCollectionName(this.name);
  //   newOwner.addChild(collectionName, this as any);
  // }

  /**
   * Returns a specific type of children of the game object by the given name.
   * @param name The name of the children to return.
   */
  getChildren<
    TGameObject extends IGameObject,
    TChildren extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
    TKey = keyof TGameObject['children'],
  >(name: TKey): TChildren[] {
    return (this.children[name] as TChildren[]) ?? [];
  }

  setChildren<
    TGameObject extends IGameObject,
    TChildren extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
  >(children: TChildren[]) {
    const collectionName = getCollectionName((children[0] as IGameObject).name);
    const oldChildren = this.children[collectionName as GameObjectName];
    if (!oldChildren) {
      throw new Error(
        `Collection name '${collectionName}' is not a valid child collection for game object '${this.name}'.`,
      );
    }
    if (!children || children.length === 0) {
      throw new Error('Cannot set an empty array of children on a game object.');
    }
    for (const child of children) (child as IGameObject).owner = this;
    this.children[collectionName] = children as unknown as typeof oldChildren;
  }

  // addChild<TKey extends GameObjectName>(name: TKey, newChild: GameObjectRegistry[TKey]) {
  //   if (!this.children) this.children = {};
  //   const children = this.getChildren<TKey>(name);
  //   children.push(newChild);
  //   newChild.owner = this;
  //   return children;
  // }

  /**
   * Serializes the game object. This is useful for saving the game state to a file.
   * @param state The state of the game object to serialize. Defaults to the current state
   * (`this`) of the game object. A different state may be provided to apply changes to the
   * game object before serialization.
   */
  serialize(state?: typeof this): string {
    const object: Record<string, any> = state ? { ...state } : { ...this };
    // Remove owner reference
    delete object.owner;
    // Remove empty children objects
    if (Object.keys(object.children).length === 0) delete object.children;
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
export const createGameObject = <TGameObject extends IGameObject>(
  blueprintOrSaved: Blueprint<TGameObject> | Saved<TGameObject>,
  constructor: new (...args: any[]) => TGameObject,
): TGameObject => {
  return new constructor(blueprintOrSaved);
};
