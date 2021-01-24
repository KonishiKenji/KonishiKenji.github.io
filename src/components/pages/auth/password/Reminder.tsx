import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { RouteComponentProps } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AuthTemplate from "@components/templates/AuthTemplate";
import ReminderForm from "@components/organisms/auth/password/ReminderForm";
import ErrorIcon from "@material-ui/icons/Error";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    header: {
      margin: 0,
      padding: "24px 32px 9px",
      borderBottom: "1px solid #cfd8dc",
      fontSize: 24,
      color: "#37474f"
    },
    paper: {
      margin: "0 auto",
      maxWidth: 640,
      marginTop: 40,
      textAlign: "left"
    },
    wrapper: {
      paddingLeft: spacing.unit * 4,
      paddingRight: spacing.unit * 4,
      paddingBottom: spacing.unit * 4
    },
    mainText: {
      fontSize: 24,
      color: "#37474f"
    },
    subText: {
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      marginTop: 32,
      color: "rgba(0, 0, 0, 0.6)"
    },
    subTextSmall: {
      fontSize: 14,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "rgba(0, 0, 0, 0.6)"
    },
    alertIconUpper: {
      width: 14,
      height: 14,
      color: "#ff5656",
      top: 2,
      left: -4,
      position: "relative"
    },
    supplementWrapper: {
      marginTop: 24,
      marginBottom: 32,
      display: "flex"
    }
  });

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

/**
 * パスワード忘れた
 */
class Reminder extends React.Component<Props> {
  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <h1 className={this.props.classes.header}>
            パスワード再設定メールの送信
          </h1>
          <div className={this.props.classes.wrapper}>
            <div className={this.props.classes.mainText} />
            <div className={this.props.classes.subText}>
              パスワード再設定の為のメールを、登録のメールアドレスに送信します。
              <br />
              登録メールアドレスまたはIDを入力ください。
            </div>
            <div className={this.props.classes.subTextSmall}>
              <div className={this.props.classes.supplementWrapper}>
                <ErrorIcon className={this.props.classes.alertIconUpper} />
                <div className={this.props.classes.subTextSmall}>
                  利用者様用タイムカードアカウントのパスワードを忘れた場合は
                  <br />
                  職員様用管理画面アカウントでログインの上
                  <br />
                  アカウント情報ページからパスワードの変更をしてください。
                </div>
              </div>
            </div>
            <ReminderForm history={this.props.history} />
          </div>
        </Paper>
      </AuthTemplate>
    );
  }
}

export default withStyles(styles)(Reminder);
