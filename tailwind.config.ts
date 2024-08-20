/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Define font families with different weights
        swiss721: ['Swiss721', 'sans-serif'],
        'swiss721-light': ['Swiss721-Light', 'sans-serif'],
        'swiss721-bold': ['Swiss721-Bold', 'sans-serif'],
        'swiss721-black': ['Swiss721-Black', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'swiss721-regular': ['Swiss721-Regular', 'sans-serif'],
        'swiss721-roman': ['Swiss721-Roman', 'sans-serif'],
      },
      colors: {
        blackS3: '#2C2D2F',
        blackLightS3: '#3F3F3F',
        goldS3: '#D3BC2A',
        grayS3: '#D4D4D4',
      },
      boxShadow: {
        calendar: '0px 0px 18.8px 0px #00000012',
      },
      screens: {
        '3xl': '1700px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}
