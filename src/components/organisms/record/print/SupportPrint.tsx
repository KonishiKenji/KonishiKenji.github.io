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
import { UsersInFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/types";
import { SupportsState } from "@stores/domain/supports/types";
import dispatches from "@stores/dispatches";
import { FacilityState as IABFacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { FacilityState as SEIKATSUKAIGOFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";

// components
import { TableRowStartEndIndice } from "@components/organisms/download/print/previewHOC";
import LineBreak from "@components/atoms/LineBreak";
import InterviewRecord from "@components/organisms/mgr/common/record/InterviewRecord";

// constants
import {
  SUPPORT_RECORD_KEY_LABEL,
  FacilityType,
  SERVICE_STATUS,
  SUPPLY_PICKUP_SERVICE_LIST
} from "@/constants/variables";
import { IAB_SUMMARY_SERVICE_STATUS } from "@/constants/mgr/IAB/variables";
import {
  PRINT_PAGE_HEIGHT_RECORD,
  PRINT_PAGE_WIDTH_RECORD,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@/constants/styles";
import { formatTime, defaultTimeLabel } from "@utils/date";
import dateToObject from "@utils/date/dateToObject";
import { formatInOutTime } from "@utils/date/formatInOutTime";
import { isDispInOutTime } from "@utils/date/isDispInOutTime";
import { getUrlParams } from "@/utils/url";

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
  userInFacility: UsersInFacilityState["user"];
  supportsRecord: SupportsState["supportsRecord"];
  facility: IABFacilityState | SEIKATSUKAIGOFacilityState;
}
interface OwnProps {
  uifId: string;
  year: string;
  month: string;
  query: string;
}
interface DispatchProps {
  getFacilityData: (facility_type: FacilityType) => void;
  getUserDetailInFacilityData: (
    uifId: string,
    facility_type: FacilityType
  ) => Promise<void>;
  getSupportsRecordData: (
    uifId: string,
    year: string,
    month: string
  ) => Promise<void>;
}
type Props = StateProps & OwnProps & DispatchProps & WithStyles<typeof styles>;

interface State {
  renderFlg: boolean;
}

interface SheetOwnProps {
  userInFacility: UsersInFacilityState["user"];
  supportsRecord: SupportsState["supportsRecord"];
  year: string;
  month: string;
  tableRowStartEndIndexInSheet: TableRowStartEndIndice;
  displayColumns: string[];
  facilityType: FacilityType;
  facilityUserLabel: string;
  isMeal: boolean;
  isTransfer: boolean;
}
type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

const getSupportContents = (
  status: number,
  displayColumns: string[],
  supportRecord: Exclude<
    SupportsState["supportsRecord"]["support"],
    null
  >[0]["record"],
  workHistories: Exclude<
    SupportsState["supportsRecord"]["support"],
    null
  >[0]["support_work_history"],
  facilityUserLabel: string,
  classes: Record<string, string>
): JSX.Element[] => {
  const targetColumns: [{ key: string; label: string }] =
    SUPPORT_RECORD_KEY_LABEL[status];
  const supportContents: JSX.Element[] = [];
  const pushSupportContents = (
    array = supportContents,
    labelName: string,
    content: JSX.Element | string
  ): number =>
    array.push(
      <p key={array.length} className={classes.contents}>
        {`[${labelName}]: `}
        {content}
      </p>
    );
  const facilityUserLabelDisp = facilityUserLabel || "利用者";

  for (let i = 0; i < targetColumns.length; i += 1) {
    const targetColumn = targetColumns[i];
    switch (targetColumn.key) {
      case "workplace_company_id": {
        const workplaceCompany =
          supportRecord && supportRecord.workplace_company
            ? supportRecord.workplace_company.find((c) => c.is_checked)
            : undefined;

        if (workplaceCompany) {
          supportContents.push(
            <p key={supportContents.length} style={{ margin: 0 }}>
              {`[就労先企業]: ${workplaceCompany.workplace_name}`}
            </p>
          );
        }
        break;
      }
      case "support_work_history": {
        const workHistory: string[] = workHistories.map(
          (item) => item.item_name
        );
        const workHistoryNames = workHistory.join("、");

        if (workHistoryNames.length !== 0) {
          supportContents.push(
            <p key={supportContents.length} className={classes.contents}>
              {`[作業]: ${workHistoryNames}`}
            </p>
          );
        }
        break;
      }
      case "user_status":
        if (supportRecord && supportRecord[targetColumn.key]) {
          pushSupportContents(
            supportContents,
            `${facilityUserLabelDisp}状態`,
            <LineBreak text={supportRecord[targetColumn.key] || ""} />
          );
        }
        break;
      case "staff_comment":
        if (
          supportRecord &&
          !!supportRecord[targetColumn.key] &&
          displayColumns.includes("staff_comment")
        ) {
          pushSupportContents(
            supportContents,
            targetColumn.label,
            <LineBreak text={supportRecord[targetColumn.key] || ""} />
          );
        }
        break;
      case "interview_flg":
        if (supportRecord && supportRecord[targetColumn.key] === "1") {
          const startTime =
            supportRecord.interview_start_time === null
              ? defaultTimeLabel
              : formatTime(supportRecord.interview_start_time);
          const endTime =
            supportRecord.interview_end_time === null
              ? defaultTimeLabel
              : formatTime(supportRecord.interview_end_time);
          supportContents.push(
            <p key={supportContents.length} style={{ margin: 0 }}>
              {`[面談あり]: ${startTime} 〜 ${endTime}`}
            </p>
          );
        }
        break;
      case "correspondent_staff_id":
        if (supportRecord && !!supportRecord[targetColumn.key]) {
          pushSupportContents(
            supportContents,
            "対応職員",
            supportRecord.correspondent_staff_name || ""
          );
        }
        break;
      default:
        if (supportRecord && !!supportRecord[targetColumn.key]) {
          pushSupportContents(
            supportContents,
            targetColumn.label,
            <LineBreak text={supportRecord[targetColumn.key]} />
          );
        }
        break;
    }
  }
  return supportContents;
};

class PreviewSupportMonthlyReports extends React.Component<Props, State> {
  public displayColumns: string[];

  constructor(props: Props) {
    super(props);
    this.state = {
      renderFlg: false
    };
    this.displayColumns = [];
  }

  public async componentDidMount(): Promise<void> {
    const { uifId, year, month, query, user } = this.props;
    this.props.getUserDetailInFacilityData(uifId, user.facility_type);
    this.props.getFacilityData(user.facility_type);
    this.props.getSupportsRecordData(uifId, year, month);
    const queryParameters: { display_columns?: string } = getUrlParams(query);
    if (queryParameters.display_columns) {
      this.displayColumns = queryParameters.display_columns.split(",");
    }
    this.setState({ renderFlg: true });
  }

  public render(): JSX.Element | null {
    // DOMがレンダリングされる前にcomponentDidMountの処理を行う
    if (!this.state.renderFlg) {
      return null;
    }
    const {
      classes,
      user,
      userInFacility,
      supportsRecord,
      year,
      month,
      facility
    } = this.props;

    if (
      !supportsRecord ||
      !supportsRecord.support ||
      supportsRecord.support.length === 0 ||
      Object.keys(userInFacility.user_in_facility).length === 0 ||
      !userInFacility.user_in_facility.id
    ) {
      return null;
    }

    const filteredSupport = supportsRecord.support.filter(
      ({ record }) => !!record
    );

    if (!filteredSupport || filteredSupport.length === 0) {
      return null;
    }

    const tableRowStartEndIndexInSheet = {
      startIndex: 0,
      endIndex: filteredSupport.length
    };

    return (
      <div className={classes.preview}>
        <Sheet
          key={tableRowStartEndIndexInSheet.startIndex}
          classes={classes}
          supportsRecord={supportsRecord}
          userInFacility={userInFacility}
          facilityUserLabel={user.labels ? user.labels.facility_user : "利用者"}
          facilityType={user.facility_type}
          year={year}
          month={month}
          tableRowStartEndIndexInSheet={tableRowStartEndIndexInSheet}
          displayColumns={this.displayColumns}
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
    year,
    month,
    tableRowStartEndIndexInSheet,
    displayColumns,
    facilityType,
    facilityUserLabel,
    isMeal,
    isTransfer
  } = props;
  const { startIndex, endIndex } = tableRowStartEndIndexInSheet;
  const { counts } = supportsRecord;
  const filteredSupport = supportsRecord.support.filter(
    ({ record }) => !!record
  );
  const recipientNumber = userInFacility.user_in_facility.recipient_number;
  let spanText = "";
  if ([FacilityType.A, FacilityType.B].includes(facilityType)) {
    spanText = `施設外支援： ${
      filteredSupport.filter(
        (item) =>
          item.inout.status === IAB_SUMMARY_SERVICE_STATUS.OFFSITE_SUPPORT.value
      ).length
    }回`;
  }
  if (facilityType === FacilityType.IKOU) {
    spanText = `移行準備支援体制加算(Ⅰ)： ${
      filteredSupport.filter(
        (item) =>
          item.inout.status === IAB_SUMMARY_SERVICE_STATUS.SUPPORT_IKOU_1.value
      ).length
    }回`;
  }
  return (
    <section className={classes.page}>
      {startIndex === 0 ? (
        <div>
          <header>
            <h1 className={classes.title}>
              {displayColumns.includes("support_record")
                ? "支援記録"
                : "サービス提供記録"}
            </h1>
          </header>
          <div className={classes.flexContainer}>
            <span className={classes.counts}>
              {`${facilityUserLabel}名： ${userInFacility.user_in_facility.name_sei}${userInFacility.user_in_facility.name_mei}`}
            </span>
            <span className={classes.counts}>
              {`受給者証番号： ${recipientNumber || "-"}`}
            </span>
          </div>
          <div className={classes.flexContainer}>
            <span className={classes.counts}>{`${year}年${month}月分`}</span>

            <span className={classes.counts}>
              {`利用日： ${counts.numberOfServiceUsage}回`}
            </span>
            <span className={classes.counts}>
              {`欠席時対応： ${counts.numberOfAbsence}回`}
            </span>
            {spanText.length > 0 && (
              <span className={classes.counts}>{spanText}</span>
            )}
            <InterviewRecord counts={counts} supports={filteredSupport} />
          </div>
        </div>
      ) : null}
      <div className={classes.flexContainer}>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr style={{ height: TABLE_HEAD_HEIGHT }}>
              <td className="label ssize">日付</td>
              <td className="label msize">利用状態</td>
              <td className="label">支援内容</td>
              <td className="label ssize">記録者</td>
              <td className="label sssize">捺印</td>
            </tr>
            {filteredSupport.map(
              (
                { inout, record, support_work_history: workHistories },
                index
              ) => {
                if (index < startIndex || index > endIndex) return undefined;
                const targetDate = dateToObject(new Date(inout.target_date));

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
                    <td className="label topCenterAlign">
                      {`${targetDate.month}/${targetDate.day}(${targetDate.day_of_week})`}
                    </td>
                    <td className="label topCenterAlign">
                      <div className={classes.inOutTime}>
                        {status}
                        <br />
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
                      {getSupportContents(
                        inout.status,
                        displayColumns,
                        record,
                        workHistories,
                        facilityUserLabel,
                        classes
                      )}
                    </td>
                    <td className="label topCenterAlign">
                      {record ? record.staff_name : ""}
                    </td>
                    <td className="label" />
                  </tr>
                );
              }
            )}
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
    month: string
  ): Promise<void> =>
    dispatches
      .supportsDispatcher(dispatch)
      .fetchSupportsRecord(uifId, year, month);

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
    getFacilityData,
    getUserDetailInFacilityData,
    getSupportsRecordData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PreviewSupportMonthlyReports));
