import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Redirect } from "react-router-dom";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import * as H from "history";

import dispatches from "@stores/dispatches";
import { SnackbarParams } from "@stores/ui/type";
import { ChangePassword, AuthState } from "@stores/auth/type";
import Button from "@material-ui/core/Button";
import PasswordField from "@components/molecules/PasswordField";

const styles = ({ spacing }: Theme) =>
  createStyles({
    userType: {
      marginTop: 48,
      marginBottom: 36,
      fontSize: 20,
      lineHeight: 1.71,
      letterSpacing: 0.1,
      color: "#37474f",
      borderBottom: "solid 1px"
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
    }
  });

interface DispatchProps {
  showSnackbar: (params: SnackbarParams) => void;
  postChangePassword: (params: ChangePassword) => void;
  refreshPasswordChangeErrorMessage: (type: "mgradmin" | "mgruser") => void;
}

interface OwnProps {
  history: H.History;
}

interface StateProps {
  auth: AuthState;
}

interface AfterPassword {
  afterPassword: string;
}

type Props = DispatchProps & OwnProps & StateProps & WithStyles<typeof styles>;

interface State {
  admin: AfterPassword;
  user: AfterPassword;
}

const MGR_ADMIN = 0;
const MGR_USER = 1;

class ResetReminderForm extends React.Component<Props, State> {
  public state = {
    admin: {
      afterPassword: ""
    },
    user: {
      afterPassword: ""
    }
  };

  public componentDidMount() {
    // 変更するユーザーが存在しない場合はログイン画面にリダイレクト
    if (
      !this.props.auth.wishChangePasswordUsers ||
      this.props.auth.wishChangePasswordUsers.length === 0
    ) {
      this.props.history.replace("/login");
    }
  }

  public render() {
    // 完了時にcompleteに飛ばす（本来はredux側の責務）
    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/password/resetreminder/complete" />;
    }

    const viewAdminError = this.getAdminErrorMessage();
    const viewUserError = this.getUserErrorMessage();
    return (
      <div>
        <div className={this.props.classes.userType}>
          業務支援用アカウントのパスワード変更
        </div>
        <PasswordField
          passwordName="新しいパスワード"
          onChange={this.handleChangeAdminAfterPassword}
          errorMessage={viewAdminError}
        />
        {this.props.auth.wishChangePasswordUsers[MGR_USER] && (
          <>
            <div className={this.props.classes.userType}>
              利用者様用タイムカードアカウントのパスワード変更
            </div>
            <PasswordField
              passwordName="新しいパスワード"
              onChange={this.handleChangeUserAfterPassword}
              errorMessage={viewUserError}
            />
          </>
        )}

        <div className={this.props.classes.submitButtonWrapper}>
          {this.isActive() ? (
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

  private getAdminErrorMessage = () => {
    const adminError = this.props.auth.changePasswordRes.filter(target => {
      return target.role === "mgradmin";
    });
    return adminError.length ? adminError[0].error.message : "";
  };

  private getUserErrorMessage = () => {
    const userError = this.props.auth.changePasswordRes.filter(target => {
      return target.role === "mgruser";
    });
    return userError.length ? userError[0].error.message : "";
  };

  // パスワードを変更するユーザーの数によって送信ボタンの活性化条件の変更
  private isActive = () => {
    if (this.props.auth.wishChangePasswordUsers[MGR_USER]) {
      return this.state.admin.afterPassword && this.state.user.afterPassword;
    }
    return this.state.admin.afterPassword;
  };

  private handleChangeAdminAfterPassword = (value: string) => {
    if (
      this.props.auth.changePasswordRes.filter(target => {
        return target.role === "mgradmin";
      }).length
    ) {
      this.props.refreshPasswordChangeErrorMessage("mgradmin");
    }
    this.setState({
      admin: {
        afterPassword: value
      }
    });
  };
  private handleChangeUserAfterPassword = (value: string) => {
    if (
      this.props.auth.changePasswordRes.filter(target => {
        return target.role === "mgruser";
      }).length
    ) {
      this.props.refreshPasswordChangeErrorMessage("mgruser");
    }
    this.setState({
      user: {
        afterPassword: value
      }
    });
  };

  private handleSubmit = () => {
    const param = {
      email: this.props.auth.wishChangePasswordUsers[MGR_ADMIN].email,
      password: this.state.admin.afterPassword,
      mgruser_password: this.state.user.afterPassword || undefined,
      remember_token: this.props.auth.wishChangePasswordUsers[MGR_ADMIN].token
    };
    this.props.postChangePassword(param);
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch, authDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  const authDispatches = authDispatch(dispatch);

  return {
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    postChangePassword: (params: ChangePassword) =>
      authDispatches.postChangePassword(params),
    refreshPasswordChangeErrorMessage: type =>
      authDispatches.refreshPasswordChangeErrorMessage(type)
  };
};

const mapStateToProps = (state: any): StateProps => ({
  auth: state.auth
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetReminderForm));
