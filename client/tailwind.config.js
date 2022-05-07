module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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