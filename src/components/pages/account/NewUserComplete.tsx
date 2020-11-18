import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { RouteComponentProps } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import LinkButton from "@components/atoms/LinkButton";
import AuthTemplate from "@components/templates/AuthTemplate";
import { LOGIN } from "@constants/url";
import { getToken } from "@utils/localStorage";

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
    subText: {
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "#666666"
    }
  });

interface DispatchProps {
  logout(): void;
}

type Props = DispatchProps & RouteComponentProps & WithStyles<typeof styles>;

/**
 * アカウント登録 完了
 */
class ReminderComplete extends React.Component<Props> {
  public componentDidMount() {
    // ログインしていた場合強制ログアウト
    if (getToken()) {
      this.props.logout();
    }
  }

  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <h1 className={this.props.classes.header}>新規ユーザ登録 完了</h1>
          <section className={this.props.classes.section}>
            <div className={this.props.classes.subText}>
              ユーザー登録が完了しました。
              <br />
              登録された内容でログインをおこなってください。
            </div>
            <LinkButton to={LOGIN}>ログイン画面に戻る</LinkButton>
          </section>
        </Paper>
      </AuthTemplate>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch } = dispatches;
  return {
    logout: authDispatch(dispatch).logout
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(ReminderComplete)
);
