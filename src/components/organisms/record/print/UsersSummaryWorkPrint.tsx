import * as React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";

// store
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { UserSummaryState } from "@stores/domain/userSummary/types";
import dispatches from "@stores/dispatches";

import * as getDaysInMonth from "date-fns/get_days_in_month";

// constants
import { PRINT_PAGE_MARGIN_BOTTOM } from "@/constants/styles";
import { SERVICE_STATUS } from "@/constants/variables";
import { dateToLocalisedString } from "@/utils/date";
import { getUrlParams } from "@/utils/url";

import intersection from "lodash-es/intersection";

const TABLE_HEAD_HEIGHT = 25;
// A4 横
const PRINT_PAGE_PADDING = 38;
const PRINT_PAGE_WIDTH = 1032;
const PRINT_PAGE_HEIGHT = 650;

const styles = (): StyleRules =>
  createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: PRINT_PAGE_PADDING,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)"
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
    heading: {
      fontSize: 12,
      marginRight: 24
    },
    preview: {
      boxSizing: "unset"
    },
    "@media print": {
      page: {
        width: "251mm",
        height: "172mm",
        minHeight: 0,
        padding: "0 0 10mm",
        margin: "0 auto",
        boxShadow: "none",
        pageBreakAfter: "always",
        "&:last-child": {
          pageBreakAfter: "auto"
        }
      }
    }
  });

/**
 * interface
 */
interface StateProps {
  user: UserState;
  supportRecords: UserSummaryState["supportRecords"];
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
    tableRowElement: HTMLElement | null,
    personalId: number
  ) => void;
  year: string;
  month: string;
  indexInSheet: {
    startIndex: number;
    endIndex: number;
  };
  facilityUserLabel: string;
  workSummary: UserSummaryState["supportRecords"][0]["work_summary"];
  userDetail: UserSummaryState["supportRecords"][0]["support"][0]["inout"];
  correctedData: string[];
  dateList: {
    d: string;
    ymd: string;
  }[];
}
type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

class RecordUsersSummaryWorkPreview extends React.Component<Props, State> {
  public headerElement: HTMLElement | null;

  public multiTableRowElements: { [key: number]: HTMLElement[] };

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
    const { year, month, query } = this.props;
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

  /**
   * 利用者ごとにページを分割する。
   */
  private separatePage = (): void => {
    const { supportRecords } = this.props;
    const idList =
      supportRecords.length > 0
        ? supportRecords.map((item) => item.support[0].inout.uif_id)
        : [];

    const multiTableRowStartEndIndicesInSheet = {};
    const currentId: number | null = null;

    if (idList.length > 0) {
      idList.map((id) => {
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
        return null;
      });

      if (Object.keys(this.state.multiTRSEIIS).length === 0) {
        this.setState({
          multiTRSEIIS: multiTableRowStartEndIndicesInSheet
        });
      }
    }
  };

  /**
   * 利用者の作業記録ごとの高さを計算しながら、各ページ内に収まる量をインデックス情報として返却する。
   * 戻り値の例：[ {startIndex: 0, endIndex: 23}, {startIndex: 24, endIndex: 38} ]
   * 上記例は2ページ分の作業記録があり、
   * 1ページには作業記録リストの1-23のインデックス情報、2ページには24-38のインデックス情報を表す。
   * @param elms 作業項目の１行に該当するHTML要素
   */
  private calcContentsHeight = (
    elms: HTMLElement[]
  ): { [key: string]: number }[] => {
    let total = 0;
    let currentIndex = 0;
    let lastIndex = 0;
    const indexInSheet: { [key: string]: number }[] = [];

    if (!elms) return indexInSheet;
    // elmsの中に重複、offsetHeight: 0の要素が含まれる時があり
    // それらのデータは不要なので取り除く。
    const rowIdxRefElMap = new Map<string, HTMLElement>();
    elms.forEach((el) => {
      const { rowIndex } = el.dataset;
      if (
        el &&
        el.offsetHeight > 0 &&
        rowIndex &&
        !rowIdxRefElMap.has(rowIndex)
      ) {
        rowIdxRefElMap.set(rowIndex, el);
      }
    });

    let rowIndexList: string[] = [];
    rowIdxRefElMap.forEach((_, k) => {
      rowIndexList.push(k);
    });
    rowIndexList = rowIndexList.sort((a, b) => +a - +b);

    const headerHeight = this.headerElement
      ? this.headerElement.offsetHeight
      : 0;

    // １ページ目の作業項目表示開始行の高さ
    const firstPageContentsHeight =
      PRINT_PAGE_HEIGHT - (headerHeight + TABLE_HEAD_HEIGHT);
    // ２ページ目以降の作業項目表示開始行の高さ
    const afterFirstPageContentsHeight = PRINT_PAGE_HEIGHT - TABLE_HEAD_HEIGHT;

    for (let i = 0; i < rowIndexList.length; i += 1) {
      const el = rowIdxRefElMap.get(rowIndexList[i]);
      if (el) {
        total += el.offsetHeight;
        const workContentsHeight =
          indexInSheet.length === 0
            ? firstPageContentsHeight
            : afterFirstPageContentsHeight;

        if (total > workContentsHeight) {
          indexInSheet.push({
            startIndex: lastIndex,
            endIndex: currentIndex - 1
          });
          lastIndex = currentIndex;
          total = el.offsetHeight;
        }
        currentIndex += 1;
      }
    }
    if (currentIndex > 0) {
      indexInSheet.push({
        startIndex: lastIndex,
        endIndex: currentIndex
      });
    }

    return indexInSheet;
  };

  private setHeaderRef = (headerElement: HTMLElement | null): void => {
    this.headerElement = headerElement;
  };

  private setMultiTableRowRef = (
    tableRowElement: HTMLElement | null,
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

  private removeArrayDuplicates = (array: string[]): string[] => {
    return array.reduce((previous: string[], current) => {
      if (previous.indexOf(current) === -1) {
        previous.push(current);
      }
      return previous;
    }, []);
  };

  public render(): (JSX.Element | null)[] | null {
    const { classes, user, supportRecords, year, month } = this.props;
    const { multiTRSEIIS } = this.state;

    const tableRowStartEndIndicesInSheet =
      Object.keys(multiTRSEIIS).length > 0 ? multiTRSEIIS : {};

    const daysInMonth = getDaysInMonth(
      new Date(Number(year), Number(month) - 1, 1)
    );
    const dateList = Array(daysInMonth)
      .fill(1)
      .map((value, index) => {
        const date = new Date(Number(year), Number(month) - 1, index + 1);
        return {
          d: dateToLocalisedString(date, "DD"),
          ymd: dateToLocalisedString(date, "YYYY-MM-DD")
        };
      });

    return supportRecords.length === 0 &&
      Object.keys(tableRowStartEndIndicesInSheet).length === 0
      ? null
      : supportRecords.map((record) => {
          const workSummary = record.work_summary ? record.work_summary : [];
          const userDetail = record.support[0].inout;
          const userId = userDetail.uif_id;
          let indexInSheets = [];
          if (Object.keys(tableRowStartEndIndicesInSheet).length === 0) {
            indexInSheets.push({
              startIndex: 0,
              endIndex: workSummary.length
            });
          } else {
            indexInSheets = [
              ...tableRowStartEndIndicesInSheet[userId].startEndIndexInSheet
            ];
          }

          const workingDaysArr = workSummary
            .map((item) => item.records)
            .reduce((prev, cur) => prev.concat(cur));
          const workingDays = this.removeArrayDuplicates(workingDaysArr);

          const correctedData = record.support
            .filter((item) => {
              const { inout, support_work_history } = item;
              return (
                (inout.status === SERVICE_STATUS[1].value ||
                  inout.status === SERVICE_STATUS[2].value ||
                  inout.status === SERVICE_STATUS[3].value ||
                  inout.status === SERVICE_STATUS[7].value ||
                  inout.status === SERVICE_STATUS[8].value) &&
                !!support_work_history.length
              );
            })
            .map((d) => d.inout.target_date);
          if (
            !workingDays ||
            workingDays.length === 0 ||
            correctedData.length === 0
          ) {
            return null;
          }

          return (
            <div key={`${userDetail.id}`} className={classes.preview}>
              {indexInSheets.map((indexInSheet) => (
                <Sheet
                  key={indexInSheet.startIndex}
                  classes={classes}
                  workSummary={workSummary}
                  userDetail={userDetail}
                  year={year}
                  month={month}
                  dateList={dateList}
                  setHeaderRef={this.setHeaderRef}
                  setMultiTableRowRef={this.setMultiTableRowRef}
                  indexInSheet={indexInSheet}
                  facilityUserLabel={
                    user.labels ? user.labels.facility_user : "利用者"
                  }
                  correctedData={correctedData}
                />
              ))}
            </div>
          );
        });
  }
}

const Sheet = (props: SheetProps): JSX.Element => {
  const {
    classes,
    workSummary,
    userDetail,
    year,
    month,
    dateList,
    setHeaderRef,
    setMultiTableRowRef,
    indexInSheet,
    facilityUserLabel,
    correctedData
  } = props;

  const { startIndex, endIndex } = indexInSheet;

  return (
    <section className={classes.page}>
      {startIndex === 0 && (
        <div ref={(headerElement): void => setHeaderRef(headerElement)}>
          <header>
            <h1 className={classes.title}>作業記録</h1>
          </header>
          <div className={classes.container}>
            <div>
              <span className={classes.heading}>
                {`${facilityUserLabel}名： ${userDetail.name}`}
              </span>
              <span className={classes.heading}>
                {`受給者証番号： ${userDetail.recipientNumber || "-"}`}
              </span>
            </div>
            <div>
              <span className={classes.heading}>{`${year}年${month}月分`}</span>
              <span className={classes.heading}>
                {`作業日： ${correctedData.length}日`}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={classes.flexContainer}>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr style={{ height: TABLE_HEAD_HEIGHT }}>
              <td className="label ssize">
                <div>作業</div>
                <div>カテゴリ</div>
              </td>
              <td className="label lsize">作業項目</td>
              {dateList.map((date) => (
                <td key={date.ymd} className="label">
                  {date.d}
                </td>
              ))}
              <td className="label">
                <div>実施</div>
                <div>回数</div>
              </td>
            </tr>
            {workSummary.map(({ category, item, records }, index) => {
              if (index < startIndex || index > endIndex) return null;
              // category.idとitem.idの組み合わせでも一意に決まらないのでindexを加える
              const uniqueKey = `${category.id}-${item.id}-${index}`;

              return (
                <tr
                  key={uniqueKey}
                  ref={
                    (tableRowElement): void =>
                      setMultiTableRowRef(tableRowElement, userDetail.uif_id)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                  data-row-index={index}
                >
                  <td className="label">{category.name}</td>
                  <td className="label">{item.name}</td>
                  {dateList.map((date) => (
                    <td key={date.ymd} className="label">
                      {intersection(records, correctedData).includes(date.ymd)
                        ? "✓"
                        : ""}
                    </td>
                  ))}
                  <td className="label">
                    {intersection(records, correctedData).length > 0
                      ? intersection(records, correctedData).length
                      : 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserState,
  supportRecords: state.userSummary.supportRecords
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { userSummaryDispatcher } = dispatches;
  const userSummaryDispatches = userSummaryDispatcher(dispatch);
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
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RecordUsersSummaryWorkPreview));
