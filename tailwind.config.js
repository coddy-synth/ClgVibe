/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Lexend', 'Inter', 'sans-serif'],
        brand: ['Pacifico', 'cursive'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        vibe: {
          DEFAULT: '#0095f6',
          dark: '#0077c2',
          soft: '#e8f4ff',
          sky: '#5ca9ff',
          violet: '#9099fc',
          amber: '#facb7b',
          mint: '#89f9e8',
        },
        ink: {
          DEFAULT: '#1d1d1f',
          soft: '#5b5b63',
          mute: '#8e8e96',
          night: '#0d0d0f',
        },
      },
      boxShadow: {
        phone: '0 40px 80px -20px rgba(0,60,120,0.35), 0 18px 36px -18px rgba(0,0,0,0.35)',
        card: '0 10px 30px -10px rgba(10,40,80,0.18)',
        pop: '0 18px 40px -12px rgba(0,40,90,0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
