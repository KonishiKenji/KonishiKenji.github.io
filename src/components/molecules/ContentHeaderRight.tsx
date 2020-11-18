import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";

const styles = ({ spacing }: Theme) =>
  createStyles({
    flex: {
      flexGrow: 1
    }
  });

type Props = React.Props<{}> & WithStyles<typeof styles>;

const ContentHeaderRight: React.FunctionComponent<Props> = props => (
  <Toolbar disableGutters={false}>
    <div className={props.classes.flex} />
    {props.children}
  </Toolbar>
);

export default withStyles(styles)(ContentHeaderRight);
