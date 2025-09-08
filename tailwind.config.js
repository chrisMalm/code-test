/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bc4123", // röd
        headerNav: "#1f1e1e91",
        secondary: "#151515", // blå/grå
        textColor: "#ffff",
        profileCard: "rgb(54,59,83)",
        onHover: "#2b2828",
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui"], // ersätter default sans
      },
    },
  },
  plugins: [],
};
