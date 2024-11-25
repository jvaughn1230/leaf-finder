import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        mesh: "url('/static/background2.png')",
        npsBg:
          "url('https://www.nps.gov/npgallery/GetAsset/b0e6301f-f4bd-4604-b8a3-f2b9ed7a14ef/proxy/hires?')",
      },
      colors: {
        purple: {
          951: "rgba(79, 70, 229, 1)",
        },
        gray: {
          950: "hsla(0, 0%, 100%, 0.7);",
          951: "hsla(0, 0%, 100%, 0.4);",
          952: "#373b64",
        },
        green: {
          950: "#064e3b",
        },
        blue: {
          950: "#0a0f1e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
