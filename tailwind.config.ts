import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F7F5",
        white: "#FFFFFF",
        rule: "#D8DCE2",
        slate: "#667085",
        graphite: "#111827",
        signal: "#C7FF3E",
      },
      boxShadow: {
        panel: "0 32px 80px -38px rgba(17, 24, 39, 0.45)",
        float: "0 18px 40px -24px rgba(17, 24, 39, 0.32)",
        signal: "0 0 0 6px rgba(199, 255, 62, 0.16)",
      },
      fontFamily: {
        display: [
          "Arial Narrow",
          "Aptos Display",
          "Segoe UI",
          "sans-serif",
        ],
        body: ["Aptos", "Segoe UI", "Helvetica Neue", "sans-serif"],
        mono: ["Cascadia Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
