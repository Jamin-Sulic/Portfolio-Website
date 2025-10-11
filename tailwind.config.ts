import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"], // 👈 ganz wichtig bei v4
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
