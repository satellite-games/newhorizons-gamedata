import type { NonFunctionPropertyNames } from '@/types/private-types';
import type { IGameObject } from '../game-object/types';
import { getCollectionName, type GameObjectRegistry } from '@/main';
import type { IDependency } from './types';

/**
 * Game objects can have specific dependencies on other game objects. Often times,
 * these dependencies are required for the game object to function properly or to
 * be accessible at all.
 */
export class Dependency<TDependency extends IGameObject | unknown> implements IDependency<TDependency> {
  declare dependent: string;
  declare dependencyName: string;
  declare key?: keyof Omit<Pick<TDependency, NonFunctionPropertyNames<TDependency>>, 'id' | 'name'>;
  declare value?: unknown;
  declare isConflict?: boolean;

  constructor(init: IDependency<TDependency>) {
    Object.assign(this, init);
  }

  /**
   * Checks whether the dependency is met by the given game object. If `true` is returned, the
   * dependency check came to a positive conclusion, meaning that either the dependency is met or
   * the conflict is not met. If `false` is returned, the dependency check came to a negative
   * conclusion, meaning that either the dependency is not met or the conflict is met.
   *
   * Reader beware: The 🍝 spaghetti is strong in this one.
   *
   * @param gameObject The game object that the dependency is being checked against.
   */
  check(gameObject: IGameObject): boolean {
    const dependencyCollectionName = getCollectionName(this.dependencyName);
    const relevantChildren = gameObject.getChildren(dependencyCollectionName as keyof GameObjectRegistry);
    // For better readability, we create two branches for conflicts and regular dependencies
    if (this.isConflict) {
      // If we cannot find any matching children, there is no conflict.
      if (!relevantChildren) return true;
      const dependency = relevantChildren.find((child) => child.name === this.dependencyName);
      // If we cannot find the dependency, there is no conflict.
      if (!dependency) return true;
      // If we can find the dependency, we need to check whether we need to check a specific value.
      if (this.key) {
        const value = dependency[this.key as keyof typeof dependency];
        if (typeof value === 'undefined') {
          // If we look for a value that does not exist, we'll want to throw an error.
          throw new Error(`The property "${String(this.key)}" does not exist on the dependency.`);
        } else if (typeof value === 'number' && typeof this.value === 'number') {
          // If we look for a number, a conflict will depend on whether that number is greater than
          // `this.value`, which we consider to be the maximum allowed value.
          return value <= this.value;
        } else {
          // If we look for a value that is not a number, a conflict will depend on whether that value
          // is equal to `this.value`.
          return value !== this.value;
        }
      } else {
        // If we don't need to check a specific value, there is a conflict.
        return false;
      }
    } else {
      // If we cannot find any matching children, the dependency is not met.
      if (!relevantChildren) return false;
      const dependency = relevantChildren.find((child) => child.name === this.dependencyName);
      // If we cannot find the dependency, the dependency is not met.
      if (!dependency) return false;
    }
    // If we cannot find any matching children, the dependency is not met.
    if (!relevantChildren) return false;
    const dependency = relevantChildren.find((child) => child.name === this.dependencyName);
    // If we cannot find the dependency, the dependency is not met.
    if (!dependency) return false;
    // If we can find the dependency, we need to check whether we need to check a specific value.
    if (this.key) {
      const value = dependency[this.key as keyof typeof dependency];
      if (typeof value === 'undefined') {
        // If we look for a value that does not exist, we'll want to throw an error.
        throw new Error(`The property "${String(this.key)}" does not exist on the dependency.`);
      } else if (typeof value === 'number' && typeof this.value === 'number') {
        // If we look for a number, the dependency check will depend on whether that number is greater
        // than `this.value`, which we consider to be the minimum required value.
        return value >= this.value;
      } else {
        // If we look for a value that is not a number, the dependency will depend on whether that value
        // is equal to `this.value`.
        return value === this.value;
      }
    } else {
      // If we don't need to check a specific value, the dependency is met.
      return true;
    }
  }
}