import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import FieldWrapper, { FieldSizeName } from "@components/atoms/FieldWrapper";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";

const styles = (): StyleRules =>
  createStyles({
    inputMultiline: {
      overflow: "hidden"
    },
    endAdornmentLabel: {
      whiteSpace: "nowrap"
    }
  });

interface OwnProps {
  type?: "text" | "password" | "number" | "tel" | "email" | "date";
  minLength?: number;
  maxLength?: number;
  startAdornmentLabel?: string;
  endAdornmentLabel?: string;
  size?: FieldSizeName;
  multiline?: boolean;
  rows?: string;
  inputProps?: never;
  InputProps?: never;
  label?: string; // ReactNodeを渡すとバグがあるのでしばらくstring固定
  helperText?: string; // 理由は上と同じで発生したことはまだないが塞いでおく
}

type Props = OwnProps & WithStyles<typeof styles> & TextFieldProps;

// 提供する型はWithStylesは除外しておく
export type MuiTextFieldProps = OwnProps & TextFieldProps;

const MuiTextField: React.FC<Props> = ({
  minLength,
  maxLength,
  startAdornmentLabel,
  endAdornmentLabel,
  size,
  multiline,
  rows,
  classes,
  style,
  ...props
}) => {
  const startAdornment = startAdornmentLabel ? (
    <InputAdornment position="start">{startAdornmentLabel}</InputAdornment>
  ) : null;
  const endAdornment = endAdornmentLabel ? (
    <InputAdornment
      position="end"
      classes={{ root: classes.endAdornmentLabel }}
    >
      {endAdornmentLabel}
    </InputAdornment>
  ) : null;

  return (
    <FieldWrapper size={size} style={style}>
      <TextField
        {...props}
        inputProps={{
          minLength,
          maxLength
        }}
        /* inputPropsとInputPropsは別のpropsだが誤認されている */
        /* eslint-disable-next-line react/jsx-no-duplicate-props */
        InputProps={{
          startAdornment,
          endAdornment,
          classes: { inputMultiline: classes.inputMultiline }
        }}
        multiline={multiline || false}
        rows={rows}
      />
    </FieldWrapper>
  );
};

MuiTextField.defaultProps = {
  fullWidth: true,
  InputLabelProps: {
    shrink: true
  }
};

export default withStyles(styles)(MuiTextField);
