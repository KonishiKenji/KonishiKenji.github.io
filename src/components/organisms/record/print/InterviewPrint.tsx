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
import { UsersInFacilityState as SEIKATSUKAIGOUIFState } from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/types";
import { UsersInFacilityState as IABUIFState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { FacilityState as IABFacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { FacilityState as SEIKATSUKAIGOFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import { SupportsState } from "@stores/domain/supports/types";
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
  FacilityType,
  SERVICE_STATUS,
  SUPPORT_RECORD_KEY_LABEL,
  RECORD_TYPE,
  SUPPLY_PICKUP_SERVICE_LIST
} from "@constants/variables";
import { formatTime, defaultTimeLabel } from "@utils/date";
import { formatInOutTime } from "@utils/date/formatInOutTime";
import { isDispInOutTime } from "@utils/date/isDispInOutTime";

const TABLE_HEAD_HEIGHT = 25;

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
    previewContainer: {
      display: "flex",
      justifyContent: "flex-start"
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
        "&.supportContents": {
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
    preview: {
      boxSizing: "unset"
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
  userInFacility: SEIKATSUKAIGOUIFState["user"] | IABUIFState["user"];
  supportsRecord: SupportsState["supportsRecord"];
  facility: IABFacilityState | SEIKATSUKAIGOFacilityState;
}
interface OwnProps {
  uifId: string;
  year: string;
  month: string;
}
interface DispatchProps {
  getFacilityData: (facility_type: FacilityType) => void;
  getUserDetailInFacilityData: (
    uifId: string,
    facility_type: FacilityType
  ) => void;
  getSupportsRecordData: (
    uifId: string,
    year: string,
    month: string,
    target: "work" | "interview"
  ) => void;
}
type Props = StateProps & OwnProps & DispatchProps & WithStyles<typeof styles>;

interface SheetOwnProps {
  userInFacility:
    | SEIKATSUKAIGOUIFState["user"]["user_in_facility"]
    | IABUIFState["user"]["user_in_facility"];
  supportsRecord: SupportsState["supportsRecord"];
  year: string;
  month: string;
  facilityUserLabel: string;
  recipientNumber: string;
  isMeal: boolean;
  isTransfer: boolean;
}
type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

const getSupportContents = (
  status: number,
  supportRecord: Exclude<
    SupportsState["supportsRecord"]["support"],
    null
  >[0]["record"]
): JSX.Element[] => {
  const targetColumns: { key: string; label: string }[] =
    SUPPORT_RECORD_KEY_LABEL[status];
  const supportContents: JSX.Element[] = [];

  targetColumns.forEach((targetColumn: { key: string; label: string }) => {
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
        <span key={supportContents.length}>
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
  });
  supportContents.pop();

  return supportContents;
};

class PreviewInterviewMonthlyReports extends React.Component<Props> {
  public componentDidMount(): void {
    const { uifId, year, month, user } = this.props;
    const target: "work" | "interview" = RECORD_TYPE.INTERVIEW
      ? "interview"
      : "work";
    this.props.getFacilityData(user.facility_type);
    this.props.getUserDetailInFacilityData(uifId, user.facility_type);
    this.props.getSupportsRecordData(uifId, year, month, target);
  }

  public render(): JSX.Element | null {
    const {
      classes,
      user,
      supportsRecord,
      userInFacility,
      year,
      month,
      facility
    } = this.props;

    if (
      supportsRecord.support.length === 0 ||
      Object.keys(userInFacility.user_in_facility).length === 0 ||
      !userInFacility.user_in_facility.id ||
      !user
    ) {
      return null;
    }

    const facilityUserLabel = user.labels
      ? user.labels.facility_user
      : "利用者";
    const recipientNumber =
      userInFacility.user_in_facility.recipient_number || "";

    return (
      <div className={classes.preview}>
        <Sheet
          classes={classes}
          userInFacility={userInFacility.user_in_facility}
          supportsRecord={supportsRecord}
          facilityUserLabel={facilityUserLabel}
          year={year}
          month={month}
          recipientNumber={recipientNumber}
          // 事業所情報_食事の状態
          isMeal={facility.mealSaservedServiceFlag}
          // 事業所情報_送迎の状態
          isTransfer={facility.transferServiceFlag}
        />
      </div>
    );
  }
}

const Sheet = (props: SheetProps): JSX.Element => {
  const {
    classes,
    userInFacility,
    supportsRecord,
    facilityUserLabel,
    year,
    month,
    recipientNumber,
    isMeal,
    isTransfer
  } = props;

  return (
    <section className={classes.page}>
      <div>
        <header>
          <h1 className={classes.title}>面談記録</h1>
        </header>
        <div className={classes.flexContainer}>
          <span className={classes.counts}>
            {`${facilityUserLabel}名： ${userInFacility.name_sei} ${userInFacility.name_mei}`}
          </span>
          <span className={classes.counts}>
            {`受給者証番号： ${recipientNumber || "-"}`}
          </span>
        </div>
        <div className={classes.flexContainer}>
          <span className={classes.counts}>{`${year}年${month}月分`}</span>
          <InterviewRecord
            counts={supportsRecord.counts}
            supports={supportsRecord.support}
          />
        </div>
      </div>
      <div className={classes.previewContainer}>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr style={{ height: TABLE_HEAD_HEIGHT }}>
              <td className="labelHeader ssize">日付</td>
              <td className="labelHeader msize">利用状態</td>
              <td className="labelHeader">面談内容</td>
              <td className="labelHeader ssize">記録者</td>
              <td className="labelHeader sssize">捺印</td>
            </tr>
            {supportsRecord.support.map(({ inout, record }) => {
              if (
                !record ||
                ((inout.status === 5 ||
                  inout.status === 6 ||
                  inout.status === 10) &&
                  record.interview_flg === "1")
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
                <tr key={inout.id}>
                  <td className="label">
                    {format(targetDate, "MM/DD(dd)", {
                      locale: jaLocale
                    })}
                  </td>
                  <td className="label">
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
                  <td className="supportContents">
                    {getSupportContents(inout.status, record)}
                  </td>
                  <td className="label">{record ? record.staff_name : ""}</td>
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
  const userInFacility =
    user.facility_type === FacilityType.SEIKATSUKAIGO
      ? state.SEIKATSUKAIGO.userInFacility.user
      : state.IAB.userInFacility.user;
  const facility =
    user.facility_type === FacilityType.SEIKATSUKAIGO
      ? state.SEIKATSUKAIGO.facility
      : state.IAB.facility;
  return {
    user,
    userInFacility,
    supportsRecord: state.supports.supportsRecord,
    facility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportsDispatcher } = dispatches;
  const supportsDispatches = supportsDispatcher(dispatch);
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
  ): Promise<void> => {
    return supportsDispatches.fetchSupportsRecord(uifId, year, month, target);
  };

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
    getUserDetailInFacilityData,
    getSupportsRecordData,
    getFacilityData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PreviewInterviewMonthlyReports));
