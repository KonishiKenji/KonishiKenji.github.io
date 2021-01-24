import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as ClassNames from "classnames";
import dispatches from "@stores/dispatches";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@components/atoms/Checkbox";
import UsagePerformanceDailyHeader from "@components/organisms/mgr/GroupHome/report/UsagePerformanceDailyHeader";
import UsagePerformanceDailyHeaderEdit from "@components/organisms/mgr/GroupHome/report/UsagePerformanceDailyHeaderEdit";
import UsagePerformanceDailyTable from "@components/organisms/mgr/GroupHome/report/UsagePerformanceDailyTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";

import {
  REPEAT_DAILY,
  Report,
  ReportState,
  ReportPerformanceDaily
} from "@stores/domain/report/type";

const styles = ({ spacing, palette }: Theme): StyleRules =>
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
      padding: spacing.unit * 2,
      width: "100%"
    },
    tableContainer: {
      padding: `${spacing.unit * 2}px ${spacing.unit * 4}px ${
        spacing.unit * 4
      }px`,
      margin: `0px ${spacing.unit * 2}px ${spacing.unit * 2}px ${
        spacing.unit * 2
      }px`
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
      justifyContent: "space-between"
    },
    bodyRestraint: {
      paddingBottom: spacing.unit * 2
    }
  });

interface StateProps {
  rowsInfo: ReportState["reportDaily"];
  performanceDaily: ReportState["performanceDaily"];
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchDaily: (date: Date) => void;
  fetchFacility: () => void;
  fetchInoutError: (date: Date) => void;
  postDaily: (
    reportListBefore: Report[],
    reportListAfter: Report[],
    reportDaily: ReportPerformanceDaily
  ) => Promise<void>;
  setBeforeToAfterDaily: () => void;
  setBodyRestraintAbolitionUnexecutedFlg: (value: boolean) => void;
  setAllStatusType: () => void;
  openErrorsDialog: () => void;
  stopHistory: (flag: boolean) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  selectedDate: Date;
  isEditing: boolean;
  isSubmitDisabled: boolean[];
  headerHeight: number;
}

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);

/**
 * 利用実績（日ごと）
 */
class UsagePerformanceDaily extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      isEditing: false,
      isSubmitDisabled: [],
      headerHeight: 0
    };
  }

  public componentDidMount(): void {
    Promise.all([
      this.props.fetchDaily(this.state.selectedDate),
      this.props.fetchFacility(),
      this.props.fetchInoutError(this.state.selectedDate)
    ]);
  }

  public componentDidUpdate(): void {
    const top = document.getElementById("reportDailyHeader");
    if (top && top.clientHeight !== this.state.headerHeight) {
      this.setState({
        headerHeight: top.clientHeight
      });
    }
  }

  private onChangeDate = (date: Date): void => {
    this.setState({ selectedDate: date });
    this.props.fetchDaily(date);
    this.props.fetchInoutError(date);
  };

  /**
   * 編集状態変更
   * storeのリセットと離脱ダイアログ表示の停止を合わせて行う
   */
  private onChangeEditMode = (): void => {
    if (this.state.isEditing) {
      this.props.setBeforeToAfterDaily();
      this.props.stopHistory(false);
    }
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  private onSubmit = (): void => {
    this.props
      .postDaily(
        this.props.rowsInfo.before,
        this.props.rowsInfo.after,
        this.props.performanceDaily.after
      )
      .then(() => {
        this.setState({ isEditing: false });
        this.props.fetchInoutError(this.state.selectedDate);
      });
  };

  private onChangeAbolitionCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    this.props.setBodyRestraintAbolitionUnexecutedFlg(checked);
  };

  private onClickErrorDialog = (): void => {
    this.props.openErrorsDialog();
  };

  private onChangeDisabled = (errorMessage: string, key: number): void => {
    const { isSubmitDisabled } = this.state;
    isSubmitDisabled[key] = !!errorMessage;
    this.setState({ isSubmitDisabled });
  };

  public render(): JSX.Element {
    const { classes, rowsInfo, performanceDaily, inoutErrors } = this.props;
    const { selectedDate, isEditing, headerHeight } = this.state;
    const isSubmitDisabled = this.state.isSubmitDisabled.some(
      (disabled) => disabled
    );

    return (
      <>
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
                minDate={minDate}
                maxDate={maxDate}
                selectedDate={selectedDate}
                bodyRestraintAbolitionUnexecutedFlg={
                  performanceDaily.after.bodyRestraintAbolitionUnexecutedFlg
                }
                onChangeDate={this.onChangeDate}
                onSubmit={this.onSubmit}
                onChangeEditMode={this.onChangeEditMode}
                onChangeAbolitionCheck={this.onChangeAbolitionCheck}
                isSubmitDisabled={isSubmitDisabled}
              />
            ) : (
              <UsagePerformanceDailyHeader
                minDate={minDate}
                maxDate={maxDate}
                selectedDate={selectedDate}
                isSubmitDisabled={!rowsInfo.before.length}
                bodyRestraintAbolitionUnexecutedFlg={
                  performanceDaily.before.bodyRestraintAbolitionUnexecutedFlg
                }
                onChangeDate={this.onChangeDate}
                onChangeEditMode={this.onChangeEditMode}
              />
            )}
          </div>
        </div>
        <Paper elevation={0} className={classes.tableContainer}>
          {isEditing ? (
            <div className={classes.flex}>
              <div>
                <span>サービス提供の状況：[ - ] → [ 宿泊 ]</span>
                <Button
                  className={classes.button}
                  color="secondary"
                  onClick={this.props.setAllStatusType}
                  variant="text"
                >
                  {" "}
                  一括入力
                </Button>
              </div>
              <div>
                <Checkbox
                  label="身体拘束廃止未実施"
                  value="physicalRestraintAbolitionCheck"
                  checked={
                    performanceDaily.after.bodyRestraintAbolitionUnexecutedFlg
                  }
                  onChange={this.onChangeAbolitionCheck}
                />
              </div>
            </div>
          ) : (
            <div className={ClassNames(classes.flex)}>
              <div />
              <div className={classes.bodyRestraint}>
                {performanceDaily.before
                  .bodyRestraintAbolitionUnexecutedFlg && (
                  <div className={classes.abolitionChip}>
                    <Chip label="身体拘束廃止未実施" />
                  </div>
                )}
              </div>
            </div>
          )}
          <UsagePerformanceDailyTable
            isEditing={isEditing}
            headerHeight={headerHeight}
            onChangeDisabled={this.onChangeDisabled}
          />
        </Paper>
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  rowsInfo: state.report.reportDaily,
  performanceDaily: state.report.performanceDaily,
  inoutErrors: state.errors.inout
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    userDispatch,
    reportDispatch,
    GroupHome,
    errorsDispatcher,
    uiDispatch
  } = dispatches;
  const reportDispatches = reportDispatch(dispatch);
  const facilityDispatcher = GroupHome.facilityDispatcher(dispatch);
  const uiDispatcher = uiDispatch(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchFacility: facilityDispatcher.fetch,
    fetchDaily: (date: Date): Promise<void> =>
      reportDispatch(dispatch).fetchDaily(date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    postDaily: (
      reportListBefore: Report[],
      reportListAfter: Report[],
      reportDaily: ReportPerformanceDaily
    ): Promise<void> =>
      reportDispatch(dispatch).postDaily(
        reportListBefore,
        reportListAfter,
        reportDaily
      ),
    setBeforeToAfterDaily: (): void =>
      reportDispatch(dispatch).setBeforeToAfterDaily(),
    setBodyRestraintAbolitionUnexecutedFlg: (value: boolean): void =>
      reportDispatches.setBodyRestraintAbolitionUnexecutedFlg(
        value,
        REPEAT_DAILY
      ),
    setAllStatusType: (): void => {
      reportDispatches.setAllStatusTypeDaily("1");
    },
    openErrorsDialog: (): {
      readonly type: "UI/SHOW_ERRORS_DIALOG";
    } => dispatch(errorsDialogActions.showErrorsDialog()),
    stopHistory: uiDispatcher.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceDaily));
