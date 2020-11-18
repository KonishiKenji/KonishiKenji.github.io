import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { SupportsState } from "@stores/domain/supports/types";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import { SupportPlanState } from "@stores/domain/supportPlan/types";

// ui
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import DateSelectButtonsMonthly from "@components/molecules/DateSelectButtonsMonthly";
import AdminTemplate from "@components/templates/AdminTemplate";
import UserInfoRecord from "@components/organisms/mgr/IAB/record/UserInfoRecord";
import UserDetailRecord from "@components/organisms/mgr/IAB/record/UserDetailRecord";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import UnEditableWrapper from "@components/atoms/UnEditableWrapper";

// utils
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";
import generateWorkCategorizedFieldItems from "@utils/domain/work/generateWorkCategorizedFieldItems";

const styles = (): StyleRules =>
  createStyles({
    wrapper: {
      padding: 16
    },
    stickyWrapper: {
      padding: 16,
      background: "#eee",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  });

type RecordType = "support" | "work" | "interview";
type FetchOptionRecordType = "work" | "interview" | undefined;

type OwnProps = WithStyles<typeof styles> &
  RouteComponentProps<{
    uifId: string;
    recordType: RecordType;
    year?: string;
    month?: string;
  }>;
interface StateProps {
  facility: FacilityState;
  user: UsersInFacilityState["user"];
  supportPlanRecord: SupportPlanState["supportPlan"];
  supportsRecord: SupportsState["supportsRecord"];
  work: WorkState;
  staff: StaffState;
  recordUserDetail: RecordUserDetailState;
  userState: UserState;
}
interface DispatchProps {
  fetchSupportPlan: (uifId: string) => void;
  fetchSupportsRecord: (
    uifId: string,
    year: string,
    month: string,
    recordType: FetchOptionRecordType
  ) => void;
  fetchInitialUserDetail: (
    uifId: string,
    year: string,
    month: string,
    recordType: FetchOptionRecordType
  ) => void;
  fetchInitialSupportPlan: (uifId: string) => void;
}
interface MergeProps extends OwnProps, StateProps, DispatchProps {
  userName: string;
  staffOptions: FieldItem[];
  workOptions: CategorizedFieldItem[];
}

/**
 * 利用者ごと > 各種記録（個別支援計画・支援記録・作業記録・面談記録）
 */
const RecordUserDetail = (props: MergeProps): JSX.Element => {
  const { uifId, recordType, year, month } = props.match.params;

  // カレンダー周り
  const currentDate = new Date();
  const calendarMinDate = new Date(2000, 0, 1);
  const calendarMaxDate = new Date(2049, 11, 31);
  const selectedDate =
    year && month ? new Date(+year, +month - 1, 1) : currentDate;
  const selectedYear = year || selectedDate.getFullYear().toString();
  const selectedMonth = month || (selectedDate.getMonth() + 1).toString();

  // `利用者`は設定で変更可能
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";

  // ヘッダーのパンくず構成
  const pathList = [
    { pathName: `${facilityUserLabel}ごと`, path: "/record/users_summary" }
  ];

  // 現在ページのタイトル名
  let pageName = "";
  if (recordType === "support") {
    pageName = "支援記録";
  } else if (recordType === "work") {
    pageName = "作業記録";
  } else if (recordType === "interview") {
    pageName = "面談記録";
  }

  // state
  const [calendar, setCalendar] = React.useState({
    year: selectedYear,
    month: selectedMonth,
    date: selectedDate
  });
  const isFirstRef = React.useRef(false);

  // fetch
  React.useEffect(() => {
    // 必要なtypeの時だけ送る
    const type =
      recordType === "work" || recordType === "interview"
        ? recordType
        : undefined;
    // 初期取得 or 再取得
    if (isFirstRef.current) {
      props.fetchSupportsRecord(uifId, calendar.year, calendar.month, type);
      props.fetchSupportPlan(uifId);
    } else {
      props.fetchInitialUserDetail(uifId, calendar.year, calendar.month, type);
      props.fetchInitialSupportPlan(uifId);
      isFirstRef.current = true;
    }
  }, [recordType, calendar]);

  // change url
  React.useEffect(() => {
    const locationState = {
      pathname: `/record/${uifId}/${recordType}/${calendar.year}/${calendar.month}`
    };
    if (props.match.params.year && props.match.params.month) {
      // TODO: ブラウザバックのバグが取れるまで履歴を持たなくする
      props.history.replace(locationState);
    } else {
      // urlにyear,monthがなければ現在日で付与
      props.history.replace(locationState);
    }
  }, [calendar]);

  // handler
  const onClickCalendar = (date: Date): void => {
    const clickYear = date.getFullYear().toString();
    const clickMonth = (date.getMonth() + 1).toString();
    setCalendar({
      date,
      year: clickYear,
      month: clickMonth
    });
  };

  return (
    <AdminTemplate pageName={pageName} pathList={pathList}>
      <div className={props.classes.stickyWrapper}>
        <UnEditableWrapper unEditable={props.recordUserDetail.isEditing}>
          <DateSelectButtonsMonthly
            selectedMonth={calendar.date}
            min={calendarMinDate}
            max={calendarMaxDate}
            onClickSubmit={onClickCalendar}
          />
        </UnEditableWrapper>
      </div>
      <div className={props.classes.wrapper}>
        <UserInfoRecord
          userName={props.userName}
          user={props.user}
          facility={props.facility}
          supportPlan={props.supportPlanRecord}
          isEditing={props.recordUserDetail.isEditing}
        />
      </div>
      <div className={props.classes.wrapper}>
        <UserDetailRecord
          pageName={pageName}
          userName={props.userName}
          uifId={uifId}
          year={calendar.year}
          month={calendar.month}
          recordType={recordType}
          supportsRecord={props.supportsRecord}
          work={props.work}
          staff={props.staff}
          workOptions={props.workOptions}
          staffOptions={props.staffOptions}
          recordUserDetail={props.recordUserDetail}
          history={props.history}
          serviceType={props.facility.serviceType}
          // 事業所情報_食事の状態
          isMeal={props.facility.mealSaservedServiceFlag}
          // 事業所情報_送迎の状態
          isTransfer={props.facility.transferServiceFlag}
        />
      </div>
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.IAB.facility,
  user: state.IAB.userInFacility.user,
  supportPlanRecord: state.supportPlan.supportPlan,
  supportsRecord: state.supports.supportsRecord,
  work: state.work,
  staff: state.staff,
  recordUserDetail: state.pages.recordUserDetail,
  userState: state.user
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportPlanDispatcher, supportsDispatcher, pages } = dispatches;
  const recordUserDetailDispatcher = pages.recordUserDetailDispatcher(dispatch);
  const supportPlanDispatches = supportPlanDispatcher(dispatch);
  const supportDispatches = supportsDispatcher(dispatch);
  return {
    fetchSupportPlan: (uifId: string): void => {
      supportPlanDispatches.fetchSupportPlan(uifId);
    },
    fetchSupportsRecord: (
      uifId: string,
      year: string,
      month: string,
      recordType: FetchOptionRecordType
    ): void => {
      supportDispatches.fetchSupportsRecord(uifId, year, month, recordType);
    },
    fetchInitialUserDetail: (
      uifId: string,
      year: string,
      month: string,
      recordType: FetchOptionRecordType
    ): void => {
      recordUserDetailDispatcher.fetchInitialUserDetailRecord(
        uifId,
        year,
        month,
        recordType
      );
    },
    fetchInitialSupportPlan: (uifId: string): void => {
      recordUserDetailDispatcher.fetchInitialSupportPlan(uifId);
    }
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  // 該当者の名前を取得する
  const { name_sei = "", name_mei = "" } = stateProps.user.user_in_facility;
  const userName = `${name_sei} ${name_mei}`;
  // 記録者フィールドに渡すoptions
  const staffOptions = generateSelectFieldItems(
    stateProps.staff.staffItems,
    "staffName",
    "staffItemId",
    false
  );
  // 作業フィールドに渡すoptions
  const workOptions = generateWorkCategorizedFieldItems(
    stateProps.work.workData
  );
  return {
    userName,
    staffOptions,
    workOptions,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(RecordUserDetail));
