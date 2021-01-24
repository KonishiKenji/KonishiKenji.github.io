import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";

import { INPUT_LABEL_COLOR } from "@constants/styles";

import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { textFieldStyle } from "@styles/base";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    ...textFieldStyle,
    root: {
      display: "flex"
    },
    formControl: {
      marginTop: spacing.unit * 2,
      marginBottom: spacing.unit * 2
    },
    group: {
      marginTop: 12,
      marginRight: spacing.unit * 2,
      marginLeft: 26
    },
    label: {
      fontSize: 14,
      color: INPUT_LABEL_COLOR
    },
    radioButton: {
      padding: 4,
      marginRight: 8
    },
    itemWrapper: {
      display: "flex",
      alignItems: "center"
    },
    helpMark: {
      marginLeft: `${spacing.unit * 2}px`
    }
  });

export interface RadioItemInterface {
  label: string;
  value: string;
}

interface OwnProps {
  name: string;
  label?: string | JSX.Element;
  radioItems?: RadioItemInterface[];
  value: string;
  inputStyle?: object;
  helperItemTip?: object;
  onChange: (event: React.ChangeEvent<{}>, value: string) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const radioButtons: React.FunctionComponent<Props> = props => (
  <FormControl component="div" className={props.classes.formControl}>
    <FormLabel component="label" className={props.classes.label}>
      {props.label}
    </FormLabel>
    <RadioGroup
      name={props.name}
      className={props.classes.group}
      value={props.value}
      onChange={props.onChange}
    >
      {props.radioItems &&
        props.radioItems.map((item, index) => (
          <FormControlLabel
            key={`radio_${props.name}_${index}`}
            value={item.value}
            control={
              <Radio className={props.classes.radioButton} color="secondary" />
            }
            label={
              item.label ? (
                <div className={props.classes.itemWrapper}>
                  {item.label}
                  {props.helperItemTip && item.value in props.helperItemTip && (
                    <span className={props.classes.helpMark}>
                      <HelpToolTip
                        title={
                          <HelpTipMessages
                            name={props.helperItemTip[item.value]}
                          />
                        }
                      />
                    </span>
                  )}
                </div>
              ) : (
                ""
              )
            }
            labelPlacement="end"
          />
        ))}
    </RadioGroup>
  </FormControl>
);

radioButtons.defaultProps = {
  label: "",
  value: ""
};

export default withStyles(styles)(radioButtons);
