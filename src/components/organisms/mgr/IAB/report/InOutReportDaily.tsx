import * as React from "react";
import { connect } from "react-redux";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles, Theme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InOutReportDailyHeader from "@components/organisms/mgr/IAB/report/InOutReportDailyHeader";
import InOutReportTable from "@components/organisms/mgr/IAB/report/InOutReportTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import { ErrorsState } from "@stores/domain/errors/types";
import InOutReportPaperHeader from "@components/organisms/mgr/IAB/report/InOutReportPaperHeader";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { SHOW_ERRORS_DIALOG } from "@stores/ui/errorsDialog/types";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { ReportDailyState } from "@stores/pages/report/daily/types";
import {
  REPEAT_DAILY,
  IABReportAdditionsDaily,
  IABReport,
  IABSummary,
  IABInOutReportState
} from "@stores/domain/mgr/IAB/report/types";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { dateInHyphenYYYYMMDDFormat } from "@utils/date";
import {
  InitialDataValues,
  initialValues
} from "@initialize/mgr/IAB/report/initialValues";
import makeValidDataList from "@utils/dataNormalizer/makeValidDataList";
import InOutReportDialog from "./InOutReportDialog";
import InOutReportModal from "@components/organisms/mgr/common/report/InOutReportModal";
import { IAB_SUMMARY_SERVICE_STATUS } from "@constants/mgr/IAB/variables";

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
  facility: FacilityState;
  reportState: IABInOutReportState;
  inoutErrors: ErrorsState["inout"];
  errorsDateList: ReportDailyState["errorsDateList"];
}

interface DispatchProps {
  fetchDaily: (date: Date) => Promise<void>;
  fetchFacility: () => Promise<void>;
  fetchInoutError: (date: Date) => Promise<void>;
  fetchSummary: (date: Date) => Promise<void>;
  fetchLatestInoutErrors: () => Promise<void>;
  postInOutAllRecords: (
    additionDaily: IABReportAdditionsDaily
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
      data: initialValues(this.props.facility),
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
  ): {
    title: string;
    denom: number | undefined;
    num: number;
    unit: string;
  } => {
    return { title, denom, num: num || 0, unit: "人" };
  };

  /**
   * 表示している日付で、指定サービスに該当する人数
   */
  private createRectangleList = (
    summary: IABSummary
  ): {
    title: string;
    denom: number | undefined;
    num: number;
    unit: string;
  }[] => {
    const { serviceCounts } = summary;
    return makeValidDataList([
      this.props.facility.transferServiceFlag &&
        this.genRectangleBoxConfig("送迎（片道）", serviceCounts.oneWayCount),
      this.props.facility.transferServiceFlag &&
        this.genRectangleBoxConfig("送迎（往復）", serviceCounts.pickupCount),
      this.props.facility.mealSaservedServiceFlag &&
        this.genRectangleBoxConfig("食事", serviceCounts.foodCount),
      this.genRectangleBoxConfig("医療連携", serviceCounts.medicalSupportCount)
    ]);
  };

  private onChangeAbolitionCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const formatedDate = dateInHyphenYYYYMMDDFormat(this.state.selectedDate);
    this.props.postInOutAllRecords({
      bodyRestrictedStillFlg: checked,
      openShortTime: this.props.reportState.IABReports.additionsDaily
        .openShortTime,
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

  private openModal = (param: IABReport): void => {
    this.setState({ isOpenInOutReportDialog: true });
    this.setState({
      initialFlg: param.initialFlg !== undefined ? param.initialFlg : true
    });
    // 日付情報はparamに存在しない為
    const inoutState = {
      ...param,
      target_date: dateInHyphenYYYYMMDDFormat(this.state.selectedDate)
    };
    this.setState({
      data: initialValues(this.props.facility, inoutState)
    });
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
                reportState.IABReports.additionsDaily.bodyRestrictedStillFlg
              }
              errorsDateList={this.props.errorsDateList}
              onChangeDate={this.onChangeDate}
              onChangeAbolitionCheck={this.onChangeAbolitionCheck}
              fetchLatestInoutErrors={this.props.fetchLatestInoutErrors}
            />
          </div>
        </div>
        <Paper elevation={0} className={classes.tableContainer}>
          <InOutReportPaperHeader
            rectangleConfigList={this.createRectangleList(
              this.props.reportState.IABSummary
            )}
            openModal={this.openDetailModal}
          />
          <InOutReportTable
            headerHeight={headerHeight}
            openModal={this.openModal}
            type={REPEAT_DAILY}
          />
        </Paper>
        {this.state.isOpenInOutReportDialog && (
          /* モーダルで作業時間関連の項目を表示したり、初期値を設定するときにuserInFacilityのデータをID指定で取得したいので、
             編集ボタンを押下したときにモーダルを描画するように変更（Modalのmount時に呼び出したい） */
          <InOutReportDialog
            open={this.state.isOpenInOutReportDialog}
            reportList={
              this.props.reportState.IABReports.reportDaily.reportList
            }
            data={this.state.data}
            selectedDate={selectedDate}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            type={REPEAT_DAILY}
            initialFlg={this.state.initialFlg}
          />
        )}
        <InOutReportModal
          countsPerStatus={this.props.reportState.IABSummary.countsPerStatus}
          inOutRecords={this.props.reportState.IABSummary.inoutRecords}
          isOpen={this.state.isOpenDetailModal}
          onClose={this.closeDetailModal}
          targetName=""
          date={this.state.selectedDate}
          type={REPEAT_DAILY}
          pageType="report"
          serviceType={this.props.user.facility_type}
          summaryServiceStatus={IAB_SUMMARY_SERVICE_STATUS}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserState,
  facility: state.IAB.facility,
  reportState: state.IAB.report,
  inoutErrors: state.errors.inout,
  errorsDateList: state.pages.reportDaily.errorsDateList
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { IAB, errorsDispatcher, pages } = dispatches;
  const reportDispatcher = IAB.reportDispatcher(dispatch);
  const reportDailyDispatcher = pages.reportDailyDispatcher(dispatch);
  return {
    fetchFacility: IAB.facilityDispatcher(dispatch).fetch,
    fetchDaily: (date: Date): Promise<void> =>
      reportDispatcher.fetchIABDaily(date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    fetchSummary: (date: Date): Promise<void> =>
      reportDispatcher.fetchDailySummary(date),
    fetchLatestInoutErrors: reportDailyDispatcher.fetchLatestInoutErrors,
    postInOutAllRecords: (
      additionDaily: IABReportAdditionsDaily
    ): Promise<void> => reportDispatcher.postIABInOutAllRecords(additionDaily),
    openErrorsDialog: (): {
      type: typeof SHOW_ERRORS_DIALOG;
    } => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportDaily));
