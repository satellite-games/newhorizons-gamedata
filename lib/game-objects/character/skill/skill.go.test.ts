import { describe, it, expect, beforeEach } from 'vitest';
import { characterSkillMocks } from './skill.blueprint-mocks';
import { CharacterSkill } from './skill.go';
import { createNewCharacter, type Character } from '@/character';
import { constants } from '@/constants';
import { GameObject } from '@/main';

describe('constructor', () => {
  it('should properly construct from blueprint', () => {
    const blueprint = characterSkillMocks.coreSkill;
    const skill = new CharacterSkill(blueprint);
    expect(skill.min).toBe(0);
    expect(skill.current).toBe(0);
  });
});

describe('serialize', () => {
  let skill: CharacterSkill;
  beforeEach(() => {
    const blueprint = characterSkillMocks.coreSkill;
    skill = new CharacterSkill(blueprint);
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
    character = createNewCharacter('Steve');
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
    const blueprint = characterSkillMocks.coreSkill;
    const skill = new CharacterSkill(blueprint);
    // Should throw because the skill has no owner
    expect(() => skill.max).toThrow();
    class NonCharacterOwner extends GameObject {}
    const nonCharacterOwner = new NonCharacterOwner({ name: 'non-character-owner' });
    nonCharacterOwner.addChild<NonCharacterOwner, CharacterSkill>(skill);
    // Should throw because the owner is not a character
    expect(() => skill.max).toThrow();
  });
});
