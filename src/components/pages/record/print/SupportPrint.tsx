import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
// store
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";

import SupportPrint from "@components/organisms/record/print/SupportPrint";

/**
 * 支援記録のプリント画面
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

const RecordSupportPrint = (props: Props) => {
  const uifId = props.match.params.uifId;
  const year = props.match.params.year;
  const month = props.match.params.month;
  const query = props.location.search;
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";

  // ヘッダーのパンくず構成
  const pathList = [
    { pathName: `${facilityUserLabel}ごと`, path: "/record/users_summary" }
  ];

  return (
    <AdminTemplate pageName="支援記録" pathList={pathList}>
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        <SupportPrint uifId={uifId} year={year} month={month} query={query} />
      </PrintPreviewTemplate>
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  userState: state.user as UserState
});

export default connect(mapStateToProps)(RecordSupportPrint);
