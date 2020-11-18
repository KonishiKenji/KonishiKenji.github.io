import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AuthTemplate from "@components/templates/AuthTemplate";
import AccountMail from "@components/organisms/account/AccountMail";
import AccountAdminPassword from "@components/organisms/account/AccountAdminPassword";
import AccountUserPassword from "@components/organisms/account/AccountTimeCardPassword";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    header: {
      margin: 0,
      padding: "24px 32px 9px",
      borderBottom: "1px solid #cfd8dc",
      fontSize: 24,
      color: "#37474f"
    },
    footer: {
      padding: "24px 32px 32px",
      borderTop: "1px solid #cfd8dc"
    },
    section: {
      padding: 32
    },
    title: {
      margin: "0 0 32px 0",
      paddingBottom: 7,
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      fontSize: 20,
      color: "#37474f",
      fontWeight: "bold"
    },
    button: {
      fontWeight: "bold",
      border: "solid 1px rgba(0, 0, 0, 0.12)"
    }
  });

interface DispatchProps {
  getTargetFacilityUser: () => void;
}
type Props = DispatchProps & RouteComponentProps & WithStyles<typeof styles>;

/**
 * アカウント情報の管理
 */
class Account extends React.Component<Props> {
  public componentDidMount() {
    this.props.getTargetFacilityUser();
  }

  public render() {
    const { classes } = this.props;
    return (
      <AuthTemplate>
        <Paper>
          <h1 className={classes.header}>アカウント情報</h1>
          <section className={classes.section}>
            <h2 className={classes.title}>メールアドレス</h2>
            <AccountMail />
          </section>
          <section className={classes.section}>
            <h2 className={classes.title}>管理者用管理画面パスワード</h2>
            <AccountAdminPassword />
          </section>
          <section className={classes.section}>
            <h2 className={classes.title}>利用者様用タイムカードパスワード</h2>
            <AccountUserPassword />
          </section>
          <div className={classes.footer}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={this.props.history.goBack}
            >
              管理画面に戻る
            </Button>
          </div>
        </Paper>
        <NavigationTransitionPrompt />
      </AuthTemplate>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { accountDispatch } = dispatches;
  const accountDispatches = accountDispatch(dispatch);
  return {
    getTargetFacilityUser: () => accountDispatches.getTargetFacilityUser()
  };
};

export default withStyles(styles)(
  connect<void, DispatchProps>(
    null,
    mapDispatchToProps
  )(Account)
);
