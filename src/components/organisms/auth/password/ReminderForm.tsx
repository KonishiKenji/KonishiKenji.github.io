import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import MuiTextField from "@components/molecules/MuiTextField";
import validator from "@validator";
import { Link } from "react-router-dom";
import * as H from "history";

import dispatches from "@stores/dispatches";
import { SnackbarParams } from "@stores/ui/type";
import Button from "@material-ui/core/Button";
import { LOGIN } from "@constants/url";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      marginTop: 32
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
      width: 320,
      boxShadow: "none",
      textTransform: "none"
    },
    disableButton: {
      width: 320,
      fontSize: 14,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.26)",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      padding: `${spacing.unit}px ${spacing.unit * 2}px`,
      borderRadius: 4
    },
    linkWrapper: {
      textAlign: "center"
    },
    link: {
      fontSize: 14,
      color: "#0277bd",
      textDecoration: "none",
      marginTop: 8,
      marginLeft: "auto",
      marginRight: "auto"
    }
  });

interface DispatchProps {
  postReminder: (value: string, history: any) => void;
  showSnackbar: (params: SnackbarParams) => void;
}

interface OwnProps {
  history: H.History;
}

type Props = DispatchProps & OwnProps & WithStyles<typeof styles>;
interface State {
  accountId: string;
  accountIdError: string;
}

class ReminderForm extends React.Component<Props, State> {
  public state = {
    accountId: "",
    accountIdError: ""
  };
  public render() {
    return (
      <div className={this.props.classes.wrapper}>
        <MuiTextField
          label="メールアドレス"
          placeholder="メールアドレス"
          type="email"
          required={true}
          onChange={this.handleChange}
          error={Boolean(this.state.accountIdError.length)}
          helperText={this.state.accountIdError}
          size="long"
        />
        <div className={this.props.classes.submitButtonWrapper}>
          {this.state.accountId ? (
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="secondary"
              className={this.props.classes.submitButton}
            >
              パスワード再設定メールを送信する
            </Button>
          ) : (
            <div className={this.props.classes.disableButton}>
              パスワード再設定メールを送信する
            </div>
          )}
        </div>
        <div className={this.props.classes.linkWrapper}>
          <Link to={LOGIN} className={this.props.classes.link}>
            <Button className={this.props.classes.link}>
              ログイン画面に戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<any>) => {
    const value = event.currentTarget.value;
    const error = validator(value, "email");
    this.setState({
      accountIdError: error || "",
      accountId: error ? "" : value
    });
  };

  private handleSubmit = () => {
    this.props.postReminder(this.state.accountId, this.props.history);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, authDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const authDispatches = authDispatch(dispatch);
  return {
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    postReminder: (value: string, history: any) =>
      authDispatches.postReminder(value, history)
  };
};

export default connect<void, DispatchProps, void>(
  null,
  mapDispatchToProps
)(withStyles(styles)(ReminderForm));
