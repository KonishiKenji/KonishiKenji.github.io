import * as React from "react";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import {
  ActionTypes,
  setEdit,
  unsetEdit
} from "@stores/pages/record/supportPlanA/actions";
import { AppState } from "@stores/type";
import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { StaffState } from "@stores/domain/staff/types";
import { UserState } from "@stores/domain/user/type";
import { ErrorsState } from "@stores/domain/errors/types";

// ui
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import KnowbeButton from "@components/presentational/atoms/KnowbeButton";
import AdminTemplate from "@components/templates/AdminTemplate";
import MessageDialog from "@components/molecules/dialog/MessageDialog";
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
import getSnapOrRealName from "@utils/domain/mgr/getSnapOrRealName";
import getSnapOrRealRole from "@utils/domain/mgr/getSnapOrRealRole";

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

const deleteCancelButton: React.CSSProperties = {
  width: 120,
  marginRight: 8
};

const deleteButton: React.CSSProperties = {
  width: 120,
  margin: 0
};

type OwnProps = WithStyles<typeof styles> &
  RouteComponentProps<{
    uifId: string;
    supportPlanId: string;
  }>;
interface StateProps {
  isEditing: boolean;
  supportPlan: SupportPlanAState["privateSupportPlan"];
  facility: FacilityState;
  user: UsersInFacilityState["user"];
  staff: StaffState;
  needsStopHistory: boolean;
  userState: UserState;
  supportPlanRecord: SupportPlanAState["supportPlan"];
  errorState: ErrorsState["plan"]["data"];
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
  mergedStaffOptions: FieldItem[];
  authorValue: string;
  authorizerValue: string;
  authorizerRole: string;
  participantValue: string;
}

/**
 * 個別支援計画（新規作成）
 */
const SupportPlanA = (props: MergeProps): JSX.Element => {
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
    return (): void => {
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
  const editCancelAction = (): void => {
    props.unsetEditing();
    props.stopHistory(false);
  };

  // 削除開始（確認モーダル）
  const deleteStartAction = (): void => {
    setOpenDeleteConfirm(true);
  };

  // 削除キャンセル
  const onClickCancelDelete = (): void => {
    setOpenDeleteConfirm(false);
  };

  // 削除実行
  const onClickDelete = (): void => {
    props.deleteSupportPlan(uifId, supportPlanId, props.history);
  };

  const postSupportPlan = async (
    values: RecordSupportPlanValues
  ): Promise<void> => {
    props.postSupportPlan(supportPlanId, uifId, values, formValues);
  };

  const openDeleteConfirmMessage = (
    <span>
      計画書と評価・振り返りが同時に削除されます。
      <br />
      削除した場合、データの復元はできません。
      <br />
      よろしいですか？
    </span>
  );

  const openDeleteConfirmCloseButton = (
    <KnowbeButton
      kind="text"
      style={deleteCancelButton}
      onClick={onClickCancelDelete}
    >
      キャンセル
    </KnowbeButton>
  );
  const openDeleteConfirmSubmitButton = (
    <KnowbeButton
      kind="textDelete"
      style={deleteButton}
      onClick={onClickDelete}
    >
      削除する
    </KnowbeButton>
  );

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
          previousCreationDate={props.supportPlan.previous_creation_date}
          createdAt={props.supportPlan.created_at}
          updatedAt={props.supportPlan.updated_at}
          isEditing={props.isEditing}
          initialValues={formValues}
          staff={props.staff}
          staffOptions={props.staffOptions}
          mergedStaffOptions={props.mergedStaffOptions}
          authorValue={props.authorValue}
          authorizerValue={props.authorizerValue}
          authorizerRole={props.authorizerRole}
          participantValue={props.participantValue}
          history={props.history}
          needsStopHistory={props.needsStopHistory}
          stopHistory={props.stopHistory}
          postSupportPlan={postSupportPlan}
          editStartAction={props.setEditing}
          editCancelAction={editCancelAction}
          deleteStartAction={deleteStartAction}
          errorsState={props.errorState}
        />
      </div>
      <NavigationTransitionPrompt />
      <MessageDialog
        isOpen={openDeleteConfirm}
        title="個別支援計画書と評価・振り返りを削除します"
        message={openDeleteConfirmMessage}
        closeButton={openDeleteConfirmCloseButton}
        actionButton={openDeleteConfirmSubmitButton}
      />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  isEditing: state.pages.recordSupportPlanA.isEditing,
  supportPlan: state.A.supportPlan.privateSupportPlan,
  facility: state.IAB.facility,
  user: state.IAB.userInFacility.user,
  staff: state.staff,
  needsStopHistory: state.ui.needsStopHistory,
  userState: state.user as UserState,
  errorState: state.errors.plan.data,
  supportPlanRecord: state.A.supportPlan.supportPlan
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const recordSupportPlanDispatcher = pages.recordSupportPlanDispatcher(
    dispatch
  );
  const recordSupportPlanADispatcher = pages.recordSupportPlanADispatcher(
    dispatch
  );
  const uiDispatches = uiDispatch(dispatch);
  return {
    setEditing: (): ActionTypes => dispatch(setEdit()),
    unsetEditing: (): ActionTypes => dispatch(unsetEdit()),
    stopHistory: uiDispatches.stopHistory,
    fetchInitialSupportPlan: (
      uifId: string,
      supportPlanId: string,
      history: H.History
    ): void => {
      recordSupportPlanADispatcher.fetchInitialSupportPlan(
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
    ): Promise<void> => {
      return recordSupportPlanADispatcher.postSupportPlanUpdate(
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
    ): void => {
      // 引数の型に A 型独自の差分がないため IB 側の API を呼ぶ
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
  const {
    user,
    staff,
    supportPlan: {
      author,
      authorizer,
      participant,
      participant_name,
      participant_history
    }
  } = stateProps;
  // 該当者の名前を取得する
  const { name_sei = "", name_mei = "" } = user.user_in_facility;
  const userName = `${name_sei} ${name_mei}`;
  // 記録者フィールドに渡すoptions
  const staffOptions = generateSelectFieldItems(
    staff.staffItems,
    "staffName",
    "staffItemId"
  );
  // 作成者名
  const authorValue = getSnapOrRealName(author, "");
  // 承認者名
  const authorizerValue = getSnapOrRealName(authorizer, "");
  // 承認者役職
  const authorizerRole = getSnapOrRealRole(authorizer, "");
  // 参加者名リスト(特定条件でnullが含まれるのでfilterで除外)
  const participantValue =
    participant_name ||
    participant
      .filter((values) => values)
      .map((values) => values.name)
      .join("、");
  // 職員情報 更新・削除 履歴を加味した参加者名 options
  const mergedStaffOptions = generateMergedStaffOptions(
    staffOptions,
    participant_history
  );
  return {
    userName,
    staffOptions,
    mergedStaffOptions,
    authorValue,
    authorizerValue,
    authorizerRole,
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
)(withStyles(styles)(SupportPlanA));
