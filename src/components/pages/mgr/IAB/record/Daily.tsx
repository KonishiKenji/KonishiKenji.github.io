import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as recordDailyActions from "@stores/pages/record/daily/actions";
import { Formik, Form, FormikActions } from "formik";
import initialValues, {
  RecordDailyValues
} from "@initialize/mgr/IAB/record/daily/initialValues";
import validation from "@initialize/mgr/IAB/record/daily/validation";
import { AppState } from "@stores/type";
import { OperationsState } from "@stores/domain/operations/types";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import { IABInOutReportState } from "@stores/domain/mgr/IAB/report/types";
import { UserResult, UserState } from "@stores/domain/user/type";
import { SnackbarParams } from "@stores/ui/type";
import { SET_EDIT, UNSET_EDIT } from "@stores/pages/record/daily/types";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";

// ui
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AdminTemplate from "@components/templates/AdminTemplate";
import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";
import DateSelectButtonsDaily from "@components/molecules/DateSelectButtonsDaily";
import NoRecord from "@components/organisms/mgr/common/record/NoRecord";
import DailyOperationDiary from "@components/organisms/mgr/IAB/record/DailyOperationDiary";
import DailySupportRecord from "@components/organisms/mgr/common/record/DailySupportRecord";
import CommonPrintModal from "@components/organisms/mgr/common/record/CommonPrintModal";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import UnEditableWrapper from "@components/atoms/UnEditableWrapper";
import { STICKY_BOX_SHADOW, STICKY_NONE_BOX_SHADOW } from "@constants/styles";

// utils
import * as format from "date-fns/format";
import * as URL from "@constants/url";
import { RECORD_MODAL_TYPE } from "@constants/variables";
import { toEffectiveObject } from "@utils/object";
import convertBlankSeparatorFormatToDate from "@utils/date/convertBlankSeparatorFormatToDate";
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";
import generateWorkCategorizedFieldItems from "@utils/domain/work/generateWorkCategorizedFieldItems";
import isEqual from "lodash-es/isEqual";
import { dateToLocalisedString } from "@utils/date";

const styles = (): StyleRules =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 16px 12px",
      zIndex: 10,
      position: "sticky",
      top: 0,
      background: "#eeeeee"
    },
    buttons: {
      "& > button": {
        width: 120,
        marginLeft: 8
      }
    },
    paperWrapper: {
      margin: 16
    },
    preNoRecode: {
      marginBottom: 8
    },
    buttonShadowNone: {
      boxShadow: "none"
    }
  });

type OwnProps = RouteComponentProps<{ yyyymmdd?: string }> &
  WithStyles<typeof styles>;

interface StateProps {
  dailyRecord: OperationsState["dailyRecord"];
  work: WorkState;
  staff: StaffState;
  reportState: IABInOutReportState;
  isEditing: boolean;
  needsStopHistory: boolean;
  user: UserResult;
  facility: FacilityState;
}

interface DispatchProps {
  fetchDailyRecord: (yyyymmdd: string) => Promise<void>;
  fetchInitialDailyRecord: (yyyymmdd: string) => Promise<void>;
  fetchSummary: (date: Date) => void;
  postDailyRecord: (
    yyyymmdd: string,
    params: RecordDailyValues,
    initialValue: RecordDailyValues,
    work: WorkState,
    staff: StaffState
  ) => Promise<void>;
  setEditing: () => void;
  unsetEditing: () => void;
  stopHistory: (flag: boolean) => void;
  showSnackbar: (params: SnackbarParams) => void;
}

interface MergeProps extends StateProps, DispatchProps, OwnProps {
  staffOptions: FieldItem[];
  workOptions: CategorizedFieldItem[];
}

/**
 * 日々の記録
 */
const RecordDaily = (props: MergeProps): JSX.Element => {
  const scrollYValue = 48;
  const currentDate = props.match.params.yyyymmdd
    ? convertBlankSeparatorFormatToDate(props.match.params.yyyymmdd)
    : new Date();
  const calendarMinDate = new Date(2000, 0, 1);
  const calendarMaxDate = new Date(2049, 11, 31);
  const noRecord =
    !props.dailyRecord.support || props.dailyRecord.support.length === 0;

  const printable = props.dailyRecord.created_at === null;

  // state
  const [targetDay, setTargetDay] = React.useState(
    format(currentDate, "YYYYMMDD")
  );
  const [formValues, setFormValues] = React.useState(initialValues(targetDay));
  const isFirstRef = React.useRef(false);
  const [isOpenPrintModal, setOpenDetailModal] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [stickyFlg, setStickyFlg] = React.useState(false);

  // mount & update
  React.useEffect(() => {
    let unmounted = false;
    const listenScrollEvent = (): void => {
      if (unmounted) return;
      if (window.scrollY > scrollYValue) {
        setStickyFlg(true);
      } else {
        setStickyFlg(false);
      }
    };

    window.addEventListener("scroll", listenScrollEvent);
    return (): void => {
      unmounted = true;
      window.removeEventListener("scroll", listenScrollEvent);
      props.unsetEditing(); // domをumMountするタイミングで編集状態を破棄する
    };
  }, []);

  React.useEffect(() => {
    // URL変更
    const locationState = {
      pathname: `${URL.RECORD_DAILY}/${targetDay}`
    };
    if (props.match.params.yyyymmdd) {
      // TODO: ブラウザバックのバグが取れるまで履歴を持たなくする
      props.history.replace(locationState);
    } else {
      props.history.replace(locationState);
    }
    // API実行
    if (isFirstRef.current) {
      props.fetchDailyRecord(targetDay);
      props.fetchSummary(
        new Date(dateToLocalisedString(targetDay, "YYYY-MM-DD"))
      );
    } else {
      props.fetchInitialDailyRecord(targetDay);
      isFirstRef.current = true;
    }
  }, [targetDay]);
  React.useEffect(() => {
    setFormValues(initialValues(targetDay, props.dailyRecord));
  }, [props.dailyRecord, props.isEditing]);

  // event handler
  const onClickCalendar = (date: Date): void => {
    setTargetDay(format(date, "YYYYMMDD"));
  };
  const onClickEditCancel = (): void => {
    props.unsetEditing();
    setIsDisabled(false);
    props.stopHistory(false);
  };
  const onClickEdit = (e: React.MouseEvent): void => {
    props.setEditing();
    e.preventDefault();
    setIsDisabled(true);
  };
  const openPrintModal = (): void => {
    setOpenDetailModal(true);
  };
  const closePrintModal = (): void => {
    setOpenDetailModal(false);
  };
  const confirmDiscardFormChanges = (nextValues: RecordDailyValues): void => {
    const hasChange = !isEqual(nextValues, formValues);
    if (hasChange) {
      props.stopHistory(true);
    }
  };
  const validate = (values: RecordDailyValues): void | object => {
    const validationResult = validation(values);
    const error = toEffectiveObject(validationResult);
    if (!props.needsStopHistory) {
      confirmDiscardFormChanges(values);
    }
    return error;
  };
  const onSubmit = (
    values: RecordDailyValues,
    actions: FormikActions<RecordDailyValues>
  ): void => {
    actions.setSubmitting(true);
    props.postDailyRecord(
      targetDay,
      values,
      formValues,
      props.work,
      props.staff
    );
    actions.setSubmitting(false);
    setIsDisabled(false);
    props.stopHistory(false);
  };

  const submitError = (): void => {
    props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  return (
    <AdminTemplate pageName="日々の記録">
      <Formik
        initialValues={formValues}
        validate={validate}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formikProps): JSX.Element => {
          const onClickCancelEdit = (): void => {
            formikProps.resetForm();
            onClickEditCancel();
          };
          return (
            <Form>
              <div
                className={props.classes.header}
                style={
                  stickyFlg
                    ? { boxShadow: STICKY_BOX_SHADOW }
                    : { boxShadow: STICKY_NONE_BOX_SHADOW }
                }
              >
                <UnEditableWrapper unEditable={props.isEditing}>
                  <DateSelectButtonsDaily
                    defaultDate={currentDate}
                    min={calendarMinDate}
                    max={calendarMaxDate}
                    onClickSubmit={onClickCalendar}
                  />
                </UnEditableWrapper>
                <div className={props.classes.buttons}>
                  {props.isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClickCancelEdit}
                      >
                        キャンセル
                      </Button>
                      <FormikSubmitButton
                        buttonName="保存する"
                        formikProps={formikProps}
                        errorAction={submitError}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        className={props.classes.buttonShadowNone}
                        variant="contained"
                        color="secondary"
                        disabled={printable}
                        onClick={openPrintModal}
                      >
                        印刷
                      </Button>
                      <Button
                        className={props.classes.buttonShadowNone}
                        variant="contained"
                        color="secondary"
                        onClick={onClickEdit}
                        disabled={noRecord}
                      >
                        編集
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {noRecord ? (
                <div className={props.classes.paperWrapper}>
                  <div className={props.classes.preNoRecode}>
                    <CreateAndUpdateDate />
                  </div>
                  <NoRecord message="利用実績がありません。利用実績を入力後、ご利用ください。" />
                </div>
              ) : (
                <>
                  <div className={props.classes.paperWrapper}>
                    <DailyOperationDiary
                      formikProps={formikProps}
                      operation={props.dailyRecord.operation}
                      workOptions={props.workOptions}
                      staffOptions={props.staffOptions}
                      contentData={props.reportState}
                      created_at={props.dailyRecord.created_at}
                      updated_at={props.dailyRecord.updated_at}
                      serviceType={props.user.facility_type}
                      isEditing={props.isEditing}
                      targetDate={currentDate}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className={props.classes.paperWrapper}>
                    <DailySupportRecord
                      support={props.dailyRecord.support}
                      workOptions={props.workOptions}
                      staffOptions={props.staffOptions}
                      isEditing={props.isEditing}
                      // 事業所情報_食事の状態
                      isMeal={props.facility.mealSaservedServiceFlag}
                      // 事業所情報_送迎の状態
                      isTransfer={props.facility.transferServiceFlag}
                    />
                  </div>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
      {isOpenPrintModal && (
        <CommonPrintModal
          isModalOpen={isOpenPrintModal}
          onClose={closePrintModal}
          modalType={RECORD_MODAL_TYPE.daily}
          yyyymmdd={props.match.params.yyyymmdd}
          history={props.history}
        />
      )}
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  dailyRecord: state.operations.dailyRecord,
  work: state.work,
  staff: state.staff,
  reportState: state.IAB.report,
  isEditing: state.pages.recordDaily.isEditing,
  needsStopHistory: state.ui.needsStopHistory,
  user: state.user as UserState,
  facility: state.IAB.facility
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { operationsDispatcher, pages, uiDispatch, IAB } = dispatches;
  const dailyRecordDispatches = pages.recordDailyDispatcher(dispatch);
  const operationsDispatches = operationsDispatcher(dispatch);
  const uiDispatches = uiDispatch(dispatch);
  const reportDispatcher = IAB.reportDispatcher(dispatch);
  return {
    fetchDailyRecord: (yyyymmdd: string): Promise<void> =>
      operationsDispatches.fetchDailyRecord(yyyymmdd),
    fetchInitialDailyRecord: (yyyymmdd: string): Promise<void> =>
      dailyRecordDispatches.fetchInitialDailyRecord(yyyymmdd),
    fetchSummary: (date: Date): Promise<void> =>
      reportDispatcher.fetchDailySummary(date),

    postDailyRecord: (
      yyyymmdd: string,
      params: RecordDailyValues,
      initialValue: RecordDailyValues,
      work: WorkState,
      staff: StaffState
    ): Promise<void> =>
      dailyRecordDispatches.postDailyRecord(yyyymmdd, params, initialValue, {
        work,
        staff
      }),
    setEditing: (): { type: typeof SET_EDIT } =>
      dispatch(recordDailyActions.setEdit()),
    unsetEditing: (): { type: typeof UNSET_EDIT } =>
      dispatch(recordDailyActions.unsetEdit()),
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  // 記録者フィールドに渡すoptions
  const staffOptions = generateSelectFieldItems(
    stateProps.staff.staffItems,
    "staffName",
    "staffItemId",
    false
  );
  // 作業フィールドに渡すoptions
  const workOptions = generateWorkCategorizedFieldItems(
    stateProps.work.workData
  );
  return {
    staffOptions,
    workOptions,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(RecordDaily)
);
