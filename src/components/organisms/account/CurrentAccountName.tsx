import * as React from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";

const styles = ({ palette }: Theme) =>
  createStyles({
    label: {
      margin: 0,
      fontSize: 12,
      lineHeight: 1.33,
      letterSpacing: 0.4,
      color: "#37474f"
    },
    currentEmail: {
      margin: "8px 0 0",
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: 600
    }
  });

interface OwnProps {
  label: string;
  account: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

const CurrentAccountName: React.FunctionComponent<Props> = ({
  label,
  account,
  classes
}) => (
  <div>
    <p className={classes.label}>{label}</p>
    <p className={classes.currentEmail}>{account}</p>
  </div>
);

export default withStyles(styles)(CurrentAccountName);
