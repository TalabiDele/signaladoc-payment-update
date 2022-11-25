/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1665D2",
        "grad-light": "#5B94FF",
        "grad-dark": "#1665D2",
        "light-blue": "#D0E0F6",
        "input-blue": "#E8F0FB",
        "grey-text": "#4F4F4F",
        "bg-light": "#1664d2c8",
      },
      screens: {
        ss: { min: "320px", max: "479px" },

        xs: { min: "480px", max: "767px" },

        sm: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        lg: { min: "1024px", max: "1279px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        xl: { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        "2xl": { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
