/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rescue: {
          green: '#2ECC71',
          DEFAULT: '#2ECC71',
        },
        trust: {
          blue: '#3498DB',
          DEFAULT: '#3498DB',
        },
        emergency: {
          red: '#FF6B6B',
          DEFAULT: '#FF6B6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
