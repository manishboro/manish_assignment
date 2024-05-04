import { createTheme } from "@mui/material/styles";

// Define a type for your custom palette
interface CustomPalette {
  white: string;
  input_background: string;
  grey_1: string;
  grey_2: string;
  grey_3: string;
  grey_4: string;
  blue_1: string;
  blue_2: string;
  blue_3: string;
  blue_4: string;
  blue_5: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    custom: CustomPalette;
  }
  interface PaletteOptions {
    custom: CustomPalette;
  }
}

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    htmlFontSize: 10,
    h1: { fontSize: "4.25rem" },
    h2: { fontSize: "3.25rem" },
    h3: { fontSize: "2.25rem" },
    h6: { fontSize: "6.5rem" },
    body1: { fontSize: "2rem" },
    body2: { fontSize: "1.8rem" },
    subtitle1: { fontSize: "1.6rem" },
    subtitle2: { fontSize: "1.4rem" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-size: 62.5%;
        }
        
        @media only screen and (min-width: 1536px) {
          html {
            font-size: 65%;
          }
        }
        
        @media only screen and (max-width: 1030px) {
          html {
            font-size: 57%;
          }
        }
        
        @media only screen and (max-width: 600px) {
          html {
            font-size: 54%;
          }
        }
     `,
    },
  },
  palette: {
    custom: {
      white: "#fff",
      input_background: "#F4F6FA",

      grey_1: "#575757",
      grey_2: "#707070",
      grey_3: "#dcdcdc",
      grey_4: "#f4f6fa",

      blue_1: "#0075FC",
      blue_2: "#0078d4",
      blue_3: "#75CFF0",
      blue_4: "#2196f3",
      blue_5: "#000FFF",
    },
  },
});

export default theme;
