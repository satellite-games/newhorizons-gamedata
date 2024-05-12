import { GameObject, GameObjectInit, NumericProperty } from 'lib/base/game-object';

/**
 * Modifiers are used to increase or decrease specific values of a game object.
 * They are commonly used to modify character stats like primary or secondary attributes
 * or item values like damage or accuracy
 */
export class Modifier<TModifiedGameObject = GameObject> extends GameObject {
  /*
   * The name of the game object that is being modified.
   */
  declare modifiedName: string;
  /**
   * The unique identifier of the game object that is being modified. This is optional. If none
   * is provided, the modifier will be applied to all game objects matching `modifiedName`.
   */
  declare modifiedId?: string;
  /**
   * The key of the value that is being modified. Must be a property key of the modified game object.
   * Can also be multiple keys.
   */
  declare modifiedKeys: NumericProperty<TModifiedGameObject> | NumericProperty<TModifiedGameObject>[];
  /**
   * The amount by which the value is modified. This can be positive or negative.
   */
  declare amount: number;

  constructor(init: GameObjectInit<Modifier<TModifiedGameObject>>) {
    super(init as unknown as GameObjectInit<GameObject>);
  }

  /**
   * Returns the modified keys as an array.
   */
  getModifiedKeys(): NumericProperty<TModifiedGameObject>[] {
    return Array.isArray(this.modifiedKeys) ? this.modifiedKeys : [this.modifiedKeys];
  }
}
