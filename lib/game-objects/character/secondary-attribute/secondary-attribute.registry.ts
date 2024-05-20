export const SecondaryAttributeName = {
  healthPoints: 'character.secondary-attribute.health-points',
  staminaPoints: 'character.secondary-attribute.stamina-points',
  reaction: 'character.secondary-attribute.reaction',
  defense: 'character.secondary-attribute.defense',
  speed: 'character.secondary-attribute.speed',
  criticalHitThreshold: 'character.secondary-attribute.critical-hit-threshold',
} as const;

export type SecondaryAttributeName = (typeof SecondaryAttributeName)[keyof typeof SecondaryAttributeName];
