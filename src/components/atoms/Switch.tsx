import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Switch from "@material-ui/core/Switch";

const styles = ({ palette, spacing }: Theme) => createStyles({});

interface OwnProps {
  label: string | JSX.Element;
  checked: boolean;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const switchButton: React.FunctionComponent<Props> = props => (
  <FormControlLabel
    control={
      <Switch
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
        color="secondary"
      />
    }
    label={props.label}
  />
);

export default withStyles(styles)(switchButton);
