import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthRoutes from "@app/Routes/AuthRoutes";
import GuestRoutes from "@app/Routes/GuestRoutes";
import TemporaryRoutes from "@app/Routes/TemporaryRoutes";
import ScrollToTop from "@app/ScrollToTop";
import ResetReminder from "@components/pages/auth/password/ResetReminder";
import ResetReminderComplete from "@components/pages/auth/password/ResetReminderComplete";
import AccountNewUser from "@components/pages/account/NewUser";
import AccountNewUserComplete from "@components/pages/account/NewUserComplete";
import { AppState } from "@stores/type";
import { ResponseError } from "@stores/ui/type";

interface StateProps {
  isLoggedIn: boolean;
  isCheckedLoggedIn: boolean;
  isTemporaryLoggedIn: boolean;
  responseError: ResponseError;
}

interface DispatchProps {
  checkLogin(): Promise<void>;
  fetchUser(): void;
  logout(): void;
  responseErrorClear(): void;
}

interface MergeProps extends StateProps, DispatchProps {
  isLogin: boolean;
  isLogout: boolean;
}

type Props = MergeProps;

class NavigationGuard extends React.Component<Props> {
  public async componentDidMount(): Promise<void> {
    await this.props.checkLogin();
    if (this.props.isLoggedIn) {
      this.props.fetchUser();
    }
  }

  public componentWillUpdate(nextProps: Props): void {
    // ログアウト後にcheckLoginを再度行うため、Reactをv17にする前に見直す
    if (!nextProps.isCheckedLoggedIn) {
      this.props.checkLogin();
    }
  }

  public componentDidUpdate(nextProps: Props): void {
    if (nextProps.responseError) {
      this.authenticationFailed(nextProps.responseError.status);
    }
  }

  /**
   * 認証切れでログアウトさせる
   */
  private authenticationFailed = (status: number): void => {
    if ([400, 401].includes(status)) {
      this.props.responseErrorClear();
      // 仮ログイン中userが必ずエラーを返す影響で例外処理を入れている
      if (
        window.location.hash !== "#/login" &&
        !this.props.isTemporaryLoggedIn &&
        this.props.isLogin
      ) {
        this.props.logout();
      }
    }
  };

  private getUserConfirmation = (
    dialogKey: string,
    callback: (isTransPage: boolean) => void
  ): void => {
    const dialogTrigger = window[Symbol.for(dialogKey)];
    if (dialogTrigger) {
      return dialogTrigger(callback);
    }
    return callback(true);
  };

  public render(): JSX.Element | null {
    return this.props.isCheckedLoggedIn ? (
      <HashRouter getUserConfirmation={this.getUserConfirmation}>
        <ScrollToTop>
          <Switch>
            <Route
              path="/password/resetreminder/complete"
              component={ResetReminderComplete}
            />
            <Route path="/password/resetreminder" component={ResetReminder} />
            <Route
              path="/account/user/new/complete"
              component={AccountNewUserComplete}
              exact
            />
            <Route path="/account/user/new" component={AccountNewUser} exact />
            {this.props.isLogout && <GuestRoutes />}
            {this.props.isLogin && <AuthRoutes />}
            {this.props.isTemporaryLoggedIn && <TemporaryRoutes />}
            {/* 切り替え時用に一時的なリダイレクトループをさせる */}
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </ScrollToTop>
      </HashRouter>
    ) : null;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  isLoggedIn: state.auth.isLoggedIn,
  isCheckedLoggedIn: state.auth.isChecked,
  isTemporaryLoggedIn: state.auth.isTemporary,
  responseError: state.ui.responseError
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch, userDispatch, uiDispatch } = dispatches;
  return {
    checkLogin: async (): Promise<void> => authDispatch(dispatch).checkLogin(),
    fetchUser: (): Promise<void> => userDispatch(dispatch).me(),
    logout: authDispatch(dispatch).logout,
    responseErrorClear: uiDispatch(dispatch).responseErrorClear
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps
): MergeProps => {
  const isLogin = !stateProps.isTemporaryLoggedIn && stateProps.isLoggedIn;
  const isLogout = !stateProps.isTemporaryLoggedIn && !stateProps.isLoggedIn;
  return {
    isLogin,
    isLogout,
    ...stateProps,
    ...dispatchProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NavigationGuard);
