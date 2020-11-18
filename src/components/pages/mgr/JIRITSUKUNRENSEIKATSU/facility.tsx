import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import AdminTemplate from "@components/templates/AdminTemplate";
import FacilityForm from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/Facility/FacilityForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import { AppState } from "@stores/type";

interface StateProps {
  facility_name: string;
  business_owner: string;
}

interface DispatchProps {
  handleLogout: () => void;
}

type Props = StateProps & DispatchProps;

/**
 * 事業所情報
 */
const Facility: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="事業所情報">
      <FacilityForm />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    facility_name: state.user.facility_name,
    business_owner: state.user.business_owner
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch } = dispatches;
  return {
    handleLogout: authDispatch(dispatch).logout
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facility);
