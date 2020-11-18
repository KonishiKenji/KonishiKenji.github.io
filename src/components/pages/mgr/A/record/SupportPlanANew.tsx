import * as React from "react";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { StaffState } from "@stores/domain/staff/types";

// ui
import {
  createStyles,
  StyleRules,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import AdminTemplate from "@components/templates/AdminTemplate";
import UserInfoRecord from "@components/organisms/mgr/A/record/UserInfoRecord";
import SupportPlanForm from "@components/organisms/mgr/A/record/SupportPlanForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import { FieldItem } from "@interfaces/ui/form";

// formik
import initialValues, {
  RecordSupportPlanValues
} from "@initialize/mgr/A/record/supportPlan/initialValues";

// utils
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";
import generateMergedStaffOptions from "@utils/domain/staffs/generateMergedStaffOptions";

const styles = (): StyleRules =>
  createStyles({
    infoWrapper: {
      padding: "32px 16px 16px"
    },
    stickyBar: {
      height: 16,
      background: "#eee",
      position: "sticky",
      top: 0,
      zIndex: 10
    },
    formWrapper: {
      padding: "0 16px 16px"
    }
  });

type OwnProps = WithStyles<typeof styles> &
  RouteComponentProps<{
    uifId: string;
  }>;
interface StateProps {
  facility: FacilityState;
  user: UsersInFacilityState["user"];
  staff: StaffState;
  needsStopHistory: boolean;
  userState: UserState;
  errorsState: ErrorsState["plan"]["data"];
}
interface DispatchProps {
  stopHistory: (flag: boolean) => void;
  fetchInitialSupportPlanNew: (uifId: string) => void;
  postSupportPlan: (
    uifId: string,
    values: RecordSupportPlanValues,
    history: H.History
  ) => Promise<void>;
}
interface MergeProps extends OwnProps, StateProps, DispatchProps {
  userName: string;
  staffOptions: FieldItem[];
  mergedStaffOptions: FieldItem[];
}

/**
 * 個別支援計画（新規作成）
 */
const SupportPlanANew = (props: MergeProps): JSX.Element => {
  const pageName = "個別支援計画書";
  const { uifId } = props.match.params;

  // `利用者`は設定で変更可能
  const facilityUserLabel = props.userState.labels
    ? props.userState.labels.facility_user
    : "利用者";

  // ヘッダーのパンくず構成
  const pathList = [
    { pathName: `${facilityUserLabel}ごと`, path: "/record/users_summary" },
    { pathName: "個別支援計画一覧", path: `/record/${uifId}/support_plan` }
  ];

  // state
  const [formValues] = React.useState(initialValues());

  // fetch
  React.useEffect(() => {
    props.fetchInitialSupportPlanNew(uifId);
  }, []);

  // キャンセルボタンを押した時の追加処理
  const editCancelAction = async (): Promise<void> => {
    await props.stopHistory(false);
    props.history.push(`/record/${uifId}/support_plan`);
  };

  // Submitのラッパー
  const postSupportPlan = async (
    values: RecordSupportPlanValues
  ): Promise<void> => {
    props.postSupportPlan(uifId, values, props.history);
  };

  return (
    <AdminTemplate pageName={pageName} pathList={pathList}>
      <div className={props.classes.infoWrapper}>
        <UserInfoRecord
          userName={props.userName}
          user={props.user}
          facility={props.facility}
          isEditing
        />
      </div>
      <div className={props.classes.stickyBar} />
      <div className={props.classes.formWrapper}>
        <SupportPlanForm
          pageName={pageName}
          userName={props.userName}
          uifId={uifId}
          creationDate={null}
          previousCreationDate={null}
          createdAt={null}
          updatedAt={null}
          isEditing
          initialValues={formValues}
          staff={props.staff}
          staffOptions={props.staffOptions}
          mergedStaffOptions={props.mergedStaffOptions}
          authorValue=""
          authorizerValue=""
          authorizerRole=""
          participantValue=""
          history={props.history}
          needsStopHistory={props.needsStopHistory}
          stopHistory={props.stopHistory}
          postSupportPlan={postSupportPlan}
          editCancelAction={editCancelAction}
          errorsState={props.errorsState}
        />
      </div>
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.IAB.facility,
  user: state.IAB.userInFacility.user,
  staff: state.staff,
  needsStopHistory: state.ui.needsStopHistory,
  userState: state.user as UserState,
  errorsState: state.errors.records.data
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const recordSupportPlanADispatcher = pages.recordSupportPlanADispatcher(
    dispatch
  );
  const uiDispatches = uiDispatch(dispatch);
  return {
    stopHistory: uiDispatches.stopHistory,
    fetchInitialSupportPlanNew: (uifId: string): void => {
      recordSupportPlanADispatcher.fetchInitialSupportPlanNew(uifId);
    },
    postSupportPlan: (
      uifId: string,
      values: RecordSupportPlanValues,
      history: H.History
    ): Promise<void> => {
      return recordSupportPlanADispatcher.postSupportPlan(
        uifId,
        values,
        history
      );
    }
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  const { user, staff } = stateProps;
  // 該当者の名前を取得する
  const { name_sei = "", name_mei = "" } = user.user_in_facility;
  const userName = `${name_sei} ${name_mei}`;
  // 記録者フィールドに渡すoptions
  const staffOptions = generateSelectFieldItems(
    staff.staffItems,
    "staffName",
    "staffItemId"
  );
  const mergedStaffOptions = generateMergedStaffOptions(staffOptions, []);
  return {
    userName,
    staffOptions,
    mergedStaffOptions,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(SupportPlanANew));
