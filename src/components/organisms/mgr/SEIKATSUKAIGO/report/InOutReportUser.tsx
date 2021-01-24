import * as React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles, Theme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InOutReportUserHeader from "@components/organisms/mgr/SEIKATSUKAIGO/report/InOutReportUserHeader";
import InOutReportTable from "@components/organisms/mgr/SEIKATSUKAIGO/report/InOutReportTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import { ErrorsState } from "@stores/domain/errors/types";
import { UserState } from "@stores/domain/user/type";
import InOutReportPaperHeader from "@components/organisms/mgr/SEIKATSUKAIGO/report/InOutReportPaperHeader";
import { SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS } from "@constants/variables";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import {
  SEIKATSUKAIGOReport,
  REPEAT_USER,
  SEIKATSUKAIGOInOutReportState
} from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { OptionInterface } from "@components/atoms/DropDown";
import InOutReportModal from "@components/organisms/mgr/common/report/InOutReportModal";
import InOutReportDialog from "./InOutReportDialog";
import {
  InitialDataValues,
  initialValues
} from "@initialize/mgr/SEIKATSUKAIGO/report/initialValues";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    clear: {
      clear: "both"
    },
    headerWrapper: {
      position: "sticky",
      top: 0,
      backgroundColor: palette.background.default,
      zIndex: 1
    },
    headerInfoContainer: {
      width: "100%",
      paddingRight: 16,
      paddingLeft: 16,
      marginTop: 16,
      marginBottom: 8
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
  user: UserState;
  reportState: SEIKATSUKAIGOInOutReportState;
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchUser: () => void;
  fetchFacility: () => void;
  fetchReportUser: (uifId: number, date: Date) => void;
  fetchInoutError: (date: Date) => void;
  fetchSummary: (uifId: number, date: Date) => void;
  openErrorsDialog: () => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  isEditing: boolean;
  selectedMonth: Date;
  selectedUser: OptionInterface;
  headerHeight: number;
  isOpenErrorDialog: boolean;
  isOpenDetailModal: boolean;
  isOpenInOutReportDialog: boolean;
  data: InitialDataValues;
  selectedDate: Date;
  initialFlg: boolean;
}

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);

/**
 * 利用実績(ユーザごと）
 */
class InOutReportUser extends React.Component<Props, State> {
  public readonly state: State = {
    isEditing: false,
    selectedMonth: currentDateForMonthly,
    selectedUser: { label: "", value: "" },
    headerHeight: 0,
    isOpenErrorDialog: false,
    isOpenDetailModal: false,
    isOpenInOutReportDialog: false,
    data: initialValues(),
    selectedDate: new Date(),
    initialFlg: true
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

  private onChangeMonth = (date: Date, user: OptionInterface): void => {
    this.setState({ selectedMonth: date });
    this.setState({ selectedUser: user });
    this.props.fetchReportUser(+user.value, date);
    this.props.fetchSummary(+user.value, date);
    this.props.fetchInoutError(date);
  };

  private onChangeUser = (user: OptionInterface): void => {
    this.setState({ selectedUser: user });
    this.props.fetchReportUser(+user.value, this.state.selectedMonth);
    this.props.fetchSummary(+user.value, this.state.selectedMonth);
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  private onClickErrorDialog = (): void => {
    this.props.openErrorsDialog();
  };

  private openModal = (param: SEIKATSUKAIGOReport): void => {
    this.setState({ isOpenInOutReportDialog: true });
    this.setState({
      initialFlg: param.initialFlg !== undefined ? param.initialFlg : true
    });
    this.setState({ data: initialValues(param) });
    this.setState({
      selectedDate: new Date(param.target_date ? param.target_date : "")
    });
  };

  private onCancel = (): void => {
    this.setState({ isOpenInOutReportDialog: false });
  };

  private onSubmit = (): void => {
    this.props.fetchSummary(
      +this.state.selectedUser.value,
      this.state.selectedMonth
    );
    this.props.fetchReportUser(
      +this.state.selectedUser.value,
      this.state.selectedMonth
    );
    this.props.fetchInoutError(this.state.selectedMonth);
  };

  private openDetailModal = (): void => {
    this.setState({ isOpenDetailModal: true });
  };

  private closeDetailModal = (): void => {
    this.setState({ isOpenDetailModal: false });
  };

  /**
   * RectangleBoxが受け付けるconfigを生成する
   */
  private genRectangleBoxConfig = (
    title: string,
    num: number | null | undefined,
    denom?: number
  ): {
    title: string;
    denom: number | undefined;
    num: number;
    unit: string;
  } => {
    return { title, denom, num: num || 0, unit: "日" };
  };

  private createRectangleList = (
    numberOfAbsence: number | null | undefined,
    summary: SEIKATSUKAIGOInOutReportState["SEIKATSUKAIGOSummary"]
  ): {
    title: string;
    denom: number | undefined;
    num: number;
    unit: string;
  }[] => {
    const { serviceCounts } = summary;
    return [
      this.genRectangleBoxConfig("欠席時対応", numberOfAbsence, 4),
      this.genRectangleBoxConfig("送迎（片道）", serviceCounts.oneWayCount),
      this.genRectangleBoxConfig("送迎（往復）", serviceCounts.pickupCount),
      this.genRectangleBoxConfig("食事", serviceCounts.foodCount)
    ];
  };

  public render(): JSX.Element {
    const { classes, inoutErrors } = this.props;
    const { selectedMonth, selectedUser, headerHeight } = this.state;
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
            <InOutReportUserHeader
              minDate={minDate}
              maxDate={maxDate}
              selectedMonth={selectedMonth}
              selectedUserId={selectedUser.value}
              onChangeMonth={this.onChangeMonth}
              onChangeUser={this.onChangeUser}
            />
          </div>
        </div>
        <Paper elevation={0} className={classes.tableContainer}>
          <InOutReportPaperHeader
            rectangleConfigList={this.createRectangleList(
              this.props.reportState.SEIKATSUKAIGOReports.reportUser
                .numberOfAbsence,
              this.props.reportState.SEIKATSUKAIGOSummary
            )}
            openModal={this.openDetailModal}
          />
          <InOutReportTable
            headerHeight={headerHeight}
            openModal={this.openModal}
            type={REPEAT_USER}
          />
          <InOutReportDialog
            open={this.state.isOpenInOutReportDialog}
            reportList={
              this.props.reportState.SEIKATSUKAIGOReports.reportUser.reportList
            }
            data={this.state.data}
            selectedDate={this.state.selectedDate}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            type={REPEAT_USER}
            initialFlg={this.state.initialFlg}
          />
          <InOutReportModal
            countsPerStatus={
              this.props.reportState.SEIKATSUKAIGOSummary.countsPerStatus
            }
            inOutRecords={
              this.props.reportState.SEIKATSUKAIGOSummary.inoutRecords
            }
            isOpen={this.state.isOpenDetailModal}
            onClose={this.closeDetailModal}
            targetName={this.state.selectedUser.label}
            date={this.state.selectedMonth}
            type={REPEAT_USER}
            pageType="report"
            serviceType={this.props.user.facility_type}
            summaryServiceStatus={SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS}
            userReportList={
              this.props.reportState.SEIKATSUKAIGOReports.reportUser.reportList
            }
          />
        </Paper>
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    user: state.user as UserState,
    reportState: state.SEIKATSUKAIGO.report,
    inoutErrors: state.errors.inout
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userDispatch, SEIKATSUKAIGO, errorsDispatcher } = dispatches;
  const reportDispatches = SEIKATSUKAIGO.reportDispacher(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchFacility: SEIKATSUKAIGO.facilityDispatcher(dispatch).fetch,
    fetchReportUser: (uifId: number, date: Date) =>
      reportDispatches.fetchSEIKATSUKAIGOUser(uifId, date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    fetchSummary: (uifId: number, date: Date) =>
      reportDispatches.fetchSEIKATSUKAIGOUserSummary(uifId, date),
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportUser));
