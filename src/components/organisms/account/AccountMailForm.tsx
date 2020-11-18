import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import MuiTextField from "@components/molecules/MuiTextField";
import validator from "@validator";

import dispatches from "@stores/dispatches";
import { SnackbarParams } from "@stores/ui/type";
import Button from "@material-ui/core/Button";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      marginLeft: 88,
      marginRight: 88
    },
    userType: {
      backgroundColor: "#cfd8dc",
      marginTop: 40,
      padding: "4px 8px",
      fontSize: 14,
      lineHeight: 1.71,
      letterSpacing: 0.1,
      color: "#37474f"
    },
    submitButtonWrapper: {
      display: "flex",
      justifyContent: "center",
      marginTop: spacing.unit * 3
    },
    submitButton: {
      width: spacing.unit * 20
    },
    disableButton: {
      width: spacing.unit * 20,
      fontSize: 14,
      textAlign: "center",
      color: "#555",
      backgroundColor: "#ddd",
      padding: `${spacing.unit}px ${spacing.unit * 2}px`,
      borderRadius: 4
    }
  });

const StyledButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none"
  }
})(Button);

interface DispatchProps {
  showSnackbar: (params: SnackbarParams) => void;
}

type Props = DispatchProps & WithStyles<typeof styles>;
interface State {
  afterMail: string;
  mailError: string;
}

type ChangeEventAlias = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

class AccountMailForm extends React.Component<Props, State> {
  public state = {
    afterMail: "",
    mailError: ""
  };
  public render() {
    return (
      <div className={this.props.classes.wrapper}>
        <MuiTextField
          label="メールアドレス"
          type="email"
          required={true}
          onChange={this.handleChange}
          error={Boolean(this.state.mailError.length)}
          helperText={this.state.mailError}
        />
        <div className={this.props.classes.submitButtonWrapper}>
          {this.state.afterMail ? (
            <StyledButton
              variant="contained"
              onClick={this.handleSubmit}
              color="secondary"
              className={this.props.classes.submitButton}
            >
              変更する
            </StyledButton>
          ) : (
            <div className={this.props.classes.disableButton}>送信する</div>
          )}
        </div>
      </div>
    );
  }

  private handleChange = (event: ChangeEventAlias) => {
    const value = event.currentTarget.value;
    const error = validator(value, "email");
    this.setState({
      mailError: error || "",
      afterMail: error ? "" : value
    });
  };

  private handleSubmit = () => {
    console.log("submit");
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  return {
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params)
  };
};

export default connect<void, DispatchProps, void>(
  null,
  mapDispatchToProps
)(withStyles(styles)(AccountMailForm));
