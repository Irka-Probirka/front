const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'selector',
  theme: {
    extend: {
      animation: {
        motionIn: 'motionIn .500s',
        motionOut: 'motionOut .500s',
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
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
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
    }
  },
  plugins: [],
}

