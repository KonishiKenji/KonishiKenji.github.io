import * as React from "react";

import { convertWareki } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import { getUrlParams } from "@utils/url";

import { SummaryByMonth } from "@stores/domain/invoice/type";
import { previewHOC, InjectProps, TableRowStartEndIndice } from "./previewHOC";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

const TABLE_HEAD_HEIGHT = 20;

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
    invoiceContainer: {
      marginBottom: 32
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
        },
        "&.totalAmountLabel": {
          fontSize: 14
        },
        "&.totalAmount": {
          fontSize: 18
        }
      },
      "& tr": {
        borderBottom: "1px solid",
        "&.borderBold": {
          borderTop: "2px solid"
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

interface Props extends WithStyles<typeof styles>, InjectProps {
  data: SummaryByMonth;
}

class InvoiceSummaryTotal extends React.Component<Props> {
  public render() {
    const { data, setHeaderRef, setTableRowRef, classes } = this.props;
    const { detail } = data;

    const tableRowStartEndIndicesInSheet =
      this.props.tableRowStartEndIndicesInSheet.length > 0
        ? this.props.tableRowStartEndIndicesInSheet
        : [
            {
              startIndex: 0,
              endIndex: detail.length + 1 // 1 => 合計行
            }
          ];

    return (
      <React.Fragment>
        {tableRowStartEndIndicesInSheet.map(tableRowStartEndIndexInSheet => (
          <Sheet
            key={tableRowStartEndIndexInSheet.startIndex}
            classes={classes}
            summary={data}
            setHeaderRef={setHeaderRef}
            setTableRowRef={setTableRowRef}
            tableRowStartEndIndexInSheet={tableRowStartEndIndexInSheet}
          />
        ))}
      </React.Fragment>
    );
  }
}

interface SheetProps extends WithStyles<typeof styles> {
  summary: SummaryByMonth;
  setHeaderRef: (headerElement: HTMLElement | null) => void;
  setTableRowRef: (tableRowElement: HTMLElement | null, index: number) => void;
  tableRowStartEndIndexInSheet: TableRowStartEndIndice;
}

const Sheet: React.SFC<SheetProps> = props => {
  const {
    classes,
    summary,
    setHeaderRef,
    setTableRowRef,
    tableRowStartEndIndexInSheet
  } = props;
  const { totalInvoiceAmount, date, facility, detail, total } = summary;
  const { startIndex, endIndex } = tableRowStartEndIndexInSheet;
  const totalRowIndex = detail.length;

  return (
    <section className={classes.page}>
      {startIndex === 0 ? (
        <div ref={headerElement => setHeaderRef(headerElement)}>
          <header>
            <h1 className={classes.title}>給付費請求サマリ</h1>
          </header>
          <div className={`${classes.flexContainer} ${classes.note}`}>
            <span>
              対象請求月：
              {convertWareki(date.year, date.month).warekiYear}
              {date.month}月分
            </span>
          </div>
          <div className={classes.note}>
            <span>事業所情報</span>
          </div>
          <div className={classes.flexContainer}>
            <table className={`${classes.table} fullWidth`}>
              <tbody>
                <tr>
                  <td className="label ssize">事業所番号</td>
                  <td>{facility.c01}</td>
                </tr>
                <tr>
                  <td className="label ssize">事業所名</td>
                  <td>{facility.c02}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`${classes.flexContainer} ${classes.invoiceContainer}`}
          >
            <table className={`${classes.table} fullWidth`}>
              <tbody>
                <tr>
                  <td className="label totalAmountLabel msize">請求合計金額</td>
                  <td className="totalAmount">{totalInvoiceAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.note}>
            <span>請求詳細情報</span>
          </div>
        </div>
      ) : null}
      <div className={classes.flexContainer}>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr style={{ height: TABLE_HEAD_HEIGHT }}>
              <td className="sssize label">No.</td>
              <td className="lsize label">請求先</td>
              <td className="sssize label">件数</td>
              <td className="ssize label">費用合計</td>
              <td className="ssize label">給付費請求額</td>
              <td className="ssize label">利用者負担額</td>
              <td className="ssize label">自治体助成額</td>
            </tr>
            {detail.map((d, index) => {
              if (index < startIndex || index > endIndex) return undefined;
              return (
                <tr
                  id={`i${index}`}
                  key={index}
                  ref={tableRowElement =>
                    setTableRowRef(tableRowElement, index)
                  }
                >
                  <td className="label">{index + 1}</td>
                  <td>{d.municipalityName}</td>
                  <td className="prise">{d.count}</td>
                  <td className="prise">{d.amount}</td>
                  <td className="prise">{d.benefitCostsClaim}</td>
                  <td className="prise">{d.userBurden}</td>
                  <td className="prise">{d.municipalitySubsidy}</td>
                </tr>
              );
            })}
            {totalRowIndex < startIndex || detail.length > endIndex ? null : (
              <tr
                ref={tableRowElement =>
                  setTableRowRef(tableRowElement, totalRowIndex)
                }
                className="borderBold"
              >
                <td className="label" colSpan={2}>
                  合計
                </td>
                <td className="prise">{total.count}</td>
                <td className="prise">{total.amount}</td>
                <td className="prise">{total.benefitCostsClaim}</td>
                <td className="prise">{total.userBurden}</td>
                <td className="prise">{total.municipalitySubsidy}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default withStyles(styles)(
  previewHOC({
    printPageHeight: PRINT_PAGE_HEIGHT,
    tableHeadHeight: TABLE_HEAD_HEIGHT
  })(InvoiceSummaryTotal)
);
