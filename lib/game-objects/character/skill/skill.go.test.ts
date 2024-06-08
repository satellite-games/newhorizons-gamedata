import { describe, it, expect, beforeEach } from 'vitest';
import { EventLog } from '@/main';
import { Character } from '@/character';
import { characterSkillMocks } from './skill.blueprint-mocks';
import { CharacterSkill } from './skill.go';
import { constants } from '@/constants';

describe('constructor', () => {
  it('should properly construct from blueprint', () => {
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    expect(skill.min).toBe(0);
    expect(skill.current).toBe(0);
  });
});

describe('max', () => {
  let character: Character;

  beforeEach(() => {
    character = Character.initialize('Steve');
  });

  it('should return the correct max level of the skill', () => {
    // Increase agility to 11 and constitution to 12
    character.getPrimaryAttribute('character.primary-attribute.agility').changeValue(3);
    character.getPrimaryAttribute('character.primary-attribute.constitution').changeValue(4);
    const blueprint = characterSkillMocks.coreSkill;
    const skill = new CharacterSkill(blueprint);
    character.addChild<Character, CharacterSkill>(skill);
    // Expect max to be 12 * SKILL_MAX_LEVEL_MULTIPLIER
    expect(skill.max).toBe(12 * constants.SKILL_MAX_LEVEL_MULTIPLIER);
  });

  it('should throw an error if the owner character does not have any primary attributes', () => {
    const character = new Character();
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    skill.addToCharacter(character);
    expect(() => skill.max).toThrow();
    expect(() => skill.max).toThrow();
  });
});

describe('add and remove', () => {
  it('should add the skill to the character and remove it', () => {
    const character = new Character();
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    skill.addToCharacter(character);
    expect(character.getChildren<Character, CharacterSkill>('character.skill')).toEqual([skill]);
    // Should do nothing if the character already has the skill
    skill.addToCharacter(character);
    expect(character.getChildren<Character, CharacterSkill>('character.skill')).toEqual([skill]);
    skill.removeFromCharacter(character);
    expect(character.getChildren<Character, CharacterSkill>('character.skill')).toEqual([]);
    // Should do nothing if the character does not have the skill
    skill.removeFromCharacter(character);
    expect(character.getChildren<Character, CharacterSkill>('character.skill')).toEqual([]);
  });

  it("should create an event when adding and removing the skill from the character's children", () => {
    const character = new Character();
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    skill.addToCharacter(character);
    expect(EventLog.events.length).toBe(1);
    skill.removeFromCharacter(character);
    expect(EventLog.events.length).toBe(2);
  });
});

describe('changeValue', () => {
  it('should increase and decrease the current value of the primary attribute by the specified amount', () => {
    const character = Character.initialize();
    const skill = character.getSkill('character.skill.body-control');
    expect(skill).toBeDefined();
    expect(skill?.current).toBe(0);
    expect(skill?.changeValue(2)).toBe(2);
    expect(skill?.current).toBe(2);
    expect(skill?.changeValue(-2)).toBe(0);
    expect(skill?.current).toBe(0);
  });

  it('should not increase the current value of the primary attribute beyond the maximum value', () => {
    const character = Character.initialize();
    const skill = character.getSkill('character.skill.body-control');
    expect(skill).toBeDefined();
    expect(skill?.current).toBe(0);
    expect(skill?.changeValue(100)).toBeUndefined();
    expect(skill?.current).toBe(0);
  });

  it('should not decrease the current value of the primary attribute below the minimum value', () => {
    const character = Character.initialize();
    const skill = character.getSkill('character.skill.body-control');
    expect(skill).toBeDefined();
    expect(skill?.current).toBe(0);
    expect(skill?.changeValue(-100)).toBeUndefined();
    expect(skill?.current).toBe(0);
  });
});

describe('serialize', () => {
  it('should set the min value before serialization', () => {
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    skill.current = 5;
    expect(skill.min).toBe(0);
    const serialized = skill.serialize();
    expect(serialized).toContain('"min":5');
  });
});
