/**
 * TODO
 *  - presentationalディレクトリが出来たら移動する
 *  - Buttonをpresentationalで作られたものに差し替える
 */
import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";

const styles = (): StyleRules =>
  createStyles({
    paper: {
      width: 600,
      maxWidth: 600
    },
    title: {
      padding: "24px 32px 16px",
      "& > h6": {
        lineHeight: "24px"
      }
    },
    content: {
      padding: "0 32px 16px",
      color: "rgba(0, 0, 0, 0.6)"
    },
    actions: {
      margin: "0 32px 16px"
    },
    button: {
      margin: 0,
      width: 120
    }
  });

type Props = { open: boolean } & WithStyles<typeof styles>;

const ExpiredTokenModal: React.FC<Props> = ({ open, classes }) => {
  const onClick = (): void => {
    window.location.reload();
  };
  return (
    <Dialog classes={{ paper: classes.paper }} open={open}>
      <DialogTitle className={classes.title}>
        画面を再読み込みしてください
      </DialogTitle>
      <DialogContent className={classes.content}>
        別のアカウントに切り替わっている可能性があるため、
        <br />
        画面を再読み込みしてください。
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button className={classes.button} color="secondary" onClick={onClick}>
          再読み込み
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(
  withStyles(styles)(ExpiredTokenModal),
  (prev, next) => prev.open === next.open
);
