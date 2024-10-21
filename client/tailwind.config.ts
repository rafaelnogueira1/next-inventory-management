import type { Config } from 'tailwindcss';
import { createThemes } from 'tw-colors';
import colors from 'tailwindcss/colors';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

/**
 * Primeiro são definidas coresbase do projeto e em seguida é criado um novo grupo apontando
 * a sua cor oposta que será utilizada no dark mode.
 *
 * Ao final adicionamos o tema de cores que foi criado ao projeto.
 */

const baseColors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
] as const;

const shadeMapping = {
  '50': '900',
  '100': '800',
  '200': '700',
  '300': '600',
  '400': '500',
  '500': '400',
  '600': '300',
  '700': '200',
  '800': '100',
  '900': '50',
} as const;

type BaseColor = (typeof baseColors)[number];
type ShadeMapping = typeof shadeMapping;
type Theme = {
  [colors in BaseColor]: {
    [shades: string]: string;
  };
};

const generateThemeObject = (
  colors: DefaultColors,
  mapping: ShadeMapping,
  invert: boolean
): Theme => {
  const theme = {} as Theme;

  baseColors.forEach((color) => {
    theme[color] = {} as Theme[BaseColor];

    Object.entries(mapping).forEach(([key, value]) => {
      const shadeKey = invert ? value : key;

      const colorObject = colors[color] as { [key: string]: string };
      theme[color][key] = colorObject[shadeKey];
    });
  });

  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping, false);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: '#ffffff',
  },
  dark: {
    ...darkTheme,
    white: colors.gray['950'],
    black: colors.gray['50'],
  },
};

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [createThemes(themes)],
};
export default config;
