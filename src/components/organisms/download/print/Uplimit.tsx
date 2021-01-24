import * as React from "react";
import { convertWareki } from "@utils/date";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  InvoiceUplimitData,
  InvoiceUplimtUsers,
  InvoiceUplimitFacilities
} from "@stores/domain/invoice/type";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

const styles = createStyles({
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
    "&.wide": {
      width: "100%"
    },
    "&  td": {
      padding: "3px 4px",
      borderRight: "1px solid",
      fontSize: 11,
      letterSpacing: 0.6,
      color: "rgba(0, 0, 0, 0.84)",
      wordBreak: "break-all",
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
        width: 90
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
        width: 18,
        "& > span": {
          writingMode: "vertical-rl"
        }
      },
      "&.total": {
        textAlign: "center"
      },
      "&.borderBold": {
        borderRight: "2px solid"
      },
      "&.borderBoldLeft": {
        borderLeft: "2px solid"
      }
    },
    "&  tr": {
      borderBottom: "1px solid",
      "&.borderBold": {
        borderBottom: "2px solid"
      }
    },
    "&.concat, &.concat tr:last-child": {
      borderBottom: "none"
    }
  },
  title: {
    margin: "0 0 10px 0",
    fontWeight: "normal",
    letterSpacing: 1.2,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.84)"
  },
  note: {
    margin: 0,
    padding: "8px 35px",
    border: "2px solid",
    listStyle: "none",
    fontSize: 11,
    letterSpacing: 0.6
  },
  signature: {
    paddingLeft: 350,
    fontSize: 11,
    letterSpacing: 0.6,
    "& > p.date": {
      paddingLeft: 10,
      fontSize: 9
    },
    "& > p.name": {
      paddingLeft: 30,
      fontSize: 12
    }
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
  uplimitResults: InvoiceUplimitData[];
}

class Uplimit extends React.Component<Props> {
  public render() {
    const { classes, uplimitResults } = this.props;

    return (
      <React.Fragment>
        {Object.keys(uplimitResults).length > 0 && (
          <Sheet classes={classes} uplimitResults={uplimitResults} />
        )}
      </React.Fragment>
    );
  }
}

const Sheet = (props: Props) => {
  const { classes, uplimitResults } = props;

  return (
    <React.Fragment>
      {uplimitResults.map(({ date, facility, users }) => {
        return users.map((user: InvoiceUplimtUsers, index: number) => (
          <section key={index} className={classes.page}>
            <header>
              <h1 className={classes.title}>利用者負担上限額管理結果票</h1>
            </header>
            <div className={`${classes.flexContainer} end`}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td>{convertWareki(date.year, date.month).era}</td>
                    <td>{convertWareki(date.year, date.month).year}</td>
                    <td>年</td>
                    <td>{date.month}</td>
                    <td>月分</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={`${classes.flexContainer} space-between`}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td className="label">市町村番号</td>
                    <td className="lsize">{user.city_code}</td>
                  </tr>
                  <tr>
                    <td className="label">受給者証番号</td>
                    <td className="lsize">{user.recipient_number}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      支給決定障害者等
                      <br />
                      氏名
                    </td>
                    <td className="lsize">{user.name}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      支給決定に係る
                      <br />
                      障害児氏名
                    </td>
                    <td className="lsize">{user.children_name}</td>
                  </tr>
                </tbody>
              </table>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td rowSpan={2} className="vertical small">
                      <span>管理事業者</span>
                    </td>
                    <td className="label">指定事業所番号</td>
                    <td className="llsize">{facility.gov_facility_number}</td>
                  </tr>
                  <tr>
                    <td className="label small">
                      事業所及び
                      <br />
                      その事業所
                      <br />
                      の名称
                    </td>
                    <td className="llsize">{facility.gov_business_owner}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.flexContainer}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td className="label">利用者負担上限月額</td>
                    <td className="msize prise">{user.income_kind}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.container}>
              <table className={`${classes.table} concat`}>
                <tbody>
                  <tr>
                    <td className="label">利用者負担上限額管理結果</td>
                    <td>{user.result_of_management}</td>
                  </tr>
                </tbody>
              </table>
              <ul className={classes.note}>
                <li>
                  1　管理事業所で利用者負担額を充当したため、他事業所の利用者負担は発生しない。
                </li>
                <li>
                  2　利用者負担額の合算額が、負担上限月額以下のため、調整事務は行わない。
                </li>
                <li>
                  3　利用者負担額の合算額が、負担上限月額を超過するため、下記のとおり調整した。
                </li>
              </ul>
            </div>
            <div className={classes.flexContainer}>
              <UplimitFacilitiesTable classes={classes} user={user} />
            </div>
            <div className={classes.flexContainer}>
              <UplimitFacilitiesTable
                classes={classes}
                user={user}
                summary={user.summary}
              />
            </div>
            <footer className={classes.signature}>
              <p>上記内容について確認しました。</p>
              <p className="date">　　　　年　　月　　日</p>
              <p className="name">支給決定障害者等氏名</p>
            </footer>
          </section>
        ));
      })}
    </React.Fragment>
  );
};

const UplimitFacilitiesTable = (props: any) => {
  const { classes, user, summary = null } = props;

  const uplimitFacilityRows = user.uplimitFacilities.reduce(
    (total: InvoiceUplimitFacilities, data: any) => {
      Object.keys(data).forEach(key => {
        if (!Array.isArray(total[key])) {
          total[key] = Array(9);
        }
        total[key][data.index - 1] = data[key];
      });
      return total;
    },
    {}
  );
  const startIndex = summary ? 5 : 0;
  const range = Array.from(Array(summary ? 4 : 5), (v, k) => startIndex + k);
  return (
    <table className={`${classes.table} wide`}>
      <tbody>
        <tr className="borderBold">
          <td rowSpan={6} className="vertical middle borderBold">
            <span>利用者負担額集計・調整欄</span>
          </td>
          <td className="label borderBold">項番</td>
          {range.map(index => (
            <td
              key={index}
              className={summary && index === 8 ? "ssize borderBold" : "ssize"}
            >
              {uplimitFacilityRows.index[index]}
            </td>
          ))}
          {summary ? (
            <td className="ssize total" rowSpan={3}>
              合計
            </td>
          ) : null}
        </tr>
        <tr>
          <td className="label borderBold">事業所番号</td>
          {range.map(index => (
            <td
              key={index}
              className={summary && index === 8 ? "borderBold" : ""}
            >
              {uplimitFacilityRows.uplimit_facility_number[index]}
            </td>
          ))}
        </tr>
        <tr>
          <td className="label borderBold">事業所名称</td>
          {range.map(index => (
            <td
              key={index}
              className={summary && index === 8 ? "borderBold" : ""}
            >
              {uplimitFacilityRows.uplimit_facility_name[index]}
            </td>
          ))}
        </tr>
        <tr>
          <td className="label borderBold">総費用額</td>
          {range.map(index => (
            <td key={index} className="prise">
              {uplimitFacilityRows.uplimit_total_yen[index]}
            </td>
          ))}
          {summary ? (
            <td className="prise borderBoldLeft">
              {summary.uplimit_total_yen}
            </td>
          ) : null}
        </tr>
        <tr className="borderBold">
          <td className="label borderBold">利用者負担額</td>
          {range.map(index => (
            <td key={index} className="prise">
              {uplimitFacilityRows.uplimit_user_load_yen[index]}
            </td>
          ))}
          {summary ? (
            <td className="prise borderBoldLeft">
              {summary.uplimit_user_load_yen}
            </td>
          ) : null}
        </tr>
        <tr>
          <td className="label borderBold">管理結果後利用者負担額</td>
          {range.map(index => (
            <td key={index} className="prise">
              {uplimitFacilityRows.uplimit_yen[index]}
            </td>
          ))}
          {summary ? (
            <td className="prise borderBoldLeft">{summary.uplimit_yen}</td>
          ) : null}
        </tr>
      </tbody>
    </table>
  );
};

export default withStyles(styles)(Uplimit);
