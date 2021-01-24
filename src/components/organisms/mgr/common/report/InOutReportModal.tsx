import * as React from "react";
import { StyleRules } from "@material-ui/core/styles";
import {
  createStyles,
  WithStyles,
  Button,
  withStyles
} from "@material-ui/core";
import { SEIKATSUKAIGOReport } from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { ReportInterface as JIRITSUKUNRENSEIKATSUReport } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import { IABReport } from "@stores/domain/mgr/IAB/report/types";
import InOutDetailHeaderItem from "@components/organisms/mgr/common/report/detail/InOutDetailHeaderItem";
import InOutDetailModalContents from "@components/organisms/mgr/common/report/detail/InOutDetailModalContents";
import InOutReportContents from "@components/organisms/mgr/common/record/InOutReportContents";
import {
  dateInYYYYFormat,
  dateTodayForAttendanceHeaderForDetailDaily,
  dateInMFormat
} from "@utils/date";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {
  REPEAT_DAILY,
  ReportTypeInterface,
  DailyInOutRecords,
  UserInOutRecords,
  InOutReportState
} from "@stores/domain/report/type";
import { FacilityType } from "@constants/variables";
import InOutDetailHeader from "@components/organisms/mgr/common/report/detail/InOutDetailHeader";

const styles = (): StyleRules =>
  createStyles({
    modalHeader: {
      display: "flex",
      justifyContent: "space-between" as "space-between"
    },
    modalHeaderFirstCell: {
      marginLeft: 32
    },
    modalHeaderLeft: {
      display: "flex",
      justifyContent: "space-between" as "space-between",
      fontSize: 20
    },
    closeButton: {
      width: 100,
      height: 36,
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      backgroundColor: "rgba(98, 2, 238, 0)",
      color: "#0277bd"
    },
    modal: {
      width: 1070,
      // スクロールバーの非表示（Googole Chromeのみの適用）
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    modalArea: {
      height: 640,
      width: 1070
    },
    modalContents: {
      padding: 0,
      height: 488
    },
    tableHeader: {
      height: 88,
      position: "sticky",
      padding: 0,
      top: 64
    },
    modalHeaderArea: {
      width: "100%",
      height: 64,
      padding: "15px 40px",
      top: 0,
      position: "sticky",
      backgroundColor: "#fff"
    },
    marginInfo: {
      marginRight: 32
    },
    marginDate: {
      marginRight: 8
    }
  });

interface ItemSummary {
  notUsed: number;
  usualPlace: number;
  whenAbsent: number;
  visit: number;
  trialUseSupport: number;
  offsiteWork: number; // ABのみ
  offsiteSupport: number; // ABのみ
  supportIkou1: number; // 移行のみ
  supportIkou2: number; // 移行のみ
  absent: number;
}

interface OwnProps {
  countsPerStatus: InOutReportState["summary"]["countsPerStatus"];
  inOutRecords: DailyInOutRecords[] | UserInOutRecords[];
  targetName: string;
  date: Date;
  isOpen: boolean;
  onClose: () => void;
  type: ReportTypeInterface["type"];
  pageType: "report" | "record";
  serviceType: FacilityType;
  summaryServiceStatus: {
    USUAL_PLACE: { label: string; value: number };
    OFFSITE_WORK?: { label: string; value: number };
    OFFSITE_SUPPORT?: { label: string; value: number };
    WHEN_ABSENT: { label: string; value: number };
    VISIT: { label: string; value: number };
    TRIAL_USE_SUPPORT: { label: string; value: number };
    SUPPORT_IKOU_1?: { label: string; value: number };
    SUPPORT_IKOU_2?: { label: string; value: number };
    ABSENT: { label: string; value: number };
  };
  userReportList?:
    | SEIKATSUKAIGOReport[]
    | JIRITSUKUNRENSEIKATSUReport[]
    | IABReport[];
}

type Props = WithStyles<typeof styles> & OwnProps;

interface State {
  height: number;
}

class InOutReportModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { height: window.innerHeight };
  }

  private updateDimensions = (): void => {
    this.setState({ height: window.innerHeight });
  };

  componentDidMount = (): void => {
    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount = (): void => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  private onClose = (): void => {
    this.props.onClose();
  };

  private createSummary = (
    countsPerStatus: InOutReportState["summary"]["countsPerStatus"]
  ): ItemSummary => {
    const { summaryServiceStatus } = this.props;
    const summary = {
      notUsed: 0,
      usualPlace: 0,
      whenAbsent: 0,
      visit: 0,
      trialUseSupport: 0,
      offsiteWork: 0,
      offsiteSupport: 0,
      supportIkou1: 0,
      supportIkou2: 0,
      absent: 0
    };

    countsPerStatus.forEach((countPerStatus) => {
      const count = countPerStatus.count || 0;
      switch (countPerStatus.status) {
        case summaryServiceStatus.USUAL_PLACE.value:
          summary.usualPlace = count;
          break;
        case summaryServiceStatus.WHEN_ABSENT.value:
          summary.whenAbsent = count;
          break;
        case summaryServiceStatus.VISIT.value:
          summary.visit = count;
          break;
        case summaryServiceStatus.TRIAL_USE_SUPPORT.value:
          summary.trialUseSupport = count;
          break;
        case summaryServiceStatus.OFFSITE_WORK &&
          summaryServiceStatus.OFFSITE_WORK.value:
          summary.offsiteWork = count;
          break;
        case summaryServiceStatus.OFFSITE_SUPPORT &&
          summaryServiceStatus.OFFSITE_SUPPORT.value:
          summary.offsiteSupport = count;
          break;
        case summaryServiceStatus.SUPPORT_IKOU_1 &&
          summaryServiceStatus.SUPPORT_IKOU_1.value:
          summary.supportIkou1 = count;
          break;
        case summaryServiceStatus.SUPPORT_IKOU_2 &&
          summaryServiceStatus.SUPPORT_IKOU_2.value:
          summary.supportIkou2 = count;
          break;
        case summaryServiceStatus.ABSENT.value:
          summary.absent = count;
          break;
        default:
          summary.notUsed += count;
          break;
      }
    });
    return summary;
  };

  private getABHeaderItem = (
    summary: ItemSummary
  ): {
    title: string | undefined;
    mainText: string;
  }[] => {
    return [
      {
        title:
          this.props.summaryServiceStatus.OFFSITE_WORK &&
          this.props.summaryServiceStatus.OFFSITE_WORK.label,
        mainText: `${summary.offsiteWork}`
      },
      {
        title:
          this.props.summaryServiceStatus.OFFSITE_SUPPORT &&
          this.props.summaryServiceStatus.OFFSITE_SUPPORT.label,
        mainText: `${summary.offsiteSupport}`
      }
    ];
  };

  private getIkouHeaderItem = (
    summary: ItemSummary
  ): {
    title: string | undefined;
    mainText: string;
  }[] => {
    return [
      {
        title:
          this.props.summaryServiceStatus.SUPPORT_IKOU_1 &&
          this.props.summaryServiceStatus.SUPPORT_IKOU_1.label,
        mainText: `${summary.supportIkou1}`
      },
      {
        title:
          this.props.summaryServiceStatus.SUPPORT_IKOU_2 &&
          this.props.summaryServiceStatus.SUPPORT_IKOU_2.label,
        mainText: `${summary.supportIkou2}`
      }
    ];
  };

  public render(): JSX.Element {
    const {
      date,
      countsPerStatus,
      pageType,
      serviceType,
      summaryServiceStatus,
      inOutRecords
    } = this.props;
    const isDaily: boolean = this.props.type === REPEAT_DAILY;
    const summary = this.createSummary(countsPerStatus);
    const unit = isDaily ? "人" : "日";
    let diffHeaderItems =
      serviceType === FacilityType.IKOU ? this.getIkouHeaderItem(summary) : [];
    if (serviceType === FacilityType.A || serviceType === FacilityType.B) {
      diffHeaderItems = this.getABHeaderItem(summary);
    }

    const headerLabelList: React.ReactElement[] = [
      <div key={0} className={this.props.classes.modalHeaderFirstCell}>
        {isDaily ? "利用者氏名/受給者証番号" : "日付"}
      </div>,
      <InOutDetailHeaderItem
        title="利用なし"
        mainText={summary.notUsed.toString()}
        unit={unit}
        key={1}
      />,
      <InOutDetailHeaderItem
        title={summaryServiceStatus.USUAL_PLACE.label}
        mainText={summary.usualPlace.toString()}
        unit={unit}
        key={2}
      />,
      <InOutDetailHeaderItem
        title={summaryServiceStatus.WHEN_ABSENT.label}
        mainText={summary.whenAbsent.toString()}
        unit={isDaily ? unit : ` /4${unit}`}
        key={3}
      />,
      <InOutDetailHeaderItem
        title={summaryServiceStatus.VISIT.label}
        mainText={summary.visit.toString()}
        unit={unit}
        key={4}
      />,
      <InOutDetailHeaderItem
        title={summaryServiceStatus.TRIAL_USE_SUPPORT.label}
        mainText={summary.trialUseSupport.toString()}
        unit={unit}
        key={5}
      />,
      <InOutDetailHeaderItem
        title={diffHeaderItems.length > 0 ? diffHeaderItems[0].title || "" : ""}
        mainText={diffHeaderItems.length > 0 ? diffHeaderItems[0].mainText : ""}
        unit={unit}
        key={6}
      />,
      <InOutDetailHeaderItem
        title={diffHeaderItems.length > 0 ? diffHeaderItems[1].title || "" : ""}
        mainText={diffHeaderItems.length > 0 ? diffHeaderItems[1].mainText : ""}
        unit={unit}
        key={7}
      />,
      <InOutDetailHeaderItem
        title="欠席"
        mainText={summary.absent.toString()}
        unit={unit}
        key={8}
      />
    ];

    // 不要な項目を削除
    if (
      !(
        serviceType === FacilityType.IKOU ||
        serviceType === FacilityType.A ||
        serviceType === FacilityType.B
      )
    ) {
      headerLabelList.splice(6, 2);
    }

    // スクロールバーの表示範囲を調整。
    // IABリリース前からの事象でスクロールバーは表示されているが画面を小さくするとスクロールバーの表示が見切れてしまう事象があり、
    // 画面の高さに変更があった時、固定(640px)ではなく動的に高さを変動させてスクロールバーが正しい範囲内で収まるように調整。
    // MuiDialogのcssではモーダルの高さをwindow高さ - 96pxで計算している
    const modalHeight = this.state.height - 96;
    // モーダルのmaxHeightを640pxに制限
    const modalAreaStyle = {
      height: `${modalHeight > 640 ? 640 : modalHeight}px`
    };
    // tableBody部の高さ計算
    // スクロール時の固定表示部(152px)：モーダルヘッダーの高さ(64px) + テーブルヘッダー(88px)
    const tempTableBodyHeight = modalHeight - 152;
    // tableBody部のmaxHeightは640-152=488pxに制限
    const modalContentsStyle = {
      height: tempTableBodyHeight > 488 ? 488 : tempTableBodyHeight
    };

    return (
      <Dialog
        disableBackdropClick
        open={this.props.isOpen}
        onClose={this.onClose}
        maxWidth="lg"
        aria-labelledby="max-width-dialog-title"
        classes={{ paper: this.props.classes.modal }}
      >
        <div className={this.props.classes.modalArea} style={modalAreaStyle}>
          <DialogTitle className={this.props.classes.modalHeaderArea}>
            <div>
              <div className={this.props.classes.modalHeader}>
                <div className={this.props.classes.modalHeaderLeft}>
                  <div className={this.props.classes.marginInfo}>
                    利用状況の詳細
                  </div>
                  <div className={this.props.classes.marginDate}>
                    {isDaily
                      ? dateTodayForAttendanceHeaderForDetailDaily(date)
                      : `${dateInYYYYFormat(date)}年 ${dateInMFormat(date)}月`}
                  </div>
                  <div>{this.props.targetName}</div>
                </div>
                <Button
                  onClick={this.onClose}
                  className={this.props.classes.closeButton}
                  color="secondary"
                >
                  閉じる
                </Button>
              </div>
            </div>
          </DialogTitle>
          <div className={this.props.classes.tableHeader}>
            <InOutDetailHeader
              headerData={headerLabelList}
              serviceType={serviceType}
              pageType={pageType}
            />
          </div>
          <DialogContent
            className={this.props.classes.modalContents}
            style={modalContentsStyle}
          >
            {pageType === "report" ? (
              <InOutDetailModalContents
                type={this.props.type}
                mainContentData={inOutRecords}
                date={this.props.date}
                userReportList={this.props.userReportList}
                serviceType={serviceType}
              />
            ) : (
              <InOutReportContents
                mainContentData={inOutRecords}
                serviceType={serviceType}
              />
            )}
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InOutReportModal);
