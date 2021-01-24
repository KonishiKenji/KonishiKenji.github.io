import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "@stores/type";
import AdminTemplate from "@components/templates/AdminTemplate";
import UsersListTemplate from "@components/templates/UsersListTemplate";

import dispatches from "@stores/dispatches";
import { UserState } from "@stores/domain/user/type";
import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";
import ErrorsDialog from "@components/organisms/ErrorsDialog";

interface DispatchProps {
  fetchUser: () => void;
  fetchUsersInFacility: () => void;
  fetchUsersError: () => void;
}

interface State {
  user: UserState;
  facilityUsers: GetFacilityUsersResponse["data"];
}

interface Props extends State, DispatchProps {} // WithStyles<typeof styles>,

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
  // TODO clearメソッド作成の為 後に削除
  private clear = (): void => {
    let test = 0;
    test = test + 1;
  };
}

const mapStateToProps = (state: AppState): State => ({
  user: state.user,
  facilityUsers: state.IAB.userInFacility.users
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userDispatch, IAB, errorsDispatcher } = dispatches;
  const userInFacilityDispatched = IAB.userInFacilityDispatcher(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchUsersInFacility: userInFacilityDispatched.fetch,
    fetchUsersError: errorsDispatcher(dispatch).users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
