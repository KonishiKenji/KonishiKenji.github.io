import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    heading: {
      backgroundColor: "#f5f5f5",
      boxSizing: "border-box",
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: 16,
      padding: "5px 8px",
      marginBottom: 8
    }
  });

interface OwnProps {
  text: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 中見出し
 */
const GrayMiddleHeading = (props: Props) => (
  <div className={props.classes.heading}>{props.text}</div>
);

export default withStyles(styles)(GrayMiddleHeading);
