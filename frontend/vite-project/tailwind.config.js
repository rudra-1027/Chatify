import flowbite from "flowbite/plugin";
import flowbiteTypography from "@themesberg/flowbite/plugin";

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/@themesberg/flowbite/**/*.{js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {},
  },

  plugins: [flowbite, flowbiteTypography],
};
