import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    custom: {
      darkGrey: "#303131",
      green: "#44B678",
      red: "#E65C62",
      lightGrey: "#7A7A7A",
      greyBorder: "#BDBDBD80",
      darkerGrey: "#E8ECF0",
      white: "#FFFFFF",
      brown: "#AF8862",
      darkBrown: "#693714",
      cardShadow: "#7A7A7A40",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    header: { 
      fontSize: "40px", 
      fontWeight:600, 
      fontFamily: "Open Sans",
      "@media (max-width:600px)": {
        fontSize: "30px",
        fontWeight: 500,
      }
     },
     header2: { 
      fontSize: "36px", 
      fontWeight:600, 
      fontFamily: "Open Sans",
      "@media (max-width:600px)": {
        fontSize: "30px",
        fontWeight: 500,
      }
     },
     header3: { 
      fontSize: "25px", 
      fontWeight:600, 
      fontFamily: "Open Sans",
      "@media (max-width:600px)": {
        fontSize: "30px",
        fontWeight: 500,
      }
     },
     header4: { 
      fontSize: "20px", 
      fontWeight:300, 
      fontFamily: "Open Sans",
      "@media (max-width:600px)": {
        fontSize: "30px",
        fontWeight: 500,
      }
     },
    lg1: { 
      fontSize: "1rem", 
      fontWeight: 600, 
      fontFamily: "Open Sans",
      "@media (max-width:600px)": {
        fontSize: "12px",
        fontWeight: 600,
      }
     },
    lg2: { fontSize: "1rem", fontWeight: 400, fontFamily: "Open Sans", },
    md1: { fontSize: "16px", fontWeight: 700, fontFamily: "Open Sans", },
    md2: { fontSize: "16px", fontWeight: 600, fontFamily: "Open Sans",  },
    md3: { fontSize: "16px", fontWeight: 400, fontFamily: "Open Sans", },
    sm1: { fontSize: "14px", fontWeight: 700, fontFamily: "Open Sans", },
    sm2: { fontSize: "13px", fontWeight: 400, fontFamily: "Open Sans", },
    sm3: { fontSize: "12px", fontWeight: 400, fontFamily: "Open Sans", },
    sm4: { fontSize: "12px", fontWeight: 700, fontFamily: "Open Sans", },
  },
  icons: {
    icon1: { fontSize: "15px"},
    icon2: { fontSize: "10px"},
    icon3: { fontSize: "30px"}
  },
  shadows: {
    card: "0 6px 12px #7A7A7A40",
    button: "0 2px 8px rgba(0,0,0,0.2)",
  },
  components: {
    MuiButton: { //Custom theme when <Button> is used
      styleOverrides: {
        root: {
          backgroundColor: "#693714",
          color: "#FFFFFF",
          textTransform: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          alignItems: "center",
          fontFamily: 'Open Sans',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 700,
          margin: "5px", 
          padding: 8,
          gap: "8px"
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", //Transparent on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#AF886230", //Transparent on focus
          },
          borderRadius: "8px"
        },
        notchedOutline: {
          borderColor: "#AF886230", // Default border color
        },
        input: {
          "&::placeholder": {
            color: "#AF8862"
          }
        }
      },
    },
    MuiSelect: { //Theme for dropdown/menuitems
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Transparent on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Transparent on focus
          },
          borderRadius: "8px"
        },
        input: {
          "&::placeholder": {
            color: "#E8ECF0", //Placeholder font color
          },
        },
      },
    },
  },
  spacing: (factor) => `${factor * 8}px`, // Custom spacing utility (8px grid system),
  breakpoints: {
      xs: 0,
      sm: 600,
      sm2: 700,
      sm3:  800,
      md: 900,
      lg: 1200,
      xl: 1536, 
  }
});

export default theme;
