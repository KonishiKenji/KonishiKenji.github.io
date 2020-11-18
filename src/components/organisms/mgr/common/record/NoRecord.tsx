import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = () =>
  createStyles({
    root: {
      padding: 80,
      textAlign: "center",
      boxShadow: "none"
    }
  });

interface OwnProps {
  message: string;
  targetRecordDate?: Date;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 業務日誌 (日々の記録ページ/業務日誌ページ)
 */
const NoRecord = (props: Props) => (
  <Paper classes={{ root: props.classes.root }}>{props.message}</Paper>
);

export default withStyles(styles)(NoRecord);
