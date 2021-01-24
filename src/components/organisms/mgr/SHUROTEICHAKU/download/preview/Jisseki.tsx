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
          width: 410
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
 * 就労定着支援の実績記録表
 */
const InoutRecordTable: React.FunctionComponent<Props> = props => {
  const { key, invoiceData } = props;
  const { date, facility, users } = invoiceData;
  const { classes } = props;

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
            <span>就労定着支援提供実績記録票</span>
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
                  <td className="label msize">支給決定障害者氏名</td>
                  <td className="label msize">{user.recipientName}</td>
                  <td className="label">事業所番号</td>
                  <td className="label">{facility.officeNo}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="label">
                    {""}
                  </td>
                  <td className="label">
                    事業者及び
                    <br />
                    その事業所
                  </td>
                  <td className="label lsize">{facility.officeName}</td>
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
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className="label ssize borderBold">初期加算</td>
                  <td className="label ssize ">利用開始日</td>
                  <td className="lsize label">
                    {isEmpty(user.dateBeginService)
                      ? ""
                      : dateToLocalisedString(
                          new Date(user.dateBeginService),
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

interface RecordProps extends WithStyles<typeof styles> {
  user: InvoiceUser;
  facilityType: FacilityType;
}
/**
 * 内部レコード
 */
const Records = (props: RecordProps) => {
  const { user, classes } = props;
  const emptyRow =
    user.usage_results.length >= RECORD_MAX_ROW
      ? 0
      : RECORD_MAX_ROW - user.usage_results.length;
  // tslint:disable-next-line:prefer-array-literal
  const emptyList = new Array<undefined>(emptyRow).fill(undefined);
  const records = [...user.usage_results, ...emptyList];
  return (
    <table className={`${classes.table} fullWidth`}>
      <tbody>
        <tr>
          <td rowSpan={2} className="label vertical">
            <span>日付</span>
          </td>
          <td rowSpan={2} className="label vertical borderBold">
            <span>曜日</span>
          </td>
          <td colSpan={2} className="label borderBold">
            支援実績
          </td>
          <td rowSpan={2} className="label ssmall sssize borderBold">
            利用者
            <br />
            確認印
          </td>
          <td rowSpan={2} className="label fullWidth">
            備考
          </td>
        </tr>
        <tr>
          <td className="label sssize ssmall">算定日数</td>
          <td className="label ssize ssmall">特別地域加算</td>
        </tr>
        {records.map((usage_results, index) => {
          const rowClass = index === 0 ? "borderBoldTop" : "";
          return (
            <tr key={index} className={rowClass}>
              <td className="label ssmall">
                {usage_results ? usage_results.day : ""}
              </td>
              <td className="label ssmall borderBold">
                {usage_results ? usage_results.day_of_week : ""}
              </td>
              <td className="label sssize ssmall">
                {usage_results && usage_results.isApplyDays ? 1 : ""}
              </td>
              <td className="label borderBold">
                {usage_results && usage_results.isSpecialArea ? 1 : ""}
              </td>
              <td className="label sssize ssmall borderBold">{""}</td>
              <td className="label llsize ssmall">
                {usage_results && usage_results.remarks !== null
                  ? usage_results.remarks
                  : ""}
              </td>
            </tr>
          );
        })}
        <tr className="borderDoubleTop borderDashed">
          <td colSpan={2} className="label borderBold">
            合計
          </td>
          <td className="prise">{`${user.applyDays}日`}</td>
          <td className="prise borderBold">{`${user.cntSpecialArea}回`}</td>
          <td className="label borderBold" />
          <td>{""}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(styles)(InoutRecordTable);
