/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
      colors: {
        accentColor: "#29874c",
        textLight: "#31445e",
        bgColor: "#f2f5f6",
        bgSecondaryColor: "#fffefe",
        tintLight: "#a0b3c8",
        tintInactiveLight: "#e2e8f0",
        textDark: "#f5f5f5",
        darkBgColor: "#18181b",
        darkBgSecondaryColor: "#27272a",
        tintDark: "#d4d4d4",
        tintInactiveDark: "#71717a",
        bgTransparent: "#FFFFFF66",
      },
    },
  },
  plugins: [],
};
