/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';
import { GameObject } from '../game-object';
import { Dependency } from './dependency';

class UnrelatedObject extends GameObject {
  name = 'unrelated.object';
}
class DependencyTarget extends GameObject {
  name = 'dependency.target';
  hello = 'world';
  answer = 42;
}
class Entity extends GameObject {
  name = 'entity';
  children = {
    unrelated: [new UnrelatedObject({} as any)],
    dependency: [new DependencyTarget({} as any)],
  } as any;
}

describe('regular dependencies', () => {
  class Dependent extends GameObject {
    name = 'depending.object';
    declare dependencies: Dependency<DependencyTarget>[];
  }

  test('should pass if the dependency is met (existence check)', () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: dependent.name,
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBe(true);
  });

  test("should fail if the dependency isn't met (existence check)", () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.nonexistent',
        dependent: dependent.name,
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test('should pass if the dependency is met (exact value check)', () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: dependent.name,
        key: 'hello',
        value: 'world',
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBe(true);
  });

  test("should fail if the dependency isn't met (exact value check)", () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: dependent.name,
        key: 'hello',
        value: 'universe',
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test('should pass if the dependency is met (numeric value check)', () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: dependent.name,
        key: 'answer',
        value: 32,
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBe(true);
  });

  test("should fail if the dependency isn't met (numeric value check)", () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: dependent.name,
        key: 'answer',
        value: 52,
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test('should fail if the referenced child collection does not exist on the entity', () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'non-existent.collection',
        dependent: dependent.name,
      }),
    ];
    const entity = new Entity({} as any);
    const result = dependent.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test("should throw an error if the dependency references a value that doesn't exist", () => {
    const dependent = new Dependent({} as any);
    dependent.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: dependent.name,
        key: 'non-existent' as any,
        value: 'foo',
      }),
    ];
    const entity = new Entity({} as any);
    expect(() => dependent.checkDependencies(entity)).toThrow();
  });
});

describe('conflict dependencies', () => {
  class Conflict extends GameObject {
    name = 'conflicting.object';
    declare dependencies: Dependency<DependencyTarget>[];
  }

  test('should pass if there is no conflict (existence check)', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.non-existing',
        dependent: conflict.name,
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    const result = conflict.checkDependencies(entity);
    expect(result).toBe(true);
  });

  test('should fail if there is a conflict (existence check)', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: conflict.name,
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    const result = conflict.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test('should pass if there is no conflict (exact value check)', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: conflict.name,
        key: 'hello',
        value: 'universe',
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    const result = conflict.checkDependencies(entity);
    expect(result).toBe(true);
  });

  test('should fail if there is a conflict (exact value check)', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: conflict.name,
        key: 'hello',
        value: 'world',
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    const result = conflict.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test('should pass if there is no conflict (numeric value check)', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: conflict.name,
        key: 'answer',
        value: 52,
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    const result = conflict.checkDependencies(entity);
    expect(result).toBe(true);
  });

  test('should fail if there is a conflict (numeric value check)', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: conflict.name,
        key: 'answer',
        value: 32,
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    const result = conflict.checkDependencies(entity);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
  });

  test('should pass if the referenced child collection does not exist on the entity', () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'non-existent.collection',
        dependent: conflict.name,
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    expect(conflict.checkDependencies(entity)).toBe(true);
  });

  test("should throw an error if the dependency references a value that doesn't exist", () => {
    const conflict = new Conflict({} as any);
    conflict.dependencies = [
      new Dependency({
        dependencyName: 'dependency.target',
        dependent: conflict.name,
        key: 'non-existent' as any,
        value: 'foo',
        isConflict: true,
      }),
    ];
    const entity = new Entity({} as any);
    expect(() => conflict.checkDependencies(entity)).toThrow();
  });
});
