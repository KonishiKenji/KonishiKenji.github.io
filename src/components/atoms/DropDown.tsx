import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import { InputProps as StandardInputProps } from "@material-ui/core/Input";
import { InputLabelProps } from "@material-ui/core/InputLabel";
import { INPUT_LABEL_COLOR } from "@constants/styles";

import { textFieldStyle } from "@styles/base";

import * as ClassNames from "classnames";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    ...textFieldStyle,
    dropDown: {
      marginTop: spacing.unit * 2,
      marginRight: spacing.unit * 2,
      marginBottom: spacing.unit * 2
    },
    menu: {
      minWidth: 300
    },
    label: {
      color: INPUT_LABEL_COLOR
    },
    disableIcon: {
      display: "none"
    },
    enableIcon: {},
    hiddenItem: {
      display: "none"
    }
  });

export interface OptionInterface {
  label: string;
  value: string | number;
}

interface OwnProps {
  id: string;
  label?: string;
  helperText?: string;
  isError?: boolean;
  size?:
    | "textFieldSuperSmall"
    | "textFieldSmall"
    | "textFieldMedium"
    | "textFieldLong"
    | "textFieldSuperLong"
    | "textFieldFullSize";
  options?: OptionInterface[];
  isRequired?: boolean;
  isDisabled?: boolean;
  value: string;
  names?: OptionInterface[];
  styles?: string;
  InputProps?: Partial<StandardInputProps>;
  InputLabelProps?: Partial<InputLabelProps>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const dropDown: React.FunctionComponent<Props> = props => {
  const targetInputLabelProps = props.InputLabelProps || {
    FormLabelClasses: { root: props.classes.label }
  };
  let hiddenOption = { id: "", name: "" };

  if (
    !!props.options &&
    !!props.names &&
    props.options.findIndex(item => item.value === props.value) === -1
  ) {
    const setName = props.names.find(item => item.value === props.value);
    hiddenOption = {
      id: props.value,
      name: !!setName ? setName.label : ""
    };
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      helperText={props.helperText}
      SelectProps={{
        MenuProps: {
          className: props.classes.menu
        },
        classes: {
          icon: props.isDisabled
            ? props.classes.disableIcon
            : props.classes.enableIcon
        }
      }}
      error={props.isError}
      className={ClassNames(
        props.classes.dropDown,
        props.classes[`${props.size}`],
        props.styles
      )}
      margin="normal"
      select={true}
      required={props.isRequired}
      disabled={props.isDisabled}
      value={props.value}
      onChange={props.onChange}
      InputProps={props.InputProps}
      InputLabelProps={targetInputLabelProps}
      onBlur={props.onBlur}
    >
      {props.options &&
        props.options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      {/* セレクトボックスの項目的に表示はしたくないが、元の値で使っていた値をセレクトボックスに表示したいため、
          display:noneにした状態でメニューに追加する */}
      {hiddenOption.id !== "" && (
        <MenuItem
          key={hiddenOption.id}
          value={hiddenOption.id}
          className={props.classes.hiddenItem}
        >
          {hiddenOption.name}
        </MenuItem>
      )}
    </TextField>
  );
};

dropDown.defaultProps = {
  label: "",
  helperText: "",
  isError: false,
  size: "textFieldMedium",
  value: ""
};

export default withStyles(styles)(dropDown);
