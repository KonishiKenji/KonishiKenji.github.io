import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import blueGrey from "@material-ui/core/colors/blueGrey";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    header: {
      backgroundColor: blueGrey[300],
      color: palette.common.white
    },
    userList: {
      color: palette.primary.main,
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: "16px",
      paddingBottom: "16px"
    }
  });

interface ListProps {
  id: number;
  theme?: string;
  button?: boolean;
}

interface Props extends WithStyles<typeof styles>, ListProps {}

const listItem: React.FunctionComponent<Props> = ({
  children,
  classes,
  theme = "userList",
  button = true
}) => {
  return (
    <ListItem className={`${classes[theme]}`} button={button}>
      {children}
    </ListItem>
  );
};

export default withStyles(styles)(listItem);
