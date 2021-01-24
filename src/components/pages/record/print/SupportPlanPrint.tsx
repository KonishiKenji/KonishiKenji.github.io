import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
// store
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";

import SupportPlanPrint from "@components/organisms/record/print/SupportPlanPrint";
import { FacilityType } from "@constants/variables";
import SupportPlanAPrint from "@components/organisms/record/print/SupportPlanAPrint";

/**
 * 個別支援計画のプリント画面
 */

interface StateProps {
  userState: UserState;
}

type Props = StateProps &
  RouteComponentProps<{
    uifId: string;
    supportPlanId: string;
  }>;

const RecordSupportPlanPrint = (props: Props): JSX.Element => {
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

  return (
    <AdminTemplate pageName="個別支援計画" pathList={pathList}>
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        {isFacilityTypeA ? (
          <SupportPlanAPrint
            uifId={uifId}
            supportPlanId={supportPlanId}
            query={query}
          />
        ) : (
          <SupportPlanPrint
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

export default connect(mapStateToProps)(RecordSupportPlanPrint);
