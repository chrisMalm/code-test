import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // vit bakgrund
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // även för insidan av fältet
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "black",
          padding: "1rem",
        },
      },
    },
  },
});

export default theme;
