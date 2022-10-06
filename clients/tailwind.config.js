module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#640091',
        // 'primary': '#3884ff',
        // 'primary': '#e02e00',
        'primary-dark': '#521F75',
        // 'primary-dark': '#006bbd',
        // 'secondary': '#072D4B',
        'secondary': '#353535 ',
        'main':"#f4f9f8"
      },
      fontSize:{
        small: "0.8rem",
        // "xss": "0.rem",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
