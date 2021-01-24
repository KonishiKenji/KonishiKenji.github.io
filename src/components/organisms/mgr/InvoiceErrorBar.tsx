import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
// import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import red from "@material-ui/core/colors/red";

const styles = ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.error.main,
      backgroundColor: red[50],
      cursor: "pointer",
      marginTop: "2px"
    },
    grow: {
      flexGrow: 1,
      textAlign: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {
  message: string;
  onClick?: () => void;
  dialog?: React.ReactNode;
}

/**
 * 請求エラーを表示するAppBar
 */
class InvoiceErrorBar extends React.Component<Props> {
  public static defaultProps = {
    onClick: () => {
      return;
    }
  };

  public render() {
    const { classes } = this.props;

    return (
      <AppBar
        position="sticky"
        className={classes.root}
        elevation={0}
        onClick={this.props.onClick}
      >
        <Toolbar>
          <Typography variant="body1" color="inherit" className={classes.grow}>
            {this.props.message}
          </Typography>
        </Toolbar>
        {this.props.dialog ? this.props.dialog : null}
      </AppBar>
    );
  }
}

export default withStyles(styles)(InvoiceErrorBar);
