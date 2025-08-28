/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bc4123", // röd
        secondary: "#2b3452", // blå/grå
        textColor: "#ffff",
        profileCard: "rgb(54,59,83)",
      },
    },
  },
  plugins: [],
};
