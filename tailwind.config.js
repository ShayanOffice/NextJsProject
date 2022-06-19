const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.svg',
  ],
  theme: {
    extend: {
      fontFamily: {
        Anjoman:
          'Anjoman, AnjomanLight, AnjomanMedium, AnjomanBold,AnjomanSemiBold,AnjomanEtraBold, serif',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
