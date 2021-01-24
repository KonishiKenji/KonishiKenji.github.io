import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import { INPUT_LABEL_COLOR } from "@constants/styles";

import { textFieldStyle } from "@styles/base";

import * as ClassNames from "classnames";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    ...textFieldStyle,
    textField: {
      marginTop: spacing.unit * 2,
      marginRight: spacing.unit * 2,
      marginBottom: spacing.unit * 2
    },
    label: {
      color: INPUT_LABEL_COLOR
    }
  });

interface OwnProps {
  id: string;
  value: string | number;
  label?: string;
  placeholder?: string;
  helperText?: string;
  startAdornmentLabel?: string;
  endAdornmentLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isMultiLine?: boolean;
  size?:
    | "textFieldSuperSmall"
    | "textFieldSmall"
    | "textFieldMedium"
    | "textFieldLong"
    | "textFieldHalfSuperLong"
    | "textFieldSuperLong"
    | "textFieldFullSize";
  type?: "text" | "password" | "number" | "tel" | "email" | "date";
  minLength?: number;
  maxLength?: number;
  inputStyle?: object;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class TextFieldComponent extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      return true;
    }
    if (this.props.helperText !== nextProps.helperText) {
      return true;
    }
    return false;
  }

  public render() {
    return (
      <TextField
        id={this.props.id}
        value={this.props.value || ""}
        label={this.props.label || ""}
        placeholder={this.props.placeholder || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {this.props.startAdornmentLabel || ""}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {this.props.endAdornmentLabel || ""}
            </InputAdornment>
          )
        }}
        required={this.props.isRequired || false}
        disabled={this.props.isDisabled || false}
        className={ClassNames(
          this.props.classes.textField,
          this.props.classes[`${this.props.size || "textFieldMedium"}`]
        )}
        type={this.props.type || "text"}
        inputProps={{
          minLength: this.props.minLength,
          maxLength: this.props.maxLength
        }}
        multiline={this.props.isMultiLine || false}
        InputLabelProps={{
          shrink: true,
          FormLabelClasses: { root: this.props.classes.label }
        }}
        helperText={this.props.helperText || ""}
        error={this.props.isError || false}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        style={this.props.inputStyle || {}}
      />
    );
  }
}

export default withStyles(styles)(TextFieldComponent);
