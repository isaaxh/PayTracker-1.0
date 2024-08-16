/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentColor: "#29874c",
        textLight: "#31445e",
        bgColor: "#f2f5f6",
        bgSecondaryColor: "#fffefe",
        tintLight: "#a0b3c8",
        textDark: "#f5f5f5",
        darkBgColor: "#18181b",
        darkBgSecondaryColor: "#27272a",
        tintDark: "#d4d4d4",
        bgTransparent: "#FFFFFF66",
      },
    },
  },
  plugins: [],
};
