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

const styles = ({ palette, typography, spacing }: Theme) =>
  createStyles({
    title: {
      fontSize: typography.h6.fontSize,
      fontWeight: "bold"
    },
    action: {
      paddingTop: spacing.unit,
      paddingRight: spacing.unit
    }
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

class NavigationTransitionDialog extends React.Component<Props> {
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
          変更内容が保存されていません。
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            データを保存する前にこのページから移動すると変更内容は失われます。
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button onClick={this.props.onConfirm} color="secondary">
            保存せずに移動する
          </Button>
          <Button
            onClick={this.props.onCancel}
            color="secondary"
            autoFocus={true}
          >
            このページに留まる
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NavigationTransitionDialog);
