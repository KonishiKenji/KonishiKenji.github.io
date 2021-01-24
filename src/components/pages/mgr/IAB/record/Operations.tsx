import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

// store
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as recordMonthlyActions from "@stores/pages/record/monthly/actions";
import { AppState } from "@stores/type";
import { OperationsState } from "@stores/domain/operations/types";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";

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
import DateSelectButtonsMonthly from "@components/molecules/DateSelectButtonsMonthly";
import MonthlyOperationDiary from "@components/organisms/mgr/IAB/record/MonthlyOperationDiary";
import NoRecord from "@components/organisms/mgr/common/record/NoRecord";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import UnEditableWrapper from "@components/atoms/UnEditableWrapper";
import { STICKY_BOX_SHADOW, STICKY_NONE_BOX_SHADOW } from "@constants/styles";

// utils
import { RECORD_OPERATIONS } from "@/constants/url";
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";
import generateWorkCategorizedFieldItems from "@utils/domain/work/generateWorkCategorizedFieldItems";

const styles = (): StyleRules =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 16px 12px",
      zIndex: 1000,
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
    operationDiaryWrapper: {
      margin: 16
    },
    supportRecordWrapper: {
      margin: 16
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

interface StateProps {
  monthlyRecord: OperationsState["monthlyRecord"];
  work: WorkState;
  staff: StaffState;
  isEditing: boolean;
  editDate: string;
}

interface DispatchProps {
  fetchMonthlyRecord: (year: string, month: string) => Promise<void>;
  fetchInitialMonthlyRecord: (year: string, month: string) => Promise<void>;
  setEditing: (targetDate: string) => void;
  unsetEditing: () => void;
}

type OwnProps = RouteComponentProps<{ year?: string; month?: string }> &
  WithStyles<typeof styles>;

interface MergeProps extends OwnProps, StateProps, DispatchProps {
  staffOptions: FieldItem[];
  workOptions: CategorizedFieldItem[];
}

/**
 * 業務日誌
 */
const RecordMonthly = (props: MergeProps): JSX.Element => {
  const scrollYValue = 48;
  const currentDate = new Date();
  const calendarMinDate = new Date(2000, 0, 1);
  const calendarMaxDate = new Date(2049, 11, 31);
  const year = props.match.params.year
    ? props.match.params.year
    : currentDate.getFullYear().toString();
  const month = props.match.params.month
    ? props.match.params.month
    : (currentDate.getMonth() + 1).toString();
  let noRecord = true;
  props.monthlyRecord.operation.some((item): boolean => {
    if (item.record) {
      noRecord = false;
      return true;
    }
    return false;
  });

  const selectDate =
    props.match.params.year && props.match.params.month
      ? new Date(
          parseInt(props.match.params.year, 10),
          parseInt(props.match.params.month, 10) - 1,
          1
        )
      : currentDate;

  const [selectedDate, setTargetDate] = React.useState({
    year,
    month,
    currentDate: selectDate
  });
  const [stickyFlg, setStickyFlg] = React.useState(false);

  const isFirstRef = React.useRef(false);

  // mount & update
  React.useEffect(() => {
    if (isFirstRef.current) {
      props.history.push(
        `${RECORD_OPERATIONS}/${selectedDate.year}/${selectedDate.month}`
      );
      props.fetchMonthlyRecord(selectedDate.year, selectedDate.month);
    } else {
      props.history.push(
        `${RECORD_OPERATIONS}/${selectedDate.year}/${selectedDate.month}`
      );
      props.fetchInitialMonthlyRecord(selectedDate.year, selectedDate.month);
      isFirstRef.current = true;
    }
  }, [selectedDate]);

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
    };
  }, []);

  // event handler
  const onClickCalendar = (date: Date): void => {
    setTargetDate({
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString(),
      currentDate: date
    });
  };
  const onChangeEditMode = (targetDate: string): void => {
    props.setEditing(targetDate);
  };
  const onChangePreviewMode = React.useCallback(() => {
    props.unsetEditing();
  }, []);
  const onPrintPreview = (): void => {
    props.history.push(
      `/record/print/operations/${selectedDate.year}/${selectedDate.month}`
    );
  };

  return (
    <AdminTemplate pageName="業務日誌">
      <div
        className={props.classes.header}
        style={
          stickyFlg
            ? { boxShadow: STICKY_BOX_SHADOW }
            : { boxShadow: STICKY_NONE_BOX_SHADOW }
        }
      >
        <UnEditableWrapper unEditable={props.editDate !== ""}>
          <DateSelectButtonsMonthly
            selectedMonth={selectedDate.currentDate}
            min={calendarMinDate}
            max={calendarMaxDate}
            onClickSubmit={onClickCalendar}
          />
        </UnEditableWrapper>
        <div className={props.classes.buttons}>
          <Button
            className={props.classes.buttonShadowNone}
            variant="contained"
            color="secondary"
            disabled={noRecord || props.isEditing}
            onClick={onPrintPreview}
          >
            印刷
          </Button>
        </div>
      </div>
      {!(props.monthlyRecord.operation.length > 0) ||
      !props.monthlyRecord.operation[0].date ? null : (
        <div className={props.classes.operationDiaryWrapper}>
          <CreateAndUpdateDate
            createdAt={props.monthlyRecord.created_at}
            updatedAt={props.monthlyRecord.updated_at}
          />
        </div>
      )}
      {!(props.monthlyRecord.operation.length > 0) ||
      !props.monthlyRecord.operation[0].date ? (
        <div className={props.classes.paperWrapper}>
          <div className={props.classes.preNoRecode}>
            <CreateAndUpdateDate />
          </div>
          <NoRecord
            message="利用実績がありません。利用実績を入力後、ご利用ください。"
            targetRecordDate={selectedDate.currentDate}
          />
        </div>
      ) : (
        <>
          {props.monthlyRecord.operation.map((data) => (
            <div className={props.classes.paperWrapper} key={data.date}>
              <MonthlyOperationDiary
                operation={data}
                isEditing={
                  data.date === props.editDate ? props.isEditing : false
                }
                /* editDateが入っていない＝どこも編集されていない。 
                   editDateの日付と対象レコードの日付が一致している＝対象レコードが編集中と判断 */
                isEditMode={
                  props.editDate === "" || data.date === props.editDate
                } /* 編集可能領域にするかどうか。true編集可能。false編集不可とする */
                selectedMonth={selectedDate.currentDate}
                onChangeEditMode={onChangeEditMode}
                onChangePreviewMode={onChangePreviewMode}
                workOptions={props.workOptions}
                staffOptions={props.staffOptions}
                work={props.work}
                staff={props.staff}
              />
            </div>
          ))}
        </>
      )}
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  monthlyRecord: state.operations.monthlyRecord,
  work: state.work,
  staff: state.staff,
  isEditing: state.pages.recordMonthly.isEditing,
  editDate: state.pages.recordMonthly.targetDate
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { operationsDispatcher, pages } = dispatches;
  const monthlyRecordDispatches = pages.recordMonthlyDispatcher(dispatch);
  const operationsDispatches = operationsDispatcher(dispatch);
  return {
    fetchMonthlyRecord: (year: string, month: string): Promise<void> =>
      operationsDispatches.fetchMonthlyRecord(year, month),
    fetchInitialMonthlyRecord: (year: string, month: string): Promise<void> =>
      monthlyRecordDispatches.fetchInitialMonthlyRecord(year, month),
    setEditing: (
      targetDate: string
    ): {
      readonly type: "PAGES/RECORD/MONTHLY/SET_EDIT";
      readonly payload: string;
    } => dispatch(recordMonthlyActions.setEdit(targetDate)),
    unsetEditing: (): { readonly type: "PAGES/RECORD/MONTHLY/UNSET_EDIT" } =>
      dispatch(recordMonthlyActions.unsetEdit())
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
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(RecordMonthly)
);
