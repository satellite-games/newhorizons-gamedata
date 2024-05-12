/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modifier } from 'lib/game-objects/general/modifier.go';
import { NonFunctionPropertyNames, NonNumberPropertyNames } from 'lib/types/private-types';
import { v4 as uuidv4 } from 'uuid';

/**
 * A game object is an entity in the game world. It is a container for data and functions.
 * Game objects usually derive from a blueprint, which defines the schema of the game object.
 */
export class GameObject {
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
  owner?: GameObject | null;

  constructor(init: { name: string; id?: string; owner?: GameObject | null; [key: string]: any }) {
    // Perform a shallow copy of the initialization object. This also covers
    // for any child classes that may have additional properties.
    Object.assign(this, init);
    // Assign the core GameObject properties specifically.
    this.name = init.name;
    this.id = init.id ?? uuidv4();
    this.owner = init.owner ?? null;
  }

  /**
   * Returns the owner of the game object or null if it has no owner.
   */
  getOwner<TGameObject extends GameObject>(): TGameObject | null {
    return this.owner as TGameObject | null;
  }

  /**
   * Returns the modified value of the specified key by applying all matching modifiers.
   * @param key The key of the value to get the modified value for.
   * @param modifiers The modifiers to apply to the value.
   * @returns The modified value.
   */
  getModifiedValue<TGameObject = GameObject>(key: NumericProperty<TGameObject>, modifiers: Modifier<TGameObject>[]) {
    const unmodifiedValue = this[key as keyof this];
    if (typeof unmodifiedValue !== 'number') {
      throw new Error(
        `${this.constructor.name}.${key as string} is not a numeric property and thus cannot be modified.`,
      );
    }
    const matchingModifiers = modifiers.filter((modifier) => {
      if (modifier.modifiedId) {
        return modifier.modifiedId === this.id && modifier.getModifiedKeys().includes(key);
      } else {
        return modifier.modifiedName === this.name && modifier.getModifiedKeys().includes(key);
      }
    });
    let modifiedValue = unmodifiedValue as number;
    for (const modifier of matchingModifiers) {
      modifiedValue += modifier.amount;
    }
    return modifiedValue;
  }

  /**
   * Serializes the game object. This is useful for saving the game state to a file.
   */
  serialize(): string {
    const object = { ...this };
    delete object.owner;
    return JSON.stringify(object);
  }
}

/**
 * The initiator object is used for instantiating a new game object from a blueprint or a saved object.
 */
export type GameObjectInit<TGameObject extends GameObject, TOmitted extends keyof TGameObject = never> = Omit<
  Pick<TGameObject, NonFunctionPropertyNames<TGameObject>>,
  'id' | TOmitted
> & { id?: TGameObject['id'] };

/**
 * A blueprint is the template for a game object. It defines its schema,
 * but does not contain any instance-specific data or functions. Further properties
 * can be omitted.
 */
export type Blueprint<TGameObject extends GameObject, TOmitted extends keyof TGameObject = never> = Omit<
  GameObjectInit<TGameObject, TOmitted>,
  'id' | 'owner'
>;

/**
 * A saved object is a game object that has been serialized to a data format.
 * It contains all the data of the game object, but not its functions.
 * In contrast to a Blueprint, a saved object contains the unique identifier of the game object.
 * Further properties can be omitted.
 */
export type Saved<TGameObject extends GameObject, TOmitted extends keyof TGameObject = never> = Omit<
  GameObjectInit<TGameObject, 'owner' | TOmitted>,
  'id'
> &
  Required<Pick<TGameObject, 'id'>>;

/**
 * A numeric property of a game object can potentially be modified by a modifier.
 */
export type NumericProperty<TGameObject> = keyof Omit<TGameObject, NonNumberPropertyNames<TGameObject>>;

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
