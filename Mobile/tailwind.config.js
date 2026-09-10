/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        glow: {
          main: "#17C3B2",
          dark: "#139E90",
          light: "#E0F7F5",
          bg: "#F0FBF9",
          text: "#1A2B29",
          muted: "#8C9EA0",
          border: "#DDF2EF",
          danger: "#E76F51",
          card: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
