/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: '#E6E6FA',
          dark: '#B57EDC',
          light: '#F3E8FF',
        },
        // Dark mode color overrides
        dark: {
          bg: '#1f2937',
          'bg-secondary': '#374151',
          text: '#f9fafb',
          'text-secondary': '#d1d5db',
        }
      },
      backgroundColor: {
        'dark-primary': '#1f2937',
        'dark-secondary': '#374151',
      },
      textColor: {
        'dark-primary': '#f9fafb',
        'dark-secondary': '#d1d5db',
      }
    },
  },
  plugins: [require("daisyui")],
}
