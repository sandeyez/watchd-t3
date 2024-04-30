import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: "var(--font-sans)",
            },
            colors: {
                primary: "#101724",
                secondary: "#1D253C",
                tertiary: "#293A6C",
                gradientBlue: "#1FD2FF",
                gradientPink: "#AB62FF",
            },
            screens: {
                xs: "540px",
            },
            height: {
                device: "100dvh",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" },
                },
            },
            animation: {
                fadeIn: "fadeIn 1s ease-in-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
