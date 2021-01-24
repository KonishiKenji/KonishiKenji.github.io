import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import AppBar from "@material-ui/core/AppBar";
import knowbemgr_logoPng from "@images/logo_fix_knowbe_logo-wh.png"; // 仮

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#37474F"
    },
    logo: {
      marginLeft: spacing.unit * 4,
      paddingTop: spacing.unit,
      paddingBottom: spacing.unit,
      width: spacing.unit * 11
    }
  });

interface Props extends WithStyles<typeof styles> {}

const contactHeader: React.FunctionComponent<Props> = props => {
  return (
    <AppBar position="static" color="inherit" className={props.classes.root}>
      <img
        src={knowbemgr_logoPng}
        alt="https://knowbe.jp/"
        className={props.classes.logo}
      />
    </AppBar>
  );
};

export default withStyles(styles)(contactHeader);
