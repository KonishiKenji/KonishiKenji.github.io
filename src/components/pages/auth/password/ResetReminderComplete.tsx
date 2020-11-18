import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import dispatches from "@stores/dispatches";
import { AuthState } from "@stores/auth/type";
import { UserState } from "@stores/domain/user/type";
import AuthTemplate from "@components/templates/AuthTemplate";
import { FacilityType } from "@constants/variables";
import { BASE_OLD_VERSION_URL } from "@config";

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
    subText: {
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "rgba(0, 0, 0, 0.6)"
    },
    link: {
      width: 320,
      display: "block",
      fontSize: 14,
      margin: "64px auto 8px"
    },
    button: {
      width: "100%"
    }
  });

interface DispatchProps {
  fetchMe: () => Promise<void>;
}

interface StateProps {
  auth: AuthState;
  user: UserState;
}

type Props = DispatchProps &
  StateProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

/**
 * パスワード強制変更 完了
 */
class ResetReminderComplete extends React.Component<Props> {
  public async componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      await this.props.fetchMe();
    }
  }

  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <h1 className={this.props.classes.header}>パスワード変更 完了</h1>
          <div className={this.props.classes.wrapper}>
            <div className={this.props.classes.subText}>
              パスワードが変更されました。ご協力ありがとうございました。
            </div>
            <div className={this.props.classes.link}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth={true}
                onClick={this.handleOnClick}
              >
                OK
              </Button>
            </div>
          </div>
        </Paper>
      </AuthTemplate>
    );
  }

  private handleOnClick = () => {
    // facility_typeとroleで遷移先が違う
    if (this.props.auth.isLoggedIn) {
      const { isAdmin, isSupport } = this.props.auth;
      const { facility_type } = this.props.user;
      if (facility_type === FacilityType.GROUP_HOME) {
        this.props.history.push("/report/daily");
      } else if (
        (!isAdmin && !isSupport) ||
        facility_type === FacilityType.A ||
        facility_type === FacilityType.B ||
        facility_type === FacilityType.IKOU
      ) {
        this.redirectVersion1();
      } else {
        // 想定されていないFacility User
        this.props.history.push("/login");
      }
    } else {
      this.props.history.push("/login");
    }
  };

  /**
   * @see src/app/Routes/AuthRoutes.tsx
   */
  private redirectVersion1 = () => {
    // v1の永続化情報があると正常に動かないので予め消す
    window.localStorage.removeItem("persist:auth");
    location.href = `${BASE_OLD_VERSION_URL}/login`;
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { userDispatch } = dispatches;
  const userDispatches = userDispatch(dispatch);

  return {
    fetchMe: userDispatches.me
  };
};

const mapStateToProps = (state: any): StateProps => ({
  auth: state.auth,
  user: state.user
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetReminderComplete));
