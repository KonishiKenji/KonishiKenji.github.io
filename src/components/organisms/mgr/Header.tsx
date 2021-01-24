/**
 * ログイン管理画面のヘッダー
 */
import * as React from "react";
import { Link } from "react-router-dom";

import { createStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { default as MenuIcon } from "@material-ui/icons/Menu";

const styles = () =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: 2,
      marginRight: 2
    },
    header: {
      width: "100%"
    },
    link: {
      padding: "8px 0",
      textDecoration: "none",
      color: "#37474f",
      "&:hover": {
        backgroundColor: "#eeeeee"
      }
    },
    text: {
      color: "#37474f"
    }
  });

interface HeaderProps extends WithStyles<typeof styles> {
  toggleDrawer: () => void;
  pageName: string;
  pathList?: { pathName: string; path: string }[];
}

class Header extends React.Component<HeaderProps> {
  public static defaultProps = {
    pageName: ""
  };

  public render() {
    const { classes } = this.props;

    const navList = this.props.pathList
      ? this.props.pathList.map(pathData => {
          return (
            <React.Fragment key={pathData.pathName}>
              <Link className={classes.link} to={pathData.path}>
                {pathData.pathName}
              </Link>
              <span className={classes.text}> ＞ </span>
            </React.Fragment>
          );
        })
      : null;

    return (
      <AppBar position="static" color="inherit" className={classes.header}>
        <Toolbar disableGutters={true} variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={this.props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {navList}
            <span className={classes.text}>{this.props.pageName}</span>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
