import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { RouteComponentProps } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AuthTemplate from "@components/templates/AuthTemplate";
import ResetForm from "@components/organisms/auth/password/ResetForm";

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
    emphasisText: {
      color: "rgba(0, 0, 0, 0.87)"
    }
  });

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

/**
 * パスワード再設定
 */
class Reset extends React.Component<Props> {
  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <h1 className={this.props.classes.header}>パスワードの変更</h1>
          <div className={this.props.classes.wrapper}>
            <div className={this.props.classes.subText}>
              <span className={this.props.classes.emphasisText}>
                半角英字・数字・記号 の組み合わせで８文字以上で
              </span>
              <br />
              新しいパスワードを設定してください。
            </div>
            <ResetForm history={this.props.history} />
          </div>
        </Paper>
      </AuthTemplate>
    );
  }
}

export default withStyles(styles)(Reset);
