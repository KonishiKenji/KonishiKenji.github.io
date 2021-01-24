import * as React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import * as format from "date-fns/format";
import * as jaLocale from "date-fns/locale/ja";

// store
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { UserSummaryState } from "@stores/domain/userSummary/types";
import { FacilityState as IABFacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { FacilityState as SEIKATSUKAIGOFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import dispatches from "@stores/dispatches";

// components
import LineBreak from "@components/atoms/LineBreak";
import InterviewRecord from "@components/organisms/mgr/common/record/InterviewRecord";

// constants
import {
  PRINT_PAGE_HEIGHT_RECORD,
  PRINT_PAGE_WIDTH_RECORD,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@/constants/styles";
import {
  SERVICE_STATUS,
  SUPPORT_RECORD_KEY_LABEL,
  FacilityType,
  SUPPLY_PICKUP_SERVICE_LIST
} from "@constants/variables";
import { formatTime, defaultTimeLabel } from "@utils/date";
import { formatInOutTime } from "@utils/date/formatInOutTime";
import { isDispInOutTime } from "@utils/date/isDispInOutTime";
import { getUrlParams } from "@/utils/url";

const TABLE_HEAD_HEIGHT = 25;
// ２ページ目以降の項目表示開始行の高さ
const AFTER_FIRSTPAGE_CONTENTS_HEIGHT =
  PRINT_PAGE_HEIGHT_RECORD - TABLE_HEAD_HEIGHT;
// 利用者ごとの最終ページ微調整高さ
const LAST_PAGE_TAIL_ADJUSTMENT_HEIGHT = 2;

const styles = (): StyleRules =>
  createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT_RECORD,
      width: PRINT_PAGE_WIDTH_RECORD,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: `10px ${PRINT_PAGE_PADDING / 2}px`,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      "&:last-child": {
        margin: "0 auto"
      }
    },
    flexContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: 8
    },
    container: {
      marginBottom: 12
    },
    table: {
      tableLayout: "fixed",
      borderCollapse: "collapse",
      borderSpacing: 0,
      border: "2px solid",
      textAlign: "left",
      "&.fullWidth": {
        width: "100%"
      },
      "& td": {
        padding: "0.5px 2px",
        borderRight: "1px solid",
        fontSize: 10,
        letterSpacing: 0.6,
        height: 20,
        color: "rgba(0, 0, 0, 0.84)",
        "&.label": {
          textAlign: "center"
        },
        "&.prise": {
          textAlign: "right"
        },
        "&.small": {
          height: 100
        },
        "&.middle": {
          height: 200
        },
        "&.large": {
          height: 300
        },
        "&.sssize": {
          width: 40
        },
        "&.ssize": {
          width: 60
        },
        "&.msize": {
          width: 80
        },
        "&.lsize": {
          width: 100
        },
        "&.llsize": {
          width: 180
        },
        "&.borderBold": {
          borderRight: "2px solid"
        },
        "&.borderDashed": {
          borderRight: "1px dashed"
        },
        "&.topAlign": {
          verticalAlign: "top"
        },
        "&.topCenterAlign": {
          verticalAlign: "top",
          textAlign: "center"
        }
      },
      "& tr": {
        borderBottom: "1px solid",
        "&.borderBold": {
          borderBottom: "2px solid"
        }
      }
    },
    title: {
      margin: 0,
      fontWeight: "normal",
      letterSpacing: 1.2,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.84)"
    },
    contents: {
      margin: 0,
      overflowWrap: "break-word",
      wordWrap: "break-word"
    },
    date: {
      fontSize: 12
    },
    counts: {
      fontSize: 10,
      marginRight: 20
    },
    preview: {
      marginBottom: `${PRINT_PAGE_MARGIN_BOTTOM}px`,
      boxSizing: "unset"
    },
    "@media print": {
      page: {
        width: "172mm",
        height: "251mm",
        minHeight: 0,
        padding: "0 0 20mm",
        margin: "0 auto",
        boxShadow: "none",
        pageBreakAfter: "always",
        "&:last-child": {
          pageBreakAfter: "auto"
        }
      }
    },
    "@media screen": {
      noScreen: { display: "none" }
    },
    inOutTime: {
      "& + .service": {
        marginTop: 8
      }
    }
  });

/**
 * interface
 */
interface StateProps {
  user: UserState;
  supportRecords: UserSummaryState["supportRecords"];
  facility: IABFacilityState | SEIKATSUKAIGOFacilityState;
}
interface OwnProps {
  year: string;
  month: string;
  query: string;
}
interface DispatchProps {
  getUserSummarySupportReports: (
    year: string,
    month: string,
    excludedUserIds: string
  ) => void;
  getFacilityData: (facility_type: FacilityType) => void;
}
type Props = StateProps & OwnProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  multiTRSEIIS: {
    [key: string]: {
      userId: number;
      startEndIndexInSheet: [];
    };
  };
}

interface SheetOwnProps {
  setHeaderRef: (headerElement: HTMLElement | null) => void;
  setMultiTableRowRef: (
    tableRowElement: HTMLTableRowElement | null,
    personalId: number
  ) => void;
  counts: UserSummaryState["supportRecords"][0]["counts"];
  support: UserSummaryState["supportRecords"][0]["support"];
  year: string;
  month: string;
  indexInSheet: {
    startIndex: number;
    endIndex: number;
  };
  facilityUserLabel: string;
  recipientNumber: string | null;
  isMeal: boolean;
  isTransfer: boolean;
}

type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

const getSupportContents = (
  status: number,
  supportRecord: Exclude<
    UserSummaryState["supportRecords"][0]["support"],
    null
  >[0]["record"],
  classes: Record<string, string>
): JSX.Element[] => {
  const targetColumns = SUPPORT_RECORD_KEY_LABEL[status];
  const supportContents: JSX.Element[] = [];

  for (let i = 0; i < targetColumns.length; i += 1) {
    const targetColumn = targetColumns[i];
    if (
      targetColumn.key === "interview_flg" &&
      supportRecord &&
      supportRecord[targetColumn.key] === "1"
    ) {
      const startTime =
        supportRecord.interview_start_time === null
          ? defaultTimeLabel
          : formatTime(supportRecord.interview_start_time);
      const endTime =
        supportRecord.interview_end_time === null
          ? defaultTimeLabel
          : formatTime(supportRecord.interview_end_time);
      supportContents.push(
        <span key={supportContents.length} className={classes.contents}>
          {`${startTime} 〜 ${endTime}`}
          <br />
          {supportRecord.interview_comment && (
            <LineBreak text={supportRecord.interview_comment} />
          )}
        </span>
      );
    }

    if (
      supportContents.length > 0 &&
      supportContents[supportContents.length - 1].type !== "br"
    ) {
      supportContents.push(<br />);
    }
  }
  supportContents.pop();

  return supportContents;
};

class RecordUsersSummaryInterviewPreview extends React.Component<Props, State> {
  public headerElement: HTMLElement | null;

  public multiTableRowElements: { [key: number]: HTMLTableRowElement[] };

  public currentPersonalId: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      multiTRSEIIS: {}
    };
    this.headerElement = null;
    this.multiTableRowElements = {};
    this.currentPersonalId = 0;
  }

  public async componentDidMount(): Promise<void> {
    const { year, month, query, user } = this.props;
    this.props.getFacilityData(user.facility_type);
    const queryParameters: {
      excluded_user_ids?: string;
    } = getUrlParams(query);
    let excludedUserIds = "";
    if (queryParameters.excluded_user_ids) {
      excludedUserIds = queryParameters.excluded_user_ids;
    }
    await this.props.getUserSummarySupportReports(year, month, excludedUserIds);

    if (Object.keys(this.multiTableRowElements).length !== 0) {
      this.separatePage();
    }
  }

  public componentDidUpdate(): void {
    if (Object.keys(this.multiTableRowElements).length !== 0) {
      this.separatePage();
    }
  }

  private separatePage = (): void => {
    const { supportRecords } = this.props;
    const idList =
      supportRecords.length > 0
        ? supportRecords.map((item) => item.support[0].inout.uif_id)
        : [];

    if (idList.length > 0) {
      const multiTableRowStartEndIndicesInSheet = {};
      const currentId: number | null = null;
      idList.forEach((id) => {
        const calcedIndicesInSheet = this.calcContentsHeight(
          this.multiTableRowElements[id]
        );

        if (currentId !== id) {
          multiTableRowStartEndIndicesInSheet[`${id}`] = {};
        }
        multiTableRowStartEndIndicesInSheet[`${id}`] = {
          userId: id,
          startEndIndexInSheet: calcedIndicesInSheet
        };
      });

      if (Object.keys(this.state.multiTRSEIIS).length === 0) {
        this.setState({
          multiTRSEIIS: multiTableRowStartEndIndicesInSheet
        });
      }
    }
  };

  /**
   * 1面談に該当するhtml要素の高さをもとに、
   * 1ページずつ分割した際のインデックス情報をindexInSheetに追加する。
   * 1ページ目は計算された情報がIndexInSheetに入っているので
   * 2ページ目以降について計算結果をセットする。
   * 例：height: 5000, ページの高さ:1007の場合、4ページ構成
   * @param height 2ページ目以降の高さ
   * @param indexInSheet ページ内に収まる面談件数のインデックスリスト
   * @returns ページ分割計算後の余りの高さ
   */
  private buildIndexInSheet = (
    height: number,
    indexInSheet: { [key: string]: number }[]
  ): number => {
    // 要素の高さ(height)をA4ページの高さで単純に割ると
    // ページ内にギリギリ入る量(例えば2ページで収まる量)の高さを計算しても
    // ページの余白によって実際のブラウザー印刷プレビューは次ページ(3ページ目)に
    // 空のページが出来てしまうので空ページが表示されないよう高さの微調整計算を行う。
    const contentsHeight =
      AFTER_FIRSTPAGE_CONTENTS_HEIGHT + LAST_PAGE_TAIL_ADJUSTMENT_HEIGHT;
    const calculatedHeight = contentsHeight + indexInSheet.length * 28;
    if (height > calculatedHeight) {
      const lastItem = indexInSheet[indexInSheet.length - 1];
      const lastIdx = lastItem.endIndex + 1;
      indexInSheet.push({
        startIndex: lastIdx,
        endIndex: lastIdx
      });
      return this.buildIndexInSheet(
        height - AFTER_FIRSTPAGE_CONTENTS_HEIGHT,
        indexInSheet
      );
    }
    return height;
  };

  private calcContentsHeight = (
    elms: HTMLTableRowElement[]
  ): { [key: string]: number }[] => {
    let total = 0;
    let currentIndex = 0;
    let lastIndex = 0;
    const indexInSheet: { [key: string]: number }[] = [];

    if (!elms) return indexInSheet;
    const elements: HTMLTableRowElement[] = [];
    elms.forEach((el) => {
      if (!elements.find((item) => item.rowIndex === el.rowIndex)) {
        elements.push(el);
      }
    });

    const headerHeight = this.headerElement
      ? this.headerElement.offsetHeight
      : 0;

    // １ページ目の項目表示開始行の高さ
    const firstPageContentsHeight =
      PRINT_PAGE_HEIGHT_RECORD - (headerHeight + TABLE_HEAD_HEIGHT);

    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (!el) return [];

      total += el.offsetHeight;
      let pageContentsHeight =
        indexInSheet.length === 0
          ? firstPageContentsHeight
          : AFTER_FIRSTPAGE_CONTENTS_HEIGHT;
      pageContentsHeight =
        i === elements.length - 1
          ? pageContentsHeight + LAST_PAGE_TAIL_ADJUSTMENT_HEIGHT
          : pageContentsHeight;

      if (total > pageContentsHeight) {
        currentIndex = currentIndex < 1 ? 1 : currentIndex;
        indexInSheet.push({
          startIndex: lastIndex,
          endIndex: currentIndex - 1
        });
        lastIndex = currentIndex;
        // 1日分の面談内容(htmlの1要素)が該当ページ内に収まらない場合
        // 面談内容の高さをもとにシートのインデックス情報を構築する。
        total -= pageContentsHeight;
        total = this.buildIndexInSheet(total, indexInSheet);
      }
      currentIndex += 1;
    }
    indexInSheet.push({
      startIndex: lastIndex,
      endIndex: currentIndex
    });

    return indexInSheet;
  };

  private setHeaderRef = (headerElement: HTMLElement | null): void => {
    this.headerElement = headerElement;
  };

  private setMultiTableRowRef = (
    tableRowElement: HTMLTableRowElement | null,
    personalId: number
  ): void => {
    if (this.currentPersonalId !== personalId) {
      this.currentPersonalId = personalId;
      this.multiTableRowElements[`${this.currentPersonalId}`] = [];
    }
    if (
      this.multiTableRowElements[`${this.currentPersonalId}`] &&
      !!tableRowElement
    ) {
      this.multiTableRowElements[`${this.currentPersonalId}`].push(
        tableRowElement
      );
    }
  };

  public render(): (JSX.Element | null)[] | null {
    const { classes, user, supportRecords, year, month, facility } = this.props;
    const { multiTRSEIIS } = this.state;

    if (supportRecords.length === 0 && Object.keys(multiTRSEIIS).length === 0) {
      return null;
    }

    const tableRowStartEndIndicesInSheet = multiTRSEIIS;

    return supportRecords
      .filter(
        (record) =>
          record && record.counts && record.counts.numberOfHavingInterview !== 0
      )
      .map((record) => {
        const { counts, support } = record;
        const [supportFirstItem] = support;
        const userId = supportFirstItem.inout.uif_id;
        const { recipientNumber } = supportFirstItem.inout;
        let indexInSheets = [];

        if (Object.keys(tableRowStartEndIndicesInSheet).length === 0) {
          indexInSheets.push({
            startIndex: 0,
            endIndex: support.length
          });
        } else {
          indexInSheets = [
            ...tableRowStartEndIndicesInSheet[userId].startEndIndexInSheet
          ];
        }
        return (
          <div key={userId} className={classes.preview}>
            {indexInSheets.map((indexInSheet, idx) => {
              const uniqueKey = `${userId}-${idx}`;
              return indexInSheet.startIndex === 0 ? (
                <Sheet
                  key={uniqueKey}
                  classes={classes}
                  counts={counts}
                  support={support}
                  recipientNumber={recipientNumber}
                  facilityUserLabel={
                    user.labels ? user.labels.facility_user : "利用者"
                  }
                  year={year}
                  month={month}
                  setHeaderRef={this.setHeaderRef}
                  setMultiTableRowRef={this.setMultiTableRowRef}
                  indexInSheet={indexInSheet}
                  // 事業所情報_食事の状態
                  isMeal={facility.mealSaservedServiceFlag}
                  // 事業所情報_送迎の状態
                  isTransfer={facility.transferServiceFlag}
                />
              ) : (
                <EmptySheet key={uniqueKey} classes={classes} />
              );
            })}
          </div>
        );
      });
  }
}

/**
 * 複数ページにまたがる面談内容の場合、印刷用のページ数分画面を用意するが、
 * 印刷プレビュー前は非表示で、印刷プレビュー時には表示にcssで切り替える。
 */
const EmptySheet = (props: WithStyles<typeof styles>): JSX.Element => {
  const emptySheetStyle = `${props.classes.page} ${props.classes.noScreen}`;
  return <section className={emptySheetStyle} />;
};

const Sheet = (props: SheetProps): JSX.Element => {
  const {
    classes,
    counts,
    support,
    recipientNumber,
    year,
    month,
    setHeaderRef,
    setMultiTableRowRef,
    indexInSheet,
    facilityUserLabel,
    isMeal,
    isTransfer
  } = props;
  const { startIndex } = indexInSheet;

  return (
    <section className={classes.page}>
      {startIndex === 0 && (
        <div ref={(headerElement): void => setHeaderRef(headerElement)}>
          <header>
            <h1 className={classes.title}>面談記録</h1>
          </header>
          <div className={classes.flexContainer}>
            <span className={classes.counts}>
              {`${facilityUserLabel}名： ${support[0].inout.name}`}
            </span>
            <span className={classes.counts}>
              {`受給者証番号： ${recipientNumber || "-"}`}
            </span>
          </div>
          <div className={classes.flexContainer}>
            <span className={classes.counts}>{`${year}年${month}月分`}</span>
            <InterviewRecord counts={counts} supports={support} />
          </div>
        </div>
      )}
      <div className={classes.flexContainer} style={{ marginBottom: 0 }}>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr style={{ height: TABLE_HEAD_HEIGHT }}>
              <td className="label ssize">日付</td>
              <td className="label msize">利用状態</td>
              <td className="label">面談内容</td>
              <td className="label ssize">記録者</td>
              <td className="label sssize">捺印</td>
            </tr>
            {support.map(({ inout, record }) => {
              if (
                inout.status === 5 ||
                inout.status === 6 ||
                inout.status === 10
              ) {
                return null;
              }
              if (
                !record ||
                record.interview_flg === "0" ||
                record.interview_flg === null
              ) {
                return null;
              }

              const targetDate = new Date(inout.target_date);
              const inTime = formatInOutTime(inout.in_time || "");
              const outTime = formatInOutTime(inout.out_time || "");
              const statusObj = SERVICE_STATUS.find(
                (el) => el.value === inout.status
              );
              let status = "";
              if (statusObj !== undefined) {
                status = statusObj.label;
              }
              const dispInOutTimes = isDispInOutTime(inout.status);
              const pickup = inout.pickup
                ? SUPPLY_PICKUP_SERVICE_LIST[inout.pickup].label
                : "";

              return (
                <tr
                  key={inout.id}
                  ref={(tableRowElement): void => {
                    setMultiTableRowRef(tableRowElement, inout.uif_id);
                  }}
                >
                  <td className="label topCenterAlign">
                    {format(targetDate, "MM/DD(dd)", {
                      locale: jaLocale
                    })}
                  </td>
                  <td className="label topCenterAlign">
                    <div>{status}</div>
                    <div className={classes.inOutTime}>
                      {dispInOutTimes ? `${inTime}〜${outTime}` : null}
                    </div>
                    {isMeal && inout.food && inout.food === "1" && (
                      <div className="service">食事:あり</div>
                    )}
                    {isTransfer && inout.pickup && inout.pickup !== "0" && (
                      <div className="service">{`送迎:${pickup}`}</div>
                    )}
                  </td>
                  <td className="topAlign">
                    {getSupportContents(inout.status, record, classes)}
                  </td>
                  <td className="label topCenterAlign">
                    {record ? record.staff_name : ""}
                  </td>
                  <td className="label" />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  const user = state.user as UserState;
  const facility =
    user.facility_type === FacilityType.SEIKATSUKAIGO
      ? state.SEIKATSUKAIGO.facility
      : state.IAB.facility;
  return {
    user,
    supportRecords: state.userSummary.supportRecords,
    facility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { userSummaryDispatcher } = dispatches;
  const userSummaryDispatches = userSummaryDispatcher(dispatch);

  const getFacilityData = (facility_type: FacilityType): Promise<void> => {
    // 種別として移行AB or 生活介護が利用する機能なので
    // facility_typeで該当種別のdispatcherを選択する
    const dispatcher2 =
      facility_type === FacilityType.SEIKATSUKAIGO
        ? dispatches.SEIKATSUKAIGO
        : dispatches.IAB;

    return dispatcher2.facilityDispatcher(dispatch).fetch();
  };
  return {
    getUserSummarySupportReports: (
      year: string,
      month: string,
      excludedUserIds: string
    ): Promise<void> =>
      userSummaryDispatches.fetchUserSummarySupportReports(
        year,
        month,
        excludedUserIds
      ),
    getFacilityData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RecordUsersSummaryInterviewPreview));
