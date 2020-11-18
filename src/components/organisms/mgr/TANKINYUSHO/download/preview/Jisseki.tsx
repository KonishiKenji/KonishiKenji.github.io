import * as React from "react";

import { convertWareki } from "@utils/date";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { InvoiceData, InvoiceUser } from "@stores/domain/invoice/type";

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
        "&.sSmall": {
          height: 25
        },
        "&.small": {
          height: 100
        },
        "&.ssSize": {
          width: 25
        },
        "&.sSize": {
          width: 50
        },
        "&.mSize": {
          width: 80
        },
        "&.lSize": {
          width: 120
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
 * 短期入所の実績記録票
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
            <span>短期入所サービス提供実績記録票</span>
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
                  <td className="mSize">{user.recipientNo}</td>
                  <td className="label">支給決定障害者氏名</td>
                  <td className="label lSize">{user.recipientName}</td>
                  <td className="label">事業所番号</td>
                  <td className="label mSize">{facility.officeNo}</td>
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
          <td rowSpan={2} className="label sSize">
            日付
          </td>
          <td rowSpan={2} className="label sSize">
            曜日
          </td>
          <td rowSpan={2} className="label sSize">
            算定
            <br />
            日数
          </td>
          <td colSpan={2} className="label">
            送迎加算
          </td>
          <td rowSpan={2} className="label sSize">
            食事提供
            <br />
            加算
          </td>
          <td rowSpan={2} className="label sSize">
            医療連携
            <br />
            体制加算
          </td>
          <td rowSpan={2} className="label sSize">
            緊急短期
            <br />
            入所受入
            <br />
            加算
          </td>
          <td rowSpan={2} className="label sSize borderBold">
            定員超過
            <br />
            特例加算
          </td>
          <td rowSpan={2} className="label sSize borderBold">
            利用者
            <br />
            確認印
          </td>
          <td rowSpan={2} className="label">
            備考
          </td>
        </tr>
        <tr>
          <td className="label ssSize borderDashed">往</td>
          <td className="label ssSize">復</td>
        </tr>
        {records.map((usage_performances, index) => {
          const rowClass = index === 0 ? "borderBoldTop" : "";
          let memo =
            usage_performances && usage_performances.remarks
              ? usage_performances.remarks
              : "";
          if (usage_performances && usage_performances.overHours) {
            memo = `単独型加算(18時間以上) ${memo}`;
          }
          if (
            usage_performances &&
            usage_performances.severeDisabilitySupport
          ) {
            memo = `重度障害者支援加算(研修修了者) ${memo}`;
          }
          if (usage_performances && usage_performances.overCapacity === 1) {
            memo = `介護を行う者の急病等 ${memo}`;
          }

          return (
            <tr key={index} className={rowClass}>
              <td className="label sSmall">
                {usage_performances ? usage_performances.day : ""}
              </td>
              <td className="label sSmall">
                {usage_performances ? usage_performances.day_of_week : ""}
              </td>
              <td className="label sSmall">
                {usage_performances && usage_performances.isApplyDays ? 1 : ""}
              </td>
              <td className="label borderDashed sSmall">
                {usage_performances
                  ? usage_performances.isOutbound
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td className="label sSmall">
                {usage_performances
                  ? usage_performances.isInbound
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td className="label sSmall">
                {usage_performances
                  ? usage_performances.isSuppliedMeal
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td className="label sSmall">
                {usage_performances
                  ? usage_performances.medical_support_type
                  : ""}
              </td>
              <td className="label sSmall">
                {usage_performances
                  ? usage_performances.isEmergencyInitialAdmission
                    ? "1"
                    : ""
                  : ""}
              </td>
              <td className="label sSmall borderBold">
                {usage_performances ? usage_performances.overCapacity : ""}
              </td>
              <td className="borderBold sSmall" />
              <td className="sSmall">{usage_performances ? memo : ""}</td>
            </tr>
          );
        })}
        <tr className="borderDoubleTop borderDashed">
          <td colSpan={2} className="label">
            合計
          </td>
          <td className="prise">{`${user.applyDays}日`}</td>
          <td colSpan={2} className="prise">{`${user.cntPickup}回`}</td>
          <td className="prise">{`${user.cntFood}回`}</td>
          <td className="prise">{`${user.cntSupportMedical}回`}</td>
          <td className="prise">{`${user.emergencyInitialAdmission}回`}</td>
          <td className="prise">{`${user.overCapacity}回`}</td>
          <td colSpan={2} />
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(styles)(InoutRecordTable);
