/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  // purge: {
  //   enabled: true,
  //   content: ['./src/**/*.tsx'],
  //   options: {
  //     safelist: ['dark'], //specific classes
  //   },
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
