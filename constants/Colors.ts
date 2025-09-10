const accentColor = "#29874c";
const tintColorLight = "#a0b3c8";
const tintInActiveColorLight = "#e2e8f0";
const tintColorDark = "#d4d4d4";
const tintInActiveColorDark = "#71717a";
const accent = "#febc05"
const error = "#dc2626"
const success = "#16a34a"

export default {
  global: {
    accent,
    accentColor,
    error,
    success,
    black: '#000000',
    white: '#ffffff'
  },
  light: {
    text: "#31445e",
    background: "#f2f5f6",
    backgroundSecondary: "#fffefe",
    tint: tintColorLight,
    tintInActive: tintInActiveColorLight,
    tabIconDefault: tintInActiveColorLight,
    tabIconSelected: tintColorLight,
    borderColor: '#e5e7eb',
  },
  dark: {
    text: "#f5f5f5",
    background: "#18181b",
    backgroundSecondary: "#27272a",
    tint: tintColorDark,
    tintInActive: tintInActiveColorDark,
    tabIconDefault: tintInActiveColorDark,
    tabIconSelected: tintColorDark,
    borderColor: '#3f3f46'
  },
};
