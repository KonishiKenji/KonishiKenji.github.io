import * as React from "react";
import * as classNames from "classnames";

import { createStyles } from "@material-ui/core";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: palette.error.dark
    },
    info: {
      backgroundColor: palette.primary.dark
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: spacing.unit
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {
  message: string;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  variant: "success" | "warning" | "error" | "info";
}

const MySnackbar: React.FunctionComponent<Props> = ({
  classes,
  message,
  onClose,
  open,
  autoHideDuration = 3000,
  variant = "info"
}) => {
  const Icon = variantIcon[variant];
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="ui-snackbar"
        message={
          <span id="ui-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
      />
    </Snackbar>
  );
};

export default withStyles(styles)(MySnackbar);
