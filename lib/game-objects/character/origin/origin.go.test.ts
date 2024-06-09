import { Character } from '@/character';
import { beforeEach, describe, expect, it } from 'vitest';
import { characterOriginMocks } from './origin.blueprint-mocks';
import { CharacterOrigin } from './origin.go';
import { characterSkills, type CharacterSkillName } from '../skill';
import { CharacterAbility } from '../ability';

describe('apply', () => {
  let character: Character;

  beforeEach(() => {
    character = Character.initialize();
  });

  it('should apply the origin to the character', () => {
    const origin = new CharacterOrigin(characterOriginMocks.simple);
    const selectedSkillBonuses: Partial<Record<CharacterSkillName, number>> = {
      'character.skill.spaceships': 1,
      'character.skill.biology-and-medicine': -1,
    };

    // Ensure that the origin has not been applied yet
    expect(character.general.originName).toBeFalsy();

    expect(character.getPrimaryAttribute('character.primary-attribute.cleverness').current).toBe(8);
    expect(character.getPrimaryAttribute('character.primary-attribute.cleverness').min).toBe(8);
    expect(character.getPrimaryAttribute('character.primary-attribute.cleverness').max).toBe(14);

    expect(character.getChildren('character.skill').length).toBe(
      characterSkills.filter((skill) => skill.isCoreSkill).length,
    );

    expect(character.getSkill('character.skill.computers')?.current).toBe(0);
    expect(character.getSkill('character.skill.general-knowledge')?.current).toBe(0);
    expect(character.getSkill('character.skill.soft-skills')?.current).toBe(0);
    expect(character.getSkill('character.skill.spaceships')).not.toBeDefined();
    expect(character.getSkill('character.skill.biology-and-medicine')).not.toBeDefined();

    expect(character.getChildren<Character, CharacterAbility>('character.ability').length).toBe(0);

    // Apply the origin
    origin.apply(character, selectedSkillBonuses, 'Solaire');

    // Ensure that the origin has been applied
    expect(character.general.originName).toBe(characterOriginMocks.simple.name);

    expect(character.getPrimaryAttribute('character.primary-attribute.cleverness').current).toBe(9);
    expect(character.getPrimaryAttribute('character.primary-attribute.cleverness').min).toBe(9);
    expect(character.getPrimaryAttribute('character.primary-attribute.cleverness').max).toBe(15);

    expect(character.getChildren('character.skill').length).toBe(
      characterSkills.filter((skill) => skill.isCoreSkill).length + 2,
    );

    expect(character.getSkill('character.skill.computers')?.current).toBe(2);
    expect(character.getSkill('character.skill.general-knowledge')?.current).toBe(3);
    expect(character.getSkill('character.skill.soft-skills')?.current).toBe(-1);
    expect(character.getSkill('character.skill.spaceships')?.current).toBe(1);
    expect(character.getSkill('character.skill.biology-and-medicine')?.current).toBe(-1);

    expect(character.getAbility('character.ability.language')?.details).toBe('Solaire');
  });
});
