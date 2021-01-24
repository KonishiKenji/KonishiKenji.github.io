import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import InOutReportUser from "@components/organisms/mgr/SEIKATSUKAIGO/report/InOutReportUser";
import KnowbeTabs from "@components/molecules/Tabs";
import {
  SEIKATSUKAIGOReportTabInfo,
  SEIKATSUKAIGO_REPORT_TABS_INFO
} from "@constants/variables";
import * as URL from "@constants/url";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";
import ErrorsDialog from "@components/organisms/ErrorsDialog";
import { AppState } from "@stores/type";

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
  const onChangeTag = (event: any, value: number) => {
    if (value === SEIKATSUKAIGOReportTabInfo.DAILY) {
      props.history.push(URL.REPORT_DAILY);
    }
  };
  return (
    <AdminTemplate pageName="利用実績">
      <>
        <KnowbeTabs
          key={"tab"}
          tabInfo={SEIKATSUKAIGO_REPORT_TABS_INFO}
          handleChange={onChangeTag}
          selectedTab={SEIKATSUKAIGOReportTabInfo.USERS}
          tabsStyle={{
            height: 35.5,
            position: "relative",
            zIndex: 10,
            backgroundColor: "#fff"
          }}
        />
        <InOutReportUser />
        <ErrorsDialog errorsKey="inout" />
      </>
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
