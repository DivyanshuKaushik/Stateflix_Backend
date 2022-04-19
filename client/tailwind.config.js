module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#2F9FF8',
        'secondary': '#072D4B',
        'main':"#f4f9f8"
      },
      fontSize:{
        small: "0.9rem",
        // "xss": "0.rem",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
