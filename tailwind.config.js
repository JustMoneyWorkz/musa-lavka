/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lavka': {
          'yellow': '#FCD34D',
          'yellow-hover': '#FBBF24',
          'red': '#EF4444',
          'blue': '#3B82F6',
          'green': '#10B981',
          'dark': '#1F2937',
          'darker': '#111827',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif'
        ],
      },
      borderRadius: {
        'card': '70px',
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        'btn': '0 2px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
