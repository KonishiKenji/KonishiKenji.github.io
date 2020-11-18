import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import UsageResultList from "@components/organisms/mgr/SHUROTEICHAKU/report/UsageResultList.tsx";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";
import ErrorsDialog from "@components/organisms/ErrorsDialog";
import { AppState } from "@stores/type";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    indicator: {
      display: "none"
    }
  });

interface StateProps {
  facility_name: string;
  business_owner: string;
}

interface DispatchProps {
  handleLogout: () => void;
}

type Props = StateProps &
  DispatchProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

/**
 * 利用実績
 */
const Report: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="利用実績">
      <UsageResultList />
      <ErrorsDialog errorsKey="inout" />
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
)(withStyles(styles)(Report));
