export const PrimaryAttributeName = {
  courage: 'character.primary-attribute.courage',
  cleverness: 'character.primary-attribute.cleverness',
  intuition: 'character.primary-attribute.intuition',
  charisma: 'character.primary-attribute.charisma',
  agility: 'character.primary-attribute.agility',
  dexterity: 'character.primary-attribute.dexterity',
  constitution: 'character.primary-attribute.constitution',
  strength: 'character.primary-attribute.strength',
} as const;
export type PrimaryAttributeName = (typeof PrimaryAttributeName)[keyof typeof PrimaryAttributeName];
