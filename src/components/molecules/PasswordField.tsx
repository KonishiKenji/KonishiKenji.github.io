import * as React from "react";
import validator from "@validator";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import MuiTextField from "@components/molecules/MuiTextField";

const styles = ({ spacing }: Theme) => createStyles({});

interface OwnProps {
  passwordName: string;
  errorMessage?: string;
  placeholder?: string;
  confirmPlaceholder?: string;
  onChange: (password: string) => void;
}

interface State {
  password: string;
  passwordConfirm: string;
  passwordError: string;
  passwordConfirmError: string;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class PasswordField extends React.Component<Props, State> {
  public state = {
    password: "",
    passwordConfirm: "",
    passwordError: "",
    passwordConfirmError: ""
  };
  public render() {
    const viewPasswordErrorMessage =
      this.props.errorMessage || this.state.passwordError;
    return (
      <>
        <MuiTextField
          label={this.props.passwordName}
          placeholder={this.props.placeholder || "パスワード"}
          type="password"
          autoComplete="new-password"
          required={true}
          onChange={this.handleChangePassword}
          error={Boolean(viewPasswordErrorMessage.length)}
          helperText={
            viewPasswordErrorMessage ||
            "半角英字・数字・記号の組み合わせで8文字以上"
          }
          maxLength={100}
          size="long"
        />
        <MuiTextField
          label={`${this.props.passwordName}（確認）`}
          placeholder={this.props.confirmPlaceholder || "パスワード"}
          type="password"
          autoComplete="new-password"
          required={true}
          onChange={this.handleChangePasswordConfirm}
          error={Boolean(this.state.passwordConfirmError.length)}
          helperText={
            this.state.passwordConfirmError || "新しいパスワードをもう一度入力"
          }
          maxLength={100}
          size="long"
        />
      </>
    );
  }
  private handleChangePassword = (event: React.ChangeEvent<any>) => {
    const value = event.currentTarget.value;
    this.setPassword(value, this.state.passwordConfirm);
  };
  private handleChangePasswordConfirm = (event: React.ChangeEvent<any>) => {
    const value = event.currentTarget.value;
    this.setPassword(this.state.password, value);
  };

  private setPassword = (password: string, passwordConfirm: string) => {
    const error = validator(password, "password");
    const confirmError = validator(passwordConfirm, {
      type: "passwordMatch",
      value: password
    });
    this.setState({
      password,
      passwordConfirm,
      passwordError: error || "",
      passwordConfirmError: confirmError || ""
    });
    if (!error && !confirmError) {
      this.props.onChange(password);
    } else {
      this.props.onChange("");
    }
  };
}
export default withStyles(styles)(PasswordField);
