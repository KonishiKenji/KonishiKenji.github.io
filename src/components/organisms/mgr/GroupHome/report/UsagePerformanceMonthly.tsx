import * as React from "react";
import * as ClassNames from "classnames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";
import { Report, ReportState } from "@stores/domain/report/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { OptionInterface } from "@components/atoms/DropDown";
import UsagePerformanceMonthlyHeader from "@components/organisms/mgr/GroupHome/report/UsagePerformanceMonthlyHeader";
import UsagePerformanceMonthlyHeaderEdit from "@components/organisms/mgr/GroupHome/report/UsagePerformanceMonthlyHeaderEdit";
import UsagePerformanceMonthlyTable from "@components/organisms/mgr/GroupHome/report/UsagePerformanceMonthlyTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";

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
      minHeight: spacing.unit * 12,
      padding: spacing.unit * 2,
      width: "100%"
    },
    table: {
      tableLayout: "fixed"
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
    allStatusType: {
      marginBottom: spacing.unit * 2
    }
  });

interface StateProps {
  rowsInfo: ReportState["reportMonthly"];
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchUser: () => void;
  fetchFacility: () => void;
  fetchMonthly: (uifId: number, date: Date) => void;
  fetchInoutError: (date: Date) => void;
  postMonthly: (
    reportListBefore: Report[],
    reportListAfter: Report[]
  ) => Promise<void>;
  setBeforeToAfterMonthly: () => void;
  setAllStatusType: () => void;
  openErrorsDialog: () => void;
  stopHistory: (flag: boolean) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  isEditing: boolean;
  isSubmitDisabled: boolean[];
  selectedMonth: Date;
  selectedUser: OptionInterface;
  headerHeight: number;
}

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);

/**
 * 利用実績（月ごと）
 */
class UsagePerformanceMonthly extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditing: false,
      isSubmitDisabled: [],
      selectedMonth: currentDateForMonthly,
      selectedUser: { label: "", value: "" },
      headerHeight: 0
    };
  }

  public componentDidMount(): void {
    // リロード時、事業所情報を読み直す。
    this.props.fetchFacility();
  }

  public componentDidUpdate(): void {
    const top = document.getElementById("reportMonthlyHeader");
    if (top && top.clientHeight !== this.state.headerHeight) {
      this.setState({
        headerHeight: top.clientHeight
      });
    }
  }

  private onChangeMonth = (date: Date): void => {
    this.setState({ selectedMonth: date });
    this.props.fetchMonthly(+this.state.selectedUser.value, date);
    this.props.fetchInoutError(date);
  };

  private onChangeUser = (user: OptionInterface): void => {
    this.setState({ selectedUser: user });
    this.props.fetchMonthly(+user.value, this.state.selectedMonth);
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  /**
   * 編集状態変更
   * storeのリセットと離脱ダイアログ表示の停止を合わせて行う
   */
  private onChangeEditMode = (): void => {
    if (this.state.isEditing) {
      this.props.setBeforeToAfterMonthly();
      this.props.stopHistory(false);
    }
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  private onSubmit = (): void => {
    this.props
      .postMonthly(this.props.rowsInfo.before, this.props.rowsInfo.after)
      .then(() => {
        this.setState({ isEditing: false });
        this.props.fetchInoutError(this.state.selectedMonth);
      });
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
    const { classes, rowsInfo, inoutErrors } = this.props;
    const { isEditing, selectedMonth, selectedUser, headerHeight } = this.state;
    const isSubmitDisabled = this.state.isSubmitDisabled.some(
      (disabled) => disabled
    );

    return (
      <>
        <div id="reportMonthlyHeader" className={classes.headerWrapper}>
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
                onSubmit={this.onSubmit}
                onChangeEditMode={this.onChangeEditMode}
                isSubmitDisabled={isSubmitDisabled}
              />
            ) : (
              <UsagePerformanceMonthlyHeader
                minDate={minDate}
                maxDate={maxDate}
                selectedMonth={selectedMonth}
                isSubmitDisabled={!rowsInfo.before.length}
                selectedUserId={selectedUser.value}
                onChangeMonth={this.onChangeMonth}
                onChangeUser={this.onChangeUser}
                onChangeEditMode={this.onChangeEditMode}
              />
            )}
          </div>
        </div>
        <Paper
          elevation={0}
          className={ClassNames(classes.clear, classes.tableContainer)}
        >
          {isEditing && (
            <>
              <div className={classes.allStatusType}>
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
            </>
          )}
          <UsagePerformanceMonthlyTable
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
  rowsInfo: state.report.reportMonthly,
  inoutErrors: state.errors.inout
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
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
    fetchMonthly: (uifId: number, date: Date): Promise<void> =>
      reportDispatch(dispatch).fetchMonthly(uifId, date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    postMonthly: (
      reportListBefore: Report[],
      reportListAfter: Report[]
    ): Promise<void> =>
      reportDispatch(dispatch).postMonthly(reportListBefore, reportListAfter),
    setBeforeToAfterMonthly: (): void =>
      reportDispatch(dispatch).setBeforeToAfterMonthly(),
    setAllStatusType: (): void => {
      reportDispatches.setAllStatusTypeMonthly("1");
    },
    openErrorsDialog: (): { readonly type: "UI/SHOW_ERRORS_DIALOG" } =>
      dispatch(errorsDialogActions.showErrorsDialog()),
    stopHistory: uiDispatcher.stopHistory
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceMonthly));
