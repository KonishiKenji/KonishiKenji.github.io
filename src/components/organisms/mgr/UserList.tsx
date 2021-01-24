import * as React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ErrorIcon from "@material-ui/icons/Error";

import { ErrorsState } from "@stores/domain/errors/types";

import ListItem from "@components/molecules/ListItem";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    headerText: {
      color: palette.common.white
    },
    row: {
      textDecoration: "none"
    },
    subtext: {
      color: "#666666",
      fontSize: 14
    },
    expiredUser: {
      color: "#666666"
    },
    alertIconUpper: {
      width: 15,
      height: 15,
      color: "#ff5656",
      position: "absolute",
      top: 11,
      left: 16
    },
    userIcon: {
      color: "#90a4ae"
    },
    list: {
      paddingTop: 0
    },
    subtextDiv: {
      paddingRight: 0
    }
  });

interface UserParam {
  id: number;
  text: string;
  subtext?: string;
}

interface Props extends WithStyles<typeof styles> {
  users: UserParam[];
  userError: ErrorsState["users"];
}

const userList: React.FunctionComponent<Props> = ({
  users = [],
  userError,
  classes
}) => {
  /**
   * 表示するユーザーのIDがエラーリストに存在するかのチェックを行う
   *
   * @param id 対象のユーザーID
   * @param errors エラー情報
   */
  const isUserError = (id: number, errors: ErrorsState["users"]) => {
    if (!errors) {
      return false;
    }

    if (!errors.hasError) {
      return false;
    }

    return errors.data.filter(data => {
      return data.errors.filter(error => {
        return Number(error.relation.value) === id;
      }).length;
    }).length;
  };

  return (
    <List className={classes.list}>
      {users.length > 0 &&
        users.map(user => (
          <Link to={`users/${user.id}`} key={user.id} className={classes.row}>
            <ListItem id={user.id} theme="userList">
              {user.subtext ? (
                <AccountCircleOutlined className={classes.userIcon} />
              ) : (
                <AccountCircle className={classes.userIcon} />
              )}
              {!!isUserError(user.id, userError) && (
                <ErrorIcon className={classes.alertIconUpper} />
              )}
              {user.subtext ? (
                <ListItemText
                  primary={user.text}
                  classes={{ primary: classes.expiredUser }}
                />
              ) : (
                <ListItemText primary={user.text} />
              )}
              {!!user.subtext && (
                <ListItemSecondaryAction className={classes.subtextDiv}>
                  <ListItemText
                    primary={user.subtext}
                    classes={{
                      primary: classes.subtext,
                      root: classes.subtextDiv
                    }}
                  />
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </Link>
        ))}
    </List>
  );
};

export default withStyles(styles)(userList);
