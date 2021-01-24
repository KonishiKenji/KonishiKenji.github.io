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
  admin: FacilityUser;
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

class AccountAdminPassword extends React.Component<Props, State> {
  public state = {
    isEdit: false
  };

  public render() {
    const { classes } = this.props;
    return (
      <>
        <CurrentAccountName
          label="アカウント名"
          account={this.props.admin.email}
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
                  email={this.props.admin.email}
                  errorType={this.props.errorType}
                  needsStopHistory={this.props.needsStopHistory}
                  currentPasswordLabel="現在のパスワードを入力してください"
                  newPasswordLabel="新しいパスワード"
                  newPasswordConfirmLabel="新しいパスワード（確認）"
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
  admin: state.account.admin,
  errorType: state.account.errorType,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { accountDispatch, uiDispatch } = dispatches;
  const accountDispatches = accountDispatch(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    updatePassword: (params: UpdatePasswordParams) =>
      accountDispatches.updatePassword(params, "admin"),
    stopHistory: uiDispatches.stopHistory
  };
};

export default withStyles(styles)(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(AccountAdminPassword)
);
