/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#faf6f3',
          100: '#f5ede7',
          200: '#ead8cc',
          300: '#dfc3b0',
          400: '#d4ae95',
          500: '#c99979',
          600: '#be845e',
          700: '#a36f4e',
          800: '#875a3f',
          900: '#6c4632',
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 