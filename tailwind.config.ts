import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        'primary': '#101724',
        'secondary': '#1D253C',
        'graidentBlue': '#1FD2FF',
        'gradientPink': '#AB62FF'
      },
    },
  },
  plugins: [],
} satisfies Config;
