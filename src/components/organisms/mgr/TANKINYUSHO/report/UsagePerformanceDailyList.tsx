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
import Checkbox from "@components/atoms/Checkbox";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  REPEAT_DAILY
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import UsagePerformanceDailyHeaderEdit from "./UsagePerformanceDailyHeaderEdit";
import UsagePerformanceDailyHeader from "./UsagePerformanceDailyHeader";
import UsagePerformanceDailyTable from "./UsagePerformanceDailyTable";
import isEmpty from "lodash-es/isEmpty";
import UsagePerformanceReportDialog from "./UsagePerformanceReportDialog";
import {
  InitialDataValues,
  initialValues
} from "@initialize/mgr/TANKINYUSHO/report/initialValues";
import { StatusType } from "@constants/mgr/TANKINYUSHO/variables";

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
      alignItems: "flex-end"
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
    tableHeadButtonAreaNotEditing: {
      marginTop: 16
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
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchDaily: (date: Date) => void;
  fetchFacility: () => void;
  postBulkRegistrationDaily: (
    reportState: ReportState["reportDaily"]
  ) => Promise<void>;
  fetchInoutError: (date: Date) => void;
  fetchOneUser: (id: string) => Promise<void>;
  updateUsagePerformanceDaily: (
    usagePerformanceDaily: ReportState["reportDaily"]["usagePerformanceDaily"]["after"]
  ) => void;
  updateAllStatusType: (
    checkedIdList: string[],
    usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
  ) => Promise<void>;
  resetUsagePerformance: (reportState: ReportState) => void;
  openErrorsDialog: () => void;
  stopHistory: (flag: boolean) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  selectedDate: Date;
  isEditing: boolean;
  headerHeight: number;
  isSorting: boolean;
  checkedIds: string[];
  isOpenUsagePerformanceReportDialog: boolean;
  data: InitialDataValues;
  key: string;
  isAllCheck: boolean;
  isImplementation: boolean;
}

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);

/**
 * 利用実績（日ごと）
 */
class UsagePerformanceDailyList extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    // 閲覧モードのみの処理
    if (!prevState.isEditing) {
      const usagePerformanceList =
        nextProps.reportState.reportDaily.usagePerformance.before;
      const isImplementation = Object.keys(usagePerformanceList).some(
        (key: string) => {
          const usagePerformance: UsagePerformanceType =
            usagePerformanceList[key];
          return (
            usagePerformance &&
            `${usagePerformance.statusType}` === StatusType.IMPLEMENTATION
          );
        }
      );
      if (isImplementation !== prevState.isImplementation) {
        return { isImplementation };
      }
    }
    return null;
  }

  public readonly state: State = {
    selectedDate: new Date(),
    isEditing: false,
    headerHeight: 0,
    isSorting: false,
    checkedIds: [],
    isOpenUsagePerformanceReportDialog: false,
    data: initialValues(),
    key: "",
    isAllCheck: false,
    isImplementation: false
  };

  public componentDidMount() {
    Promise.all([
      this.props.fetchDaily(this.state.selectedDate),
      this.props.fetchFacility(),
      this.props.fetchInoutError(this.state.selectedDate)
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
    const {
      selectedDate,
      isEditing,
      headerHeight,
      isSorting,
      isAllCheck,
      isImplementation
    } = this.state;
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
              <UsagePerformanceDailyHeaderEdit
                selectedDate={selectedDate}
                onChangeEditMode={this.onChangeEditMode}
                onSubmit={this.onSubmitBulk}
              />
            ) : (
              <UsagePerformanceDailyHeader
                minDate={minDate}
                maxDate={maxDate}
                selectedDate={selectedDate}
                isSubmitDisabled={isEmpty(
                  reportState.reportDaily.usagePerformance.before
                )}
                onChangeDate={this.onChangeDate}
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
                <span>選択した利用者のサービス提供状況に［ 実施 ］を</span>
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
            <div>
              {isEditing && (
                <div className={classes.abolitionCheck}>
                  <Checkbox
                    label="身体拘束廃止未実施"
                    value="physicalRestraintAbolitionCheck"
                    checked={
                      reportState.reportDaily.usagePerformanceDaily.after
                        .bodyRestraintAbolitionUnexecutedFlg
                        ? reportState.reportDaily.usagePerformanceDaily.after
                            .bodyRestraintAbolitionUnexecutedFlg
                        : false
                    }
                    onChange={this.onChangeAbolitionCheck}
                  />
                </div>
              )}
              <div
                className={
                  isEditing
                    ? `${classes.tableHeadButtonSortArea} ${classes.tableHeadButtonArea}`
                    : `${classes.tableHeadButtonSortArea} ${classes.tableHeadButtonArea} ${classes.tableHeadButtonAreaNotEditing}`
                }
              >
                <span>
                  サービス提供［ 実施 ］の利用者
                  {this.state.isSorting ? "の" : "を"}
                </span>
                <Button
                  className={`${classes.tableHeadSortButton} ${classes.tableHeadButton}`}
                  color="secondary"
                  onClick={this.sortServiceType}
                  disabled={!isImplementation && !isEditing}
                >
                  {this.state.isSorting ? "並び替えを解除" : "上位に並び替え"}
                </Button>
              </div>
            </div>
          </div>

          <UsagePerformanceDailyTable
            isEditing={isEditing}
            isSorting={isSorting}
            headerHeight={headerHeight + (isEditing ? 120 : 88)}
            openModal={this.openModal}
            onChecked={this.onChecked}
            checkedIds={this.state.checkedIds}
            allCheck={this.allCheck}
            isAllCheck={isAllCheck}
          />
        </Paper>
        <UsagePerformanceReportDialog
          open={this.state.isOpenUsagePerformanceReportDialog}
          report={
            this.props.reportState.reportDaily.usagePerformance.before[
              this.state.key
            ]
          }
          reportTANKINYUSHO={
            this.props.reportState.reportDaily.usagePerformanceTANKINYUSHO
              .before[this.state.key]
          }
          data={this.state.data}
          selectedDate={selectedDate}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          type={REPEAT_DAILY}
        />
      </React.Fragment>
    );
  }

  /**
   * 日付変更イベント
   */
  private onChangeDate = (date: Date) => {
    this.setState({ selectedDate: date });
    this.props.fetchDaily(date);
    this.props.fetchInoutError(date);
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
      isEditing: !this.state.isEditing,
      checkedIds: [],
      isAllCheck: false
    });
  };

  /**
   * 身体拘束未実施チェックボックスのchangeイベント
   */
  private onChangeAbolitionCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    this.props.updateUsagePerformanceDaily({
      ...this.props.reportState.reportDaily.usagePerformanceDaily.after,
      bodyRestraintAbolitionUnexecutedFlg: checked
    });
  };

  /**
   *  一括保存ボタンイベント
   */
  private onSubmitBulk = async () => {
    await this.props
      .postBulkRegistrationDaily(this.props.reportState.reportDaily)
      .finally(() => {
        this.setState({ isEditing: false, isAllCheck: false });
      });
    this.props.fetchInoutError(this.state.selectedDate);
  };

  /**
   *  実績編集保存ボタンイベント
   */
  private onSubmit = () => {
    this.props.fetchInoutError(this.state.selectedDate);
  };

  /**
   * エラーダイアログ押下イベント
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
      key: `${usagePerformance.usersInFacilityId}_${usagePerformance.targetDate}`
    });
    if (usagePerformance.usersInFacilityId) {
      this.props
        .fetchOneUser(`${usagePerformance.usersInFacilityId}`)
        .then(() => {
          this.setState({ isOpenUsagePerformanceReportDialog: true });
        });
    }
  };

  private onCancel = () => {
    this.setState({ isOpenUsagePerformanceReportDialog: false });
  };

  /**
   * サービス提供状況によるソート
   */
  private sortServiceType = () => {
    this.setState({ isSorting: !this.state.isSorting });
  };

  /**
   * サービス提供状況の一括登録用チェックボックス押下時イベント
   */
  private onChecked = (checkedId: string, isChecked: boolean): void => {
    let checkedIdList = this.state.checkedIds;
    if (isChecked) {
      checkedIdList.push(checkedId);
    } else {
      checkedIdList = checkedIdList.filter((uifId: string) => {
        return uifId !== checkedId;
      });
    }
    this.setState({ checkedIds: checkedIdList });
  };

  /**
   *
   * サービス提供状況の一括更新
   */
  private setAllStatusType = () => {
    this.props
      .updateAllStatusType(
        this.state.checkedIds,
        this.props.reportState.reportDaily.usagePerformance.after
      )
      .then(() => {
        this.setState({
          checkedIds: [],
          isAllCheck: false
        });
      });
  };

  /**
   * 一括チェック
   */
  private allCheck = (checkedValue: boolean) => {
    const checkedIdList: string[] = [];
    if (checkedValue) {
      Object.keys(
        this.props.reportState.reportDaily.usagePerformance.after
      ).forEach((uifId: string) => {
        checkedIdList.push(uifId);
      });
    }
    this.setState({
      checkedIds: checkedIdList,
      isAllCheck: !this.state.isAllCheck
    });
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
    fetchOneUser: TANKINYUSHO.userInFacilityDispatcher(dispatch).fetchOne,
    fetchFacility: facilityDispatcher.fetch,
    fetchDaily: (date: Date) =>
      TANKINYUSHO.reportDispatcher(dispatch).fetchTANKINYUSHODaily(date),
    postBulkRegistrationDaily: (reportDaily: ReportState["reportDaily"]) =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).postTANKINYUSHOBulkRegistrationDaily(reportDaily),
    updateUsagePerformanceDaily: (
      usagePerformanceDaily: ReportState["reportDaily"]["usagePerformanceDaily"]["after"]
    ) =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).updateTANKINYUSHOUsagePerformanceDaily(usagePerformanceDaily),
    updateAllStatusType: (
      checkedIdList: string[],
      usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
    ) =>
      TANKINYUSHO.reportDispatcher(dispatch).updateTANKINYUSHOAllStatusType(
        checkedIdList,
        usagePerformance
      ),
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
)(withStyles(styles)(UsagePerformanceDailyList));
