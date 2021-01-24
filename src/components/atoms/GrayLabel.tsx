import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    label: {
      backgroundColor: "#f5f5f5",
      boxSizing: "border-box",
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: 14,
      padding: "4px 16px",
      marginBottom: 8
    }
  });

interface OwnProps {
  label: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 文字装飾
 */
const GrayLabel = (props: Props) => (
  <div className={props.classes.label}>{props.label}</div>
);

export default withStyles(styles)(GrayLabel);
