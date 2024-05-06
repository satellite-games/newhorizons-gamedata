/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceMixin } from '@spuxx/browser-utils';
import type { BlueprintCollectionName, GameDataProviderStore } from './types';
import { Blueprint, GameObject, Saved } from 'lib/base/game-object';

/**
 * `GameDataProvider` is a service that provides access to all game data.
 * Once any collection of game data is loaded, it is cached and can be accessed instantly.
 */
export class GameDataProvider extends ServiceMixin<GameDataProvider>() {
  private _store: GameDataProviderStore = {};

  /**
   * Loads and returns the collection of blueprints with the given name.
   * @param collectionName The name of the collection to load.
   */
  static getBlueprints = async <TGameObject extends GameObject>(
    collectionName: BlueprintCollectionName,
  ): Promise<Blueprint<TGameObject>[]> => {
    if (!this.instance._store[collectionName]) {
      const [folder, file] = collectionName.split('/');
      const path = `../../blueprints/${folder}/${file}.blueprints.ts`;
      try {
        const module: { blueprints: Blueprint<any>[] } = await import(path);
        const { blueprints } = module;
        this.instance._store[collectionName] = blueprints;
      } catch (error) {
        throw new Error(`Blueprint collection '${collectionName}' not found.`);
      }
    }
    return this.instance._store[collectionName] as unknown as Blueprint<TGameObject>[];
  };

  /**
   * Creates a new game object from the given blueprint or a saved object as well as
   * the `GameObject` class that should be used for instantiation.
   * @param blueprintOrSaved The blueprint or saved object to create the game object from.
   * @param constructor The constructor of the `GameObject` class that should be used for instantiation.
   * @returns The created game object.
   */
  static createGameObject = <TGameObject extends GameObject>(
    blueprintOrSaved: Blueprint<TGameObject> | Saved<TGameObject>,
    constructor: new (...args: any[]) => TGameObject,
  ): TGameObject => {
    return new constructor(blueprintOrSaved);
  };
}

export const { getBlueprints, createGameObject } = GameDataProvider;
