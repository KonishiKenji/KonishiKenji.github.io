import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    titleContainer: {
      marginBottom: spacing.unit * 2
    },
    noMarginTitleContainer: {
      marginBottom: 0
    },
    divider: {
      backgroundColor: "rgba(0, 0, 0, 0.54)",
      margin: 0
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      minHeight: 32,
      marginBottom: 1
    }
  });

interface OwnProps {
  label: string;
  subLabel?: string;
  subClassName?: string;
  isTitleNoMargin?: boolean;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const sectionTitle: React.FunctionComponent<Props> = props => (
  <div
    className={
      props.isTitleNoMargin
        ? props.classes.noMarginTitleContainer
        : props.classes.titleContainer
    }
  >
    <Typography
      gutterBottom={true}
      variant="h6"
      color="primary"
      className={props.classes.flex}
    >
      <div>{props.label}</div>
      {props.subClassName && props.subLabel && (
        <div className={props.subClassName}>{props.subLabel}</div>
      )}
    </Typography>
    <Divider variant="middle" className={props.classes.divider} />
  </div>
);

export default withStyles(styles)(sectionTitle);
