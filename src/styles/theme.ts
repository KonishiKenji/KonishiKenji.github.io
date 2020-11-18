import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

/* eslint-disable import/prefer-default-export */
export const theme = createMuiTheme({
  palette: {
    background: {
      default: "#eeeeee"
    },
    primary: { main: "#37474f" },
    secondary: { main: "#0277bd" }
  },
  typography: {
    useNextVariants: true, // @see also https://material-ui.com/style/typography/#migration-to-typography-v2
    fontFamily: [
      "Hiragino Kaku Gothic ProN",
      "ヒラギノ角ゴ ProN W3",
      "Meiryo",
      "メイリオ",
      "Osaka",
      "MS PGothic",
      "arial",
      "helvetica",
      "sans-serif"
    ].join(","),
    h1: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#555"
    },
    h2: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#555"
    },
    body1: {
      fontSize: 16,
      color: "#555"
    },
    caption: {
      fontSize: 14,
      color: "#778899"
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 1200,
      lg: 1800,
      xl: 2200
    }
  },
  overrides: {
    MuiTableRow: {
      head: {
        height: 48
      }
    },
    MuiTableCell: {
      body: {
        fontSize: "1rem"
      }
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid ${blueGrey[700]}`
        },
        "&:after": {
          borderBottom: "2px solid #0288d1"
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: "rgba(0, 0, 0, 0.87)"
      }
    },
    MuiButton: {
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    }
  }
});
