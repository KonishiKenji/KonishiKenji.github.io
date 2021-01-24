import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import Collapse from "@material-ui/core/Collapse";
import CurrentPassword from "@components/organisms/account/CurrentPassword";
import CurrentAccountName from "@components/organisms/account/CurrentAccountName";
import PasswordForm from "@components/organisms/account/PasswordForm";
import {
  FacilityUser,
  UpdatePasswordParams
} from "@stores/domain/account/type";

const styles = () =>
  createStyles({
    form: {
      marginTop: 32
    }
  });

interface StateProps {
  user: FacilityUser;
  errorType: string;
  needsStopHistory: boolean;
}
interface DispatchProps {
  updatePassword: (params: UpdatePasswordParams) => void;
  stopHistory: (flag: boolean) => void;
}
type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  isEdit: boolean;
}

class AccountTimeCardPassword extends React.Component<Props, State> {
  public state = {
    isEdit: false
  };

  public render() {
    const { classes } = this.props;
    return (
      <>
        <CurrentAccountName
          label="アカウント名"
          account={this.props.user.email}
        />
        <div className={classes.form}>
          <Collapse in={this.state.isEdit} collapsedHeight="51px">
            {/* height => Formの高さ */}
            <div style={{ height: 319 }}>
              {!this.state.isEdit && (
                <CurrentPassword onClick={this.openForm} />
              )}
              {/* 閉じても値を保持する */}
              <div style={{ display: this.state.isEdit ? "block" : "none" }}>
                <PasswordForm
                  email={this.props.user.email}
                  errorType={this.props.errorType}
                  needsStopHistory={this.props.needsStopHistory}
                  currentPasswordLabel="現在の職員様用管理画面パスワードを入力してください"
                  newPasswordLabel="新しい利用者様用タイムカードパスワード"
                  newPasswordConfirmLabel="新しい利用者様用タイムカードパスワード（確認）"
                  onClose={this.closeForm}
                  updatePassword={this.props.updatePassword}
                  stopHistory={this.props.stopHistory}
                />
              </div>
            </div>
          </Collapse>
        </div>
      </>
    );
  }

  private closeForm = () => {
    this.setState({ isEdit: false });
  };

  private openForm = () => {
    this.setState({ isEdit: true });
  };
}

const mapStateToProps = (state: any): StateProps => ({
  user: state.account.user,
  errorType: state.account.errorType,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { accountDispatch, uiDispatch } = dispatches;
  const accountDispatches = accountDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    updatePassword: (params: UpdatePasswordParams) =>
      accountDispatches.updatePassword(params, "timeCard"),
    stopHistory: uiDispatches.stopHistory
  };
};

export default withStyles(styles)(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(AccountTimeCardPassword)
);
