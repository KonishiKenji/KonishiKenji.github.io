import * as React from "react";
import * as H from "history";
import SupportPlanFields from "@components/organisms/mgr/A/record/SupportPlanFields";
import { Formik, Form, FormikActions } from "formik";
import { StaffState } from "@stores/domain/staff/types";
import { FieldItem } from "@interfaces/ui/form";
import { RecordSupportPlanValues } from "@initialize/mgr/A/record/supportPlan/initialValues";
import validation from "@initialize/mgr/A/record/supportPlan/validation";
import { toEffectiveObject } from "@utils/object";
import deepEqual from "fast-deep-equal";
import { ErrorsState } from "@stores/domain/errors/types";

interface StateProps {
  errorsState: ErrorsState["plan"]["data"];
}
interface OwnProps {
  pageName: string;
  userName: string;
  uifId: string;
  supportPlanId?: string;
  creationDate: string | null;
  previousCreationDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  isEditing: boolean;
  staff: StaffState;
  staffOptions: FieldItem[];
  mergedStaffOptions: FieldItem[];
  authorValue: string;
  authorizerValue: string;
  authorizerRole: string;
  participantValue: string;
  initialValues: RecordSupportPlanValues;
  history: H.History;
  needsStopHistory: boolean;
  stopHistory: (flag: boolean) => void;
  postSupportPlan: (values: RecordSupportPlanValues) => Promise<void>;
  editStartAction?: () => void;
  editCancelAction: () => void;
  deleteStartAction?: () => void;
}
type Props = OwnProps & StateProps;

/**
 *
 */
const SupportPlanForm = (props: Props): JSX.Element => {
  const onSubmit = async (
    values: RecordSupportPlanValues,
    actions: FormikActions<{}>
  ): Promise<void> => {
    actions.setSubmitting(true);
    await props.postSupportPlan(values);
    actions.setSubmitting(false);
  };

  const confirmDiscardFormChanges = (
    nextValues: RecordSupportPlanValues
  ): void => {
    const hasChange = !deepEqual(nextValues, props.initialValues);
    if (hasChange) {
      props.stopHistory(true);
    }
  };

  const validate = (values: RecordSupportPlanValues): void | object => {
    const validationResult = validation(values);
    const error = toEffectiveObject(validationResult);
    if (!props.needsStopHistory) {
      confirmDiscardFormChanges(values);
    }
    return error;
  };

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={validate}
      enableReinitialize
    >
      {(formikProps): JSX.Element => {
        // 編集モードに変更（閲覧時のみ）
        const onClickEdit = (): void => {
          if (props.editStartAction) {
            props.editStartAction();
          }
        };
        // formを消去して所属に応じたアクションを行う
        const onClickEditCancel = (): void => {
          // createdAtがある => 必ず編集の時
          if (props.createdAt) {
            formikProps.resetForm();
          }
          props.editCancelAction();
        };
        return (
          <Form>
            <SupportPlanFields
              {...props}
              onClickEdit={onClickEdit}
              onClickEditCancel={onClickEditCancel}
              onClickDelete={props.deleteStartAction}
              formikProps={formikProps}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SupportPlanForm;
