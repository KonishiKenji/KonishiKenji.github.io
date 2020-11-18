import * as React from "react";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as supportPlanActions from "@stores/pages/record/supportPlanA/actions";
import { AppState } from "@stores/type";
import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { StaffState } from "@stores/domain/staff/types";
import { UserState } from "@stores/domain/user/type";

// ui
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import AdminTemplate from "@components/templates/AdminTemplate";
import UserInfoRecord from "@components/organisms/mgr/A/record/UserInfoRecord";
import EvaluationForm from "@components/organisms/mgr/A/record/EvaluationForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import { FieldItem } from "@interfaces/ui/form";

// formik
import initialValues, {
  RecordSupportPlanValues
} from "@initialize/mgr/A/record/supportPlan/initialValues";

// utils
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";
import getSnapOrRealName from "@utils/domain/mgr/getSnapOrRealName";
import { ErrorsState } from "@stores/domain/errors/types";
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
  supportPlan: SupportPlanAState["privateSupportPlan"];
  facility: FacilityState;
  user: UsersInFacilityState["user"];
  staff: StaffState;
  needsStopHistory: boolean;
  userState: UserState;
  supportPlanRecord: SupportPlanAState["supportPlan"];
  errorState: ErrorsState["goal"]["data"];
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
}
interface MergeProps extends OwnProps, StateProps, DispatchProps {
  userName: string;
  staffOptions: FieldItem[];
  authorValue: string;
  evaluationAuthorizerValue: string;
  evaluationAuthorizerRole: string;
}

/**
 * 評価・振り返り
 */
const EvaluationA = (props: MergeProps): JSX.Element => {
  const pageName = "評価・振り返り";
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

  // fetch
  React.useEffect(() => {
    props.fetchInitialSupportPlan(uifId, supportPlanId, props.history);
    return (): void => {
      props.unsetEditing();
    };
  }, []);

  // reInitialize
  React.useEffect((): void => {
    setFormValues(initialValues(props.supportPlan));
  }, [props.supportPlan]);

  //
  React.useEffect((): void => {
    if (!props.isEditing) {
      setFormValues(initialValues(props.supportPlan));
    }
  }, [props.isEditing]);

  // キャンセルボタンを押した時の追加処理
  const editCancelAction = (): void => {
    props.unsetEditing();
    props.stopHistory(false);
  };

  const postSupportPlan = async (
    values: RecordSupportPlanValues
  ): Promise<void> => {
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
        <EvaluationForm
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
          authorValue={props.authorValue}
          evaluationAuthorizerValue={props.evaluationAuthorizerValue}
          evaluationAuthorizerRole={props.evaluationAuthorizerRole}
          history={props.history}
          needsStopHistory={props.needsStopHistory}
          stopHistory={props.stopHistory}
          postSupportPlan={postSupportPlan}
          editStartAction={props.setEditing}
          editCancelAction={editCancelAction}
          errorsState={props.errorState}
        />
      </div>
      <NavigationTransitionPrompt />
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
  errorState: state.errors.goal.data,
  supportPlanRecord: state.A.supportPlan.supportPlan
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const recordSupportPlanADispatcher = pages.recordSupportPlanADispatcher(
    dispatch
  );
  const uiDispatches = uiDispatch(dispatch);
  return {
    setEditing: (): { readonly type: "PAGES/RECORD/SUPPORT_PLAN_A/SET_EDIT" } =>
      dispatch(supportPlanActions.setEdit()),
    unsetEditing: (): {
      readonly type: "PAGES/RECORD/SUPPORT_PLAN_A/UNSET_EDIT";
    } => dispatch(supportPlanActions.unsetEdit()),
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
    supportPlan: { author, evaluation_authorizer }
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
  // 評価者名
  const evaluationAuthorizerValue = getSnapOrRealName(
    evaluation_authorizer,
    ""
  );
  // 評価者役職
  const evaluationAuthorizerRole = getSnapOrRealRole(evaluation_authorizer, "");
  return {
    userName,
    staffOptions,
    authorValue,
    evaluationAuthorizerValue,
    evaluationAuthorizerRole,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(EvaluationA));
