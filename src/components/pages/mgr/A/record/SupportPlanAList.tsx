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
import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { StaffState } from "@stores/domain/staff/types";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import { ErrorsState } from "@stores/domain/errors/types";

// ui
import {
  createStyles,
  StyleRules,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import AdminTemplate from "@components/templates/AdminTemplate";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import SupportPlanRecordList from "@components/organisms/mgr/A/record/SupportPlanRecordList";
import UserInfoRecord from "@components/organisms/mgr/A/record/UserInfoRecord";

const styles = (): StyleRules =>
  createStyles({
    wrapper: {
      padding: 16
    },
    stickyWrapper: {
      paddingBottom: 16,
      background: "#eee",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  });

type RecordType = "support_plan";

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
  supportPlanRecord: SupportPlanAState["supportPlan"];
  staff: StaffState;
  recordUserDetail: RecordUserDetailState;
  userState: UserState;
  planErrors: ErrorsState["plan"]["data"];
  goalErrors: ErrorsState["goal"]["data"];
}
interface DispatchProps {
  fetchSupportPlan: (uifId: string) => void;
  fetchInitialSupportPlan: (uifId: string) => void;
  fetchErrors: (uifId: string) => void;
}
interface MergeProps extends OwnProps, StateProps, DispatchProps {
  userName: string;
}

/**
 * 利用者ごと > 各種記録（個別支援計画・支援記録・作業記録・面談記録）
 */
const RecordUserDetail = (props: MergeProps): JSX.Element => {
  const { uifId, recordType, year, month } = props.match.params;

  // `利用者`は設定で変更可能
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";

  // ヘッダーのパンくず構成
  const pathList = [
    { pathName: `${facilityUserLabel}ごと`, path: "/record/users_summary" }
  ];

  // 現在ページのタイトル名
  const pageName = "個別支援計画一覧";

  const isFirstRef = React.useRef(false);
  // fetch
  React.useEffect(() => {
    // 初期取得 or 再取得
    if (isFirstRef.current) {
      props.fetchSupportPlan(uifId);
      props.fetchErrors(uifId);
    } else {
      props.fetchInitialSupportPlan(uifId);
      isFirstRef.current = true;
    }
  }, [recordType]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const setYear = year || currentYear;
  const setMonth = month || currentMonth;
  // set url
  React.useEffect(() => {
    const locationState = {
      pathname: `/record/${uifId}/${recordType}/${setYear}/${setMonth}`
    };

    if (props.match.params.year && props.match.params.month) {
      // TODO: ブラウザバックのバグが取れるまで履歴を持たなくする
      props.history.replace(locationState);
    } else {
      // urlにyear,monthがなければ現在日で付与
      props.history.replace(locationState);
    }
  }, []);
  return (
    <AdminTemplate pageName={pageName} pathList={pathList}>
      <div className={props.classes.stickyWrapper} />
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
        <SupportPlanRecordList
          pageName={pageName}
          userName={props.userName}
          uifId={uifId}
          supportPlanRecord={props.supportPlanRecord}
          planErrors={props.planErrors}
          goalErrors={props.goalErrors}
          recordUserDetail={props.recordUserDetail}
          history={props.history}
          year={setYear}
          month={setMonth}
        />
      </div>
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.IAB.facility,
  user: state.IAB.userInFacility.user,
  supportPlanRecord: state.A.supportPlan.supportPlan,
  staff: state.staff,
  recordUserDetail: state.pages.recordUserDetail,
  userState: state.user as UserState,
  planErrors: state.errors.plan.data,
  goalErrors: state.errors.goal.data
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportPlanDispatcher, errorsDispatcher, pages } = dispatches;
  const supportPlanDispatches = supportPlanDispatcher(dispatch);
  const errorsDispatches = errorsDispatcher(dispatch);
  const recordUserDetailDispatcher = pages.recordUserDetailDispatcher(dispatch);
  return {
    fetchSupportPlan: (uifId: string): void => {
      supportPlanDispatches.fetchSupportPlan(uifId);
    },
    fetchInitialSupportPlan: (uifId: string): void => {
      recordUserDetailDispatcher.fetchInitialSupportPlan(uifId);
    },
    fetchErrors: (uifId: string): void => {
      errorsDispatches.plan(uifId);
      errorsDispatches.goal(uifId);
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
  return {
    userName,
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
