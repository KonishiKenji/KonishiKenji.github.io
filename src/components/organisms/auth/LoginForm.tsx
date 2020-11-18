import * as React from "react";
import * as H from "history";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LinkButton from "@components/atoms/LinkButton";
import MuiTextField from "@components/molecules/MuiTextField";
import MuiCheckbox from "@components/molecules/MuiCheckbox";
import LoginErrorMessage from "@components/organisms/auth/LoginErrorMessage";
import {
  setRemainedUser,
  getRemainedUser,
  clearRemainedUser
} from "@utils/localStorage";
import {
  LoginParams,
  Lockout,
  UnLock,
  ChangePasswordUser
} from "@stores/auth/type";

const styles = createStyles({
  header: {
    margin: 0,
    padding: "24px 32px 9px",
    borderBottom: "1px solid #cfd8dc",
    fontSize: 24,
    color: "#37474f"
  },
  form: {
    padding: "64px 0 80px"
  },
  field: {
    width: 400,
    margin: "auto"
  },
  button: {
    display: "block",
    width: 320,
    margin: "0 auto 8px"
  }
});

interface OwnProps {
  history: H.History;
}
interface StateProps {
  hasError: boolean;
  lockout: Lockout;
  unlock: UnLock;
  wishChangePasswordUsers: ChangePasswordUser[];
}
interface DispatchProps {
  login: (params: LoginParams) => Promise<void>;
}
type Props = OwnProps & StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  isStayLogin: boolean;
  username: string;
  password: string;
}
const initialState: State = {
  isStayLogin: false,
  username: "",
  password: ""
};

class LoginForm extends React.Component<Props, State> {
  public readonly state: State = initialState;

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (this.state.isStayLogin) {
      setRemainedUser(this.state.username);
    } else {
      clearRemainedUser();
    }
    this.handleLogin();
    e.preventDefault();
  };

  public handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value });
  };

  public handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
    e.preventDefault();
  };

  public handleIsStayLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isStayLogin: !this.state.isStayLogin
    });
    e.stopPropagation();
  };

  public componentDidMount() {
    const remainedUser = getRemainedUser();
    if (!remainedUser) {
      return;
    }
    this.setState({ isStayLogin: true, username: remainedUser });
  }

  public render() {
    const { classes } = this.props;
    return (
      <Paper onKeyDown={this.enterKeyDown}>
        <h1 className={classes.header}>業務支援にログイン</h1>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.field}>
            <MuiTextField
              id="username"
              name="username"
              label="アカウント名"
              placeholder="アカウント名"
              helperText="メールアドレスまたはID"
              size="auto"
              autoCorrect="off"
              autoCapitalize="off"
              value={this.state.username}
              onChange={this.handleUsername}
            />
            <MuiTextField
              type="password"
              id="password"
              name="password"
              label="パスワード"
              placeholder="パスワード"
              helperText=""
              size="auto"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <MuiCheckbox
              label="次回からアカウント名の入力を省略する"
              checked={this.state.isStayLogin}
              value="1"
              onChange={this.handleIsStayLogin}
            />
          </div>
          {this.props.hasError && (
            <LoginErrorMessage
              lockout={this.props.lockout}
              unlock={this.props.unlock}
            />
          )}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!this.state.username || !this.state.password}
          >
            ログイン
          </Button>
          <LinkButton to="/password/reminder">
            パスワードを忘れた場合
          </LinkButton>
        </form>
      </Paper>
    );
  }

  private handleLogin = async () => {
    await this.props.login({
      email: this.state.username,
      password: this.state.password
    });
    // wishChangePasswordUsersがあったら強制変更に飛ばす
    if (this.props.wishChangePasswordUsers.length > 0) {
      this.props.history.push("/password/resetreminder");
    }
  };

  private enterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.handleLogin();
      e.preventDefault();
    }
  };
}

const mapStateToProps = (state: any) => ({
  hasError: state.auth.hasError,
  lockout: state.auth.lockout,
  unlock: state.auth.unlock,
  wishChangePasswordUsers: state.auth.wishChangePasswordUsers
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch } = dispatches;
  const authDispatches = authDispatch(dispatch);
  return {
    login: (params: LoginParams) => {
      return authDispatches.login(params);
    }
  };
};

export default withStyles(styles)(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
