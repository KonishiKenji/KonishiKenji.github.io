import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "@stores/type";
import AdminTemplate from "@components/templates/AdminTemplate";
import UsersListTemplate from "@components/templates/UsersListTemplate";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import dispatches from "@stores/dispatches";
import { UserState } from "@stores/domain/user/type";
import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";
import ErrorsDialog from "@components/organisms/ErrorsDialog";

const styles = ({ spacing }: Theme) =>
  createStyles({
    contaner: {
      padding: spacing.unit * 2
    },
    newButtonLink: {
      textDecoration: "none",
      marginLeft: "auto"
    },
    newButton: {
      boxShadow: "none",
      borderRadius: 4,
      width: 120
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between"
    },
    countText: {
      fontSize: 12
    },
    paperContainer: {
      padding: `${spacing.unit * 2}px ${spacing.unit * 4}px`,
      margin: spacing.unit * 2
    }
  });

interface DispatchProps {
  fetchUser: () => void;
  fetchUsersInFacility: () => void;
  fetchUsersError: () => void;
}

interface State {
  user: UserState;
  facilityUsers: GetFacilityUsersResponse["data"];
}

interface Props extends WithStyles<typeof styles>, State, DispatchProps {}

/**
 * 利用者情報
 */
class UsersList extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.user.name) this.props.fetchUser();
    this.props.fetchUsersInFacility();
    this.props.fetchUsersError();
  }

  public render() {
    return (
      <AdminTemplate pageName="利用者情報">
        <UsersListTemplate
          user={this.props.user}
          facilityUsers={this.props.facilityUsers}
          clearForm={this.clear}
        />
        <ErrorsDialog errorsKey="users" />
      </AdminTemplate>
    );
  }
  // TODO 共通部分にclearメソッドが存在するため、仮で実装。共通側が変更された場合に対応。
  private clear = (): void => {
    let test = 0;
    test = test + 1;
  };
}

const mapStateToProps = (state: AppState): State => ({
  user: state.user,
  facilityUsers: state.SHUROTEICHAKU.userInFacility.users
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userDispatch, SHUROTEICHAKU, errorsDispatcher } = dispatches;
  const userInFacilityDispatched = SHUROTEICHAKU.userInFacilityDispatcher(
    dispatch
  );

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchUsersInFacility: userInFacilityDispatched.fetch,
    fetchUsersError: errorsDispatcher(dispatch).users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsersList));
