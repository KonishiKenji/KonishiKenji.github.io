import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import {
  MuiThemeProvider,
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import { theme } from "@styles/theme";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";

const styles = (): StyleRules =>
  createStyles({
    root: {
      display: "flex"
    },
    palette: {
      marginRight: 20,
      display: "flex",
      flexDirection: "column"
    },
    mainColor: {
      marginBottom: 10
    },
    colorBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: 200,
      height: 24,
      padding: 10
    }
  });
type Props = WithStyles<typeof styles>;

const ColorPalette: React.FC<Props> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.palette}>
        <div className={classes.mainColor}>
          <div
            className={classes.colorBox}
            style={{ backgroundColor: blueGrey[800] }}
          >
            Primary Color
          </div>
          <div
            className={classes.colorBox}
            style={{ backgroundColor: blueGrey[800] }}
          >
            <span>{`${800}:`}</span>
            <span>{blueGrey[800]}</span>
          </div>
        </div>
        {Object.keys(blueGrey).map((code) => (
          <div
            className={classes.colorBox}
            style={{ backgroundColor: blueGrey[code] }}
          >
            <span>{`${code}:`}</span>
            <span>{blueGrey[code]}</span>
          </div>
        ))}
      </div>
      <div className={classes.palette}>
        <div className={classes.mainColor}>
          <div
            className={classes.colorBox}
            style={{ backgroundColor: lightBlue[800] }}
          >
            Secondary Color
          </div>
          <div
            className={classes.colorBox}
            style={{ backgroundColor: lightBlue[800] }}
          >
            <span>{`${800}:`}</span>
            <span>{lightBlue[800]}</span>
          </div>
        </div>
        {Object.keys(lightBlue).map((code) => (
          <div
            className={classes.colorBox}
            style={{ backgroundColor: lightBlue[code] }}
          >
            <span>{`${code}:`}</span>
            <span>{lightBlue[code]}</span>
          </div>
        ))}
      </div>
      <div className={classes.palette}>
        <div className={classes.mainColor}>
          <div
            className={classes.colorBox}
            style={{ backgroundColor: grey[800] }}
          >
            Grey Color
          </div>
          <div
            className={classes.colorBox}
            style={{ backgroundColor: grey[800] }}
          >
            <span>{`${800}:`}</span>
            <span>{grey[800]}</span>
          </div>
        </div>
        {Object.keys(grey).map((code) => (
          <div
            className={classes.colorBox}
            style={{ backgroundColor: grey[code] }}
          >
            <span>{`${code}:`}</span>
            <span>{grey[code]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
const Component = withStyles(styles)(ColorPalette);

storiesOf("Presentational", module)
  .addDecorator(withKnobs)
  .add("ColorPalette", () => (
    <MuiThemeProvider theme={theme}>
      <Component />
    </MuiThemeProvider>
  ));
