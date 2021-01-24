import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
// store
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import dispatches from "@stores/dispatches";

import EvaluationAPrint from "@components/organisms/record/print/EvaluationAPrint";
import { FacilityType } from "@constants/variables";

/**
 * 評価振り返りのプリント画面
 */

interface StateProps {
  userState: UserState;
}

interface DispatchProps {
  getPrivateSupportPlanRecordData: (
    uifId: string,
    supportPlanId: string
  ) => void;
  getUserDetailInFacilityData: (
    uifId: string,
    facility_type: FacilityType
  ) => void;
  getFacilityIAB: () => void;
}

type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{
    uifId: string;
    supportPlanId: string;
  }>;

const EvaluationPrint = (props: Props): JSX.Element => {
  const { uifId } = props.match.params;
  const { supportPlanId } = props.match.params;
  const query = props.location.search;
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";
  const isFacilityTypeA = props.userState.facility_type === FacilityType.A;

  // ヘッダーのパンくず構成
  const pathList = [
    { pathName: `${facilityUserLabel}ごと`, path: "/record/users_summary" },
    { pathName: "個別支援計画一覧", path: `/record/${uifId}/support_plan` }
  ];

  React.useEffect(() => {
    props.getUserDetailInFacilityData(uifId, props.userState.facility_type);
    props.getPrivateSupportPlanRecordData(uifId, supportPlanId);
    props.getFacilityIAB();
  }, []);

  return (
    <AdminTemplate pageName="評価・振り返り" pathList={pathList}>
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        {isFacilityTypeA && (
          <EvaluationAPrint
            uifId={uifId}
            supportPlanId={supportPlanId}
            query={query}
          />
        )}
      </PrintPreviewTemplate>
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  userState: state.user as UserState
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportPlanDispatcher } = dispatches;
  const getPrivateSupportPlanRecordData = (
    uifId: string,
    supportPlanId: string
  ): Promise<void> =>
    supportPlanDispatcher(dispatch).fetchPrivateSupportPlan(
      uifId,
      supportPlanId
    );
  const getUserDetailInFacilityData = (uifId: string): Promise<void> => {
    // 種別として移行AB or 生活介護が利用する機能なので
    // facility_typeで該当種別のdispatcherを選択する
    const dispatcher = dispatches.IAB;

    return dispatcher.userInFacilityDispatcher(dispatch).fetchOne(uifId);
  };

  const getFacilityIAB = (): Promise<void> => {
    const dispatcher = dispatches.IAB;

    return dispatcher.facilityDispatcher(dispatch).fetch();
  };

  return {
    getPrivateSupportPlanRecordData,
    getUserDetailInFacilityData,
    getFacilityIAB
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationPrint);
