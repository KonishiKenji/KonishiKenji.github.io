import * as React from "react";
import * as H from "history";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { SnackbarParams } from "@stores/ui/type";

// ui
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import KnowbeButton from "@components/presentational/atoms/KnowbeButton";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import RecordHeader from "@components/organisms/mgr/common/record/RecordHeader";
import CommonPrintModal from "@components/organisms/mgr/common/record/CommonPrintModal";
import SupportPlanPrintModal from "@components/organisms/mgr/common/record/SupportPlanPrintModal";
import SupportPlanEvaluationPrintModal from "@components/organisms/mgr/common/record/SupportPlanEvaluationPrintModal";
import { RECORD_MODAL_TYPE } from "@constants/variables";
import { FormikProps } from "formik";

const styles = (): StyleRules =>
  createStyles({
    button: {
      width: 120,
      boxShadow: "none",
      "&:last-child": {
        marginLeft: 8
      }
    }
  });
const buttonStyles: React.CSSProperties = {
  width: 120,
  marginLeft: 8
};
interface DispatchProps {
  showSnackbar: (params: SnackbarParams) => void;
}

interface OwnProps {
  uifId: string;
  recordType: "support" | "work" | "interview" | "support_plan";
  isEditing: boolean;
  history: H.History;
  pageName: string;
  userName: string;
  hasRecord: boolean;
  year?: string;
  month?: string;
  supportPlanId?: string;
  onClickEdit: (e: React.MouseEvent) => void;
  onClickEditCancel: () => void;
  formikProps: FormikProps<any>;
  isEvaluation?: boolean;
}
type Props = OwnProps & DispatchProps & WithStyles<typeof styles>;

/**
 * 支援記録・個別支援計画（閲覧・編集）で利用
 * 閲覧中: 編集開始ボタン・印刷ボタン（モーダルを出す）
 * 編集中: 編集確定ボタン・キャンセルボタン
 */
const RecordHeaderAllEditType = (props: Props): JSX.Element => {
  // state
  const [isOpenPrintModal, setOpenDetailModal] = React.useState(false);

  // handler
  const onClickPrint = (): void => {
    setOpenDetailModal(true);
  };
  const onClosePrintModal = (): void => {
    setOpenDetailModal(false);
  };

  const submitError = (): void => {
    props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  const Buttons: JSX.Element[] = [];
  if (props.isEditing) {
    Buttons.push(
      <KnowbeButton
        kind="outlineWhite"
        key="cancel-button"
        onClick={props.onClickEditCancel}
      >
        キャンセル
      </KnowbeButton>
    );
    Buttons.push(
      <FormikSubmitButton
        key="submit-button"
        buttonName="保存する"
        formikProps={props.formikProps}
        className={props.classes.button}
        errorAction={submitError}
      />
    );
  } else {
    Buttons.push(
      <KnowbeButton
        key="print-button"
        disabled={props.isEditing}
        onClick={onClickPrint}
      >
        印刷
      </KnowbeButton>
    );
    Buttons.push(
      <KnowbeButton
        key="edit-start-button"
        style={buttonStyles}
        onClick={props.onClickEdit}
      >
        編集
      </KnowbeButton>
    );
  }

  return (
    <>
      <RecordHeader
        uifId={props.uifId}
        recordType={props.recordType}
        isEditing={props.isEditing}
        history={props.history}
        pageName={props.pageName}
        userName={props.userName}
        hideTitle={!props.hasRecord}
        button={Buttons}
      />
      {/* 支援記録用 */}
      {props.recordType === "support" && isOpenPrintModal && (
        <CommonPrintModal
          isModalOpen={isOpenPrintModal}
          onClose={onClosePrintModal}
          history={props.history}
          modalType={RECORD_MODAL_TYPE.supportPinUser}
          uifId={props.uifId}
          year={props.year}
          month={props.month}
        />
      )}
      {/* 個別支援記録用 */}
      {props.recordType === "support_plan" &&
        isOpenPrintModal &&
        (props.isEvaluation ? (
          <SupportPlanEvaluationPrintModal
            isModalOpen={isOpenPrintModal}
            onClose={onClosePrintModal}
            history={props.history}
            uifId={props.uifId}
            supportPlanId={props.supportPlanId}
          />
        ) : (
          <SupportPlanPrintModal
            isModalOpen={isOpenPrintModal}
            onClose={onClosePrintModal}
            history={props.history}
            uifId={props.uifId}
            supportPlanId={props.supportPlanId}
          />
        ))}
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  return {
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatches.snackbar(params)
  };
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(RecordHeaderAllEditType)
);
