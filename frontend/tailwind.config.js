/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        baloo: ['Baloo', '"Baloo 2"', 'sans-serif'],
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        ottopia: {
          orange: '#F97316',
          'orange-dark': '#EA580C',
          blue: '#3B82F6',
          purple: '#A855F7',
          sky: '#38BDF8',
          pink: '#F472B6',
          green: '#22C55E',
        },
        kiddo: {
          orange: '#F97316',
          'orange-dark': '#EA580C',
          blue: '#3B82F6',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
