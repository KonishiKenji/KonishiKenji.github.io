import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as H from "history";
import validator from "@validator";

import dispatches from "@stores/dispatches";
import { NewAccountParams, AccountState } from "@stores/domain/account/type";
import PasswordField from "@components/molecules/PasswordField";
import MuiTextField from "@components/molecules/MuiTextField";
import LinkButton from "@components/atoms/LinkButton";

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
    title: {
      margin: "0 0 32px 0",
      paddingBottom: 7,
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      fontSize: 20,
      color: "#37474f",
      fontWeight: "bold"
    },
    termsWrapper: {
      display: "flex",
      justifyContent: "center"
    }
  });

interface DispatchProps {
  activate: (
    params: NewAccountParams,
    token: string,
    history: H.History
  ) => void;
  refreshActivateErrorMessage: (role: string, target: string) => void;
}

interface StateProps {
  account: AccountState;
}

interface OwnProps {
  history: H.History;
  email: string;
  token: string;
  isTimeCardAccountCreate: boolean;
}

type Props = StateProps & DispatchProps & OwnProps & WithStyles<typeof styles>;
interface State {
  adminPassword: string;
  userPassword: string;
  accountId: string;
  accountIdError: string;
}

interface ErrorMessages {
  admin: {
    password: string;
  };
  user: {
    accountId: string;
    password: string;
  };
}

class NewAccountForm extends React.Component<Props, State> {
  public state = {
    adminPassword: "",
    userPassword: "",
    accountId: "",
    accountIdError: ""
  };
  public render() {
    const errorMessages: ErrorMessages = this.getErrorMessage();
    return (
      <div className={this.props.classes.wrapper}>
        <h2 className={this.props.classes.title}>職員様用管理画面の登録</h2>
        <PasswordField
          passwordName="職員様用管理画面パスワード"
          onChange={this.onAdminChange}
          errorMessage={errorMessages.admin.password}
        />
        {this.props.isTimeCardAccountCreate && (
          <>
            <h2 className={this.props.classes.title}>
              利用者様用タイムカードアカウントの登録
            </h2>
            <MuiTextField
              label="利用者様用タイムカードアカウント"
              placeholder={"利用者様用タイムカードアカウント*"}
              required={true}
              onChange={this.handleChangeAccountId}
              error={Boolean(errorMessages.user.accountId)}
              helperText={
                errorMessages.user.accountId ||
                "8文字以上　半角英字・数字・記号いずれも使用可"
              }
              maxLength={100}
              size="long"
            />
            <PasswordField
              passwordName="利用者様用タイムカードパスワード"
              onChange={this.onUserChange}
              errorMessage={errorMessages.user.password}
            />
          </>
        )}

        <div className={this.props.classes.termsWrapper}>
          <LinkButton
            to="https://mgr.knowbe.jp/static/media/privacy_policy.pdf"
            target="_blank"
          >
            プライバシーポリシー
          </LinkButton>
          <LinkButton
            to="https://mgr.knowbe.jp/static/media/terms.pdf"
            target="_blank"
          >
            利用規約
          </LinkButton>
        </div>
        <div className={this.props.classes.submitButtonWrapper}>
          {this.isSubmit() ? (
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="secondary"
              className={this.props.classes.submitButton}
            >
              上記の内容に同意し、登録する
            </Button>
          ) : (
            <div className={this.props.classes.disableButton}>
              上記の内容に同意し、登録する
            </div>
          )}
        </div>
      </div>
    );
  }

  private isSubmit = () => {
    if (this.props.isTimeCardAccountCreate) {
      return (
        this.state.adminPassword &&
        this.state.userPassword &&
        this.state.accountId
      );
    }
    return this.state.adminPassword;
  };

  private getErrorMessage = () => {
    const adminPassword = this.getTargetErrorMessage("mgradmin", "password");
    const userPassword = this.getTargetErrorMessage("mgruser", "password");
    const userAccountId = this.getTargetErrorMessage("mgruser", "email");

    const result: ErrorMessages = {
      admin: {
        password: adminPassword ? adminPassword.error.message : ""
      },
      user: {
        accountId: userAccountId
          ? userAccountId.error.message
          : this.state.accountIdError,
        password: userPassword ? userPassword.error.message : ""
      }
    };
    return result;
  };

  private getTargetErrorMessage = (role: string, target: string) => {
    return this.props.account.activateRes.find(res => {
      return res.role === role && res.error.target === target;
    });
  };

  private handleSubmit = () => {
    this.props.activate(
      {
        email: this.props.email,
        password: this.state.adminPassword,
        mgruser_email: this.state.accountId.length
          ? this.state.accountId
          : null,
        mgruser_password: this.state.userPassword
          ? this.state.userPassword
          : null
      },
      this.props.token,
      this.props.history
    );
  };

  private handleChangeAccountId = (event: React.ChangeEvent<any>) => {
    if (
      this.props.account.activateRes.filter(target => {
        return target.role === "mgruser";
      }).length
    ) {
      this.props.refreshActivateErrorMessage("mgruser", "accountId");
    }
    const value = event.currentTarget.value;
    const error = validator(value, "accountId");
    this.setState({
      accountIdError: error || "",
      accountId: error ? "" : value
    });
  };
  private onAdminChange = (password: string) => {
    this.props.refreshActivateErrorMessage("mgradmin", "password");
    this.setState({
      adminPassword: password
    });
  };
  private onUserChange = (password: string) => {
    this.props.refreshActivateErrorMessage("mgruser", "password");
    this.setState({
      userPassword: password
    });
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { accountDispatch } = dispatches;
  const accountDispatches = accountDispatch(dispatch);
  return {
    activate: (params: NewAccountParams, token: string, history: H.History) =>
      accountDispatches.activate(params, token, history),
    refreshActivateErrorMessage: (role: string, target: string) =>
      accountDispatches.refreshActivateErrorMessage(role, target)
  };
};

const mapStateToProps = (state: any): StateProps => ({
  account: state.account
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewAccountForm));
