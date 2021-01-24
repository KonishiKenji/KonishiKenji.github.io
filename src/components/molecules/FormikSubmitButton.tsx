import * as React from "react";
import { FormikProps } from "formik";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface Props {
  buttonName: string;
  formikProps: FormikProps<any>;
  errorAction?: () => void;
  className?: string;
  disabled?: boolean;
}

const StyledButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none"
  }
})(Button);

class FormikSubmitButton extends React.Component<Props> {
  public render() {
    return (
      <StyledButton
        variant="contained"
        color="secondary"
        disabled={this.props.formikProps.isSubmitting || this.props.disabled}
        onClick={this.handleSubmit}
        className={this.props.className}
      >
        {this.props.buttonName}
      </StyledButton>
    );
  }

  private handleSubmit = async () => {
    // touchedでないフィールドのエラーをsubmitCountを利用して表示するので、結果に関わらずsubmit（エラーならformikが実行を弾く）
    await this.props.formikProps.submitForm();
    const errors = this.props.formikProps.errors;
    if (Object.keys(errors).length !== 0 && this.props.errorAction) {
      this.props.errorAction();
    }
  };
}

export default FormikSubmitButton;
