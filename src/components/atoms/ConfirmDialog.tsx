import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ClassNames from "classnames";

const styles = ({ palette, typography, spacing }: Theme) =>
  createStyles({
    title: {
      fontSize: typography.h6.fontSize,
      fontWeight: "bold"
    },
    action: {
      paddingTop: spacing.unit,
      paddingRight: spacing.unit
    },
    deleteAction: {
      color: "#b00020"
    },
    cancelButton: {
      width: 120
    },
    button: {
      width: 120,
      marginRight: 12,
      marginBottom: 8
    }
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
  title: string;
  message: string | JSX.Element;
  submitLabel?: string;
}

class ConfirmDialog extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} disableTypography={true}>
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.message}</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={this.props.onCancel}
            color="secondary"
            autoFocus={true}
            className={ClassNames(classes.cancelButton, classes.button)}
          >
            キャンセル
          </Button>
          <Button
            onClick={this.props.onDelete}
            className={ClassNames(classes.deleteAction, classes.button)}
          >
            {this.props.submitLabel || "削除する"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmDialog);
