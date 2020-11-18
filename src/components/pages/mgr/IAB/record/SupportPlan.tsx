import * as React from "react";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as supportPlanActions from "@stores/pages/record/supportPlan/actions";
import { AppState } from "@stores/type";
import { SupportPlanState } from "@stores/domain/supportPlan/types";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { StaffState } from "@stores/domain/staff/types";
import { UserState } from "@stores/domain/user/type";

// ui
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AdminTemplate from "@components/templates/AdminTemplate";
import MessageDialog from "@components/molecules/dialog/MessageDialog";
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

const styles = (theme: Theme) =>
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
    },
    deleteCancelButton: {
      width: 120,
      marginRight: 8
    },
    deleteButton: {
      width: 120,
      color: "#b00020",
      margin: 0
    }
  });

type OwnProps = WithStyles<typeof styles> &
  RouteComponentProps<{
    uifId: string;
    supportPlanId: string;
  }>;
interface StateProps {
  isEditing: boolean;
  supportPlan: SupportPlanState["privateSupportPlan"];
  facility: FacilityState;
  user: UsersInFacilityState["user"];
  staff: StaffState;
  needsStopHistory: boolean;
  userState: UserState;
  supportPlanRecord: SupportPlanState["supportPlan"];
}
interface DispatchProps {
  setEditing: () => void;
  unsetEditing: () => void;
  stopHistory: (flag: boolean) => void;
  fetchInitialSupportPlan: (
    uifId: string,
    supportPlanId: string,
    history: H.History
  ) => void;
  postSupportPlan: (
    supportPlanId: string,
    uifId: string,
    values: RecordSupportPlanValues,
    initialValues: RecordSupportPlanValues
  ) => void;
  deleteSupportPlan: (
    supportPlanId: string,
    uifId: string,
    history: H.History
  ) => void;
}
interface MergeProps extends OwnProps, StateProps, DispatchProps {
  userName: string;
  staffOptions: FieldItem[];
  authorValue: string;
  authorizerValue: string;
  participantValue: string;
}

/**
 * 個別支援計画（新規作成）
 */
const SupportPlan = (props: MergeProps) => {
  const pageName = "個別支援計画書";
  const { uifId, supportPlanId } = props.match.params;

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
  const [formValues, setFormValues] = React.useState(
    initialValues(props.supportPlan)
  );

  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);

  // fetch
  React.useEffect(() => {
    props.fetchInitialSupportPlan(uifId, supportPlanId, props.history);
    return () => {
      props.unsetEditing();
    };
  }, []);

  // reInitialize
  React.useEffect(() => {
    setFormValues(initialValues(props.supportPlan));
  }, [props.supportPlan]);

  //
  React.useEffect(() => {
    if (!props.isEditing) {
      setFormValues(initialValues(props.supportPlan));
    }
  }, [props.isEditing]);

  // キャンセルボタンを押した時の追加処理
  const editCancelAction = () => {
    props.unsetEditing();
    props.stopHistory(false);
  };

  // 削除開始（確認モーダル）
  const deleteStartAction = () => {
    setOpenDeleteConfirm(true);
  };

  // 削除キャンセル
  const onClickCancelDelete = () => {
    setOpenDeleteConfirm(false);
  };

  // 削除実行
  const onClickDelete = () => {
    props.deleteSupportPlan(uifId, supportPlanId, props.history);
  };

  const postSupportPlan = async (values: RecordSupportPlanValues) => {
    props.postSupportPlan(supportPlanId, uifId, values, formValues);
  };

  return (
    <AdminTemplate pageName={pageName} pathList={pathList}>
      <div className={props.classes.infoWrapper}>
        <UserInfoRecord
          userName={props.userName}
          user={props.user}
          facility={props.facility}
          supportPlan={props.supportPlanRecord}
          isEditing={props.isEditing}
        />
      </div>
      <div className={props.classes.stickyBar} />
      <div className={props.classes.formWrapper}>
        <SupportPlanForm
          pageName={pageName}
          userName={props.userName}
          uifId={uifId}
          supportPlanId={supportPlanId}
          creationDate={props.supportPlan.creation_date}
          createdAt={props.supportPlan.created_at}
          updatedAt={props.supportPlan.updated_at}
          isEditing={props.isEditing}
          initialValues={formValues}
          staff={props.staff}
          staffOptions={props.staffOptions}
          authorValue={props.authorValue}
          authorizerValue={props.authorizerValue}
          participantValue={props.participantValue}
          history={props.history}
          needsStopHistory={props.needsStopHistory}
          stopHistory={props.stopHistory}
          postSupportPlan={postSupportPlan}
          editStartAction={props.setEditing}
          editCancelAction={editCancelAction}
          deleteStartAction={deleteStartAction}
        />
      </div>
      <NavigationTransitionPrompt />
      <MessageDialog
        isOpen={openDeleteConfirm}
        title="個別支援計画書を削除します"
        message={(
          <span>
            データが完全に削除され、復元できません。
            <br />
            よろしいですか？
          </span>
        )}
        closeButton={(
          <Button
            color="secondary"
            className={props.classes.deleteCancelButton}
            onClick={onClickCancelDelete}
          >
            キャンセル
          </Button>
        )}
        actionButton={(
          <Button
            className={props.classes.deleteButton}
            onClick={onClickDelete}
          >
            削除する
          </Button>
        )}
      />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  isEditing: state.pages.recordSupportPlan.isEditing,
  supportPlan: state.supportPlan.privateSupportPlan,
  facility: state.IAB.facility,
  user: state.IAB.userInFacility.user,
  staff: state.staff,
  needsStopHistory: state.ui.needsStopHistory,
  userState: state.user as UserState,
  supportPlanRecord: state.supportPlan.supportPlan
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const recordSupportPlanDispatcher = pages.recordSupportPlanDispatcher(
    dispatch
  );
  const uiDispatches = uiDispatch(dispatch);
  return {
    setEditing: () => dispatch(supportPlanActions.setEdit()),
    unsetEditing: () => dispatch(supportPlanActions.unsetEdit()),
    stopHistory: uiDispatches.stopHistory,
    fetchInitialSupportPlan: (
      uifId: string,
      supportPlanId: string,
      history: H.History
    ) => {
      recordSupportPlanDispatcher.fetchInitialSupportPlan(
        uifId,
        supportPlanId,
        history
      );
    },
    postSupportPlan: (
      supportPlanId: string,
      uifId: string,
      values: RecordSupportPlanValues,
      initialValue: RecordSupportPlanValues
    ) => {
      return recordSupportPlanDispatcher.postSupportPlanUpdate(
        supportPlanId,
        uifId,
        values,
        initialValue
      );
    },
    deleteSupportPlan: (
      uifId: string,
      supportPlanId: string,
      history: H.History
    ) => {
      recordSupportPlanDispatcher.deleteSupportPlan(
        uifId,
        supportPlanId,
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
  // 作成者名
  const authorValue =
    typeof stateProps.supportPlan.author !== "number"
      ? stateProps.supportPlan.author.name
      : "";
  // 承認者名
  const authorizerValue =
    typeof stateProps.supportPlan.authorizer !== "number"
      ? stateProps.supportPlan.authorizer.name
      : "";
  // 参加者名リスト(特定条件でnullが含まれるのでfilterで除外)
  const participantValue = stateProps.supportPlan.participant
    .filter((values) => values)
    .map((values) => values.name)
    .join("、");
  return {
    userName,
    staffOptions,
    authorValue,
    authorizerValue,
    participantValue,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(SupportPlan));
