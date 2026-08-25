/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hazard: {
          immediate: '#EF4444',
          short: '#F97316',
          medium: '#EAB308',
          monitor: '#10B981',
        }
      }
    },
  },
  plugins: [],
}
