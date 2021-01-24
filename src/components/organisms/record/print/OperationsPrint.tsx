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
import { OperationsState } from "@stores/domain/operations/types";
import dispatches from "@stores/dispatches";

import getOperations from "@api/requests/operations";

// components
import LineBreak from "@components/atoms/LineBreak";

// constants
import {
  PRINT_PAGE_HEIGHT_RECORD,
  PRINT_PAGE_WIDTH_RECORD,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";
import { FacilityType } from "@constants/variables";

import convertMinutesToTime from "@utils/date/convertMinutesToTime";
import dateToObject from "@utils/date/dateToObject";

const TABLE_HEAD_HEIGHT = 25;

const styles = (): StyleRules =>
  createStyles({
    root: {},
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
        wordBreak: "break-word",
        color: "rgba(0, 0, 0, 0.84)",
        "&.labelHeader": {
          textAlign: "center",
          verticalAlign: "middle"
        },
        "&.label": {
          textAlign: "center",
          verticalAlign: "top"
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
    date: {
      fontSize: 12
    },
    counts: {
      fontSize: 10,
      marginRight: 20
    },
    "@media print": {
      page: {
        width: "172mm",
        height: "251mm",
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
interface StateProps {
  user: UserState;
  monthlyRecord: OperationsState["monthlyRecord"];
}
interface OwnProps {
  year: string;
  month: string;
}
interface DispatchProps {
  requestOperationRecordData: (year: string, month: string) => void;
}
type Props = StateProps & OwnProps & DispatchProps & WithStyles<typeof styles>;

interface SheetOwnProps {
  monthlyRecord: OperationsState["monthlyRecord"];
  facilityType: string;
  year: string;
  month: string;
}
type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

const getTotalInterview = (minutes: number): string => {
  const time = convertMinutesToTime(minutes);
  return parseInt(time.hour, 10) > 0
    ? `(${time.hour}時間${time.minutes}分)`
    : `(${time.minutes}分)`;
};

class PreviewOperationMonthlyReports extends React.Component<Props> {
  public displayColumns: string[];

  constructor(props: Props) {
    super(props);
    this.displayColumns = [];
  }

  public componentDidMount(): void {
    const { year, month } = this.props;
    this.props.requestOperationRecordData(year, month);
    getOperations.getOperations(year, month);
  }

  public render(): JSX.Element | null {
    const { classes, user, monthlyRecord, year, month } = this.props;

    if (
      !monthlyRecord ||
      !monthlyRecord.created_at ||
      !monthlyRecord.operation ||
      monthlyRecord.operation.length === 0
    ) {
      return null;
    }

    return (
      <div>
        <Sheet
          classes={classes}
          monthlyRecord={monthlyRecord}
          facilityType={user.facility_type}
          year={year}
          month={month}
        />
      </div>
    );
  }
}

const Sheet = (props: SheetProps): JSX.Element => {
  const { classes, monthlyRecord, facilityType, year, month } = props;
  return (
    <section className={classes.page}>
      <div>
        <header>
          <h1 className={classes.title}>業務日誌</h1>
        </header>
        <div className={classes.flexContainer}>
          <span className={classes.date}>{`${year}年${month}月分`}</span>
        </div>
      </div>
      <div className={classes.flexContainer}>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr style={{ height: TABLE_HEAD_HEIGHT }}>
              <td className="labelHeader ssize">日付</td>
              <td className="labelHeader msize">区分</td>
              <td className="labelHeader">支援内容</td>
              <td className="labelHeader ssize">記録者</td>
              <td className="labelHeader sssize">捺印</td>
            </tr>
            {monthlyRecord.operation.map(
              ({
                counts,
                date,
                record,
                operation_work_history: workHistories,
                workplace_company,
                service_users: serviceUsers
              }) => {
                const targetDate = dateToObject(new Date(date));
                const serviceUserNames = serviceUsers.join("、");
                const workNames = workHistories
                  .map((workHistory) => workHistory.item_name)
                  .join("、");
                const {
                  numberOfUsers,
                  numberOfUsingServiceUsers,
                  numberOfAbsence,
                  numberOfSupportIkou1,
                  numberOfSupportOutOfFacility,
                  numberOfHavingInterview,
                  totalInterviewMinutes
                } = counts;

                let supportIkou1Summary = "";
                if (facilityType === FacilityType.IKOU) {
                  supportIkou1Summary = `移行準備支援体制加算(Ⅰ)：${numberOfSupportIkou1}/${numberOfUsers}人`;
                }

                let supportOutOfFacilitySummary = "";
                if (
                  facilityType === FacilityType.A ||
                  facilityType === FacilityType.B
                ) {
                  supportOutOfFacilitySummary = `施設外支援：${numberOfSupportOutOfFacility}/${numberOfUsers}人`;
                }

                const summaryText = `通所者：${numberOfUsingServiceUsers}/${numberOfUsers}人 欠席時対応：${numberOfAbsence}/${numberOfUsers}人 ${supportIkou1Summary}${supportOutOfFacilitySummary} 面談者：${numberOfHavingInterview}/${numberOfUsers}人${getTotalInterview(
                  totalInterviewMinutes
                )}`;
                const accompanyStaffText: JSX.Element[] = [];
                workplace_company.map((company) => {
                  const workOutOfFacilityText = company.staffs
                    ? company.staffs
                        .filter(
                          (res) =>
                            res.staff_name !== null &&
                            res.working_hours !== null
                        )
                        .map((staff, s) => {
                          if (s === 0) {
                            return `${company.workplace_name}：${staff.staff_name}(${staff.working_hours})`;
                          }
                          return `${staff.staff_name}(${staff.working_hours})`;
                        })
                    : [""];
                  accompanyStaffText.push(
                    <div>{workOutOfFacilityText.join("、")}</div>
                  );
                  return undefined;
                });
                const isIAB =
                  facilityType === FacilityType.IKOU ||
                  facilityType === FacilityType.A ||
                  facilityType === FacilityType.B;
                const typeRowSpan = isIAB ? 7 : 6;

                return (
                  <React.Fragment key={date}>
                    <tr>
                      <td className="label" rowSpan={typeRowSpan}>
                        {`${targetDate.month}/${targetDate.day}(${targetDate.day_of_week})`}
                      </td>
                      <td className="label">サマリ：</td>
                      <td>{summaryText}</td>
                      <td className="label" rowSpan={typeRowSpan}>
                        {record ? record.staff_name : ""}
                      </td>
                      <td className="label" rowSpan={typeRowSpan} />
                    </tr>

                    <tr>
                      <td className="label">通所者氏名：</td>
                      <td>{serviceUserNames}</td>
                    </tr>
                    <tr>
                      <td className="label">午前：</td>
                      <td>
                        {record && record.operation_in_the_morning && (
                          <LineBreak text={record.operation_in_the_morning} />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">午後：</td>
                      <td>
                        {record && record.operation_in_the_afternoon && (
                          <LineBreak text={record.operation_in_the_afternoon} />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">作業：</td>
                      <td>{workNames}</td>
                    </tr>
                    <tr>
                      <td className="label">その他：</td>
                      <td>
                        {record && record.operation_other_comment && (
                          <LineBreak text={record.operation_other_comment} />
                        )}
                      </td>
                    </tr>
                    {isIAB && (
                      <tr>
                        <td className="label">同行職員</td>
                        <td>{accompanyStaffText}</td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserState,
  monthlyRecord: state.operations.monthlyRecord
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { operationsDispatcher } = dispatches;
  const operationsDispatches = operationsDispatcher(dispatch);
  return {
    requestOperationRecordData: (year: string, month: string): Promise<void> =>
      operationsDispatches.fetchMonthlyRecord(year, month)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PreviewOperationMonthlyReports));
