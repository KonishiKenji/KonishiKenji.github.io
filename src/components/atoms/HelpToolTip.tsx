import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import tableheader_tips from "@images/tableheader_tips.svg";

const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
    tooltip: {
      fontSize: 12
    },
    popper: {
      opacity: 1
    },
    icon: {
      color: "#607d8b"
    }
  });

interface Props extends WithStyles<typeof styles> {
  title: string | JSX.Element;
  tableHeader?: boolean;
  size?: "inherit" | "default" | "large" | "small";
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}

const helpToolTip: React.FunctionComponent<Props> = ({
  title,
  tableHeader,
  placement,
  size,
  classes
}) => (
  <Tooltip
    classes={{
      tooltip: classes.tooltip,
      popper: classes.popper
    }}
    placement={placement || "right-start"}
    title={title}
  >
    {tableHeader ? (
      <img src={tableheader_tips} />
    ) : (
      <HelpIcon className={classes.icon} fontSize={size || "small"} />
    )}
  </Tooltip>
);

export default withStyles(styles)(helpToolTip);
