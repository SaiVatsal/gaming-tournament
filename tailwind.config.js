/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        esports: {
          950: '#07080d',
          900: '#0f111a',
          800: '#1a1d2d',
          700: '#282c44',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          pink: '#ec4899',
          neon: '#10b981'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
