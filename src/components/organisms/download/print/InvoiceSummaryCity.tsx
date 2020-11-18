import * as React from "react";
import * as classNames from "classnames";

import { convertWareki } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { SummaryByCity, SummaryByCityBill } from "@stores/domain/invoice/type";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";
import {
  DISPLAY_INVOICE_SUMMARY_CITY_BILL_KAIGO_KYUHU,
  DISPLAY_INVOICE_SUMMARY_CITY_BILL_KUNREN_KYUHU
} from "@constants/variables";

export const TABLE_HEAD_HEIGHT = 20;

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: PRINT_PAGE_PADDING,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      "&:last-child": {
        margin: "0 auto"
      }
    },
    flexContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: 12,
      "&.end": {
        justifyContent: "flex-end"
      },
      "&.space-between": {
        justifyContent: "space-between"
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
      "& td": {
        padding: "3px 7px",
        borderRight: "1px solid",
        fontSize: 10,
        letterSpacing: 0.6,
        color: "rgba(0, 0, 0, 0.84)",
        height: 20,
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
          width: 250
        },
        "&.vertical": {
          width: 18,
          letterSpacing: 0,
          "& > span": {
            writingMode: "vertical-rl"
          }
        },
        "&.borderBold": {
          borderRight: "2px solid"
        },
        "&.borderBoldLeft": {
          borderLeft: "2px solid"
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
      margin: "0 0 10px 0",
      fontWeight: "normal",
      letterSpacing: 1.2,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.84)"
    },
    date: {
      fontSize: 11
    },
    city: {
      fontSize: 14,
      marginTop: 80
    },
    note: {
      fontSize: 14
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

// import { PRINT_PAGE_HEIGHT } from "@constants/styles";

interface Props extends WithStyles<typeof styles> {
  data: SummaryByCity;
}

/**
 * 請求書・明細書
 * 介護給付費・訓練等給付費等請求書
 */
class InvoiceSummaryCity extends React.Component<Props> {
  public render() {
    const { data, classes } = this.props;
    const { bill, date, demand, facility } = data;
    const billDate = convertWareki(date.bill.r01, date.bill.r02);
    return (
      <section className={classes.page}>
        <header>
          <h1 className={classes.title}>介護給付費・訓練等給付費等請求書</h1>
        </header>
        <div className={classNames(classes.flexContainer, "end", classes.date)}>
          <span>
            {convertWareki(date.createdAt.h01, date.createdAt.h02).warekiYear}
            {date.createdAt.h02}月{date.createdAt.h03}日
          </span>
        </div>
        <div className={classes.flexContainer}>
          <span>（　請　求　先　）</span>
        </div>
        <div className={classNames(classes.flexContainer, "space-between")}>
          <div className={classes.city}>
            <span>{demand} 殿</span>
          </div>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td
                  rowSpan={5}
                  className={classNames("vertical", "middle", "borderBold")}
                >
                  <span>請求事業者</span>
                </td>
                <td className="label">指定事業所番号</td>
                <td className="llsize">{facility.c01}</td>
              </tr>
              <tr>
                <td className="label">
                  住所
                  <br />
                  （所在地）
                </td>
                <td className="llsize">
                  〒{facility.c02}
                  <br />
                  {facility.c03}
                </td>
              </tr>
              <tr>
                <td className="label">電話番号</td>
                <td className="llsize">{facility.c04}</td>
              </tr>
              <tr>
                <td className="label">名称</td>
                <td className="llsize">{facility.c05}</td>
              </tr>
              <tr>
                <td className="label">職・氏名</td>
                <td className="llsize">{facility.c06}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classNames(classes.flexContainer, classes.note)}>
          <span>下記のとおり請求します。</span>
        </div>
        <div className={classes.flexContainer}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td>{billDate.era}</td>
                <td>{billDate.year}</td>
                <td>年</td>
                <td>{date.bill.r02}</td>
                <td>月分</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.flexContainer}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className="label">請求金額</td>
                <td className="msize prise">{bill.r03}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.flexContainer}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td colSpan={3} className="label borderBold">
                  区分
                </td>
                <td className="label">件数</td>
                <td className="label">単位数</td>
                <td className="label">費用合計</td>
                <td className="label">
                  給付費
                  <br />
                  請求額
                </td>
                <td className="label">
                  利用者
                  <br />
                  負担額
                </td>
                <td className="label">
                  自治体
                  <br />
                  助成額
                </td>
              </tr>
              {this.medicalPaymentCost(bill)}
              {this.trainingPaymentCost(bill)}
              {this.SupportPaymentCost()}
              <tr>
                <td colSpan={3} className="label borderBold">
                  小計
                </td>
                <td className="msize prise">{bill.subTotal.s02}</td>
                <td className="msize prise">{bill.subTotal.s03}</td>
                <td className="msize prise">{bill.subTotal.s04}</td>
                <td className="msize prise">{bill.subTotal.s05}</td>
                <td className="msize prise">{bill.subTotal.s06}</td>
                <td className="msize prise">{bill.subTotal.s07}</td>
              </tr>
              <tr>
                <td colSpan={3} className="label borderBold">
                  特定障害者特別給付費
                </td>
                <td className="msize prise">{bill.specialHandicapped.h02}</td>
                <td />
                <td className="msize prise">{bill.specialHandicapped.h04}</td>
                <td className="msize prise">{bill.specialHandicapped.h05}</td>
                <td />
                <td className="msize prise">{bill.specialHandicapped.h07}</td>
              </tr>
              <tr>
                <td colSpan={3} className="label borderBold">
                  合計
                </td>
                <td className="msize prise">{bill.total.w02}</td>
                <td className="msize prise">{bill.total.w03}</td>
                <td className="msize prise">{bill.total.w04}</td>
                <td className="msize prise">{bill.total.w05}</td>
                <td className="msize prise">{bill.total.w06}</td>
                <td className="msize prise">{bill.total.w07}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  public medicalPaymentCost = (bill: SummaryByCityBill) => {
    const typeServices = bill.typeServices.filter(typeService => {
      return DISPLAY_INVOICE_SUMMARY_CITY_BILL_KAIGO_KYUHU.includes(
        typeService.t01
      );
    });
    const emptyList = [
      ...Array(typeServices.length >= 7 ? 0 : 7 - typeServices.length).fill(
        undefined
      )
    ];
    const items = [...typeServices, ...emptyList];
    return (
      <React.Fragment>
        {items.map((item, index) => (
          <tr key={index}>
            {index === 0 ? (
              <td
                rowSpan={items.length}
                colSpan={2}
                className="label vertical"
                style={{ height: 175, padding: 0 }}
              >
                <span>介護給付費</span>
              </td>
            ) : null}
            <td className="llsize borderBold label">{item ? item.t01 : ""}</td>
            <td className="msize prise">{item ? item.t02 : ""}</td>
            <td className="msize prise">{item ? item.t03 : ""}</td>
            <td className="msize prise">{item ? item.t04 : ""}</td>
            <td className="msize prise">{item ? item.t05 : ""}</td>
            <td className="msize prise">{item ? item.t06 : ""}</td>
            <td className="msize prise">{item ? item.t07 : ""}</td>
          </tr>
        ))}
      </React.Fragment>
    );
  };

  public trainingPaymentCost = (bill: SummaryByCityBill) => {
    const typeServices = bill.typeServices.filter(typeService => {
      return DISPLAY_INVOICE_SUMMARY_CITY_BILL_KUNREN_KYUHU.includes(
        typeService.t01
      );
    });
    const emptyList = [
      ...Array(typeServices.length >= 4 ? 0 : 4 - typeServices.length).fill(
        undefined
      )
    ];
    const items = [...typeServices, ...emptyList];
    return (
      <React.Fragment>
        {items.map((item, index) => (
          <tr key={index}>
            {index === 0 ? (
              <td
                rowSpan={items.length}
                colSpan={2}
                className="label vertical"
                style={{ height: 100, padding: 0 }}
              >
                <span>訓練等給付費</span>
              </td>
            ) : null}
            <td className="llsize borderBold label">{item ? item.t01 : ""}</td>
            <td className="msize prise">{item ? item.t02 : ""}</td>
            <td className="msize prise">{item ? item.t03 : ""}</td>
            <td className="msize prise">{item ? item.t04 : ""}</td>
            <td className="msize prise">{item ? item.t05 : ""}</td>
            <td className="msize prise">{item ? item.t06 : ""}</td>
            <td className="msize prise">{item ? item.t07 : ""}</td>
          </tr>
        ))}
      </React.Fragment>
    );
  };

  public SupportPaymentCost = () => {
    const items = [...Array(2).fill(undefined)];
    return (
      <React.Fragment>
        {items.map((item, index) => (
          <tr key={index}>
            {index === 0 ? (
              <td
                rowSpan={2}
                className="label vertical"
                style={{ height: 50, padding: 0, borderRight: "none" }}
              >
                <span>地域相談</span>
              </td>
            ) : null}
            {index === 0 ? (
              <td
                rowSpan={2}
                className="label vertical"
                style={{ height: 50, padding: 0 }}
              >
                <span>支援給付費</span>
              </td>
            ) : null}
            <td className="llsize borderBold" />
            <td className="msize prise" />
            <td className="msize prise" />
            <td className="msize prise" />
            <td className="msize prise" />
            <td className="msize prise" />
            <td className="msize prise" />
          </tr>
        ))}
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(InvoiceSummaryCity);
