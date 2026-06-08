import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#18251B',
        leaf: '#214D2B',
        field: '#2F6B3B',
        kraft: '#B5813A',
        paper: '#FAF6F0',
        bone: '#FFFDF8',
        line: '#D8C5A7',
        mute: '#66563E',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
