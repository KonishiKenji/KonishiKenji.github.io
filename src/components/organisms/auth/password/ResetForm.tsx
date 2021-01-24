import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import * as H from "history";
import { ChangePassword, AuthState } from "@stores/auth/type";

import dispatches from "@stores/dispatches";
import { SnackbarParams } from "@stores/ui/type";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PasswordField from "@components/molecules/PasswordField";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      marginTop: 32
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
    content: {
      paddingTop: spacing.unit * 2
    },
    action: {
      paddingTop: spacing.unit,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    }
  });

interface StateProps {
  auth: AuthState;
}

interface DispatchProps {
  showSnackbar: (params: SnackbarParams) => void;
  postChangePassword: (params: ChangePassword) => void;
  refreshTemporary: () => void;
  fetchMe: () => Promise<void>;
  refreshPasswordChangeErrorMessage: (type: "mgradmin" | "mgruser") => void;
}

interface OwnProps {
  history: H.History;
}

type Props = DispatchProps & OwnProps & StateProps & WithStyles<typeof styles>;
interface State {
  afterPassword: string;
}

class ResetForm extends React.Component<Props, State> {
  public state = {
    afterPassword: "",
    afterPasswordConfirm: "",
    afterPasswordError: "",
    afterPasswordConfirmError: ""
  };
  public render() {
    const viewError = this.getErrorMessage();
    return (
      <div className={this.props.classes.wrapper}>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={this.props.auth.isLoggedIn}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle disableTypography={true}>パスワード変更完了</DialogTitle>
          <DialogContent className={this.props.classes.content}>
            パスワードの変更が完了しました。
            <br />
            次回ログインより新しいパスワードをお使いください。
          </DialogContent>
          <DialogActions className={this.props.classes.action}>
            <Button
              onClick={this.onClickLoginButton}
              color="secondary"
              autoFocus={true}
            >
              管理者様用管理画面へ
            </Button>
          </DialogActions>
        </Dialog>
        <PasswordField
          passwordName="新しいパスワード"
          onChange={this.handleChangeAfterPassword}
          errorMessage={viewError}
        />
        <div className={this.props.classes.submitButtonWrapper}>
          {this.state.afterPassword ? (
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="secondary"
              className={this.props.classes.submitButton}
            >
              パスワードを送信する
            </Button>
          ) : (
            <div className={this.props.classes.disableButton}>
              パスワードを送信する
            </div>
          )}
        </div>
      </div>
    );
  }

  private getErrorMessage = () => {
    const adminError = this.props.auth.changePasswordRes.filter(target => {
      return target.role === "mgradmin";
    });
    return adminError.length
      ? adminError[0].error.message
      : this.state.afterPasswordError;
  };

  private onClickLoginButton = () => {
    this.props.refreshTemporary();
    this.props.fetchMe();
  };

  private handleChangeAfterPassword = (value: string) => {
    if (
      this.props.auth.changePasswordRes.filter(target => {
        return target.role === "mgradmin";
      }).length
    ) {
      this.props.refreshPasswordChangeErrorMessage("mgradmin");
    }
    this.setState({
      afterPassword: value
    });
  };

  private handleSubmit = () => {
    this.props.postChangePassword({
      email: this.props.auth.temporaryEmail,
      password: this.state.afterPassword,
      remember_token: this.props.auth.temporaryToken
    });
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, authDispatch, userDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const authDispatches = authDispatch(dispatch);
  const userDispatches = userDispatch(dispatch);
  return {
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    postChangePassword: (params: ChangePassword) =>
      authDispatches.postChangePassword(params),
    refreshTemporary: () => authDispatches.refreshTemporary(),
    refreshPasswordChangeErrorMessage: type =>
      authDispatches.refreshPasswordChangeErrorMessage(type),
    fetchMe: userDispatches.me
  };
};

const mapStateToProps = (state: any): StateProps => ({
  auth: state.auth
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetForm));
