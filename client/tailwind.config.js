module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        Blur: 'rgba(256, 256, 256, 0.4)'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}