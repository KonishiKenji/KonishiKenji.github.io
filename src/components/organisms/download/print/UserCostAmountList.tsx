import * as React from "react";
import { convertWareki } from "@utils/date";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  InvoiceCostAmountListData,
  InvoiceCostAmountListUsers
} from "@stores/domain/invoice/type";

import {
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

const styles = createStyles({
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
    "&.fullWidth": {
      width: "100%"
    },
    "& td": {
      padding: "3px 7px",
      borderRight: "1px solid",
      fontSize: 10,
      letterSpacing: 0.6,
      color: "rgba(0, 0, 0, 0.84)",
      height: 25,
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
      },
      "&.borderBoldTop": {
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
  date: {
    fontSize: 11
  },
  city: {
    fontSize: 14,
    marginTop: 80,
    maxWidth: 250
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

interface Props extends WithStyles<typeof styles> {
  userCostAmount: InvoiceCostAmountListData;
}

class UserCostAmountList extends React.Component<Props> {
  public render() {
    const { classes, userCostAmount } = this.props;

    return (
      <React.Fragment>
        {Object.keys(userCostAmount).length > 0 && (
          <Sheet classes={classes} userCostAmount={userCostAmount} />
        )}
      </React.Fragment>
    );
  }
}

const MAX_ROW = 4;

const Sheet = (props: Props) => {
  const { classes, userCostAmount } = props;
  const { date, facility, bill_contents } = userCostAmount;
  const { createdAt, bill } = date;
  return (
    <React.Fragment>
      {bill_contents.map(
        ({ uplimit_facility_number, uplimit_facility_name, users }) => {
          const maxPage = Math.ceil(users.length / MAX_ROW);
          const emptyPages = Array(maxPage).fill(undefined);
          return emptyPages.map((_, page: number) => (
            <section
              key={`${uplimit_facility_number}_${page}`}
              className={classes.page}
            >
              <header>
                <h1 className={classes.title}>利用者負担額一覧表</h1>
              </header>
              <div className={`${classes.flexContainer} end`}>
                <span>
                  {convertWareki(createdAt.year, createdAt.month).warekiYear}
                  {createdAt.month}月{createdAt.day}日
                </span>
              </div>
              <div className={classes.flexContainer}>
                <span>（　請　求　先　）</span>
              </div>
              <div className={`${classes.flexContainer} space-between`}>
                <div className={classes.city}>
                  <span>{uplimit_facility_name} 殿</span>
                </div>
                <table className={`${classes.table}`}>
                  <tbody>
                    <tr>
                      <td rowSpan={4} className="vertical middle">
                        <span>事業者</span>
                      </td>
                      <td className="label">指定事業所番号</td>
                      <td className="llsize">{facility.gov_facility_number}</td>
                    </tr>
                    <tr>
                      <td className="label">
                        住所
                        <br />
                        （所在地）
                      </td>
                      <td className="llsize">
                        〒{facility.postal_code}
                        <br />
                        {facility.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">電話番号</td>
                      <td className="llsize">{facility.tel}</td>
                    </tr>
                    <tr>
                      <td className="label">名称</td>
                      <td className="llsize">{facility.gov_business_owner}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={`${classes.flexContainer} ${classes.note}`}>
                <span>下記のとおり請求します。</span>
              </div>
              <div className={classes.flexContainer}>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td>{convertWareki(bill.year, bill.month).era}</td>
                      <td>{convertWareki(bill.year, bill.month).year}</td>
                      <td>年</td>
                      <td>{bill.month}</td>
                      <td>月分</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={classes.flexContainer}>
                <table className={`${classes.table} fullWidth`}>
                  <tbody>
                    <tr className="borderBold">
                      <td className="label borderBold">項番</td>
                      <td colSpan={7} className="label">
                        支給決定障害者等欄
                      </td>
                    </tr>
                    <UsersList
                      users={users.slice(
                        page * MAX_ROW,
                        page * MAX_ROW + MAX_ROW
                      )}
                      classes={classes}
                    />
                  </tbody>
                </table>
              </div>
            </section>
          ));
        }
      )}
    </React.Fragment>
  );
};

const UsersList = (props: any) => {
  let users = [...props.users];
  if (users.length < MAX_ROW) {
    users = users.concat(Array(MAX_ROW - users.length).fill(undefined));
  }
  return (
    <React.Fragment>
      {users.map((user: InvoiceCostAmountListUsers, index: number) => (
        <React.Fragment key={index}>
          <tr className="borderBoldTop">
            <td rowSpan={3} className="label borderBold">
              {user ? user.index : ""}
            </td>
            <td className="label borderBold">市町村番号</td>
            <td className="borderBold">{user ? user.city_code : ""}</td>
            <td className="label borderBold">総費用額</td>
            <td className="borderBold prise">{user ? user.total_cost : ""}</td>
            <td rowSpan={3} className="label borderBold">
              提供
              <br />
              サービス
            </td>
            <td>
              {user && user.services[0] ? user.services[0].type_service : ""}
            </td>
            <td>
              {user && user.services[0] ? user.services[0].service_name : ""}
            </td>
          </tr>
          <tr>
            <td className="label borderBold">受給者証番号</td>
            <td className="borderBold">{user ? user.recipient_number : ""}</td>
            <td className="label borderBold">利用者負担額</td>
            <td className="borderBold prise">{user ? user.user_cost : ""}</td>
            <td>
              {user && user.services[1] ? user.services[1].type_service : ""}
            </td>
            <td>
              {user && user.services[1] ? user.services[1].service_name : ""}
            </td>
          </tr>
          <tr>
            <td className="label borderBold">氏名</td>
            <td className="msize borderBold">{user ? user.name : ""}</td>
            <td className="label borderBold">社会福祉法人等軽減額</td>
            <td className="borderBold" />
            <td>
              {user && user.services[2] ? user.services[2].type_service : ""}
            </td>
            <td>
              {user && user.services[2] ? user.services[2].service_name : ""}
            </td>
          </tr>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default withStyles(styles)(UserCostAmountList);
