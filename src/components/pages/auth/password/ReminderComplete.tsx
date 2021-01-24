import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { RouteComponentProps } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ErrorIcon from "@material-ui/icons/Error";
import ContactPhone from "@material-ui/icons/ContactPhone";
import LinkButton from "@components/atoms/LinkButton";
import AuthTemplate from "@components/templates/AuthTemplate";
import { LOGIN } from "@constants/url";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    paper: {
      margin: "0 auto",
      maxWidth: 640,
      marginTop: 40,
      textAlign: "left"
    },
    header: {
      margin: 0,
      padding: "24px 32px 9px",
      borderBottom: "1px solid #cfd8dc",
      fontSize: 24,
      color: "#37474f"
    },
    section: {
      padding: 32
    },
    mainText: {
      fontSize: 24,
      color: "#37474f"
    },
    subText: {
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "#666666"
    },
    subTextSmall: {
      fontSize: 14,
      lineHeight: 1.43,
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.6)"
    },
    alertIconUpper: {
      marginTop: 3,
      width: 14,
      height: 14,
      color: "#ff5656"
    },
    tel: {
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 0.3,
      color: "#37474f",
      marginTop: 16
    },
    telIcon: {
      marginRight: 8,
      transform: "translateY(15%)"
    },
    supplementWrapper: {
      marginTop: 24,
      marginBottom: 32,
      display: "flex"
    }
  });

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

/**
 * パスワード忘れた 完了
 */
class ReminderComplete extends React.Component<Props> {
  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <h1 className={this.props.classes.header}>
            パスワード再設定メール 送信完了
          </h1>
          <section className={this.props.classes.section}>
            <div className={this.props.classes.subText}>
              パスワード再設定の為のメールが送信されました。
              <br />
              メールに記載の手順に従ってパスワードの再設定をおこなってください。
            </div>
            <div className={this.props.classes.supplementWrapper}>
              <ErrorIcon className={this.props.classes.alertIconUpper} />
              <div className={this.props.classes.subTextSmall}>
                しばらく待ってもパスワード再設定の為のメールが届かない場合は、
                <br />
                下記 電話サポートまでお問い合わせください。
                <div className={this.props.classes.tel}>
                  <ContactPhone className={this.props.classes.telIcon} />
                  080-0080-4593
                </div>
                受付時間：10:00〜17:00（平日　※土日祝・年末年始・弊社休日を除く）
              </div>
            </div>
            <LinkButton to={LOGIN}>ログイン画面に戻る</LinkButton>
          </section>
        </Paper>
      </AuthTemplate>
    );
  }
}

export default withStyles(styles)(ReminderComplete);
