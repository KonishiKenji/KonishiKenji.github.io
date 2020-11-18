import * as React from "react";

import { dateToLocalisedString, convertWareki } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { InvoiceData, InvoiceUser } from "@stores/domain/invoice/type";
import { isEmpty } from "lodash-es";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";
import { FacilityType } from "@constants/variables";

const RECORD_MAX_ROW = 31;

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
        padding: "0.5px 1px",
        borderRight: "1px solid",
        fontSize: 10,
        letterSpacing: 0.6,
        height: 20,
        wordBreak: "break-all",
        color: "rgba(0, 0, 0, 0.84)",
        "&.label": {
          textAlign: "center"
        },
        "&.prise": {
          textAlign: "right"
        },
        "&.ssmall": {
          height: 25
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
          width: 60
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
 * 生活介護の実績記録票
 */
class InoutRecordTable extends React.Component<Props> {
  public render() {
    const { key, invoiceData } = this.props;
    const { date, facility, users } = invoiceData;
    const { classes } = this.props;

    return (
      <React.Fragment key={key}>
        {users.map((user, index) => (
          <section key={index} className={classes.page}>
            <div className={`${classes.flexContainer} center relative`}>
              <div className={classes.date}>
                <span>{`${convertWareki(date.year, date.month).era}${
                  convertWareki(date.year, date.month).year
                }年${date.month}月分`}</span>
              </div>
              <span>生活介護サービス提供実績記録票</span>
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
                    <td className="lsize label">
                      {isEmpty(user.dateBeginService)
                        ? ""
                        : dateToLocalisedString(
                            new Date(user.dateBeginService),
                            "YYYY年MM月DD日"
                          )}
                    </td>
                    <td className="label">30日目</td>
                    <td className="lsize label">
                      {isEmpty(user.dateAfter30Days)
                        ? ""
                        : dateToLocalisedString(
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

interface RecordsProps extends WithStyles<typeof styles> {
  user: InvoiceUser;
  facilityType: FacilityType;
}
/**
 * 内部レコード
 */
const Records = (props: RecordsProps) => {
  const { user, classes } = props;
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
          <td colSpan={8} className="label borderBold">
            サービス提供実績
          </td>
          <td rowSpan={3} className="label borderBold">
            利用者
            <br />
            確認印
          </td>
          <td rowSpan={3} className="label">
            備考
          </td>
        </tr>
        <tr>
          <td rowSpan={2} className="label ssize">
            サービス提供
            <br />
            の状況
          </td>
          <td rowSpan={2} className="label sssize">
            開始時間
          </td>
          <td rowSpan={2} className="label sssize">
            終了時間
          </td>
          <td colSpan={2} className="label">
            送迎加算
          </td>
          <td className="label">訪問支援特別加算</td>
          <td rowSpan={2} className="label sssize">
            食事提供
            <br />
            加算
          </td>
          <td rowSpan={2} className="label sssize">
            体験利用
            <br />
            支援加算
          </td>
        </tr>
        <tr>
          <td className="label borderDashed">往</td>
          <td className="label">復</td>
          <td className="label">時間数</td>
        </tr>
        {records.map((record, index) => {
          const rowClass = index === 0 ? "borderBoldTop" : "";
          // 備考欄に【重度障害者支援加算】を追加
          let memo = record && record.memo ? record.memo : "";
          if (record && record.additions.supportSerious) {
            memo = `重度障害者支援加算 ${memo}`;
          }

          return (
            <tr key={index} className={rowClass}>
              <td className="label ssmall">{record ? record.day : ""}</td>
              <td className="label borderBold ssmall">
                {record ? record.dayOfWeek : ""}
              </td>
              <td className="label sssize ssmall">
                {record ? record.serviceStatus : ""}
              </td>
              <td className="label sssize ssmall">
                {record ? record.startTime : ""}
              </td>
              <td className="label sssize ssmall">
                {record ? record.endTime : ""}
              </td>
              <td className="label borderDashed ssmall">
                {record ? (record.additions.isInbound ? "1" : "") : ""}
              </td>
              <td className="label ssmall">
                {record ? (record.additions.isOutbound ? "1" : "") : ""}
              </td>
              <td className="label ssmall">
                {record ? record.additions.supportDiffTime : ""}
              </td>
              <td className="label ssmall">
                {record ? (record.additions.isSuppliedMeal ? "1" : "") : ""}
              </td>
              <td className="label ssmall">
                {record ? record.additions.trialUsage : ""}
              </td>
              <td className="borderBold ssmall" />
              <td className="msize ssmall">{memo}</td>
            </tr>
          );
        })}
        <tr className="borderDoubleTop borderDashed">
          <td colSpan={5} className="label">
            合計
          </td>
          <td colSpan={2} className="prise">{`${user.cntPickup}回`}</td>
          <td className="prise">{`${user.cntVisit}回`}</td>
          <td className="prise">{`${user.cntFood}回`}</td>
          <td className="prise">{`${user.cntTrialUsage}回`}</td>
          <td colSpan={2} />
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(styles)(InoutRecordTable);
