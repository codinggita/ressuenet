/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-container": "#e6eeff",
        "on-surface": "#121c2a",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#8a131e",
        "tertiary-container": "#ff9592",
        "primary-container": "#2ecc71",
        "on-error": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "surface-tint": "#006d37",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container-highest": "#d9e3f6",
        "on-tertiary-fixed-variant": "#8c1520",
        "surface": "#f8f9ff",
        "primary": "#006d37",
        "surface-bright": "#f8f9ff",
        "on-surface-variant": "#3d4a3e",
        "secondary-fixed-dim": "#92ccff",
        "on-primary-container": "#005027",
        "on-primary-fixed": "#00210c",
        "background": "#f8f9ff",
        "on-primary": "#ffffff",
        "on-background": "#121c2a",
        "surface-container-high": "#dee9fc",
        "on-tertiary-fixed": "#410006",
        "on-secondary-fixed": "#001d31",
        "inverse-on-surface": "#eaf1ff",
        "secondary": "#006397",
        "secondary-fixed": "#cce5ff",
        "tertiary-fixed": "#ffdad8",
        "surface-variant": "#d9e3f6",
        "on-secondary-container": "#00476e",
        "secondary-container": "#5cb8fd",
        "surface-dim": "#d0dbed",
        "outline": "#6c7b6d",
        "primary-fixed": "#6bfe9c",
        "inverse-primary": "#4ae183",
        "inverse-surface": "#27313f",
        "primary-fixed-dim": "#4ae183",
        "outline-variant": "#bbcbbb",
        "tertiary-fixed-dim": "#ffb3b0",
        "on-secondary-fixed-variant": "#004b73",
        "tertiary": "#ae2f34",
        "on-secondary": "#ffffff",
        "on-primary-fixed-variant": "#005228"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
