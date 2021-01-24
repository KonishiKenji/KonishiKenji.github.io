import * as React from "react";

// props
import * as H from "history";
import { SupportsState } from "@stores/domain/supports/types";
import { AppState } from "@stores/type";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as recordUserDetailActions from "@stores/pages/record/userDetail/actions";
import { SnackbarParams } from "@stores/ui/type";

// ui
import RecordHeaderAllEditType from "@components/organisms/mgr/common/record/RecordHeaderAllEditType";
import RecordHeaderLinkButtonType from "@components/organisms/mgr/common/record/RecordHeaderLinkButtonType";
import UserDetailRecordSupportTable from "@components/organisms/mgr/common/record/UserDetailRecordSupportTable";
import UserDetailRecordWorkTable from "@components/organisms/mgr/common/record/UserDetailRecordWorkTable";
import UserDetailRecordInterviewTable from "@components/organisms/mgr/common/record/UserDetailRecordInterviewTable";
import NoRecord from "@components/organisms/mgr/common/record/NoRecord";

// formik
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  RecordUserDetailValues
} from "@initialize/mgr/IAB/record/userDetail/initialValues";
import validation from "@initialize/mgr/IAB/record/userDetail/validation";
import { toEffectiveObject } from "@utils/object";
import isEqual from "lodash-es/isEqual";

interface OwnProps {
  pageName: string;
  userName: string;
  uifId: string;
  year: string;
  month: string;
  recordType: "support" | "work" | "interview";
  supportsRecord: SupportsState["supportsRecord"];
  work: WorkState;
  staff: StaffState;
  workOptions: CategorizedFieldItem[];
  staffOptions: FieldItem[];
  recordUserDetail: RecordUserDetailState;
  history: H.History;
  serviceType: string;
  isMeal: boolean;
  isTransfer: boolean;
}
interface StateProps {
  needsStopHistory: boolean;
}
interface DispatchProps {
  postUserDetailRecord: (
    uifId: string,
    params: RecordUserDetailValues,
    initialValue: RecordUserDetailValues,
    year: string,
    month: string,
    work: WorkState,
    staff: StaffState,
    recordType: "support" | "work" | "interview"
  ) => void;
  setEditing: (inoutId?: number) => void;
  unsetEditing: () => void;
  stopHistory: (flag: boolean) => void;
  showSnackbar: (params: SnackbarParams) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

/**
 * 利用者ごとの支援記録・面談記録・作業記録の管理を扱う
 */
const UserDetailRecord = (props: Props) => {
  let noRecordMessage = "";
  if (
    !props.supportsRecord.support ||
    props.supportsRecord.support.length === 0
  ) {
    if (props.recordType === "support") {
      noRecordMessage =
        "利用実績がありません。利用実績を入力後、ご利用ください。";
    } else if (props.recordType === "work") {
      noRecordMessage =
        "作業記録がありません。支援記録から入力後、ご利用ください。";
    } else if (props.recordType === "interview") {
      noRecordMessage =
        "面談記録がありません。支援記録から入力後、ご利用ください。";
    }
  }
  const hasRecord = noRecordMessage === "";

  // state
  const [formValues, setFormValues] = React.useState(
    initialValues(props.supportsRecord.support)
  );

  // mount & update
  React.useEffect(() => {
    return () => {
      props.unsetEditing(); // domをumMountするタイミングで編集状態を破棄する
    };
  }, []);
  React.useEffect(() => {
    setFormValues(initialValues(props.supportsRecord.support));
  }, [props.supportsRecord.support]);

  // handler
  const onClickEdit = (e: React.MouseEvent) => {
    props.setEditing();
    e.preventDefault();
  };

  // formik handler
  const confirmDiscardFormChanges = (nextValues: RecordUserDetailValues) => {
    const hasChange = !isEqual(nextValues, formValues);
    if (hasChange) {
      props.stopHistory(true);
    }
  };
  const validate = (values: RecordUserDetailValues) => {
    const validationResult = validation(values);
    const error = toEffectiveObject(validationResult);
    if (!props.needsStopHistory) {
      confirmDiscardFormChanges(values);
    }
    return error;
  };
  const onSubmit = async (
    values: RecordUserDetailValues,
    actions: FormikActions<{}>
  ) => {
    actions.setSubmitting(true);
    await props.postUserDetailRecord(
      props.uifId,
      values,
      formValues,
      props.year,
      props.month,
      props.work,
      props.staff,
      props.recordType
    );
    actions.setSubmitting(false);
    props.stopHistory(false);
  };

  const submitError = () => {
    props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  return (
    <Formik
      initialValues={formValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formikProps): JSX.Element => {
        const onClickEditCancel = () => {
          formikProps.resetForm();
          props.unsetEditing();
          setFormValues(initialValues(props.supportsRecord.support));
          props.stopHistory(false);
        };
        return (
          <Form>
            {props.recordType === "support" && (
              <RecordHeaderAllEditType
                pageName={props.pageName}
                userName={props.userName}
                hasRecord={hasRecord}
                uifId={props.uifId}
                year={props.year}
                month={props.month}
                recordType={props.recordType}
                isEditing={props.recordUserDetail.isEditing}
                onClickEdit={onClickEdit}
                onClickEditCancel={onClickEditCancel}
                formikProps={formikProps}
                history={props.history}
              />
            )}
            {(props.recordType === "work" ||
              props.recordType === "interview") && (
              <RecordHeaderLinkButtonType
                pageName={props.pageName}
                userName={props.userName}
                hasRecord={hasRecord}
                uifId={props.uifId}
                year={props.year}
                month={props.month}
                recordType={props.recordType}
                isEditing={props.recordUserDetail.isEditing}
                history={props.history}
              />
            )}
            {hasRecord ? (
              <>
                {props.recordType === "support" && (
                  <UserDetailRecordSupportTable
                    supportsRecord={props.supportsRecord}
                    workOptions={props.workOptions}
                    staffOptions={props.staffOptions}
                    isEditing={props.recordUserDetail.isEditing}
                    serviceType={props.serviceType}
                    isMeal={props.isMeal}
                    isTransfer={props.isTransfer}
                  />
                )}
                {props.recordType === "work" && (
                  <UserDetailRecordWorkTable
                    supportsRecord={props.supportsRecord}
                    workOptions={props.workOptions}
                    staffOptions={props.staffOptions}
                    recordUserDetail={props.recordUserDetail}
                    setEditing={props.setEditing}
                    onClickEditCancel={onClickEditCancel}
                    formikProps={formikProps}
                    isMeal={props.isMeal}
                    isTransfer={props.isTransfer}
                  />
                )}
                {props.recordType === "interview" && (
                  <UserDetailRecordInterviewTable
                    supportsRecord={props.supportsRecord}
                    workOptions={props.workOptions}
                    staffOptions={props.staffOptions}
                    recordUserDetail={props.recordUserDetail}
                    setEditing={props.setEditing}
                    onClickEditCancel={onClickEditCancel}
                    formikProps={formikProps}
                    onSubmitError={submitError}
                    isMeal={props.isMeal}
                    isTransfer={props.isTransfer}
                  />
                )}
              </>
            ) : (
              <NoRecord message={noRecordMessage} />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const recordUserDetailDispatcher = pages.recordUserDetailDispatcher(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    postUserDetailRecord: (
      uifId: string,
      params: RecordUserDetailValues,
      initialValue: RecordUserDetailValues,
      year: string,
      month: string,
      work: WorkState,
      staff: StaffState,
      recordType: "support" | "work" | "interview" | "support_plan"
    ) => {
      const target =
        recordType === "work" || recordType === "interview"
          ? recordType
          : undefined;
      recordUserDetailDispatcher.postUserDetailRecord(
        uifId,
        params,
        initialValue,
        { work, staff },
        { year, month, target }
      );
    },
    setEditing: (inoutId?: number) =>
      dispatch(recordUserDetailActions.setEdit(inoutId)),
    unsetEditing: () => dispatch(recordUserDetailActions.unsetEdit()),
    showSnackbar: (params: SnackbarParams) => uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailRecord);
