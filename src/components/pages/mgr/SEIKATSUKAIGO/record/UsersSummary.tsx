import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UsersInFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/types";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";

import { ErrorsState } from "@stores/domain/errors/types";
import RecordBatchPrinting from "@components/organisms/mgr/common/record/RecordBatchPrinting";
import RecordEachUser from "@components/organisms/mgr/common/record/RecordEachUser";

interface StateProps {
  users: UsersInFacilityState["users"];
  errorState: ErrorsState["records"]["data"];
}
interface DispatchProps {
  fetchUsers: () => void;
  fetchErrors: () => void;
}

type Props = StateProps & RouteComponentProps & DispatchProps;

/**
 * 利用者サマリ
 */
const RecordUsersSummary = (props: Props) => {
  React.useEffect(() => {
    props.fetchUsers();
    props.fetchErrors();
  }, []);

  return (
    <AdminTemplate pageName="利用者ごと">
      {/* 記録の一括印刷 */}
      <RecordBatchPrinting history={props.history} />
      {/* 利用ごとの記録 */}
      <RecordEachUser users={props.users} errorState={props.errorState} />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  users: state.SEIKATSUKAIGO.userInFacility.users,
  errorState: state.errors.records.data
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { SEIKATSUKAIGO, errorsDispatcher } = dispatches;
  const userInFacilityDispatcher = SEIKATSUKAIGO.userInFacilityDispatcher(
    dispatch
  );
  const errorsDispatches = errorsDispatcher(dispatch);
  return {
    fetchUsers: () => userInFacilityDispatcher.fetch(),
    fetchErrors: () => {
      errorsDispatches.records();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordUsersSummary);
