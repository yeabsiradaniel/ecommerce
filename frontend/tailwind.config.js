/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Abyssinica SIL', 'serif'],
      },
      colors: {
        'coffee-brown': '#6B4F4B',
        'cream': '#F5EFE6',
        'gold-accent': '#D4AF37',
        'green-accent': '#4F6328',
      },
      backgroundImage: {
        'tilf-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B4F4B' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'tilf-size': '200px 200px',
      },
      animation: {
        'tilf-scroll': 'tilf-scroll 20s linear infinite',
      },
      keyframes: {
        'tilf-scroll': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-200px -200px' },
        },
      }
    },
  },
  plugins: [],
};