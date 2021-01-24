import * as React from "react";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Formik, Form } from "formik";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";

import { GetOperations } from "@api/requests/operations/getOperations";

import SectionTitleWithButton from "@components/molecules/SectionTitleWithButton";
import UsageSituationBox from "@components/atoms/UsageSituationBox";
import RecordSelect from "@components/organisms/mgr/common/record/RecordSelect";
import RecordTextField from "@components/organisms/mgr/common/record/RecordTextField";
import RecordMultipleSelect from "@components/organisms/mgr/common/record/RecordMultipleSelect";
import InOutReportModal from "@components/organisms/mgr/common/report/InOutReportModal";

import { SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS } from "@constants/variables";
import initialValues, {
  RecordMonthlyValues
} from "@initialize/mgr/SEIKATSUKAIGO/record/monthly/initialValues";
import { UserState } from "@stores/domain/user/type";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import { OperationsState } from "@stores/domain/operations/types";
import {
  REPEAT_DAILY,
  SEIKATSUKAIGOInOutReportState,
  UNSET_SEIKATSUKAIGO_DAILY_SUMMARY
} from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import * as SEIKATSUKAIGOReportActions from "@stores/domain/mgr/SEIKATSUKAIGO/report/actions";

import { AppState } from "@stores/type";
import dispatches from "@stores/dispatches";

import convertMinutesToTime from "@utils/date/convertMinutesToTime";
import generateWorkOptions from "@utils/domain/work/generateWorkOptions";
import get from "lodash-es/get";

import * as format from "date-fns/format";
import * as jaLocale from "date-fns/locale/ja";

const styles = (): StyleRules =>
  createStyles({
    root: {
      padding: 32,
      marginTop: 8
    },
    buttons: {
      "& > button": {
        width: 120,
        marginLeft: 16,
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    usageSituation: {
      display: "flex",
      marginBottom: 16,
      "& > div": {
        marginRight: 16
      }
    },
    usageDetailButton: {
      padding: "2px 16px"
    },
    recordWrapper: {
      margin: "32px 0 40px"
    },
    splitSection: {
      display: "flex",
      marginBottom: 16,
      "& > :first-child": {
        marginRight: 16
      }
    },
    footerButtons: {
      marginTop: 16,
      paddingTop: 24,
      borderTop: "1px dashed #ccc",
      display: "flex",
      justifyContent: "flex-end"
    },
    section: {
      marginBottom: 16
    },
    editable: {
      opacity: 1
    },
    unEditable: {
      opacity: 0.5,
      zIndex: 1000,
      pointerEvents: "none"
    },
    recorder: {
      width: 240,
      marginLeft: "auto"
    }
  });

interface OwnProps {
  operation: GetOperations["data"]["operation"][0];
  workOptions: CategorizedFieldItem[];
  staffOptions: FieldItem[];
  work: WorkState;
  staff: StaffState;
  isEditing: boolean;
  isEditMode: boolean;
  selectedMonth: Date;
  onChangeEditMode: (targetDate: string) => void;
  onChangePreviewMode: () => void;
}

interface StateProps {
  user: UserState;
  monthlyRecord: OperationsState["monthlyRecord"];
  reportState: SEIKATSUKAIGOInOutReportState;
  needsStopHistory: boolean;
}

interface DispatchProps {
  postMonthlyRecord: (
    year: string,
    month: string,
    params: RecordMonthlyValues,
    initialValue: RecordMonthlyValues,
    work: WorkState,
    staff: StaffState
  ) => Promise<void>;
  fetchSummary: (date: Date) => void;
  unsetSummary: () => void;
  stopHistory: (flag: boolean) => void;
}

type Props = OwnProps & StateProps & DispatchProps & WithStyles<typeof styles>;

/**
 * 業務日誌
 */
const MonthlyOperationDiary = (props: Props): JSX.Element => {
  const [formValues, setFormValues] = React.useState(
    initialValues(props.operation.date)
  );
  const [isDisabled, setIsDisabled] = React.useState(false);
  const operationWorkHistory = props.operation.operation_work_history || [];
  const operationWorkHistoryValue = operationWorkHistory
    .map((history) => history.item_name)
    .join("、");
  const workOptions = generateWorkOptions(
    props.workOptions,
    props.operation.operation_work_history
  );
  // 面談時間
  const interviewTime = convertMinutesToTime(
    props.operation.counts.totalInterviewMinutes
  );
  const interviewTimeUnit =
    interviewTime.hour === "0" && interviewTime.minutes === "00"
      ? "0分"
      : `${interviewTime.hour}時間${interviewTime.minutes}分`;

  // mount & update
  React.useEffect(() => {
    return (): void => {
      props.onChangePreviewMode(); // domをumMountするタイミングで編集状態を破棄する
    };
  }, []);

  React.useEffect(() => {
    setFormValues(initialValues(props.operation.date, props.operation));
  }, [props.monthlyRecord, props.isEditing]);

  const onClickEdit = (e: React.MouseEvent): void => {
    props.onChangeEditMode(props.operation.date);
    e.preventDefault();
    setIsDisabled(true);
  };

  const onClickEditCancel = (e: React.MouseEvent): void => {
    props.onChangePreviewMode();
    e.preventDefault();
    setIsDisabled(false);
    props.stopHistory(false);
  };

  const onSubmit = (values: RecordMonthlyValues): void => {
    props.postMonthlyRecord(
      props.selectedMonth.getFullYear().toString(),
      (props.selectedMonth.getMonth() + 1).toString(),
      values,
      formValues,
      props.work,
      props.staff
    );
    setIsDisabled(false);
    props.stopHistory(false);
  };

  // 利用状況の詳細
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const date = new Date(props.operation.date);
  const openDialog = (): void => {
    props.unsetSummary(); // 他の画面や日時で取得した値が残っているためこのタイミングでリセット
    props.fetchSummary(date);
    setIsOpenDialog(true);
  };
  const closeDialog = (): void => {
    setIsOpenDialog(false);
  };

  return (
    <div
      className={
        props.isEditMode ? props.classes.editable : props.classes.unEditable
      }
    >
      <Paper classes={{ root: props.classes.root }}>
        <Formik
          initialValues={formValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formikProps): JSX.Element => {
            const onClickEditCancelHandler = (e: React.MouseEvent): void => {
              formikProps.resetForm();
              onClickEditCancel(e);
            };
            return (
              <Form>
                <SectionTitleWithButton
                  label={
                    props.operation.date
                      ? format(props.operation.date, "M月D日 （dd）", {
                          locale: jaLocale
                        })
                      : "-月 -日 "
                  }
                >
                  <div className={props.classes.buttons}>
                    {!props.isEditing && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClickEdit}
                      >
                        編集
                      </Button>
                    )}
                  </div>
                </SectionTitleWithButton>
                <div className={props.classes.usageSituation}>
                  <UsageSituationBox
                    label="通所"
                    value={props.operation.counts.numberOfUsingServiceUsers}
                    unit={`/${props.operation.counts.numberOfUsers}人`}
                  />
                  <UsageSituationBox
                    label="欠席時対応"
                    value={props.operation.counts.numberOfAbsence}
                    unit={`/${props.operation.counts.numberOfUsers}人`}
                  />
                  <UsageSituationBox
                    label="面談"
                    value={props.operation.counts.numberOfHavingInterview}
                    unit={`/${props.operation.counts.numberOfUsers}人(${interviewTimeUnit})`}
                  />
                </div>
                <Button
                  variant="outlined"
                  color="secondary"
                  classes={{ outlined: props.classes.usageDetailButton }}
                  onClick={openDialog}
                  disabled={isDisabled}
                >
                  利用状況の詳細
                </Button>
                <div className={props.classes.recordWrapper}>
                  <div className={props.classes.splitSection}>
                    <RecordTextField
                      label="午前"
                      value={
                        props.operation.record &&
                        props.operation.record.operation_in_the_morning
                          ? props.operation.record.operation_in_the_morning
                          : ""
                      }
                      defaultValue="-"
                      placeholder="入力してください"
                      name="operation[0].operation_in_the_morning"
                      isEditable={props.isEditing}
                    />
                    <RecordTextField
                      name="operation[0].operation_in_the_afternoon"
                      label="午後"
                      value={
                        (props.operation.record &&
                          props.operation.record.operation_in_the_afternoon) ||
                        ""
                      }
                      defaultValue="-"
                      placeholder="入力してください"
                      isEditable={props.isEditing}
                    />
                  </div>
                  <div className={props.classes.section}>
                    <RecordMultipleSelect
                      name="operation[0].operation_work_history.itemIdList"
                      label="作業"
                      value={operationWorkHistoryValue}
                      options={workOptions}
                      defaultValue="未実施"
                      placeholder="選択してください"
                      isEditable={props.isEditing}
                      emptyText="作業の登録がありません。作業情報画面から作業を登録してください。"
                    />
                  </div>
                  <div className={props.classes.section}>
                    <RecordTextField
                      label="その他"
                      value={
                        props.operation.record &&
                        props.operation.record.operation_other_comment
                          ? props.operation.record.operation_other_comment
                          : ""
                      }
                      defaultValue="-"
                      placeholder="入力してください"
                      name="operation[0].operation_other_comment"
                      isEditable={props.isEditing}
                    />
                  </div>
                </div>
                <div className={props.classes.recorder}>
                  <RecordSelect
                    name="operation[0].staff_id"
                    label="記録者"
                    value={get(props.operation.record, "staff_name") || ""}
                    options={props.staffOptions}
                    defaultValue="未設定"
                    placeholder="選択してください"
                    isEditable={props.isEditing}
                    isSelectablePlaceholder
                    emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
                  />
                </div>
                {props.isEditing && (
                  <div
                    className={`${props.classes.buttons} + ${props.classes.footerButtons}`}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={onClickEditCancelHandler}
                    >
                      キャンセル
                    </Button>
                    <Button type="submit" variant="contained" color="secondary">
                      保存する
                    </Button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </Paper>
      {isOpenDialog && (
        <InOutReportModal
          countsPerStatus={
            props.reportState.SEIKATSUKAIGOSummary.countsPerStatus
          }
          inOutRecords={props.reportState.SEIKATSUKAIGOSummary.inoutRecords}
          isOpen={isOpenDialog}
          onClose={closeDialog}
          targetName=""
          date={date}
          type={REPEAT_DAILY}
          pageType="record"
          serviceType={props.user.facility_type}
          summaryServiceStatus={SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserState,
  monthlyRecord: state.operations.monthlyRecord,
  reportState: state.SEIKATSUKAIGO.report,
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { pages, uiDispatch } = dispatches;
  const monthlyRecordDispatches = pages.recordMonthlyDispatcher(dispatch);
  const { SEIKATSUKAIGO } = dispatches;
  const reportDispacher = SEIKATSUKAIGO.reportDispacher(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  return {
    postMonthlyRecord: (
      year: string,
      month: string,
      params: RecordMonthlyValues,
      initialValue: RecordMonthlyValues,
      work: WorkState,
      staff: StaffState
    ): Promise<void> =>
      monthlyRecordDispatches.postMonthlyRecord(
        year,
        month,
        params,
        initialValue,
        {
          work,
          staff
        }
      ),
    fetchSummary: (date: Date): Promise<void> =>
      reportDispacher.fetchDailySummary(date),
    unsetSummary: (): { type: typeof UNSET_SEIKATSUKAIGO_DAILY_SUMMARY } =>
      dispatch(SEIKATSUKAIGOReportActions.unsetSEIKATSUKAIGODailySummary()),
    stopHistory: uiDispatches.stopHistory
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MonthlyOperationDiary)
);
