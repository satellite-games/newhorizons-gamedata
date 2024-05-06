import { test, expect } from 'vitest';
import { Blueprint, GameObject } from './game-object';

test('should properly create a blueprint and its corresponding game objects', () => {
  class Train extends GameObject {
    declare noise: string;

    makeNoise() {
      return this.noise;
    }

    constructor(init: Blueprint<Train>) {
      super(init);
      Object.assign(this, init);
    }
  }

  const trainBlueprints: Blueprint<Train>[] = [
    {
      name: 'hogwarts-express',
      noise: 'choo choo',
    },
    { name: 'thomas', noise: 'toot toot' },
  ];

  let trains: Train[] = [];
  for (const trainBlueprint of trainBlueprints) {
    trains.push(new Train(trainBlueprint));
  }

  expect(trains[0]).toBeInstanceOf(Train);
  expect(trains[0].name).toBe(trainBlueprints[0].name);
  expect(trains[0].id).toBeDefined();
  expect(trains[0].makeNoise()).toBe(trainBlueprints[0].noise);
  expect(trains[1]).toBeInstanceOf(Train);
  expect(trains[1].name).toBe(trainBlueprints[1].name);
  expect(trains[1].id).toBeDefined();
  expect(trains[1].makeNoise()).toBe(trainBlueprints[1].noise);
});
