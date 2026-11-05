import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wa: {
          dark: "#111b21",
          darker: "#0c1317",
          panel: "#202c33",
          hover: "#2a3942",
          outgoing: "#005c4b",
          incoming: "#202c33",
          incomingLight: "#ffffff",
          outgoingLight: "#d9fdd3",
          teal: "#00a884",
          lightTeal: "#25d366",
          accent: "#008069",
          muted: "#8696a0",
          lightBg: "#efeae2",
          lightHeader: "#f0f2f5"
        }
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "bounce-slight": "bounceSlight 1.5s infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        bounceSlight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        }
      }
    },
  },
  plugins: [],
};
export default config;
