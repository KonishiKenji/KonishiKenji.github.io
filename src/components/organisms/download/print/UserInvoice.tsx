import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { InvoiceUserSeikyuData } from "@stores/domain/invoice/type";

// import { getUserInvoice } from "../../actions/api/invoice";
// import { RESPONSE_USER_INVOICE } from "../../constants/api/invoice";
// import { dateToLocalisedString } from "@utils/date";
import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";
import HeaderImage from "@images/list_header.png";

const styles = (theme: Theme) =>
  createStyles({
    section: {
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
    wrap: {
      flexWrap: "nowrap"
    },
    subContainer: {
      marginBottom: 8
    },
    container: {
      marginBottom: 16
    },
    leftContainer: {
      paddingRight: 40
    },
    rightContainer: {
      "& > div > div:first-child": {
        marginBottom: 5
      }
    },
    tableTitle: {
      width: "100%",
      height: 32
    },
    imageContainer: {
      height: 32,
      margin: 0
    },
    tableRow: {
      display: "table",
      width: "100%",
      minHeight: 32,
      position: "relative"
    },
    image: {
      height: "100%",
      width: "100%",
      "&.background": {
        position: "absolute"
      }
    },
    imageText: {
      position: "relative",
      zIndex: 10,
      display: "table-cell",
      fontSize: 14,
      letterSpacing: 0.6,
      padding: "6px 8px",
      boxSizing: "border-box",
      "&.bold": {
        fontWeight: "bold"
      },
      "&.service": {
        paddingLeft: 16,
        width: "61%"
      },
      "&.units": {
        width: "13%"
      },
      "&.times": {
        width: "12%"
      },
      "&.subTotalUnits": {
        width: "86%",
        paddingRight: 100,
        textAlign: "right"
      }
    },
    title: {
      margin: 0,
      fontWeight: "normal",
      letterSpacing: 1.4,
      textAlign: "center"
    },
    caption: {
      fontSize: 12,
      letterSpacing: 0.6,
      textAlign: "right",
      "&.small": {
        fontSize: 10,
        color: "rgba(0, 0, 0, 0.5)"
      }
    },
    emphasizeText: {
      borderBottom: "1px solid #778899"
    },
    labelText: {
      fontSize: 12,
      letterSpacing: 0.6,
      color: "#000000",
      "&.middle": {
        fontSize: 14,
        letterSpacing: 0.8
      },
      "&.large": {
        fontSize: 16,
        letterSpacing: 0.8
      },
      "&.strong": {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.8
      },
      "&.bold": {
        fontWeight: "bold"
      }
    },
    valueText: {
      fontSize: 14,
      letterSpacing: 0.7,
      "&.large": {
        fontSize: 16
      },
      "&.right": {
        textAlign: "right"
      },
      "&.strong": {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.8
      },
      "& > .honorific": {
        fontSize: 14
      }
    },
    explanation: {
      marginBottom: 16,
      fontSize: 12,
      letterSpacing: 0.6
    },
    table: {
      marginBottom: 8
    },
    tbody: {
      "&:nth-child(2n)": {
        backgroundColor: "#fff"
      },
      "&:nth-child(2n + 1)": {
        backgroundColor: "rgba(119, 136, 153, 0.2)"
      }
    },
    cell: {
      height: 20
    },
    "@media print": {
      section: {
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

const MIN_ROWS = 13;

interface Props extends WithStyles<typeof styles> {
  key: number;
  data: InvoiceUserSeikyuData;
  targetDate: string;
}

class UserInvoice extends React.Component<Props> {
  public render() {
    const { classes, data, key, targetDate } = this.props;

    if (!data) {
      return null;
    }
    const { date, facility, users } = data;

    return (
      <React.Fragment key={key}>
        {users.map((user, idx) => (
          <section key={idx} className={classes.section}>
            <header className={classes.container}>
              <h1 className={classes.title}>請求書</h1>
            </header>
            <div className={`${classes.container} ${classes.caption}`}>
              請求日：
              {targetDate}
            </div>
            <Grid container={true} className={classes.container}>
              <Grid item={true} xs={6}>
                <div className={classes.leftContainer}>
                  <div
                    className={`${classes.emphasizeText} ${classes.subContainer}`}
                  >
                    <div className={`${classes.valueText} large`}>
                      {user.name_sei}
                      {user.name_mei}
                      <span className="honorific"> 様</span>
                    </div>
                  </div>
                  <div
                    className={`${classes.emphasizeText} ${classes.subContainer}`}
                  >
                    <div className={classes.labelText}>受給者番号</div>
                    <div className={`${classes.valueText} large`}>
                      {user.recipient_number || "-"}
                    </div>
                  </div>
                  <div
                    className={`${classes.explanation} ${classes.subContainer}`}
                  >
                    以下の通りご請求申し上げます。
                  </div>
                  <div className={classes.emphasizeText}>
                    <Grid container={true}>
                      <Grid item={true} xs={6}>
                        <div className={`${classes.labelText} strong`}>
                          請求合計金額
                        </div>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <div className={`${classes.valueText} right strong`}>
                          ¥ {user.billing_amount}-
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
              <Grid item={true} xs={6}>
                <div className={classes.rightContainer}>
                  <div className={classes.subContainer}>
                    <div className={classes.labelText}>事務所種別</div>
                    <div className={classes.valueText}>
                      {facility.type_service}
                    </div>
                  </div>
                  <div className={classes.subContainer}>
                    <div className={classes.labelText}>法人名</div>
                    <div className={classes.valueText}>
                      {facility.gov_business_owner}
                    </div>
                  </div>
                  <div className={classes.subContainer}>
                    <div className={classes.labelText}>事務所名</div>
                    <div className={classes.valueText}>{facility.name}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className={classes.container}>
              <div
                className={`${classes.subContainer} ${classes.emphasizeText}`}
              >
                <Grid container={true} alignItems="center">
                  <Grid item={true} xs={6}>
                    <div className={`${classes.labelText} large bold`}>
                      請求明細
                    </div>
                  </Grid>
                  <Grid item={true} xs={6}>
                    <div className={classes.caption}>
                      利用期間：
                      {date.start_of_month} 〜 {date.end_of_month}
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.table}>
                <div className={classes.imageContainer}>
                  <img
                    alt="headerImage"
                    className={classes.image}
                    src={HeaderImage}
                  />
                </div>
                {user.service_contents.map((content, rowIndex) => (
                  <div key={rowIndex} className={classes.tableRow}>
                    {rowIndex % 2 === 1 ? (
                      <img
                        alt="bodyRowImage"
                        className={`${classes.image} background`}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMs75hpDAAE4wHNINJxKAAAAABJRU5ErkJggg=="
                      />
                    ) : null}
                    <div className={`${classes.imageText} service`}>
                      {content.service_name}
                    </div>
                    <div className={`${classes.imageText} units`}>
                      {content.units}
                    </div>
                    <div className={`${classes.imageText} times`}>
                      {content.times}
                    </div>
                    <div className={`${classes.imageText} totalUnit`}>
                      {content.service_unit}
                    </div>
                  </div>
                ))}
                {MIN_ROWS - user.service_contents.length > 0 &&
                  [
                    ...Array<number>(
                      MIN_ROWS - user.service_contents.length
                    ).fill(0)
                  ].map((val: number, k: number) => (
                    <div
                      key={user.service_contents.length + k}
                      className={classes.imageContainer}
                    >
                      {(user.service_contents.length + k) % 2 === 1 ? (
                        <img
                          alt="bodyRowImage"
                          className={classes.image}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMs75hpDAAE4wHNINJxKAAAAABJRU5ErkJggg=="
                        />
                      ) : null}
                    </div>
                  ))}
                {Math.max(MIN_ROWS, user.service_contents.length) % 2 === 0 ? (
                  <div className={classes.imageContainer} />
                ) : null}
                <div className={classes.tableRow}>
                  <img
                    alt="bodyRowImage"
                    className={`${classes.image} background`}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMs75hpDAAE4wHNINJxKAAAAABJRU5ErkJggg=="
                  />
                  <div className={`${classes.imageText} subTotalUnits bold`}>
                    単位小計
                  </div>
                  <div className={`${classes.imageText} totalUnit`}>
                    {user.subtotal_unit}
                  </div>
                </div>
              </div>
              <div className={`${classes.caption} small`}>
                ※ {facility.unit_per_yen}
                円／単位 (1円未満の端数は切り捨て)
              </div>
            </div>
            <div className={classes.container}>
              <Grid container={true} justify="flex-end" spacing={8}>
                <Grid item={true} xs={4} className={classes.emphasizeText}>
                  <div className={`${classes.labelText} middle bold`}>
                    サービス費用算定合計金額
                  </div>
                </Grid>
                <Grid item={true} xs={2} className={classes.emphasizeText}>
                  <div className={`${classes.valueText} right`}>
                    ¥ {user.subtotal_yen}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.container}>
              <Grid container={true} justify="flex-end" spacing={8}>
                <Grid item={true} xs={4} className={classes.emphasizeText}>
                  <div className={`${classes.labelText}  middle bold`}>
                    給付費
                  </div>
                </Grid>
                <Grid item={true} xs={2} className={classes.emphasizeText}>
                  <div className={`${classes.valueText} right`}>
                    -¥ {user.payment_cost}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.container}>
              <Grid container={true} justify="flex-end" spacing={8}>
                <Grid item={true} xs={4} className={classes.emphasizeText}>
                  <div className={`${classes.labelText} middle bold`}>
                    自治体助成金額
                  </div>
                </Grid>
                <Grid item={true} xs={2} className={classes.emphasizeText}>
                  <div className={`${classes.valueText} right`}>
                    -¥ {user.grant_amount}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.container}>
              <Grid container={true} justify="flex-end" spacing={8}>
                <Grid item={true} xs={4} className={classes.emphasizeText}>
                  <div className={`${classes.labelText} middle bold`}>
                    利用者負担合計金額
                  </div>
                </Grid>
                <Grid item={true} xs={2} className={classes.emphasizeText}>
                  <div className={`${classes.valueText} right`}>
                    ¥ {user.billing_amount}
                  </div>
                </Grid>
              </Grid>
            </div>
          </section>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserInvoice);
