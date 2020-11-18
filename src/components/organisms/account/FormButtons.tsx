import * as React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = () =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    submitButton: {
      width: 160,
      boxShadow: "none",
      textTransform: "none"
    },
    cancelButton: {
      width: 160,
      marginRight: 16,
      fontWeight: "bold",
      border: "solid 1px rgba(0, 0, 0, 0.12)"
    }
  });

interface OwnProps {
  disabled: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}
type Props = OwnProps & WithStyles<typeof styles>;

const FormButtons: React.FunctionComponent<Props> = ({
  classes,
  disabled,
  handleSubmit,
  handleCancel
}) => (
  <div className={classes.buttons}>
    <Button
      className={classes.cancelButton}
      variant="outlined"
      color="secondary"
      onClick={handleCancel}
    >
      キャンセル
    </Button>
    <Button
      className={classes.submitButton}
      variant="contained"
      color="secondary"
      onClick={handleSubmit}
      disabled={disabled}
    >
      変更を確定する
    </Button>
  </div>
);

export default withStyles(styles)(FormButtons);
