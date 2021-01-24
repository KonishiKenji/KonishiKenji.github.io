import * as React from "react";

import { createStyles } from "@material-ui/core";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    circleSVG: {
      color: "orange"
    }
  });

interface Props extends WithStyles<typeof styles> {
  isShown: boolean;
}

const BackdropComponent = () => <Backdrop open={true} invisible={true} />;
const Loading: React.FunctionComponent<Props> = ({ isShown, classes }) => {
  React.useEffect(() => {
    // DialogとModalの利用が重なるとoverflowがhiddenのままになるバグがあるため、明示的に元に戻す
    if (!isShown) {
      document.body.style.overflow = "";
    }
  }, [isShown]);
  return isShown ? (
    <Modal
      open={true}
      className={classes.modal}
      disableAutoFocus={true}
      BackdropComponent={BackdropComponent}
    >
      <CircularProgress size={80} classes={{ svg: classes.circleSVG }} />
    </Modal>
  ) : null;
};

export default withStyles(styles)(Loading);
