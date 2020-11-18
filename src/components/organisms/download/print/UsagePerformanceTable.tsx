import * as React from "react";

import { dateToLocalisedString } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import {
  InvoiceData,
  InvoiceUser,
  InvoiceDate,
  Facility,
  UsagePerformanceStatusType,
  InvoiceUserUsagePerformance
} from "@stores/domain/invoice/type";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

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
        "&.ssssize": {
          width: 20
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
    },
    dateWidth: {
      minWidth: 90
    }
  });

interface Props extends WithStyles<typeof styles> {
  key: number;
  invoiceData: InvoiceData;
}

// サービス提供状況の項目変換
const serviceStatusType = (statusType: number) => {
  switch (statusType) {
    case UsagePerformanceStatusType.STAY:
    case UsagePerformanceStatusType.EXPERIENCE:
      return "";
    case UsagePerformanceStatusType.HOSPITALIZATION_FIRSTDAY:
    case UsagePerformanceStatusType.HOSPITALIZATION_MIDDLEDAY:
    case UsagePerformanceStatusType.HOSPITALIZATION_LASTDAY:
      return "入院";
    case UsagePerformanceStatusType.OVERNIGHTSTAY_FIRSTDAY:
    case UsagePerformanceStatusType.OVERNIGHTSTAY_MIDDLEDAY:
    case UsagePerformanceStatusType.OVERNIGHTSTAY_LASTDAY:
      return "外泊";
    case UsagePerformanceStatusType.OVERNIGHTSTAY_FROM_HOSPITALIZATION:
      return "入院→外泊";
    case UsagePerformanceStatusType.HOSPITALIZATION_FROM_OVERNIGHTSTAY:
      return "外泊→入院";
    case UsagePerformanceStatusType.HOSPITALIZATION_COMMUNITY_OVERNIGHTSTAY:
      return "入院→共同生活住居に戻る→外泊";
    case UsagePerformanceStatusType.OVERNIGHTSTAY_COMMUNITY_HOSPITALIZATION:
      return "外泊→共同生活住居に戻る→入院";
    default:
      return null;
  }
};

/**
 * 共同生活援助サービス提供実績記録票
 */
class UsagePerformanceTable extends React.Component<Props> {
  public recordRender(user: InvoiceUser) {
    const { classes } = this.props;

    const performanceCount = user.usage_performances.reduce(
      (prev, current) => {
        Object.keys(current).forEach((key: string) => {
          if (current[key] > 0) {
            prev[key] += 1;
          }
        });
        return prev;
      },
      {
        night_support_type: 0,
        hospitalization_support_type: 0,
        get_home_support_type: 0,
        daytime_support_type: 0,
        medical_support_type: 0,
        life_support_flg: 0
      }
    );

    const tmp = user.usage_performances.filter(
      performance => performance.status_type > 0
    );
    const performances = tmp.concat([
      ...Array<InvoiceUserUsagePerformance>(RECORD_MAX_ROW - tmp.length).fill(
        {} as InvoiceUserUsagePerformance
      )
    ]);

    return (
      <table className={`${classes.table} fullWidth`}>
        <tbody>
          <tr>
            <td rowSpan={2} className="label vertical ssssize">
              <span>日付</span>
            </td>
            <td rowSpan={2} className="label vertical ssssize borderBold">
              <span>曜日</span>
            </td>
            <td colSpan={8} className="label borderBold">
              支援実績
            </td>
            <td rowSpan={2} className="label borderBold">
              利用者
              <br />
              確認印
            </td>
            <td rowSpan={2} className="label">
              備考
            </td>
          </tr>
          <tr>
            <td className="label lsize">サービス提供の状況</td>
            <td className="label ssssize">住居外利用</td>
            <td className="label">夜間支援等体制加算</td>
            <td className="label">入院時支援特別加算</td>
            <td className="label">帰宅時支援加算</td>
            <td className="label">日中支援加算</td>
            <td className="label">医療連携体制加算</td>
            <td className="label borderBold">自立生活支援加算</td>
          </tr>
          {performances.map((data, index) => {
            const rowClass = index === 0 ? "borderBoldTop" : "";
            return (
              <tr key={index} className={rowClass}>
                <td className="label ssssize">{data ? data.day : ""}</td>
                <td className="label ssssize borderBold">
                  {data ? data.day_of_week : ""}
                </td>
                <td className="label sssize">
                  {data && data.status_type > 1
                    ? serviceStatusType(data.status_type)
                    : ""}
                </td>
                <td className="label ssssize" />
                <td className="label sssize">
                  {data && data.night_support_type > 0
                    ? data.night_support_type
                    : ""}
                </td>
                <td className="label sssize">
                  {data && data.hospitalization_support_type > 0
                    ? data.hospitalization_support_type
                    : ""}
                </td>
                <td className="label sssize">
                  {data && data.get_home_support_type > 0
                    ? data.get_home_support_type
                    : ""}
                </td>
                <td className="label sssize">
                  {data && data.daytime_support_type > 0
                    ? data.daytime_support_type
                    : ""}
                </td>
                <td className="label sssize">
                  {data && data.medical_support_type > 0
                    ? data.medical_support_type
                    : ""}
                </td>
                <td className="label sssize borderBold">
                  {data && data.life_support_flg > 0
                    ? data.life_support_flg
                    : ""}
                </td>
                <td className="borderBold ssssize" />
                <td className="ssize">{data ? data.remarks : ""}</td>
              </tr>
            );
          })}
          <tr className="borderDoubleTop borderDashed">
            <td colSpan={3} className="label">
              合計
            </td>
            <td className="prise">{`0日`}</td>
            <td className="prise">{`${performanceCount.night_support_type}回`}</td>
            <td className="prise">{`${performanceCount.hospitalization_support_type}回`}</td>
            <td className="prise">{`${performanceCount.get_home_support_type}回`}</td>
            <td className="prise">{`${performanceCount.daytime_support_type}回`}</td>
            <td className="prise">{`${performanceCount.medical_support_type}回`}</td>
            <td className="prise borderBold">{`${performanceCount.life_support_flg}回`}</td>
            <td colSpan={2} />
          </tr>
        </tbody>
      </table>
    );
  }

  public userRender(
    user: InvoiceUser,
    date: InvoiceDate,
    facility: Facility,
    key: number
  ) {
    const { classes } = this.props;

    if (!user.usage_performances || user.usage_performances.length === 0) {
      return null;
    }

    const targetUsagePerformances = user.usage_performances.filter(
      target => target.status_type > 0
    );

    return (
      targetUsagePerformances.length > 0 && (
        <section key={key} className={classes.page}>
          <div className={`${classes.flexContainer} center relative`}>
            <div className={classes.date}>
              <span>{`${date.year}年${date.month}月分`}</span>
            </div>
            <span>共同生活援助サービス提供実績記録票</span>
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
                  <td colSpan={3} className="label" />
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
          <div className={classes.flexContainer}>{this.recordRender(user)}</div>
          <div className={classes.flexContainer}>
            <table className={`${classes.table}`}>
              <tbody>
                <tr>
                  <td className="label borderBold">自立生活支援加算</td>
                  <td className="label">退居日</td>
                  <td
                    className={`label borderBold ${this.props.classes.dateWidth}`}
                  >
                    {user.dateEndService
                      ? dateToLocalisedString(
                          user.dateEndService,
                          "YYYY年MM月DD日"
                        )
                      : ""}
                  </td>
                  <td className="label">退居後算定日</td>
                  <td className={`label ${this.props.classes.dateWidth}`}>
                    {user.lastLifeSupportTargetDate
                      ? dateToLocalisedString(
                          user.lastLifeSupportTargetDate,
                          "YYYY年MM月DD日"
                        )
                      : ""}
                  </td>
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
      )
    );
  }

  public render() {
    const { key, invoiceData } = this.props;
    if (!invoiceData) return null;
    const { users, date, facility } = invoiceData;

    return (
      <React.Fragment key={key}>
        {users.map((user, index) => {
          return this.userRender(user, date, facility, index);
        })}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UsagePerformanceTable);
