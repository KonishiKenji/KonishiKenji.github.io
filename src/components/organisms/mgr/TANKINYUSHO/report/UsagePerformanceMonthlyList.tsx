import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  REPEAT_MONTHLY
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import UsagePerformanceMonthlyHeader from "./UsagePerformanceMonthlyHeader";
import UsagePerformanceMonthlyHeaderEdit from "./UsagePerformanceMonthlyHeaderEdit";
import UsagePerformanceMonthlyTable from "./UsagePerformanceMonthlyTable";
import isEmpty from "lodash-es/isEmpty";
import { OptionInterface } from "@components/atoms/DropDown";
import UsagePerformanceReportDialog from "./UsagePerformanceReportDialog";
import {
  InitialDataValues,
  initialValues
} from "@initialize/mgr/TANKINYUSHO/report/initialValues";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    clear: {
      clear: "both"
    },
    headerWrapper: {
      position: "sticky",
      top: 0,
      backgroundColor: palette.background.default,
      zIndex: 10
    },
    headerInfoContainer: {
      marginTop: 6,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 20,
      width: "100%"
    },
    tableContainer: {
      padding: `0px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
      margin: `0px ${spacing.unit * 2}px ${spacing.unit * 2}px ${spacing.unit *
        2}px`
    }
  });

interface StateProps {
  reportState: ReportState;
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchMonthly: (uifId: number, date: Date) => void;
  fetchFacility: () => void;
  postTANKINYUSHOBulkRegistrationMonthly: (
    reportState: ReportState["reportMonthly"]
  ) => Promise<void>;
  fetchInoutError: (date: Date) => void;
  resetUsagePerformance: (reportState: ReportState) => void;
  openErrorsDialog: () => void;
  stopHistory: (flag: boolean) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  selectedDate: Date;
  isEditing: boolean;
  headerHeight: number;
  selectedMonth: Date;
  selectedUser: OptionInterface;
  isOpenUsagePerformanceReportDialog: boolean;
  data: InitialDataValues;
  key: string;
}

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);

/**
 * 利用実績（日ごと）
 */
class UsagePerformanceMonthlyList extends React.Component<Props, State> {
  public readonly state: State = {
    selectedDate: new Date(),
    isEditing: false,
    headerHeight: 0,
    selectedMonth: currentDateForMonthly,
    selectedUser: { label: "", value: "" },
    isOpenUsagePerformanceReportDialog: false,
    data: initialValues(),
    key: ""
  };

  public componentDidMount() {
    Promise.all([
      this.props.fetchFacility(),
      this.props.fetchInoutError(this.state.selectedMonth)
    ]);
  }

  public componentDidUpdate() {
    const top = document.getElementById("reportDailyHeader");
    if (top && top.clientHeight !== this.state.headerHeight) {
      this.setState({
        headerHeight: top.clientHeight
      });
    }
  }

  public render() {
    const { classes, reportState, inoutErrors } = this.props;
    const { selectedMonth, selectedUser, isEditing, headerHeight } = this.state;
    return (
      <React.Fragment>
        <div id="reportDailyHeader" className={classes.headerWrapper}>
          {inoutErrors.hasError && (
            <InvoiceErrorBar
              message={`${inoutErrors.errorCount} 件のエラーが起きています。内容を確認し、データを修正してください。`}
              onClick={this.onClickErrorDialog}
            />
          )}
          <div className={classes.headerInfoContainer}>
            {isEditing ? (
              <UsagePerformanceMonthlyHeaderEdit
                selectedMonth={selectedMonth}
                selectedUserName={selectedUser.label}
                onSubmit={this.onSubmitBulk}
                onChangeEditMode={this.onChangeEditMode}
              />
            ) : (
              <UsagePerformanceMonthlyHeader
                minDate={minDate}
                maxDate={maxDate}
                selectedMonth={selectedMonth}
                selectedUserId={selectedUser.value}
                isSubmitDisabled={isEmpty(
                  reportState.reportMonthly.usagePerformance.before
                )}
                onChangeMonth={this.onChangeMonth}
                onChangeUser={this.onChangeUser}
                onChangeEditMode={this.onChangeEditMode}
              />
            )}
          </div>
        </div>
        <Paper elevation={0} className={classes.tableContainer}>
          <UsagePerformanceMonthlyTable
            isEditing={isEditing}
            headerHeight={headerHeight}
            openModal={this.openModal}
          />
        </Paper>
        <UsagePerformanceReportDialog
          open={this.state.isOpenUsagePerformanceReportDialog}
          report={
            this.props.reportState.reportMonthly.usagePerformance.before[
              this.state.key
            ]
          }
          reportTANKINYUSHO={
            this.props.reportState.reportMonthly.usagePerformanceTANKINYUSHO
              .before[this.state.key]
          }
          data={this.state.data}
          selectedDate={this.state.selectedDate}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          type={REPEAT_MONTHLY}
        />
      </React.Fragment>
    );
  }

  /**
   * 月変更イベント
   */
  private onChangeMonth = (date: Date, user: OptionInterface) => {
    this.setState({ selectedMonth: date, selectedUser: user });
    this.props.fetchMonthly(+user.value, date);
    this.props.fetchInoutError(date);
  };

  // 利用者変更イベント
  private onChangeUser = (user: OptionInterface) => {
    this.setState({ selectedUser: user });
    this.props.fetchMonthly(+user.value, this.state.selectedMonth);
    this.props.fetchInoutError(this.state.selectedMonth);
  };
  /**
   * 編集状態変更
   * storeのリセットと離脱ダイアログ表示の停止を合わせて行う
   */
  private onChangeEditMode = () => {
    if (this.state.isEditing) {
      this.props.stopHistory(false);
      this.props.resetUsagePerformance(this.props.reportState);
    }
    this.setState({ isEditing: !this.state.isEditing });
  };

  /**
   *  一括保存ボタンイベント
   */
  private onSubmitBulk = async () => {
    await this.props
      .postTANKINYUSHOBulkRegistrationMonthly(
        this.props.reportState.reportMonthly
      )
      .finally(() => {
        this.setState({ isEditing: false });
      });
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  /**
   *  実績編集保存ボタンイベント
   */
  private onSubmit = () => {
    this.props.fetchInoutError(this.state.selectedDate);
  };

  /**
   * エラーダイアログ押下イベントq
   */
  private onClickErrorDialog = () => {
    this.props.openErrorsDialog();
  };

  /**
   * 編集モーダル表示イベント
   */
  private openModal = (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => {
    this.setState({
      data: initialValues(usagePerformance, usagePerformanceTANKINYUSHO),
      key: `${usagePerformance.usersInFacilityId}_${usagePerformance.targetDate}`,
      selectedDate: new Date(
        usagePerformance.targetDate ? usagePerformance.targetDate : ""
      ),
      isOpenUsagePerformanceReportDialog: true
    });
  };

  private onCancel = () => {
    this.setState({ isOpenUsagePerformanceReportDialog: false });
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  reportState: state.TANKINYUSHO.report,
  inoutErrors: state.errors.inout
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    userDispatch,
    TANKINYUSHO,
    errorsDispatcher,
    uiDispatch
  } = dispatches;
  const facilityDispatcher = TANKINYUSHO.facilityDispatcher(dispatch);
  const uiDispatcher = uiDispatch(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchFacility: facilityDispatcher.fetch,
    fetchMonthly: (uifId: number, date: Date) =>
      TANKINYUSHO.reportDispatcher(dispatch).fetchTANKINYUSHOMonthly(
        uifId,
        date
      ),
    postTANKINYUSHOBulkRegistrationMonthly: (
      reportMonthly: ReportState["reportMonthly"]
    ) =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).postTANKINYUSHOBulkRegistrationMonthly(reportMonthly),
    resetUsagePerformance: (reportState: ReportState) =>
      TANKINYUSHO.reportDispatcher(dispatch).resetTANKINYUSHOUsagePerformance(
        reportState
      ),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog()),
    stopHistory: uiDispatcher.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceMonthlyList));
