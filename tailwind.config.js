module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: {
        sora: '#58B2DC',
      },
      textPrimary: '#2e294e',
      infoPanelBg: '#fbf5f3'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
