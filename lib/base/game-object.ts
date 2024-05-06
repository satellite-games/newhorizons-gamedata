/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

  constructor(init: { name: string; id?: string; [key: string]: any }) {
    // Perform a shallow copy of the initialization object. This also covers
    // for any child classes that may have additional properties.
    Object.assign(this, init);
    // Assign the core GameObject properties specifically.
    this.name = init.name;
    this.id = init.id ?? uuidv4();
  }
}

/**
 * Extracts the names of all non-function properties of a type.
 */
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

/**
 * A blueprint is the template for a game object. It defines its schema,
 * but does not contain any instance-specific data or functions.
 */
export type Blueprint<TGameObject extends GameObject> = Omit<
  Pick<TGameObject, NonFunctionPropertyNames<TGameObject>>,
  'id'
>;

/**
 * A saved object is a game object that has been serialized to a data format.
 * It contains all the data of the game object, but not its functions.
 * In contrast to a Blueprint, a saved object contains the unique identifier of the game object.
 */
export type Saved<TGameObject extends GameObject> = Pick<TGameObject, NonFunctionPropertyNames<TGameObject>>;
