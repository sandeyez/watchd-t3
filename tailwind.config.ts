import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#101724",
        secondaryBlue: "#1D253C",
        mainLightBlue: "#1FD2FF",
        mainPink: "#D478FF",
      },
      gridTemplateColumns: {
        nav: "1fr auto 1fr"
      }
    },
  },
  plugins: [],
} satisfies Config;
