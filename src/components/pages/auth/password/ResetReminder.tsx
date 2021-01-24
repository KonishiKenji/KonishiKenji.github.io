import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import AuthTemplate from "@components/templates/AuthTemplate";
import ResetReminderForm from "@components/organisms/auth/password/ResetReminderForm";

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
      padding: spacing.unit * 4
    },
    supplementText: {
      marginTop: 16,
      padding: "26px 7px",
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.6)",
      backgroundColor: "#fff3d0"
    },
    emphasisText: {
      color: "rgba(0, 0, 0, 0.87)"
    }
  });

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

/**
 * パスワード強制変更
 */
class ResetReminder extends React.Component<Props> {
  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <h1 className={this.props.classes.header}>パスワード変更のお願い</h1>
          <div className={this.props.classes.wrapper}>
            <div className={this.props.classes.supplementText}>
              セキュリティ向上のため、皆様にパスワードの変更をお願いしています。
              <br />
              <span className={this.props.classes.emphasisText}>
                半角英字・数字・記号を組み合わせた８文字以上
              </span>
              で設定してください。
              <br />
              また、ログインIDやメールアドレスと同じ文字列は使用できません。
            </div>
            <ResetReminderForm history={this.props.history} />
          </div>
        </Paper>
      </AuthTemplate>
    );
  }
}

export default withStyles(styles)(ResetReminder);
