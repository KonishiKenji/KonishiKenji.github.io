import * as React from "react";

import { dateToLocalisedString } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { FacilityType } from "@constants/variables";

import { InvoiceData } from "@stores/domain/invoice/type";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

const RECORD_MAX_ROW = 25;

const styles = ({ spacing }: Theme) =>
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
      marginBottom: 8,
      "&.end": {
        justifyContent: "flex-end"
      },
      "&.center": {
        justifyContent: "center"
      },
      "&.relative": {
        position: "relative"
      }
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
      "&.thin": {
        border: "1px solid"
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
          width: 80
        },
        "&.msize": {
          width: 120
        },
        "&.lsize": {
          width: 150
        },
        "&.llsize": {
          width: 180
        },
        "&.vertical": {
          height: 50,
          "& > span": {
            writingMode: "vertical-rl"
          }
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
        },
        "&.borderBoldTop": {
          borderTop: "2px solid"
        },
        "&.borderDoubleTop": {
          borderTopStyle: "double"
        },
        "&.borderDashed": {
          borderBottom: "1px dashed"
        }
      }
    },
    date: {
      position: "absolute",
      top: 0,
      left: 0
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

interface Props extends WithStyles<typeof styles> {
  key: number;
  invoiceData: InvoiceData;
}

/**
 * 移行/A/B の実績記録票
 */
class InoutRecordTable extends React.Component<Props> {
  public render() {
    const { key, invoiceData } = this.props;
    const { date, facility, users } = invoiceData;
    const { classes } = this.props;
    const facilityType = facility.kindService;

    return (
      <React.Fragment key={key}>
        {users.map((user, index) => (
          <section key={index} className={classes.page}>
            <div className={`${classes.flexContainer} center relative`}>
              <div className={classes.date}>
                <span>{`${date.year}年${date.month}月分`}</span>
              </div>
              <span>
                {facilityType === FacilityType.IKOU
                  ? "就労移行支援提供実績記録票"
                  : "就労継続支援提供実績記録票"}
              </span>
            </div>
            <div className={classes.flexContainer}>
              <table className={`${classes.table} fullWidth`}>
                <tbody>
                  <tr>
                    <td className="label">
                      受給者証
                      <br />
                      番号
                    </td>
                    <td className="ssize">{user.recipientNo}</td>
                    <td className="label">支給決定障害者氏名</td>
                    <td className="label msize">{user.recipientName}</td>
                    <td className="label">事業所番号</td>
                    <td className="label ssize">{facility.officeNo}</td>
                  </tr>
                  <tr>
                    <td className="label">契約支給量</td>
                    <td colSpan={2} className="label">
                      {user.payment}
                    </td>
                    <td className="label">
                      事業者及び
                      <br />
                      その事業所
                    </td>
                    <td colSpan={2} className="label">
                      {facility.officeName}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.flexContainer}>
              <Records
                classes={classes}
                user={user}
                facilityType={facility.kindService}
              />
            </div>
            <div className={classes.flexContainer}>
              <table className={`${classes.table} fullWidth`}>
                <tbody>
                  <tr>
                    <td className="label borderBold">初期加算</td>
                    <td className="label">利用開始日</td>
                    <td className="label">
                      {dateToLocalisedString(
                        new Date(user.dateBeginService),
                        "YYYY年MM月DD日"
                      )}
                    </td>
                    <td className="label">30日目</td>
                    <td className="label">
                      {dateToLocalisedString(
                        new Date(user.dateAfter30Days),
                        "YYYY年MM月DD日"
                      )}
                    </td>
                    <td className="label">当月算定日数</td>
                    <td className="label">{`${user.cntDaysInitApply}日`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={`${classes.flexContainer} end`}>
              <table className={`${classes.table} thin`}>
                <tbody>
                  <tr>
                    <td className="label">1</td>
                    <td className="label">枚中</td>
                    <td className="label">1</td>
                    <td className="label">枚</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </React.Fragment>
    );
  }
}

/**
 * 内部レコード
 */
const Records = (props: any) => {
  const { user, classes, facilityType } = props;
  const emptyRow =
    user.records.length >= RECORD_MAX_ROW
      ? 0
      : RECORD_MAX_ROW - user.records.length;
  // tslint:disable-next-line:prefer-array-literal
  const emptyList = new Array<undefined>(emptyRow).fill(undefined);
  const records = [...user.records, ...emptyList];

  return (
    <table className={`${classes.table} fullWidth`}>
      <tbody>
        <tr>
          <td rowSpan={3} className="label vertical">
            <span>日付</span>
          </td>
          <td rowSpan={3} className="label vertical borderBold">
            <span>曜日</span>
          </td>
          <td
            colSpan={facilityType === FacilityType.IKOU ? 11 : 10}
            className="label borderBold"
          >
            サービス提供実績
          </td>
          <td rowSpan={3} className="label borderBold">
            利用者確認印
          </td>
          <td rowSpan={3} className="label">
            備考
          </td>
        </tr>
        <tr>
          <td rowSpan={2} className="label">
            サービス提供の状況
          </td>
          <td rowSpan={2} className="label">
            開始
            <br />
            時間
          </td>
          <td rowSpan={2} className="label">
            終了
            <br />
            時間
          </td>
          <td colSpan={2} className="label">
            送迎加算
          </td>
          <td className="label">訪問支援特別加算</td>
          <td rowSpan={2} className="label">
            食事提供加算
          </td>
          <td rowSpan={2} className="label">
            医療連携体制加算
          </td>
          {facilityType === FacilityType.IKOU ? (
            <td rowSpan={2} className="label">
              通勤訓練加算
            </td>
          ) : null}
          <td rowSpan={2} className="label">
            体験利用支援加算
          </td>
          <td rowSpan={2} className="label borderBold">
            {facilityType === FacilityType.IKOU ? (
              <span>移行準備支援体制加算</span>
            ) : (
              <span>施設外支援</span>
            )}
          </td>
        </tr>
        <tr>
          <td className="label borderDashed">往</td>
          <td className="label">復</td>
          <td className="label">時間数</td>
        </tr>
        {records.map((record, index) => {
          const rowClass = index === 0 ? "borderBoldTop" : "";
          return (
            <tr key={index} className={rowClass}>
              <td className="label">{record ? record.day : ""}</td>
              <td className="label borderBold">
                {record ? record.dayOfWeek : ""}
              </td>
              <td className="label sssize">
                {record ? record.serviceStatus : ""}
              </td>
              <td className="label sssize">{record ? record.startTime : ""}</td>
              <td className="label sssize">{record ? record.endTime : ""}</td>
              <td className="label borderDashed">
                {record ? (record.additions.isInbound ? "1" : "") : ""}
              </td>
              <td className="label">
                {record ? (record.additions.isOutbound ? "1" : "") : ""}
              </td>
              <td className="label">
                {record ? record.additions.supportTime : ""}
              </td>
              <td className="label">
                {record ? (record.additions.isSuppliedMeal ? "1" : "") : ""}
              </td>
              <td className="label">
                {record ? record.additions.supportMedical : ""}
              </td>
              {facilityType === FacilityType.IKOU ? (
                <td className="label">
                  {record ? (record.additions.isTrainCommute ? "1" : "") : ""}
                </td>
              ) : null}
              <td className="label">
                {record ? record.additions.trialUsage : ""}
              </td>
              <td className="label borderBold">
                {record
                  ? facilityType === FacilityType.IKOU
                    ? record.additions.supportSystem
                    : record.additions.supportOutOfFacility
                  : ""}
              </td>
              <td className="borderBold" />
              <td className="msize">{record ? record.memo : ""}</td>
            </tr>
          );
        })}
        <tr className="borderDoubleTop borderDashed">
          <td rowSpan={2} colSpan={5} className="label">
            合計
          </td>
          <td
            rowSpan={2}
            colSpan={2}
            className="prise"
          >{`${user.cntPickup}回`}</td>
          <td rowSpan={2} className="prise">{`${user.cntVisit}回`}</td>
          <td rowSpan={2} className="prise">{`${user.cntFood}回`}</td>
          <td rowSpan={2} className="prise">{`${user.cntSupportMedical}回`}</td>
          {facilityType === FacilityType.IKOU ? (
            <td rowSpan={2} className="prise">{`${user.cntTrainCommute}回`}</td>
          ) : null}
          <td rowSpan={2} className="prise">{`${user.cntTrialUsage}回`}</td>
          <td rowSpan={2} className="borderDashed">
            {facilityType === FacilityType.IKOU ? (
              <span>移行準備支援体制加算(Ⅰ)</span>
            ) : (
              <span>施設外支援</span>
            )}
          </td>
          <td className="label borderDashed">当月</td>
          <td className="label">
            {facilityType === FacilityType.IKOU
              ? `${user.cntSupportSystem1}日`
              : `${user.cntSupportOutOfFacility}日`}
          </td>
        </tr>
        <tr>
          <td className="label borderDashed">累計</td>
          <td className="label">
            {facilityType === FacilityType.IKOU
              ? `${user.cntSupportSystem1Total}日/180日`
              : `${user.cntSupportOutOfFacilityTotal}日/180日`}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(styles)(InoutRecordTable);
