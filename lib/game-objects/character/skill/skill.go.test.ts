import { describe, it, expect, beforeEach } from 'vitest';
import { GameObject } from '@/main';
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

describe('serialize', () => {
  let skill: CharacterSkill;
  beforeEach(() => {
    skill = new CharacterSkill(characterSkillMocks.coreSkill);
  });

  it('should set the min value before serialization', () => {
    skill.current = 5;
    expect(skill.min).toBe(0);
    const serialized = skill.serialize();
    expect(serialized).toContain('"min":5');
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

  it("should throw an error if the skill doesn't have a character owner", () => {
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    // Should throw because the skill has no owner
    expect(() => skill.max).toThrow();
    class NonCharacterOwner extends GameObject {}
    const nonCharacterOwner = new NonCharacterOwner({ name: 'non-character-owner' });
    nonCharacterOwner.addChild<NonCharacterOwner, CharacterSkill>(skill);
    // Should throw because the owner is not a character
    expect(() => skill.max).toThrow();
  });
});

describe('add and remove', () => {
  it('should add the skill to the character and remove it', () => {
    const character = new Character();
    const skill = new CharacterSkill(characterSkillMocks.coreSkill);
    character.addChild<Character, CharacterSkill>(skill);
    expect(character.getChildren<Character, CharacterSkill>('character.skill')).toEqual([skill]);
    skill.removeFromCharacter(character);
    expect(character.getChildren<Character, CharacterSkill>('character.skill')).toEqual([]);
  });
});
