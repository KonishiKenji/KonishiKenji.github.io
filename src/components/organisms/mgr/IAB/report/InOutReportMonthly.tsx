import * as React from "react";
import { connect } from "react-redux";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles, Theme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InOutReportMonthlyHeader from "@components/organisms/mgr/IAB/report/InOutReportMonthlyHeader";
import InOutReportTable from "@components/organisms/mgr/IAB/report/InOutReportTable";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";
import { ErrorsState } from "@stores/domain/errors/types";
import { UserState } from "@stores/domain/user/type";
import InOutReportPaperHeader from "@components/organisms/mgr/IAB/report/InOutReportPaperHeader";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { SHOW_ERRORS_DIALOG } from "@stores/ui/errorsDialog/types";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import {
  IABReport,
  REPEAT_MONTHLY,
  IABInOutReportState
} from "@stores/domain/mgr/IAB/report/types";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { OptionInterface } from "@components/atoms/DropDown";
import InOutReportModal from "@components/organisms/mgr/common/report/InOutReportModal";
import InOutReportDialog from "./InOutReportDialog";
import {
  InitialDataValues,
  initialValues
} from "@initialize/mgr/IAB/report/initialValues";
import makeValidDataList from "@utils/dataNormalizer/makeValidDataList";
import { FacilityType, SERVICE_STATUS } from "@constants/variables";
import { IAB_SUMMARY_SERVICE_STATUS } from "@constants/mgr/IAB/variables";

const styles = ({ spacing, palette }: Theme): StyleRules =>
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
  facility: FacilityState;
  reportState: IABInOutReportState;
  inoutErrors: ErrorsState["inout"];
}

interface DispatchProps {
  fetchUser: () => Promise<void>;
  fetchFacility: () => Promise<void>;
  fetchReportUser: (uifId: number, date: Date) => Promise<void>;
  fetchInoutError: (date: Date) => Promise<void>;
  fetchSummary: (uifId: number, date: Date) => Promise<void>;
  openErrorsDialog: () => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  selectedMonth: Date;
  selectedUser: OptionInterface;
  headerHeight: number;
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
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedMonth: currentDateForMonthly,
      selectedUser: { label: "", value: "" },
      headerHeight: 0,
      isOpenDetailModal: false,
      isOpenInOutReportDialog: false,
      data: initialValues(this.props.facility),
      selectedDate: new Date(),
      initialFlg: true
    };
  }

  public componentDidMount(): void {
    Promise.all([
      this.props.fetchFacility(),
      this.props.fetchInoutError(this.state.selectedMonth)
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

  private openModal = (param: IABReport): void => {
    this.setState({ isOpenInOutReportDialog: true });
    this.setState({
      initialFlg: param.initialFlg !== undefined ? param.initialFlg : true
    });
    this.setState({
      data: initialValues(this.props.facility, param)
    });
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

  /**
   * 各サービスの利用実績日数の累計
   */
  private createRectangleList = (
    numberOfAbsence: number | null | undefined,
    summary: IABInOutReportState["IABSummary"]
  ): {
    title: string;
    denom: number | undefined;
    num: number;
    unit: string;
  }[] => {
    const { serviceCounts, countsPerStatus } = summary;
    const visitSupportCountList = countsPerStatus.find(
      (value) => value.status === SERVICE_STATUS[5].value
    );
    const visitSupportCount = visitSupportCountList
      ? visitSupportCountList.count
      : 0;
    return makeValidDataList([
      this.genRectangleBoxConfig("欠席時対応", numberOfAbsence, 4),
      this.props.facility.serviceType === FacilityType.IKOU &&
        this.genRectangleBoxConfig(
          "移行準備支援Ⅰ",
          serviceCounts.transitionPreparationSupportCount,
          180
        ),
      (this.props.facility.serviceType === FacilityType.A ||
        this.props.facility.serviceType === FacilityType.B) &&
        this.genRectangleBoxConfig(
          "施設外支援",
          serviceCounts.offsiteSupportCount,
          180
        ),
      this.props.facility.transferServiceFlag &&
        this.genRectangleBoxConfig("送迎（片道）", serviceCounts.oneWayCount),
      this.props.facility.transferServiceFlag &&
        this.genRectangleBoxConfig("送迎（往復）", serviceCounts.pickupCount),
      this.props.facility.mealSaservedServiceFlag &&
        this.genRectangleBoxConfig("食事", serviceCounts.foodCount),
      this.genRectangleBoxConfig("訪問支援", visitSupportCount, 2),
      this.genRectangleBoxConfig("医療連携", serviceCounts.medicalSupportCount)
    ]);
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
            <InOutReportMonthlyHeader
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
              this.props.reportState.IABReports.reportUser.numberOfAbsence,
              this.props.reportState.IABSummary
            )}
            openModal={this.openDetailModal}
          />
          <InOutReportTable
            headerHeight={headerHeight}
            openModal={this.openModal}
            type={REPEAT_MONTHLY}
          />
          {this.state.isOpenInOutReportDialog && (
            /* モーダルで作業時間関連の項目を表示したり、初期値を設定するときにuserInFacilityのデータをID指定で取得したいので、
             編集ボタンを押下したときにモーダルを描画するように変更（Modalのmount時に呼び出したい） */
            <InOutReportDialog
              open={this.state.isOpenInOutReportDialog}
              reportList={
                this.props.reportState.IABReports.reportUser.reportList
              }
              data={this.state.data}
              selectedDate={this.state.selectedDate}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              type={REPEAT_MONTHLY}
              initialFlg={this.state.initialFlg}
            />
          )}
          <InOutReportModal
            countsPerStatus={this.props.reportState.IABSummary.countsPerStatus}
            inOutRecords={this.props.reportState.IABSummary.inoutRecords}
            isOpen={this.state.isOpenDetailModal}
            onClose={this.closeDetailModal}
            targetName={this.state.selectedUser.label}
            date={this.state.selectedMonth}
            type={REPEAT_MONTHLY}
            pageType="report"
            serviceType={this.props.user.facility_type}
            userReportList={
              this.props.reportState.IABReports.reportUser.reportList
            }
            summaryServiceStatus={IAB_SUMMARY_SERVICE_STATUS}
          />
        </Paper>
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    user: state.user as UserState,
    facility: state.IAB.facility,
    reportState: state.IAB.report,
    inoutErrors: state.errors.inout
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { userDispatch, IAB, errorsDispatcher } = dispatches;
  const reportDispatches = IAB.reportDispatcher(dispatch);

  return {
    fetchUser: userDispatch(dispatch).me,
    fetchFacility: IAB.facilityDispatcher(dispatch).fetch,
    fetchReportUser: (uifId: number, date: Date): Promise<void> =>
      reportDispatches.fetchIABUser(uifId, date),
    fetchInoutError: errorsDispatcher(dispatch).inout,
    fetchSummary: (uifId: number, date: Date): Promise<void> =>
      reportDispatches.fetchIABUserSummary(uifId, date),
    openErrorsDialog: (): {
      type: typeof SHOW_ERRORS_DIALOG;
    } => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InOutReportUser));
