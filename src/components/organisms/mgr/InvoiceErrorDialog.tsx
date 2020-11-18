/**
 * 確認用に置いてあるだけ。あとで消す
 */
import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ReportProblem from "@material-ui/icons/ReportProblem";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = ({ palette, typography, spacing }: Theme) =>
  createStyles({
    title: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      color: palette.error.main,
      fontSize: typography.h6.fontSize
    },
    content: {
      paddingTop: spacing.unit * 2
    },
    icon: {
      position: "relative",
      top: 4,
      paddingRight: 4,
      fontSize: typography.h5.fontSize,
      color: palette.error.main
    },
    action: {
      paddingTop: spacing.unit,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    }
  });

interface Props extends WithStyles<typeof styles> {
  labelId?: string;
  describeId?: string;

  open: boolean;
  onClose: () => void;

  content: React.ReactNode;
}

/**
 * 請求エラー(利用者情報,請求で利用)
 */
class InvoiceErrorDialog extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id={this.props.labelId}
          className={classes.title}
          disableTypography={true}
        >
          <ReportProblem className={classes.icon} />
          エラーが起きています
        </DialogTitle>
        <DialogContent className={classes.content}>
          {this.props.content}
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={this.props.onClose}
            color="secondary"
            autoFocus={true}
          >
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InvoiceErrorDialog);
