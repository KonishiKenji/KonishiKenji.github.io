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
import * as SEIKATSUKAIGOUsersInFacilityState from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/types";
import * as IABUsersInFacilityState from "@stores/domain/mgr/IAB/userInFacility/types";
import { SupportsState } from "@stores/domain/supports/types";
import dispatches from "@stores/dispatches";

import * as getDaysInMonth from "date-fns/get_days_in_month";

// components
import {
  previewHOC,
  InjectProps,
  TableRowStartEndIndice
} from "@components/organisms/download/print/previewHOC";

// constants
import {
  PRINT_PAGE_HEIGHT_RECORD as _PRINT_PAGE_HEIGHT,
  PRINT_PAGE_WIDTH_RECORD as _PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@/constants/styles";
import {
  FacilityType,
  RECORD_TYPE,
  SERVICE_STATUS
} from "@/constants/variables";
import { dateToLocalisedString } from "@/utils/date";

import intersection from "lodash-es/intersection";

const TABLE_HEAD_HEIGHT = 25;
// A4 横
const PRINT_PAGE_WIDTH = _PRINT_PAGE_HEIGHT;
const PRINT_PAGE_HEIGHT = _PRINT_PAGE_WIDTH;

const styles = (): StyleRules =>
  createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
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
      marginBottom: 8
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
        padding: 0,
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
interface UnionUsersInFacilityState {
  userInFacility: IABUsersInFacilityState.UsersInFacilityState["user"];
}
interface UnionUsersInFacilityState {
  userInFacility: SEIKATSUKAIGOUsersInFacilityState.UsersInFacilityState["user"];
}
interface StateProps {
  user: UserState;
  userInFacility: UnionUsersInFacilityState["userInFacility"];
  supportsRecord: SupportsState["supportsRecord"];
}
interface OwnProps {
  uifId: string;
  year: string;
  month: string;
  query: string;
}
interface DispatchProps {
  getUserDetailInFacilityData: (
    uifId: string,
    facility_type: FacilityType
  ) => Promise<void>;
  getSupportsRecordData: (
    uifId: string,
    year: string,
    month: string,
    target: "work" | "interview"
  ) => Promise<void>;
}
type Props = StateProps &
  OwnProps &
  DispatchProps &
  InjectProps &
  WithStyles<typeof styles>;

interface SheetOwnProps {
  year: string;
  month: string;
  tableRowStartEndIndexInSheet: TableRowStartEndIndice;
  facilityUserLabel: string;
  workSummary: SupportsState["supportsRecord"]["work_summary"];
  userDetail: UnionUsersInFacilityState["userInFacility"]["user_in_facility"];
  correctedData: string[];
  dateList: {
    d: string;
    ymd: string;
  }[];
}
type SheetProps = SheetOwnProps &
  Omit<InjectProps, "tableRowStartEndIndicesInSheet"> &
  WithStyles<typeof styles>;

class PreviewWorkMonthlyReports extends React.Component<Props> {
  public async componentDidMount(): Promise<void> {
    const { uifId, year, month, user } = this.props;
    const target = RECORD_TYPE.WORK as "work" | "interview";
    this.props.getUserDetailInFacilityData(uifId, user.facility_type);
    this.props.getSupportsRecordData(uifId, year, month, target);
  }

  public render(): JSX.Element | null {
    const {
      classes,
      user,
      supportsRecord,
      userInFacility,
      setHeaderRef,
      setTableRowRef,
      year,
      month
    } = this.props;

    if (
      supportsRecord.support.length === 0 ||
      Object.keys(supportsRecord.work_summary).length === 0 ||
      Object.keys(userInFacility.user_in_facility).length === 0 ||
      !userInFacility.user_in_facility.id ||
      !user
    ) {
      return null;
    }

    const tableRowStartEndIndicesInSheet = [
      ...this.props.tableRowStartEndIndicesInSheet
    ];
    const facilityUserLabel = user.labels
      ? user.labels.facility_user
      : "利用者";
    const correctedData = supportsRecord.support
      .filter(
        (item) =>
          item.inout.status === SERVICE_STATUS[1].value ||
          item.inout.status === SERVICE_STATUS[2].value ||
          item.inout.status === SERVICE_STATUS[3].value ||
          item.inout.status === SERVICE_STATUS[7].value ||
          item.inout.status === SERVICE_STATUS[8].value
      )
      .map((d) => d.inout.target_date);

    if (tableRowStartEndIndicesInSheet.length === 0) {
      tableRowStartEndIndicesInSheet.push({
        startIndex: 0,
        endIndex: supportsRecord.work_summary.length
      });
    }

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

    return (
      <div className={classes.preview}>
        {tableRowStartEndIndicesInSheet.map((tableRowStartEndIndexInSheet) => (
          <Sheet
            key={tableRowStartEndIndexInSheet.startIndex}
            classes={classes}
            workSummary={supportsRecord.work_summary}
            userDetail={userInFacility.user_in_facility}
            year={year}
            month={month}
            dateList={dateList}
            setHeaderRef={setHeaderRef}
            setTableRowRef={setTableRowRef}
            tableRowStartEndIndexInSheet={tableRowStartEndIndexInSheet}
            facilityUserLabel={facilityUserLabel}
            correctedData={correctedData}
          />
        ))}
      </div>
    );
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
    setTableRowRef,
    tableRowStartEndIndexInSheet,
    facilityUserLabel,
    correctedData
  } = props;

  const { startIndex, endIndex } = tableRowStartEndIndexInSheet;

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
                {`${facilityUserLabel}名： ${userDetail.name_sei} ${userDetail.name_mei}`}
              </span>
              <span className={classes.heading}>
                {`受給者証番号： ${userDetail.recipient_number || "-"}`}
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
              const uniqueKey = `${category.id}-${item.id}-${index}`;

              return (
                <tr
                  key={uniqueKey}
                  ref={
                    (tableRowElement): void =>
                      setTableRowRef(tableRowElement, index)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
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

const mapStateToProps = (state: AppState): StateProps => {
  const user = state.user as UserState;
  const userInFacility =
    user.facility_type === FacilityType.SEIKATSUKAIGO
      ? state.SEIKATSUKAIGO.userInFacility.user
      : state.IAB.userInFacility.user;
  return {
    user,
    userInFacility,
    supportsRecord: state.supports.supportsRecord
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const getUserDetailInFacilityData = (
    uifId: string,
    facility_type: FacilityType
  ): Promise<void> => {
    // 種別として移行AB or 生活介護が利用する機能なので
    // facility_typeで該当種別のdispatcherを選択する
    const dispatcher =
      facility_type === FacilityType.SEIKATSUKAIGO
        ? dispatches.SEIKATSUKAIGO
        : dispatches.IAB;

    return dispatcher.userInFacilityDispatcher(dispatch).fetchOne(uifId);
  };

  const getSupportsRecordData = (
    uifId: string,
    year: string,
    month: string,
    target: "work" | "interview"
  ): Promise<void> =>
    dispatches
      .supportsDispatcher(dispatch)
      .fetchSupportsRecord(uifId, year, month, target);

  return {
    getUserDetailInFacilityData,
    getSupportsRecordData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    previewHOC({
      printPageHeight: PRINT_PAGE_HEIGHT,
      tableHeadHeight: TABLE_HEAD_HEIGHT
    })(PreviewWorkMonthlyReports)
  )
);
