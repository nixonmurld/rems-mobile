import { createTamagui, createTokens } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createFont } from '@tamagui/font-inter';

const interFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
  },
  face: {
    700: { normal: 'InterBold' },
  },
});

const size = {
  0: 0,
  0.25: 2,
  0.5: 4,
  0.75: 8,
  1: 20,
  1.5: 24,
  2: 28,
  2.5: 32,
  3: 36,
  3.5: 40,
  4: 44,
  4.5: 48,
  5: 52,
  6: 62,
  7: 74,
  8: 84,
  9: 94,
  10: 104,
  11: 124,
  12: 144,
  13: 164,
  14: 184,
  15: 224,
  16: 264,
  17: 324,
  18: 404,
  19: 524,
  20: 664,
};

const remsTokens = createTokens({
  ...tokens,
  size,
  color: {
    ...tokens.color,
    green: '#4CAF50',
    darkGreen: '#1B5E20',
    lightGreen: '#E8F5E9',
    red: '#F44336',
    gold: '#FFD700',
    gray: '#757575',
    lightGray: '#E0E0E0',
  },
});

const remsThemes = {
  ...themes,
  light: {
    ...themes.light,
    color: remsTokens.color.darkGreen,
    background: remsTokens.color.lightGreen,
    accent: remsTokens.color.green,
    error: remsTokens.color.red,
  },
  dark: {
    ...themes.dark,
    color: remsTokens.color.lightGreen,
    background: remsTokens.color.darkGreen,
    accent: remsTokens.color.green,
    error: remsTokens.color.red,
  },
};

const appConfig = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes: remsThemes,
  tokens: remsTokens,
  shorthands,
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;