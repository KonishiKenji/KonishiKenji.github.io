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
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  REPEAT_USERS
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";
import UsagePerformanceUsersHeaderEdit from "./UsagePerformanceUsersHeaderEdit";
import UsagePerformanceUsersHeader from "./UsagePerformanceUsersHeader";
import UsagePerformanceTable from "./UsagePerformanceTable";
import isEmpty from "lodash-es/isEmpty";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";
import { OptionInterface } from "@components/atoms/DropDown";
import {
  initialValues,
  InitialDataValues
} from "@initialize/mgr/SHISETSUNYUSHO/report/initialValues";
import UsagePerformanceReportDialog from "./UsagePerformanceReportDialog";

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
      paddingBottom: 32,
      width: "100%"
    },
    tableContainer: {
      padding: `0px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
      margin: `0px ${spacing.unit * 2}px ${spacing.unit * 2}px ${spacing.unit *
        2}px`
    },
    button: {
      marginLeft: 10,
      border: "1px solid #cccccc",
      boxShadow: "none",
      borderRadius: 4
    },
    abolitionChip: {
      paddingLeft: 20,
      width: 160
    },
    flex: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingTop: 16
    },
    flexEnd: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "flex-end"
    },
    bodyRestraint: {
      paddingBottom: spacing.unit * 2
    },
    tableHeadButtonArea: {
      height: 56,
      backgroundColor: "#f5f5f5",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16
    },
    tableHeadButtonInputArea: {
      width: 539
    },
    tableHeadButtonSortArea: {
      width: 482
    },
    tableHeadButton: {
      height: 36,
      backgroundColor: "#ffffff",
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      marginLeft: 16
    },
    tableHeadSortButton: {
      width: 172
    },
    tableHeadInputButton: {
      width: 104
    },
    abolitionCheck: {
      marginLeft: 300
    },
    sticky: {
      zIndex: 10,
      position: "sticky",
      backgroundColor: "#fff"
    }
  });

interface StateProps {
  reportState: ReportState;
  facilityState: FacilityState;
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchUsers: (uifId: number, date: Date) => void;
  fetchFacility: () => void;
  fetchInoutError: (date: Date) => void;
  postBulkRegistration: (
    reportState: ReportState["reportUsers"],
    notFood: boolean
  ) => Promise<void>;
  openErrorsDialog: () => void;
  updateAllStatusType: (
    usagePerformance: ReportState["reportUsers"]["usagePerformance"]["after"]
  ) => Promise<void>;
  resetUsagePerformance: (reportState: ReportState) => void;
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
 * 利用実績（利用者ごと）
 */
class UsagePerformanceUsersList extends React.Component<Props, State> {
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
    const top = document.getElementById("reportUsersHeader");
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
        <div id="reportUsersHeader" className={classes.headerWrapper}>
          {inoutErrors.hasError && (
            <InvoiceErrorBar
              message={`${inoutErrors.errorCount} 件のエラーが起きています。内容を確認し、データを修正してください。`}
              onClick={this.onClickErrorDialog}
            />
          )}
          <div className={classes.headerInfoContainer}>
            {isEditing ? (
              <UsagePerformanceUsersHeaderEdit
                selectedMonth={selectedMonth}
                selectedUserName={selectedUser.label}
                onSubmit={this.onSubmitBulk}
                onChangeEditMode={this.onChangeEditMode}
              />
            ) : (
              <UsagePerformanceUsersHeader
                minDate={minDate}
                maxDate={maxDate}
                selectedMonth={selectedMonth}
                selectedUserId={selectedUser.value}
                isSubmitDisabled={isEmpty(
                  reportState.reportUsers.usagePerformance.before
                )}
                onChangeMonth={this.onChangeMonth}
                onChangeUser={this.onChangeUser}
                onChangeEditMode={this.onChangeEditMode}
              />
            )}
          </div>
        </div>
        <Paper elevation={0} className={classes.tableContainer}>
          <div
            style={{ top: `${headerHeight}px` }}
            className={
              isEditing
                ? `${classes.flex} ${classes.sticky}`
                : `${classes.flexEnd} ${classes.sticky}`
            }
          >
            {isEditing && (
              <div
                className={`${classes.tableHeadButtonInputArea} ${classes.tableHeadButtonArea}`}
              >
                <span>全ての日付のサービス提供の状況に［ 宿泊 ］を</span>
                <Button
                  className={`${classes.tableHeadInputButton} ${classes.tableHeadButton}`}
                  color="secondary"
                  variant="text"
                  onClick={this.setAllStatusType}
                >
                  一括入力
                </Button>
              </div>
            )}
          </div>

          <UsagePerformanceTable
            isEditing={isEditing}
            headerHeight={headerHeight + (isEditing ? 88 : 0)}
            openModal={this.openModal}
            isDisabledFood={!this.props.facilityState.availableFood}
            reportType={REPEAT_USERS}
          />
        </Paper>
        <UsagePerformanceReportDialog
          open={this.state.isOpenUsagePerformanceReportDialog}
          report={
            this.props.reportState.reportUsers.usagePerformance.before[
              this.state.key
            ]
          }
          reportSHISETSUNYUSHO={
            this.props.reportState.reportUsers.usagePerformanceSHISETSUNYUSHO
              .before[this.state.key]
          }
          data={this.state.data}
          selectedDate={this.state.selectedDate}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          type={REPEAT_USERS}
        />
      </React.Fragment>
    );
  }

  /**
   * 月変更イベント
   */
  private onChangeMonth = (date: Date, user: OptionInterface) => {
    this.setState({ selectedMonth: date, selectedUser: user });
    this.props.fetchUsers(+user.value, date);
    this.props.fetchInoutError(date);
  };

  /**
   * 利用者変更イベント
   */
  private onChangeUser = (user: OptionInterface) => {
    this.setState({ selectedUser: user });
    this.props.fetchUsers(+user.value, this.state.selectedMonth);
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
    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  /**
   *  一括保存ボタンイベント
   */
  private onSubmitBulk = async () => {
    await this.props
      .postBulkRegistration(
        this.props.reportState.reportUsers,
        !this.props.facilityState.availableFood
      )
      .finally(() => {
        this.setState({ isEditing: false });
      });
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  /**
   * エラーダイアログ押下イベント
   */
  private onClickErrorDialog = () => {
    this.props.openErrorsDialog();
  };

  /**
   * サービス提供状況の一括更新
   */
  private setAllStatusType = () => {
    this.props.updateAllStatusType(
      this.props.reportState.reportUsers.usagePerformance.after
    );
  };

  /**
   * 編集モーダル表示イベント
   */
  private openModal = (
    usagePerformance: UsagePerformanceType,
    usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
  ) => {
    this.setState({
      data: initialValues(usagePerformance, usagePerformanceSHISETSUNYUSHO),
      key: `${usagePerformance.usersInFacilityId}_${usagePerformance.targetDate}`,
      selectedDate: new Date(
        usagePerformance.targetDate ? usagePerformance.targetDate : ""
      ),
      isOpenUsagePerformanceReportDialog: true
    });
  };

  /**
   *  実績編集保存ボタンイベント
   */
  private onSubmit = () => {
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  /**
   * モーダル非表示イベント
   */
  private onCancel = () => {
    this.setState({ isOpenUsagePerformanceReportDialog: false });
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  reportState: state.SHISETSUNYUSHO.report,
  facilityState: state.SHISETSUNYUSHO.facility,
  inoutErrors: state.errors.inout
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    userDispatch,
    SHISETSUNYUSHO,
    errorsDispatcher,
    uiDispatch
  } = dispatches;
  const facilityDispatcher = SHISETSUNYUSHO.facilityDispatcher(dispatch);
  const uiDispatcher = uiDispatch(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchFacility: facilityDispatcher.fetch,
    fetchUsers: (uifId: number, date: Date) =>
      SHISETSUNYUSHO.reportDispatcher(dispatch).fetchSHISETSUNYUSHOUsers(
        uifId,
        date
      ),
    postBulkRegistration: (
      reportUsers: ReportState["reportUsers"],
      notFood: boolean
    ) =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).postSHISETSUNYUSHOBulkRegistrationUsers(reportUsers, notFood),
    updateAllStatusType: (
      usagePerformance: ReportState["reportUsers"]["usagePerformance"]["after"]
    ) =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).updateSHISETSUNYUSHOAllStatusTypeUsers(usagePerformance),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog()),
    resetUsagePerformance: (reportState: ReportState) =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).resetSHISETSUNYUSHOUsagePerformance(reportState),
    stopHistory: uiDispatcher.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceUsersList));
