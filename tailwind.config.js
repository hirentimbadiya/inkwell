/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        sigmar: ['Sigmar One', 'cursive'],
        mono: ['Fira Mono', 'monospace'],
        eb: ['EB Garamond', 'serif'],
        hind: ['Hind Siliguri', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        mukta: ['Mukta', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
        mxxl: { 'max': '1535px' },
        // => @media (max-width: 1535px) { ... }
        mxl: { 'max': '1279px' },
        // => @media (max-width: 1279px) { ... }
        mlg: { 'max': '1023px' },
        // => @media (max-width: 1023px) { ... }
        mmd: { 'max': '767px' },
        // => @media (max-width: 767px) { ... }
        msm: { 'max': '639px' },
        // => @media (max-width: 639px) { ... }
        mss: { 'max': '550px' },
        // => @media (max-width: 550px) { ... }
        mxs: { 'max': "480px" }
        // => @media (max-width: 480px) { ... }
      },
    },
  },
  plugins: [],
}
