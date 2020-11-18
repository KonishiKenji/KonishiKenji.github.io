import * as React from "react";
import { connect } from "react-redux";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles, Theme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InOutReportDailyHeader from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/InOutReportDailyHeader";
import InOutReportTable from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/InOutReportTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import { ErrorsState } from "@stores/domain/errors/types";
import { UserState } from "@stores/domain/user/type";
import InOutReportPaperHeader from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/InOutReportPaperHeader";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import {
  REPEAT_DAILY,
  InOutReportState
} from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/types";
import { ReportInterface } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { dateInHyphenYYYYMMDDFormat } from "@utils/date";
import InOutReportModal from "@components/organisms/mgr/common/report/InOutReportModal";
import InOutReportDialog from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/InOutReportDialog";
import { JIRITSUKUNRENSEIKATSU_SUMMARY_SERVICE_STATUS } from "@constants/mgr/JIRITSUKUNRENSEIKATSU/variables";
import {
  InitialDataValues,
  initialValues
} from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/report/initialValues";

const styles = ({ spacing, palette }: Theme): StyleRules =>
  createStyles({
    headerWrapper: {
      position: "sticky",
      top: 0,
      backgroundColor: palette.background.default,
      zIndex: 1
    },
    headerInfoContainer: {
      paddingRight: 16,
      paddingLeft: 16,
      marginTop: 16,
      marginBottom: 8,
      width: "100%"
    },
    tableContainer: {
      padding: `24px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
      margin: `0px ${spacing.unit * 2}px ${spacing.unit * 2}px ${
        spacing.unit * 2
      }px`
    }
  });

interface StateProps {
  user: UserState;
  reportState: InOutReportState;
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchDaily: (date: Date) => Promise<void>;
  fetchFacility: () => void;
  fetchInoutError: (date: Date) => void;
  fetchSummary: (date: Date) => void;
  fetchOneUser: (id: string) => Promise<void>;
  postDaily: (
    additionDaily: InOutReportState["reports"]["additionsDaily"]
  ) => Promise<void>;
  openErrorsDialog: () => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  selectedDate: Date;
  headerHeight: number;
  isOpenInOutReportDialog: boolean;
  data: InitialDataValues;
  isOpenDetailModal: boolean;
  initialFlg: boolean;
}

type RectangleBoxConfig = {
  title: string;
  denom: number | undefined;
  num: number;
  unit: string;
};

const currentDateForMonthly = new Date();
// 日付の最大値の設定 (30年後の12月31日)
const maxDate = new Date(currentDateForMonthly.getFullYear() + 30, 11, 31);
const minDate = new Date(2001, 0, 1);
/**
 * 利用実績（日ごと）
 */
class InOutReportDaily extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      headerHeight: 0,
      isOpenInOutReportDialog: false,
      data: initialValues(),
      initialFlg: true,
      isOpenDetailModal: false
    };
  }

  public componentDidMount(): void {
    Promise.all([
      this.props.fetchDaily(this.state.selectedDate),
      this.props.fetchFacility(),
      this.props.fetchInoutError(this.state.selectedDate),
      this.props.fetchSummary(this.state.selectedDate)
    ]);
  }

  public componentDidUpdate(): void {
    const top = document.getElementById("reportDailyHeader");
    if (top && top.clientHeight !== this.state.headerHeight) {
      const setClientHeight = (): void => {
        this.setState({
          headerHeight: top.clientHeight
        });
      };
      setClientHeight();
    }
  }

  /**
   * RectangleBoxが受け取れるpropsを作る
   */
  private genRectangleBoxConfig = (
    title: string,
    num: number | null | undefined,
    denom?: number
  ): RectangleBoxConfig => {
    return { title, denom, num: num || 0, unit: "人" };
  };

  private createRectangleList = (
    summary: InOutReportState["summary"]
  ): RectangleBoxConfig[] => {
    const { serviceCounts } = summary;
    return [
      this.genRectangleBoxConfig("送迎（片道）", serviceCounts.oneWayCount),
      this.genRectangleBoxConfig("送迎（往復）", serviceCounts.pickupCount),
      this.genRectangleBoxConfig("食事", serviceCounts.foodCount),
      this.genRectangleBoxConfig("短期滞在", serviceCounts.shortStayCount)
    ];
  };

  private onChangeAbolitionCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const formatedDate = dateInHyphenYYYYMMDDFormat(this.state.selectedDate);
    this.props.postDaily({
      bodyRestrictedStillFlg: checked,
      targetDate: formatedDate
    });
  };

  private onChangeDate = (date: Date): void => {
    this.setState({ selectedDate: date });
    this.props.fetchDaily(date);
    this.props.fetchInoutError(date);
    this.props.fetchSummary(date);
  };

  private onClickErrorDialog = (): void => {
    this.props.openErrorsDialog();
  };

  private openModal = (param: ReportInterface): void => {
    this.setState({
      initialFlg: param.initialFlg !== undefined ? param.initialFlg : true
    });
    // 日付情報はparamに存在しない為
    const inoutState = {
      ...param,
      target_date: dateInHyphenYYYYMMDDFormat(this.state.selectedDate)
    };
    this.setState({ data: initialValues(inoutState) });

    if (param.uif_id) {
      this.props.fetchOneUser(`${param.uif_id}`).then(() => {
        this.setState({ isOpenInOutReportDialog: true });
      });
    }
  };

  private onCancel = (): void => {
    this.setState({ isOpenInOutReportDialog: false });
  };

  private onSubmit = (): void => {
    this.props.fetchDaily(this.state.selectedDate);
    this.props.fetchSummary(this.state.selectedDate);
    this.props.fetchInoutError(this.state.selectedDate);
  };

  private openDetailModal = (): void => {
    this.setState({ isOpenDetailModal: true });
  };

  private closeDetailModal = (): void => {
    this.setState({ isOpenDetailModal: false });
  };

  public render(): JSX.Element {
    const { classes, inoutErrors, reportState } = this.props;
    const { selectedDate, headerHeight } = this.state;
    const inOutRecords =
      this.props.reportState.summary.inoutRecords.dailyInOutRecords.length > 0
        ? this.props.reportState.summary.inoutRecords.dailyInOutRecords
        : this.props.reportState.summary.inoutRecords.userInOutRecords;
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
            <InOutReportDailyHeader
              minDate={minDate}
              maxDate={maxDate}
              selectedDate={selectedDate}
              bodyRestrictedStillFlg={
                reportState.reports.additionsDaily.bodyRestrictedStillFlg
              }
              onChangeDate={this.onChangeDate}
              onChangeAbolitionCheck={this.onChangeAbolitionCheck}
            />
          </div>
        </div>
        <Paper elevation={0} className={classes.tableContainer}>
          <InOutReportPaperHeader
            rectangleConfigList={this.createRectangleList(
              this.props.reportState.summary
            )}
            openModal={this.openDetailModal}
          />
          <InOutReportTable
            headerHeight={headerHeight}
            openModal={this.openModal}
            type={REPEAT_DAILY}
          />
        </Paper>
        <InOutReportDialog
          open={this.state.isOpenInOutReportDialog}
          reportList={this.props.reportState.reports.reportDaily.reportList}
          data={this.state.data}
          selectedDate={selectedDate}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          type={REPEAT_DAILY}
          initialFlg={this.state.initialFlg}
        />
        <InOutReportModal
          countsPerStatus={this.props.reportState.summary.countsPerStatus}
          inOutRecords={inOutRecords}
          isOpen={this.state.isOpenDetailModal}
          onClose={this.closeDetailModal}
          targetName=""
          date={this.state.selectedDate}
          type={REPEAT_DAILY}
          pageType="report"
          serviceType={this.props.user.facility_type}
          summaryServiceStatus={JIRITSUKUNRENSEIKATSU_SUMMARY_SERVICE_STATUS}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    user: state.user as UserState,
    reportState: state.JIRITSUKUNRENSEIKATSU.report,
    inoutErrors: state.errors.inout
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { JIRITSUKUNRENSEIKATSU, errorsDispatcher } = dispatches;
  const reportDispacher = JIRITSUKUNRENSEIKATSU.reportDispacher(dispatch);
  return {
    fetchOneUser: JIRITSUKUNRENSEIKATSU.userInFacilityDispatcher(dispatch)
      .fetchOne,
    fetchFacility: JIRITSUKUNRENSEIKATSU.facilityDispatcher(dispatch).fetch,
    fetchDaily: (date: Date): Promise<void> =>
      reportDispacher.fetchJIRITSUKUNRENSEIKATSUDaily(date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    fetchSummary: (date: Date): Promise<void> =>
      reportDispacher.fetchJIRITSUKUNRENSEIKATSUDailySummary(date),
    postDaily: (
      addtionDaily: InOutReportState["reports"]["additionsDaily"]
    ): Promise<void> =>
      reportDispacher.postJIRITSUKUNRENSEIKATSUInOutAllRecord(addtionDaily),
    openErrorsDialog: (): {
      readonly type: "UI/SHOW_ERRORS_DIALOG";
    } => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportDaily));
