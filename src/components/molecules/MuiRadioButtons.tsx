import * as React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@components/molecules/FormLabel";
import { FieldItem } from "@interfaces/ui/form";

interface OwnProps {
  label: string;
  disabled?: boolean;
  options?: FieldItem[];
  tooltip?: React.ReactElement<any>;
}

export type MuiRadioButtonsProps = OwnProps & RadioGroupProps;

// ラジオボタン
const labelStyles = () =>
  createStyles({
    root: {
      padding: 4,
      margin: "0 8px"
    }
  });
const StyledRadio = withStyles(labelStyles)(Radio);

// ラジオボタンのラッパー
const radioGroupStyles = () =>
  createStyles({
    root: {
      margin: "12px 0 28px 16px"
    }
  });
const StyledRadioGroup = withStyles(radioGroupStyles)(RadioGroup);

const MuiCheckbox: React.FunctionComponent<MuiRadioButtonsProps> = ({
  label,
  options,
  tooltip,
  style,
  ...props
}) => (
  <FormControl>
    <FormLabel label={label}>{tooltip}</FormLabel>
    <StyledRadioGroup {...props} style={style}>
      {options &&
        options.map((option, index) => (
          <FormControlLabel
            control={<StyledRadio />}
            key={`${props.name}-${index}`}
            value={`${option.value}`}
            label={option.label}
            disabled={props.disabled || option.disabled}
          />
        ))}
    </StyledRadioGroup>
  </FormControl>
);

export default MuiCheckbox;
