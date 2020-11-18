import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import * as ClassNames from "classnames";

const styles = () =>
  createStyles({
    unEditable: {
      opacity: 0.5,
      pointerEvents: "none"
    }
  });

interface OwnProps {
  unEditable: boolean;
}

type Props = React.Props<{}> & OwnProps & WithStyles<typeof styles>;

const UnEditableWrapper: React.FunctionComponent<Props> = ({
  classes,
  unEditable,
  children
}) => (
  <div
    className={ClassNames({
      [classes.unEditable]: unEditable
    })}
  >
    {children}
  </div>
);

export default withStyles(styles)(UnEditableWrapper);
