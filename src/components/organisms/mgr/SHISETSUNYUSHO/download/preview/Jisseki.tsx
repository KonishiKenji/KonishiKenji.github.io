import * as React from "react";

import { dateToLocalisedString, convertWareki } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import {
  InvoiceData,
  InvoiceUser,
  UsagePerformanceStatusType
} from "@stores/domain/invoice/type";
import isEmpty from "lodash-es/isEmpty";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";
import { FacilityType } from "@constants/variables";

const RECORD_MAX_ROW = 31;

const statusTypeList = {
  [UsagePerformanceStatusType.HOSPITALIZATION_FIRSTDAY]: {
    text: "入院",
    css: "status"
  },
  [UsagePerformanceStatusType.HOSPITALIZATION_MIDDLEDAY]: {
    text: "外泊",
    css: "status"
  },
  [UsagePerformanceStatusType.HOSPITALIZATION_LASTDAY]: {
    text: "入院→外泊",
    css: "statusLabel"
  },
  [UsagePerformanceStatusType.OVERNIGHTSTAY_FIRSTDAY]: {
    text: "外泊→入院",
    css: "statusLabel"
  },
  [UsagePerformanceStatusType.OVERNIGHTSTAY_MIDDLEDAY]: {
    text: "入院→共同生活住居に戻る→外泊",
    css: "statusMiniLabel"
  },
  [UsagePerformanceStatusType.OVERNIGHTSTAY_LASTDAY]: {
    text: "外泊→共同生活住居に戻る→入院",
    css: "statusMiniLabel"
  }
};

const styles = ({ spacing }: Theme) =>
  createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: `10px ${PRINT_PAGE_PADDING / 2}px`,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)"
    },
    flexContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: 8,
      "&.center": {
        justifyContent: "center"
      },
      "&.relative": {
        position: "relative"
      }
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
        paddingTop: 0.5,
        paddingBottom: 0.5,
        paddingLeft: 1,
        paddingRight: 1,
        borderRight: "1px solid",
        fontSize: 10,
        letterSpacing: 0.6,
        height: 16,
        wordBreak: "break-all",
        color: "rgba(0, 0, 0, 0.84)",
        "&.status": {
          maxWidth: 47,
          textAlign: "center"
        },
        "&.memo": {
          maxWidth: 105,
          "& > div": {
            width: 169,
            transform: "scale(0.6) translate(-56px, 0px)"
          }
        },
        "&.statusLabel": {
          maxWidth: 47,
          textAlign: "center",
          "& > div": {
            width: 67,
            transform: "scale(0.8) translate(-10px, 0px)",
            whiteSpace: "nowrap"
          }
        },
        "&.statusMiniLabel": {
          maxWidth: 55,
          maxHeight: 25,
          textAlign: "center",
          "& > div": {
            width: 85,
            height: 24,
            transform: "scale(0.6) translate(-27px, 0px)"
          }
        },
        "&.miniFont": {
          maxWidth: 26,
          textAlign: "center",
          "& > div": {
            width: 27,
            transform: "scale(0.8) translate(-2px, 0px)",
            whiteSpace: "nowrap"
          }
        },
        "&.miniLabel": {
          maxWidth: 55,
          textAlign: "center",
          "& > div": {
            width: 67,
            transform: "scale(0.8) translate(-9.5px, 0px)",
            whiteSpace: "nowrap"
          }
        },
        "&.sLabel": {
          maxWidth: 47,
          textAlign: "center",
          "& > div": {
            width: 67,
            transform: "scale(0.8) translate(-15px, 0px)",
            whiteSpace: "nowrap"
          }
        },
        "&.label": {
          textAlign: "center"
        },
        "&.prise": {
          textAlign: "right"
        },
        "&.sSmall": {
          height: 22
        },
        "&.miniSize": {
          width: 25
        },
        "&.ssSize": {
          width: 26
        },
        "&.sSize": {
          width: 30
        },
        "&.mSize": {
          width: 34
        },
        "&.mmSize": {
          width: 38
        },
        "&.lSize": {
          width: 40
        },
        "&.llSize": {
          width: 47
        },
        "&.lllSize": {
          width: 60
        },
        "&.size": {
          width: 75
        },
        "&.maxSize": {
          width: 150
        },
        "&.headerS": {
          width: 60
        },
        "&.headerSize": {
          width: 100
        },
        "&.headerM": {
          width: 110
        },
        "&.headerL": {
          width: 120
        },
        "&.footer": {
          width: 127
        },
        "&.vertical": {
          height: 70,
          "& > span": {
            writingMode: "vertical-rl"
          }
        },
        "&.borderBold": {
          borderRight: "2px solid"
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
 * 施設入所の実績記録票
 */
const InoutRecordTable: React.FunctionComponent<Props> = ({
  key,
  invoiceData,
  classes
}) => {
  const { date, facility, users } = invoiceData;

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
            <span>施設入所支援提供実績記録票</span>
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
                  <td colSpan={4} className="headerSize">
                    {user.recipientNo}
                  </td>
                  <td colSpan={3} className="label headerM">
                    支給決定障害者氏名
                  </td>
                  <td colSpan={2} className="label headerSize">
                    {user.recipientName}
                  </td>
                  <td className="label">事業所番号</td>
                  <td className="label">{facility.officeNo}</td>
                </tr>
                <tr>
                  <td className="label headerM">補足給付適用の有無</td>
                  <td className="label sSize">{user.benefit}</td>
                  <td colSpan={5} className="label headerL">
                    補足給付額(日額)
                  </td>
                  <td colSpan={2} className="prise headerSize">
                    {user.benefitAmount === null
                      ? "円/日"
                      : `${user.benefitAmount.toLocaleString()}円/日`}
                  </td>
                  <td className="headerS" />
                  <td className="label headerM">
                    事業者及び
                    <br />
                    その事業所
                  </td>
                  <td className="label headerL">{facility.officeName}</td>
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
                <tr className="borderBold">
                  <td className="label borderBold">入所時特別支援加算</td>
                  <td className="label">利用開始日</td>
                  <td className="maxSize label">
                    {isEmpty(user.dateBeginService)
                      ? ""
                      : dateToLocalisedString(
                          new Date(user.dateBeginService),
                          "YYYY年MM月DD日"
                        )}
                  </td>
                  <td className="label">30日目</td>
                  <td className="maxSize label">
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
                <tr>
                  <td className="label borderBold">地域移行加算</td>
                  <td className="label">退所日</td>
                  <td className="maxSize label">
                    {isEmpty(user.regionalTransitionEndDate)
                      ? ""
                      : dateToLocalisedString(
                          new Date(user.regionalTransitionEndDate),
                          "YYYY年MM月DD日"
                        )}
                  </td>
                  <td className="label">退所後算定日</td>
                  <td className="maxSize label borderBold">
                    {isEmpty(user.regionalTransitionAfterDate)
                      ? ""
                      : dateToLocalisedString(
                          new Date(user.regionalTransitionAfterDate),
                          "YYYY年MM月DD日"
                        )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </React.Fragment>
  );
};

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
    user.usage_performances.length >= RECORD_MAX_ROW
      ? 0
      : RECORD_MAX_ROW - user.usage_performances.length;
  // tslint:disable-next-line:prefer-array-literal
  const emptyList = new Array<undefined>(emptyRow).fill(undefined);
  const records = [...user.usage_performances, ...emptyList];

  return (
    <table className={`${classes.table} fullWidth`}>
      <tbody>
        <tr>
          <td rowSpan={6} className="label ssSize">
            <span>日付</span>
          </td>
          <td rowSpan={6} className="label ssSize borderBold">
            <span>曜日</span>
          </td>
          <td colSpan={5} className="label borderBold">
            支援実績
          </td>
          <td colSpan={9} className="label borderBold">
            実費算定額
          </td>
          <td rowSpan={6} className="label mSize borderBold vertical">
            <span>利用者確認印</span>
          </td>
          <td rowSpan={6} className="label">
            備考
          </td>
        </tr>
        <tr>
          <td rowSpan={5} className="miniLabel">
            <div>
              サービス提供
              <br />
              の状況
            </div>
          </td>
          <td rowSpan={5} className="label lSize">
            入院・
            <br />
            外泊時
            <br />
            加算
          </td>
          <td rowSpan={5} className="sLabel">
            <div>
              入院時支援
              <br />
              特別加算
            </div>
          </td>
          <td rowSpan={5} className="label llSize">
            地域移行
            <br />
            加算
          </td>
          <td rowSpan={5} className="label llSize borderBold">
            体験宿泊
            <br />
            支援加算
          </td>
          <td rowSpan={4} className="label miniSize vertical">
            <span>食費の単価</span>
          </td>
          <td colSpan={2} className="label sSize">
            朝食
          </td>
          <td colSpan={2} className="label lllSize">
            {user.unitBreakfast === null
              ? ""
              : user.unitBreakfast.toLocaleString()}
          </td>
          <td className="miniFont">
            <div>円/日</div>
          </td>
          <td rowSpan={2} colSpan={3} className="label">
            光熱水費の単価
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="label">
            昼食
          </td>
          <td colSpan={2} className="label">
            {user.unitLunch === null ? "" : user.unitLunch.toLocaleString()}
          </td>
          <td className="miniFont">
            <div>円/日</div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="label">
            夕食
          </td>
          <td colSpan={2} className="label">
            {user.unitSupper === null ? "" : user.unitSupper.toLocaleString()}
          </td>
          <td className="miniFont">
            <div>円/日</div>
          </td>
          <td className="label sSize">一日</td>
          <td className="label llSize">
            {user.unitUtilityfeeDay === null
              ? ""
              : user.unitUtilityfeeDay.toLocaleString()}
          </td>
          <td className="miniFont">
            <div>円/日</div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="label">
            一日
          </td>
          <td colSpan={2} className="label">
            {user.unitFood === null ? "" : user.unitFood.toLocaleString()}
          </td>
          <td className="miniFont">
            <div>円/日</div>
          </td>
          <td className="label">一月</td>
          <td className="label">
            {user.unitUtilityfeeMonth === null
              ? ""
              : user.unitUtilityfeeMonth.toLocaleString()}
          </td>
          <td className="miniFont">
            <div>円/日</div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="label">
            朝食
          </td>
          <td colSpan={2} className="label">
            昼食
          </td>
          <td colSpan={2} className="label">
            夕食
          </td>
          <td colSpan={3} className="label">
            光熱水費
          </td>
        </tr>
        {records.map((usage_performances, index) => {
          const rowClass = index === 0 ? "borderBoldTop" : "";
          let memo =
            usage_performances && usage_performances.remarks
              ? usage_performances.remarks
              : "";
          if (
            usage_performances &&
            usage_performances.severeDisabilitySupport &&
            usage_performances.nightSupportSevereDisabilitySupport
          ) {
            memo = `重度障害者支援加算(Ⅱ・夜間支援) ${memo}`;
          } else if (
            usage_performances &&
            usage_performances.severeDisabilitySupport
          ) {
            memo = `重度障害者支援加算(Ⅰ) ${memo}`;
          }
          const status =
            usage_performances && usage_performances.status_type
              ? convertStatus(usage_performances.status_type)
              : "";
          const statusType = statusTypeList[status]
            ? statusTypeList[status].text
            : "";

          const statusTypeCss = statusTypeList[status]
            ? statusTypeList[status].css
            : "";

          return (
            <tr key={index} className={rowClass}>
              <td className="label sSmall">
                {usage_performances ? usage_performances.day : ""}
              </td>
              <td className="label borderBold sSmall">
                {usage_performances ? usage_performances.day_of_week : ""}
              </td>
              <td className={statusTypeCss}>
                <div>{statusType}</div>
              </td>
              <td className="label sSmall">
                {usage_performances ? usage_performances.hospitalStay : ""}
              </td>
              <td className="label sSmall">
                {usage_performances
                  ? usage_performances.hospitalization_support_type
                  : ""}
              </td>
              <td className="label sSmall">
                {usage_performances
                  ? usage_performances.isRegionalTransition
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td className="label sSmall borderBold">
                {usage_performances
                  ? usage_performances.isExperienceStay
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td colSpan={2} className="label sSmall">
                {usage_performances
                  ? usage_performances.isBreakfast
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td colSpan={2} className="label sSmall">
                {usage_performances
                  ? usage_performances.isLunch
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td colSpan={2} className="label sSmall">
                {usage_performances
                  ? usage_performances.isSupper
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td colSpan={3} className="label borderBold sSmall">
                {usage_performances
                  ? usage_performances.isUtilityfee
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td className="borderBold sSmall" />
              <td className="sSmall memo">
                <div>{memo}</div>
              </td>
            </tr>
          );
        })}
        <tr className="borderDoubleTop">
          <td rowSpan={3} colSpan={3} className="label">
            合計
          </td>
          <td rowSpan={3} className="prise">
            {`${user.hospitalStay}回`}
          </td>
          <td rowSpan={3} className="prise">
            {`${user.cntHospitalizationSupportType}回`}
          </td>
          <td rowSpan={3} className="prise">
            {`${user.regionalTransition}回`}
          </td>
          <td rowSpan={3} className="prise borderBold">
            {`${user.experienceStay}回`}
          </td>
          <td colSpan={2} className="prise">
            {`${user.cntFoodBreakfast}回`}
          </td>
          <td colSpan={2} className="prise">
            {`${user.cntFoodLunch}回`}
          </td>
          <td colSpan={2} className="prise">
            {`${user.cntFoodSupper}回`}
          </td>
          <td colSpan={3} className="prise borderBold">
            {`${user.cntUtilityfee}回`}
          </td>
          <td rowSpan={3} colSpan={2} />
        </tr>
        <tr>
          <td colSpan={3} className="label">
            各小計
          </td>
          <td colSpan={3} className="prise">
            {user.costFood === null
              ? ""
              : `${user.costFood.toLocaleString()}円`}
          </td>
          <td colSpan={3} className="prise borderBold">
            {user.costUtilityfee === null
              ? ""
              : `${user.costUtilityfee.toLocaleString()}円`}
          </td>
        </tr>
        <tr className="borderBold">
          <td colSpan={3} className="label footer">
            実費合計額
          </td>
          <td colSpan={6} className="prise borderBold">
            {user.costSum === null ? "" : `${user.costSum.toLocaleString()}円`}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const convertStatus = (statusType: UsagePerformanceStatusType) => {
  switch (statusType) {
    case 2:
    case 3:
    case 4:
      return UsagePerformanceStatusType.HOSPITALIZATION_FIRSTDAY;
    case 5:
    case 6:
    case 7:
      return UsagePerformanceStatusType.HOSPITALIZATION_MIDDLEDAY;
    case 8:
      return UsagePerformanceStatusType.HOSPITALIZATION_LASTDAY;
    case 9:
      return UsagePerformanceStatusType.OVERNIGHTSTAY_FIRSTDAY;
    case 10:
      return UsagePerformanceStatusType.OVERNIGHTSTAY_MIDDLEDAY;
    case 11:
      return UsagePerformanceStatusType.OVERNIGHTSTAY_LASTDAY;
    default:
      return "";
  }
};
export default withStyles(styles)(InoutRecordTable);
