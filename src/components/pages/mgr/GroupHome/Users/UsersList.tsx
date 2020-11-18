import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";
import AdminTemplate from "@components/templates/AdminTemplate";
import UsersListTemplate from "@components/templates/UsersListTemplate";
import ErrorsDialog from "@components/organisms/ErrorsDialog";

interface DispatchProps {
  fetchUser: () => void;
  fetchUsersInFacility: () => void;
  fetchUsersError: () => void;
  clear: () => void;
}

interface StateProps {
  user: UserState;
  facilityUsers: GetFacilityUsersResponse["data"];
}

type Props = StateProps & DispatchProps;

/**
 * 利用者情報
 */
class UsersList extends React.Component<Props> {
  public componentWillMount() {
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
          clearForm={this.props.clear}
        />
        <ErrorsDialog errorsKey="users" />
      </AdminTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user,
  facilityUsers: state.GroupHome.userInFacility.users
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userDispatch, GroupHome, errorsDispatcher } = dispatches;
  const userInFacilityDispatcher = GroupHome.userInFacilityDispatcher(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchUsersInFacility: userInFacilityDispatcher.fetch,
    clear: userInFacilityDispatcher.clear,
    fetchUsersError: errorsDispatcher(dispatch).users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
