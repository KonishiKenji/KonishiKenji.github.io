import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { dateToLocalisedString } from "@utils/date";
import * as ClassNames from "classnames";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    saturday: {
      color: "#06a6e9"
    },
    holiday: {
      color: "#ff5656"
    },
    default: {}
  });

interface OwnProps {
  date: string;
  dateFormat: string;
  holiday: boolean;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const CustomDateformat: React.FunctionComponent<Props> = props => {
  let targetStyle = props.classes.default;
  const week = dateToLocalisedString(props.date, "d");
  if (week === "0" || props.holiday) {
    targetStyle = props.classes.holiday;
  } else if (week === "6") {
    targetStyle = props.classes.saturday;
  }
  return (
    <span className={ClassNames(targetStyle)}>
      {dateToLocalisedString(props.date, props.dateFormat)}
    </span>
  );
};

export default withStyles(styles)(CustomDateformat);
