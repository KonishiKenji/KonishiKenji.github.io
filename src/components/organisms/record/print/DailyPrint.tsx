import * as React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";

// store
import { OperationsState } from "@stores/domain/operations/types";

// components
import LineBreak from "@components/atoms/LineBreak";
import PrintingPaper from "@components/molecules/PrintingPaper";

// constants
import { dateTodayInFormat, formatTime, defaultTimeLabel } from "@utils/date";
import convertMinutesToTime from "@utils/date/convertMinutesToTime";
import { isDispInOutTime } from "@utils/date/isDispInOutTime";
import { formatInOutTime } from "@utils/date/formatInOutTime";
import { getUrlParams } from "@utils/url";
import {
  FacilityType,
  SUPPORT_RECORD_KEY_LABEL,
  SERVICE_STATUS,
  SUPPLY_PICKUP_SERVICE_LIST
} from "@constants/variables";
import { IAB_SUMMARY_SERVICE_STATUS } from "@constants/mgr/IAB/variables";

const TABLE_HEAD_HEIGHT = 25;

const styles = (): StyleRules =>
  createStyles({
    headerFlexContainer: {
      display: "flex",
      justifyContent: "flex-start",
      paddingBottom: 8
    },
    flexContainer: {
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
      tableLayout: "fixed",
      wordBreak: "break-all",
      width: "100%",
      "& td": {
        padding: "0.5px 2px",
        borderRight: "1px solid",
        fontSize: 10,
        letterSpacing: 0.6,
        height: 20,
        color: "rgba(0, 0, 0, 0.84)",
        "&.headLabel": {
          textAlign: "center"
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
    inOutTime: {
      "& + .service": {
        marginTop: 8
      }
    }
  });

interface OwnProps {
  dailyRecord: OperationsState["dailyRecord"];
  typeService: string;
  facilityUserLabel: string;
  selectedDate: string;
  query: string;
  isMeal: boolean;
  isTransfer: boolean;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 支援記録の項目
 */
type ExcludeNullCaseOperationSupport = Exclude<
  OperationsState["dailyRecord"]["support"],
  null
>;
const getSupportContents = (
  status: number,
  supportRecord: ExcludeNullCaseOperationSupport[0]["record"],
  workHistories: ExcludeNullCaseOperationSupport[0]["support_work_history"],
  showStaffComment: boolean,
  facilityUserLabel: string
): JSX.Element[] => {
  const targetColumns = SUPPORT_RECORD_KEY_LABEL[status];
  const supportContents: JSX.Element[] = [];

  const pushSupportContents = (
    array = supportContents,
    labelName: string,
    content: JSX.Element | string
  ): number =>
    array.push(
      <p key={array.length} style={{ margin: 0 }}>
        {`[${labelName}]: `}
        {content}
      </p>
    );
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
        const workHistoryNames = workHistories
          .map((workHistory) => workHistory.item_name)
          .join("、");
        if (workHistoryNames.length !== 0) {
          supportContents.push(
            <p key={supportContents.length} style={{ margin: 0 }}>
              {`[作業]: ${workHistoryNames}`}
            </p>
          );
        }
        break;
      }

      case "user_status":
        if (supportRecord && !!supportRecord[targetColumn.key]) {
          pushSupportContents(
            supportContents,
            `${facilityUserLabel}状態`,
            <LineBreak text={supportRecord[targetColumn.key]} />
          );
        }
        break;
      case "staff_comment":
        if (
          supportRecord &&
          !!supportRecord[targetColumn.key] &&
          showStaffComment
        ) {
          pushSupportContents(
            supportContents,
            targetColumn.label,
            <LineBreak text={supportRecord[targetColumn.key]} />
          );
        }
        break;
      case "interview_flg":
        if (
          supportRecord &&
          !!supportRecord[targetColumn.key] &&
          supportRecord[targetColumn.key] === "1"
        ) {
          const startTime =
            !supportRecord ||
            supportRecord.interview_start_time === null ||
            supportRecord.interview_start_time === undefined
              ? defaultTimeLabel
              : formatTime(supportRecord.interview_start_time);
          const endTime =
            !supportRecord ||
            supportRecord.interview_end_time === null ||
            supportRecord.interview_end_time === undefined
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

/**
 * ヘッダー
 */
type RecordDailyHeaderProps = Props & { displayColumns: string[] };
const RecordDailyHeader = ({
  classes,
  dailyRecord,
  typeService,
  selectedDate,
  displayColumns
}: RecordDailyHeaderProps): JSX.Element => {
  const { counts } = dailyRecord.operation;
  const time = convertMinutesToTime(counts.totalInterviewMinutes);
  let supportSpanText = "";
  if (typeService === FacilityType.A || typeService === FacilityType.B) {
    supportSpanText = `${IAB_SUMMARY_SERVICE_STATUS.OFFSITE_SUPPORT.label} ${counts.numberOfSupportOutOfFacility}人`;
  }
  if (typeService === FacilityType.IKOU) {
    supportSpanText = `${IAB_SUMMARY_SERVICE_STATUS.SUPPORT_IKOU_1.label} ${counts.numberOfSupportIkou1}人`;
  }
  return (
    <header>
      <h1 className={classes.title}>
        {displayColumns.includes("support_record")
          ? "支援記録"
          : "サービス提供記録"}
      </h1>
      <div className={classes.headerFlexContainer}>
        <span className={classes.date}>
          {dateTodayInFormat(selectedDate, true)}
        </span>
      </div>
      <div className={classes.headerFlexContainer}>
        <span className={classes.counts}>
          {`通所者数： ${counts.numberOfUsingServiceUsers}人`}
        </span>
        <span className={classes.counts}>
          {`欠席時対応： ${counts.numberOfAbsence}回`}
        </span>
        {supportSpanText.length > 0 && (
          <span className={classes.counts}>{supportSpanText}</span>
        )}
        <span className={classes.counts}>
          {`面談： ${counts.numberOfHavingInterview}回`}
          {Number(time.hour) > 0
            ? `(${time.hour}時間${time.minutes}分)`
            : `(${time.minutes}分)`}
        </span>
      </div>
    </header>
  );
};

/**
 * 業務日誌
 */
const RecordDailyOperation = ({
  classes,
  dailyRecord,
  typeService
}: Props): JSX.Element => {
  const {
    record,
    operation_work_history,
    workplace_company
  } = dailyRecord.operation;
  // 移行AB用の表示あり
  const isIAB =
    typeService === FacilityType.A ||
    typeService === FacilityType.B ||
    typeService === FacilityType.IKOU;
  const rowSpan = isIAB ? 5 : 4;
  return (
    <>
      <div style={{ fontSize: 10 }}>業務日誌</div>
      <table
        className={`${classes.table} fullWidth`}
        style={{ marginBottom: 10 }}
      >
        <tbody>
          <tr>
            <td className="headLabel ssize">区分</td>
            <td className="headLabel">支援内容</td>
            <td className="headLabel ssize">記録者</td>
            <td className="headLabel sssize">捺印</td>
          </tr>
          <tr>
            <td className="label">午前</td>
            <td>
              {record && record.operation_in_the_morning && (
                <LineBreak text={record.operation_in_the_morning} />
              )}
            </td>
            <td className="label" rowSpan={rowSpan}>
              {record ? record.staff_name : ""}
            </td>
            <td className="label" rowSpan={rowSpan} />
          </tr>
          <tr>
            <td className="label">午後</td>
            <td>
              {record && record.operation_in_the_afternoon && (
                <LineBreak text={record.operation_in_the_afternoon} />
              )}
            </td>
          </tr>
          <tr>
            <td className="label">作業</td>
            <td>
              {operation_work_history
                .map((workHistory) => workHistory.item_name)
                .join("、")}
            </td>
          </tr>
          <tr>
            <td className="label">その他</td>
            <td>
              {record && record.operation_other_comment && (
                <LineBreak text={record.operation_other_comment} />
              )}
            </td>
          </tr>
          {/* 移行ABのみ */}
          {isIAB && (
            <tr>
              <td className="label">同行職員</td>
              <td>
                {workplace_company.map((target) => {
                  const convertText = target.staffs
                    ? target.staffs
                        .filter((staff) => staff.staff_name !== null)
                        .reduce((result, staff, staffIdx) => {
                          return `${result}${staffIdx > 0 ? "、" : ""}${
                            staff.staff_name
                          }(${staff.working_hours})`;
                        }, "")
                    : "";
                  return (
                    convertText && (
                      <LineBreak
                        text={`${target.workplace_name}：${convertText}`}
                      />
                    )
                  );
                })}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

/**
 * 支援記録
 */
type RecordDailySupportProps = Props & { showStaffComment: boolean };
const RecordDailySupport = ({
  classes,
  facilityUserLabel,
  dailyRecord,
  showStaffComment,
  isMeal,
  isTransfer
}: RecordDailySupportProps): JSX.Element => {
  const filteredSupport = dailyRecord.support
    ? dailyRecord.support.filter((support) => !!support.record)
    : [];
  return (
    <div className={classes.flexContainer}>
      <table className={`${classes.table}`}>
        <tbody>
          <tr style={{ height: TABLE_HEAD_HEIGHT }}>
            <td className="headLabel lsize">{`${facilityUserLabel}名`}</td>
            <td className="headLabel msize">利用状態</td>
            <td className="headLabel">支援内容</td>
            <td className="headLabel ssize">記録者</td>
            <td className="headLabel sssize">捺印</td>
          </tr>
          {filteredSupport.map((support) => {
            const statusObj = SERVICE_STATUS.find(
              (el) => el.value === support.inout.status
            );
            const status = statusObj ? statusObj.label : "";
            const dispInOutTimes = isDispInOutTime(support.inout.status);
            const inTime = formatInOutTime(support.inout.in_time || "");
            const outTime = formatInOutTime(support.inout.out_time || "");
            const pickup = support.inout.pickup
              ? SUPPLY_PICKUP_SERVICE_LIST[support.inout.pickup].label
              : "";
            return (
              <tr key={support.inout.id}>
                <td className="label">{support.inout.name}</td>
                <td className="label">
                  <div>{status}</div>
                  <div>{dispInOutTimes ? `${inTime}〜${outTime}` : null}</div>
                  {isMeal &&
                    support.inout.food &&
                    support.inout.food === "1" && (
                      <div className="service">食事:あり</div>
                    )}
                  {isTransfer &&
                    support.inout.pickup &&
                    support.inout.pickup !== "0" && (
                      <div className="service">{`送迎:${pickup}`}</div>
                    )}
                </td>
                <td className="supportContents">
                  {getSupportContents(
                    support.inout.status,
                    support.record,
                    support.support_work_history,
                    showStaffComment,
                    facilityUserLabel
                  )}
                </td>
                <td className="label">
                  {support.record ? support.record.staff_name : ""}
                </td>
                <td className="label" />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 * 日々の記録のプレビュー画面
 */
const PreviewOperationSupportRecordDaily: React.FC<Props> = (props) => {
  if (!props.dailyRecord.support || props.dailyRecord.support.length === 0) {
    return null;
  }

  // 業務日誌欄・職員コメントの表示管理をqueryで行っている（あれば表示する）
  const queryParameters: { display_columns?: string } = getUrlParams(
    props.query
  );
  const displayColumns: string[] = queryParameters.display_columns
    ? queryParameters.display_columns.split(",")
    : [];
  const showOperation = displayColumns.includes("operation_record");
  const showStaffComment = displayColumns.includes("staff_comment");

  return (
    <PrintingPaper>
      {/* ヘッダー */}
      <RecordDailyHeader {...props} displayColumns={displayColumns} />
      {/* 業務日誌 */}
      {showOperation && <RecordDailyOperation {...props} />}
      {/* 支援記録 */}
      <RecordDailySupport {...props} showStaffComment={showStaffComment} />
    </PrintingPaper>
  );
};

export default withStyles(styles)(PreviewOperationSupportRecordDaily);
