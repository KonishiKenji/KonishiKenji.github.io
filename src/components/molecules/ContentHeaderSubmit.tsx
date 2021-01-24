import * as React from "react";
import * as classNames from "classnames";

import { createStyles, WithStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";

const styles = ({ spacing }: Theme) =>
  createStyles({
    flex: {
      flexGrow: 1
    },
    submit: {
      marginLeft: spacing.unit
    },
    button: {
      boxShadow: "none",
      textTransform: "none"
    }
  });

interface Props extends WithStyles<typeof styles> {
  buttonName: string;
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  submitStyle?: string;
  cancelButtonName?: string;
  handleCancel?: (event: React.MouseEvent<HTMLElement>) => void;
  cancelStyle?: string;
  toolbarStyle?: string;
  isSubmitDisabled?: boolean;
}

class ContentHeaderSubmit extends React.Component<Props> {
  public render() {
    const { classes } = this.props;

    return (
      <Toolbar disableGutters={false} className={this.props.toolbarStyle}>
        <div className={classes.flex} />
        {this.props.handleCancel ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={this.props.handleCancel}
            className={classNames(classes.button, this.props.cancelStyle)}
          >
            {this.props.cancelButtonName}
          </Button>
        ) : null}
        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.handleSubmit}
          className={classNames(
            classes.button,
            classes.submit,
            this.props.submitStyle
          )}
          disabled={
            this.props.isSubmitDisabled !== undefined
              ? this.props.isSubmitDisabled
              : false
          }
        >
          {this.props.buttonName}
        </Button>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(ContentHeaderSubmit);
