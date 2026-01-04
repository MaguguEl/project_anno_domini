/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
       /* ---------------------------------
         * Header / Editorial Colors
         * --------------------------------- */

        charcoal: {
          DEFAULT: '#1F2937', // primary header text
          dark: '#111827',
          light: '#374151',
        },

        plum: {
          DEFAULT: '#3B1C32', // deep plum
          700: '#4A2038',
          800: '#3B1C32',
          900: '#2A1423',
        },

        forest: {
          DEFAULT: '#0F3D2E', // forest green
          700: '#145C45',
          800: '#0F3D2E',
          900: '#0B2A20',
        },
        
        'navy-dark': '#14213D',
        'navy-medium': '#253C63',
        'navy-light': '#2E4C7D',
        'navy-pale': '#5D87B7',
        
        'gray-dark': '#1F2937',
        'gray-medium': '#4B5563',
        'gray-light': '#6B7280',
        'gray-pale': '#9CA3AF',
        'gray-lightest': '#D1D5DB',
        'gray-soft': '#E5E7EB',
        
        'sky-blue': '#C2D3E3',
        'parchment': '#EBE9E1',
        'parchment-light': '#F7F4EF',
        'active': '#E2E0D8',
        'hover': '#D7D5CD',
        
        // Theme color scales
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