/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Coolvetica",
        secondary: "Inter",
      },
      colors: {
        current: "#F3F3F3",
        primary: "#55F5A3",
      },
      animation: {
        blob: "blob 10s infinite",
        fadeIn: "fadeIn 550ms ease-in-out",
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "25%": {
            transform: "translate(20px, -50px) scale(1.1)",
          },
          "50%": {
            transform: "translate(0, 20px) scale(1)",
          },
          "75%": {
            transform: "translate(-20px, -15px) scale(0.9)",
          },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
