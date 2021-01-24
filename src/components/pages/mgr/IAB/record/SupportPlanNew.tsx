import * as React from "react";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { StaffState } from "@stores/domain/staff/types";

// ui
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import AdminTemplate from "@components/templates/AdminTemplate";
import UserInfoRecord from "@components/organisms/mgr/IAB/record/UserInfoRecord";
import SupportPlanForm from "@components/organisms/mgr/common/record/SupportPlanForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import { FieldItem } from "@interfaces/ui/form";

// formik
import initialValues, {
  RecordSupportPlanValues
} from "@initialize/record/supportPlan/initialValues";

// utils
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";

const styles = () =>
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
}

/**
 * 個別支援計画（新規作成）
 */
const SupportPlanNew = (props: MergeProps) => {
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
  const editCancelAction = async () => {
    await props.stopHistory(false);
    props.history.push(`/record/${uifId}/support_plan`);
  };

  // Submitのラッパー
  const postSupportPlan = async (values: RecordSupportPlanValues) => {
    props.postSupportPlan(uifId, values, props.history);
  };

  return (
    <AdminTemplate pageName={pageName} pathList={pathList}>
      <div className={props.classes.infoWrapper}>
        <UserInfoRecord
          userName={props.userName}
          user={props.user}
          facility={props.facility}
          isEditing={true}
        />
      </div>
      <div className={props.classes.stickyBar} />
      <div className={props.classes.formWrapper}>
        <SupportPlanForm
          pageName={pageName}
          userName={props.userName}
          uifId={uifId}
          creationDate={null}
          createdAt={null}
          updatedAt={null}
          isEditing={true}
          initialValues={formValues}
          staff={props.staff}
          staffOptions={props.staffOptions}
          authorValue=""
          authorizerValue=""
          participantValue=""
          history={props.history}
          needsStopHistory={props.needsStopHistory}
          stopHistory={props.stopHistory}
          postSupportPlan={postSupportPlan}
          editCancelAction={editCancelAction}
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
  userState: state.user as UserState
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const recordSupportPlanDispatcher = pages.recordSupportPlanDispatcher(
    dispatch
  );
  const uiDispatches = uiDispatch(dispatch);
  return {
    stopHistory: uiDispatches.stopHistory,
    fetchInitialSupportPlanNew: (uifId: string) => {
      recordSupportPlanDispatcher.fetchInitialSupportPlanNew(uifId);
    },
    postSupportPlan: (
      uifId: string,
      values: RecordSupportPlanValues,
      history: H.History
    ) => {
      return recordSupportPlanDispatcher.postSupportPlan(
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
  // 該当者の名前を取得する
  const { name_sei = "", name_mei = "" } = stateProps.user.user_in_facility;
  const userName = `${name_sei} ${name_mei}`;
  // 記録者フィールドに渡すoptions
  const staffOptions = generateSelectFieldItems(
    stateProps.staff.staffItems,
    "staffName",
    "staffItemId"
  );
  return {
    userName,
    staffOptions,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(SupportPlanNew));
