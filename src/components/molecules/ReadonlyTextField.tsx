import * as React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const styles = (): StyleRules =>
  createStyles({
    focused: {},
    disabled: {},
    error: {},
    underline: {
      "&:before": {
        borderBottomStyle: "dotted"
      },
      "&:after": {
        content: "none"
      },
      "&:hover:not($disabled):not($focused):not($error):before": {
        borderBottom: "dotted 1px"
      }
    }
  });

interface OwnProps {
  value: string;
  defaultValue: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * InputFieldとほぼ同じ見た目で表示だけ行うのが目的
 */
const ReadonlyTextField = (props: Props): JSX.Element => (
  <FormControl fullWidth>
    {props.label && <InputLabel shrink>{props.label}</InputLabel>}
    <Input
      classes={{
        underline: props.classes.underline
      }}
      value={props.value || props.defaultValue}
      readOnly
      placeholder={props.placeholder}
      multiline={props.multiline || false}
      rows={props.rows}
      rowsMax={props.rowsMax}
    />
  </FormControl>
);

export default withStyles(styles)(ReadonlyTextField);
