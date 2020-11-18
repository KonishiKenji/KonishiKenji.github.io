import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
// store
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";

import InterviewPrint from "@components/organisms/record/print/InterviewPrint";

/**
 * 面談記録のプリント画面
 */

interface StateProps {
  userState: UserState;
}

type Props = StateProps &
  RouteComponentProps<{
    uifId: string;
    year: string;
    month: string;
  }>;

const RecordInterviewPrint = (props: Props) => {
  const uifId = props.match.params.uifId;
  const year = props.match.params.year;
  const month = props.match.params.month;
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";

  // ヘッダーのパンくず構成
  const pathList = [
    { pathName: `${facilityUserLabel}ごと`, path: "/record/users_summary" }
  ];

  return (
    <AdminTemplate pageName="面談記録" pathList={pathList}>
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        <InterviewPrint uifId={uifId} year={year} month={month} />
      </PrintPreviewTemplate>
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  userState: state.user
});

export default connect(mapStateToProps)(RecordInterviewPrint);
