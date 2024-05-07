const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    {
      pattern: /col-start-./,
    }
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
        '800': '800px',
        '400': '400px',
      },
      animation: {
        motionIn: 'motionIn .500s',
        motionOut: 'motionOut .500s',
        opacityIn: 'opacityIn .500s',
        opacityHide50: 'opacityHide50 .500s',
      },
      keyframes: {
        motionIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        motionOut: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(10px)',
          }
        },
        opacityIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          }
        },
        opacityHide50: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: .5,
          }
        },
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green: colors.green,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      // #465ed8
      'royal-blue': {
        '50': '#f1f4fd',
        '100': '#dfe7fa',
        '200': '#c6d5f7',
        '300': '#9ebaf2',
        '400': '#7195e9',
        '500': '#4f71e2',
        '600': '#465ed8',
        '700': '#3142c4',
        '800': '#2e379f',
        '900': '#2a347e',
        '950': '#1e224d',
      },
      // #bac4cb
      'zinc': {
        '50': '#fafafa',
        '100': '#f4f4f5',
        '200': '#e4e4e7',
        '300': '#d4d4d8',
        '400': '#a1a1aa',
        '500': '#71717a',
        '600': '#52525b',
        '700': '#3f3f46',
        '800': '#27272a',
        '900': '#18181b',
        '950': '#0e0e11',
      },
    }
  },
  plugins: [],
}

