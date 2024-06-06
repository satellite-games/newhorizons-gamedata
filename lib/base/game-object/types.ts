import type { GameObjectName, GameObjectRegistry } from '@/registry';
import type { ElementType, NonFunctionPropertyNames } from '../../types/private-types';

export interface IGameObject {
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
  owner?: IGameObject | null;
  /**
   * Any child game objects that are stored on this game object.
   */
  children: Partial<Record<GameObjectName, Array<GameObjectRegistry[GameObjectName]>>>;
  /**
   * Returns the owner of the game object or null if it has no owner.
   */
  getOwner<TGameObject extends IGameObject>(): TGameObject | null;
  // /**
  //  * Adds the game object to another game object. `newOwner` will become the owner of this
  //  * game object and this game object will be added to the children of `newOwner`.
  //  * @param newOwner The new owner.
  //  */
  // addToGameObject(newOwner: IGameObject): void;
  /**
   * Any child game objects that are stored on this game object.
   */
  setChildren<
    TGameObject extends IGameObject,
    TChildren extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
  >(
    children: TChildren[],
  ): void;
  // /**
  //  * Returns a specific type of children of the game object by the given name.
  //  * @param name The name of the children to return.
  //  */
  // getChildren<
  //   TGameObject extends IGameObject,
  //   TChildren extends ElementType<TGameObject['children'][keyof TGameObject['children']]>,
  //   TKey = keyof TGameObject['children'],
  // >(
  //   name: TKey,
  // ): TChildren[];
  // /**
  //  * Adds a new child to the game object. If the children do not exist yet, they will be created.
  //  * @param name The game object name of the child to add.
  //  * @param newChild The new child to add.
  //  */
  // addChild<TKey extends keyof GameObjectRegistry>(
  //   name: TKey,
  //   newChild: GameObjectRegistry[TKey],
  // ): GameObjectRegistry[TKey][];
  /**
   * Sets a specific type of children on the game object.
   * @param name The name of the children to set.
   * @param children The children to set on the game object.
   */
  setChildren<TKey extends keyof GameObjectRegistry>(name: TKey, children: Array<GameObjectRegistry[TKey]>): void;
}

/**
 * The initiator object is used for instantiating a new game object from a blueprint or a saved object.
 */
export type GameObjectInit<TGameObject extends IGameObject, TOmitted extends keyof TGameObject = never> = Omit<
  Pick<TGameObject, NonFunctionPropertyNames<TGameObject>>,
  'id' | 'children' | TOmitted
> & { id?: TGameObject['id'] };

/**
 * A blueprint is the template for a game object. It defines its schema,
 * but does not contain any instance-specific data or functions. Further properties
 * can be omitted.
 */
export type Blueprint<TGameObject extends IGameObject, TOmitted extends keyof TGameObject = never> = Omit<
  GameObjectInit<TGameObject, TOmitted>,
  'id' | 'owner' | 'children'
>;

/**
 * A saved object is a game object that has been serialized to a data format.
 * It contains all the data of the game object, but not its functions.
 * In contrast to a Blueprint, a saved object contains the unique identifier of the game object.
 * Further properties can be omitted.
 */
export type Saved<TGameObject extends IGameObject, TOmitted extends keyof TGameObject = never> = Omit<
  GameObjectInit<TGameObject, 'owner' | TOmitted>,
  'id' | 'children'
> &
  Required<Pick<TGameObject, 'id'>>;
