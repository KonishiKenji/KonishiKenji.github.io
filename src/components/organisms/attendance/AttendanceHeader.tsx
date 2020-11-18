import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import AppBar from "@material-ui/core/AppBar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import attendance_logo_svg from "@images/attendance_logo.svg";
import SimpleMenu from "@components/atoms/SimpleMenu";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
      backgroundColor: "#50aab4",
      position: "sticky",
      top: 0,
      minHeight: 56,
      paddingTop: 12,
      paddingBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      color: "#fff"
    },
    logoWrapper: {
      display: "flex"
    },
    logoText: {
      fontSize: 20,
      marginTop: 12,
      marginLeft: 8,
      minWidth: 100
    },
    logo: {
      marginLeft: 25,
      width: 114,
      height: 44
    },
    accountWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 6,
      minWidth: 120
    },
    accountIcon: {
      marginRight: 8,
      marginTop: 6
    }
  });

interface OwnProps {
  userName: string;
  handleLogout: () => void;
}

interface Props extends OwnProps, WithStyles<typeof styles> {}

const contactHeader: React.FunctionComponent<Props> = props => {
  return (
    <AppBar position="static" color="inherit" className={props.classes.root}>
      <div className={props.classes.logoWrapper}>
        <img
          src={attendance_logo_svg}
          alt="https://knowbe.jp/"
          className={props.classes.logo}
        />
        <div className={props.classes.logoText}>勤怠管理</div>
      </div>
      <div className={props.classes.accountWrapper}>
        <AccountCircle className={props.classes.accountIcon} />
        <SimpleMenu
          label={props.userName}
          menuLabel="ログアウト"
          menuSelect={props.handleLogout}
        />
      </div>
    </AppBar>
  );
};

export default withStyles(styles)(contactHeader);
