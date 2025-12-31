/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: 'var(--color-burgundy-50)',
          100: 'var(--color-burgundy-100)',
          200: 'var(--color-burgundy-200)',
          300: 'var(--color-burgundy-300)',
          400: 'var(--color-burgundy-400)',
          500: 'var(--color-burgundy-500)',
          600: 'var(--color-burgundy-600)',
          700: 'var(--color-burgundy-700)',
          800: 'var(--color-burgundy-800)',
          900: 'var(--color-burgundy-900)',
        },
        navy: {
          50: 'var(--color-navy-50)',
          100: 'var(--color-navy-100)',
          200: 'var(--color-navy-200)',
          300: 'var(--color-navy-300)',
          400: 'var(--color-navy-400)',
          500: 'var(--color-navy-500)',
          600: 'var(--color-navy-600)',
          700: 'var(--color-navy-700)',
          800: 'var(--color-navy-800)',
          900: 'var(--color-navy-900)',
        },
        gold: {
          50: 'var(--color-gold-50)',
          100: 'var(--color-gold-100)',
          200: 'var(--color-gold-200)',
          300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
          700: 'var(--color-gold-700)',
          800: 'var(--color-gold-800)',
          900: 'var(--color-gold-900)',
        },
      },
      backgroundColor: {
        'global': 'var(--global-bg)',
        'global-secondary': 'var(--global-bg-secondary)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-pattern': "url('/path/to/parchment-texture.jpg')",
      },
    },
  },
  plugins: [],
};