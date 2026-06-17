/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eaf3ec',
          100: '#d2e6d7',
          200: '#a8cdb1',
          300: '#7ab389',
          400: '#4d9165',
          500: '#2c6e43',
          600: '#1e4d2b',
          700: '#173c22',
          800: '#112b19',
          900: '#0b1c10',
        },
        accent: {
          50: '#fbf3e9',
          100: '#f4e1c5',
          200: '#e8c797',
          300: '#dcad6a',
          400: '#c99950',
          500: '#b5813a',
          600: '#9c6b2c',
          700: '#7d5523',
          800: '#5e3f1a',
          900: '#402a11',
        },
        kraft: {
          300: '#d8c5a7',
          400: '#c4935a',
          500: '#a87a45',
        },
        cream: '#faf6f0',
        ink: '#1a1a1a',
        muted: '#5f4d33',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
}
