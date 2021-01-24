import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
// store
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";

import UsersSummaryInterviewPrint from "@components/organisms/record/print/UsersSummaryInterviewPrint";

/**
 * 利用者サマリ画面上の作業記録のプリント画面
 */

interface StateProps {
  userState: UserState;
}

type Props = StateProps &
  RouteComponentProps<{
    year: string;
    month: string;
  }>;

/**
 * 利用者サマリ画面上の面談記録のプリント画面
 */
const RecordUsersSummaryInterviewPrint = (props: Props) => {
  const year = props.match.params.year;
  const month = props.match.params.month;
  const query = props.location.search;
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";

  return (
    <AdminTemplate pageName={`${facilityUserLabel}ごと`}>
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        <UsersSummaryInterviewPrint year={year} month={month} query={query} />
      </PrintPreviewTemplate>
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  userState: state.user
});

export default connect(mapStateToProps)(RecordUsersSummaryInterviewPrint);
