import * as React from "react";
import MuiTextField from "@components/molecules/MuiTextField";
import FormButtons from "@components/organisms/account/FormButtons";
import validator from "@validator";
import { UpdatePasswordParams } from "@stores/domain/account/type";

interface OwnProps {
  email: string;
  errorType: string;
  needsStopHistory: boolean;
  currentPasswordLabel: string;
  newPasswordLabel: string;
  newPasswordConfirmLabel: string;
  onClose: () => void;
  updatePassword: (params: UpdatePasswordParams) => void;
  stopHistory: (flag: boolean) => void;
}
type Props = OwnProps;

interface State {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  newPasswordError: string;
  newPasswordConfirmError: string;
}

class PasswordForm extends React.Component<Props, State> {
  public state = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    newPasswordError: "",
    newPasswordConfirmError: ""
  };

  public render() {
    return (
      <form style={{ whiteSpace: "nowrap" }}>
        <MuiTextField
          label={this.props.currentPasswordLabel}
          placeholder="現在のパスワード"
          type="password"
          autoComplete="new-password"
          required={true}
          size="long"
          value={this.state.currentPassword}
          onChange={this.handleChangeCurrentPassword}
        />
        <MuiTextField
          label={this.props.newPasswordLabel}
          placeholder="新しいパスワード"
          type="password"
          autoComplete="new-password"
          required={true}
          value={this.state.newPassword}
          onChange={this.handleChangeNewPassword}
          onBlur={this.handleBlurNewPassword}
          error={this.state.newPasswordError.length !== 0}
          size="long"
          helperText={
            this.state.newPasswordError ||
            "半角英字・数字・記号を組み合わせた8文字以上"
          }
          maxLength={100}
        />
        <MuiTextField
          label={this.props.newPasswordConfirmLabel}
          placeholder="新しいパスワード"
          type="password"
          autoComplete="new-password"
          required={true}
          size="long"
          value={this.state.newPasswordConfirm}
          onChange={this.handleChangeNewPasswordConfirm}
          onBlur={this.handleBlurNewPasswordConfirm}
          error={this.state.newPasswordConfirmError.length !== 0}
          helperText={
            this.state.newPasswordConfirmError ||
            "新しいパスワードをもう一度入力"
          }
          maxLength={100}
        />
        <FormButtons
          disabled={
            !this.state.currentPassword ||
            !this.state.newPassword ||
            !this.state.newPasswordConfirm ||
            !!this.state.newPasswordError ||
            !!this.state.newPasswordConfirmError
          }
          handleSubmit={this.handleSubmit}
          handleCancel={this.props.onClose}
        />
      </form>
    );
  }

  private handleChangeCurrentPassword = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;
    this.setState({
      currentPassword: value
    });
    this.confirmDiscardFormChanges();
  };

  private handleChangeNewPassword = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;
    this.setState({
      newPassword: value
    });
    this.confirmDiscardFormChanges();
  };

  private handleBlurNewPassword = () => {
    const error = validator(this.state.newPassword, "password");
    this.setState({
      newPasswordError: error || ""
    });
    this.confirmDiscardFormChanges();
  };

  private handleChangeNewPasswordConfirm = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;
    this.setState({
      newPasswordConfirm: value
    });
  };

  private handleBlurNewPasswordConfirm = () => {
    const error = validator(this.state.newPasswordConfirm, {
      type: "passwordMatch",
      value: this.state.newPassword
    });
    this.setState({
      newPasswordConfirmError: error || ""
    });
  };

  private confirmDiscardFormChanges = () => {
    if (!this.props.needsStopHistory) {
      this.props.stopHistory(true);
    }
  };

  private handleSubmit = async () => {
    await this.props.updatePassword({
      email: this.props.email,
      password: this.state.currentPassword,
      new_password: this.state.newPassword,
      com_new_password: this.state.newPasswordConfirm
    });
    if (!this.props.errorType) {
      this.setState({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      });
      this.props.stopHistory(false);
      this.props.onClose();
    }
  };
}

export default PasswordForm;
