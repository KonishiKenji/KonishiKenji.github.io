import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { FacilityState as IABFacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { FacilityState as SEIKATSUKAIGOFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import { OperationsState } from "@stores/domain/operations/types";
import dispatches from "@stores/dispatches";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
import DailyPrint from "@components/organisms/record/print/DailyPrint";
import { FacilityType } from "@/constants/variables";

interface StateProps {
  user: UserState;
  facility: IABFacilityState | SEIKATSUKAIGOFacilityState;
  dailyRecord: OperationsState["dailyRecord"];
}
interface DispatchProps {
  requestOperationSupportRecordData: (selectedDate: string) => void;
  getFacilityData: (facility_type: FacilityType) => void;
}
type Props = StateProps &
  DispatchProps &
  RouteComponentProps<{ yyyymmdd: string }>;

/**
 * 日々の記録のプリント画面
 */
const RecordDailyPrint: React.FC<Props> = (props) => {
  const targetDate = props.match.params.yyyymmdd;
  const query = props.location.search;
  const { user } = props;

  React.useEffect(() => {
    props.requestOperationSupportRecordData(targetDate);
    props.getFacilityData(user.facility_type);
  }, []);

  const facilityUserLabel = props.user.labels
    ? props.user.labels.facility_user
    : "利用者";

  return (
    <AdminTemplate pageName="日々の記録">
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        <DailyPrint
          dailyRecord={props.dailyRecord}
          typeService={props.user.facility_type}
          facilityUserLabel={facilityUserLabel}
          selectedDate={targetDate}
          query={query}
          // 事業所情報_食事の状態
          isMeal={props.facility.mealSaservedServiceFlag}
          // 事業所情報_送迎の状態
          isTransfer={props.facility.transferServiceFlag}
        />
      </PrintPreviewTemplate>
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  const user = state.user as UserState;
  const facility =
    user.facility_type === FacilityType.SEIKATSUKAIGO
      ? state.SEIKATSUKAIGO.facility
      : state.IAB.facility;
  return {
    user,
    facility,
    dailyRecord: state.operations.dailyRecord
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { operationsDispatcher } = dispatches;
  const operationsDispatches = operationsDispatcher(dispatch);

  const getFacilityData = (facility_type: FacilityType): Promise<void> => {
    // 種別として移行AB or 生活介護が利用する機能なので
    // facility_typeで該当種別のdispatcherを選択する
    const dispatcher2 =
      facility_type === FacilityType.SEIKATSUKAIGO
        ? dispatches.SEIKATSUKAIGO
        : dispatches.IAB;

    return dispatcher2.facilityDispatcher(dispatch).fetch();
  };
  return {
    requestOperationSupportRecordData: (selectedDate: string): Promise<void> =>
      operationsDispatches.fetchDailyRecord(selectedDate),
    getFacilityData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordDailyPrint);
