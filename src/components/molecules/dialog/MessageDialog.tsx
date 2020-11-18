import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = () =>
  createStyles({
    paper: {
      width: 600,
      maxWidth: 600
    },
    title: {
      padding: "24px 32px 16px"
    },
    content: {
      color: "rgba(51, 51, 51, 0.53)",
      padding: "0 32px 16px"
    },
    footer: {
      margin: "0 32px 16px"
    }
  });

interface OwnProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  closeButton: React.ReactNode;
  actionButton?: React.ReactNode;
}
type Props = OwnProps & WithStyles<typeof styles>;

const MessageDialog: React.FunctionComponent<Props> = (props) => {
  return (
    <Dialog open={props.isOpen} classes={{ paper: props.classes.paper }}>
      <DialogTitle className={props.classes.title}>{props.title}</DialogTitle>
      <DialogContent className={props.classes.content}>
        {props.message}
      </DialogContent>
      <DialogActions className={props.classes.footer}>
        {props.closeButton}
        {props.actionButton}
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(MessageDialog);
