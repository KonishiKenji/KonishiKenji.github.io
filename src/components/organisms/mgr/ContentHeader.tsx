import * as React from "react";

// material ui components
import { createStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ palette }: Theme) =>
  createStyles({
    wrapper: {
      height: 64,
      backgroundColor: palette.background.default
    }
  });

interface OwnProps {
  position: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class MgrContentHeader extends React.Component<Props> {
  public static defaultProps: OwnProps = {
    position: "relative"
  };

  public render() {
    const { classes } = this.props;

    return (
      <AppBar
        position={this.props.position}
        color="inherit"
        className={classes.wrapper}
        elevation={0}
      >
        {this.props.children}
      </AppBar>
    );
  }
}

export default withStyles(styles)(MgrContentHeader);
