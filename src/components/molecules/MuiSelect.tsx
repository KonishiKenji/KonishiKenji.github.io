import * as React from "react";
import Select, { SelectProps } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FieldWrapper, { FieldSizeName } from "@components/atoms/FieldWrapper";
import { FieldItem } from "@interfaces/ui/form";

interface OwnProps {
  name: string;
  label: string;
  options?: FieldItem[];
  helperText?: string;
  emptyText?: string;
  shrink?: boolean;
  size?: FieldSizeName;
  tooltip?: React.ReactElement<any>;
  FormLabelClasses?: InputLabelProps["FormLabelClasses"];
  isSelectablePlaceholder?: boolean; // true：編集モード時にplaceholderを選択できるようにする
}

export type MuiSelectProps = OwnProps & SelectProps;

const MuiSelect: React.FunctionComponent<MuiSelectProps> = ({
  label,
  options,
  helperText,
  emptyText,
  shrink,
  id,
  error,
  fullWidth,
  size,
  style,
  FormLabelClasses,
  placeholder,
  isSelectablePlaceholder,
  tooltip,
  ...props
}) => {
  // optionsの値が何もない
  const isItemEmpty = !options || options.length === 0;
  let text = helperText;
  if (isItemEmpty && emptyText) {
    text = emptyText;
  }

  return (
    <FieldWrapper size={size} style={style}>
      <FormControl
        required={props.required}
        error={error}
        fullWidth={fullWidth}
        disabled={isItemEmpty}
      >
        <InputLabel
          htmlFor={id || props.name}
          shrink={shrink}
          style={{
            visibility: !shrink && !!props.value ? "hidden" : "visible"
          }}
          classes={FormLabelClasses}
        >
          {label}
        </InputLabel>
        {tooltip}
        <Select
          id={id || props.name}
          displayEmpty={isSelectablePlaceholder || false}
          {...props}
        >
          {placeholder && isSelectablePlaceholder && (
            <MenuItem value="">{placeholder}</MenuItem>
          )}
          {options &&
            options.map((option) => (
              <MenuItem
                key={`${props.name}-${option.label}`}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
        </Select>
        {text && <FormHelperText>{text}</FormHelperText>}
      </FormControl>
    </FieldWrapper>
  );
};

MuiSelect.defaultProps = {
  fullWidth: true,
  shrink: true
};

export default MuiSelect;
