import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { textFieldStyle } from "@styles/base";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    ...textFieldStyle,
    root: {
      display: "flex"
    }
  });

interface OwnProps {
  label: string | JSX.Element;
  value: string;
  checked: boolean;
  inputStyle?: object;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const checkbox: React.FunctionComponent<Props> = props => (
  <FormControlLabel
    control={
      <Checkbox
        value={props.value}
        checked={props.checked}
        color="secondary"
        onChange={props.onChange}
        style={props.inputStyle || {}}
      />
    }
    label={props.label}
  />
);

export default withStyles(styles)(checkbox);
