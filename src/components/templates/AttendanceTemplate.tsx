import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import AttendanceHeader from "@components/organisms/attendance/AttendanceHeader";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      paddingBottom: spacing.unit * 5,
      fontFamily:
        "'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', Meiryo, メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif"
    },
    children: {
      maxWidth: "90%",
      marginLeft: 32
    }
  });

interface OwnProps {
  userName: string;
  handleLogout: () => void;
}

interface Props extends OwnProps, WithStyles<typeof styles> {}

const AttendanceTemplate: React.FunctionComponent<Props> = (props) => (
  <div className={props.classes.root}>
    <AttendanceHeader
      userName={props.userName}
      handleLogout={props.handleLogout}
    />
    <div className={props.classes.children}>{props.children}</div>
  </div>
);

export default withStyles(styles)(AttendanceTemplate);
