import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, withStyles } from "@material-ui/core";
import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { dateToLocalisedString } from "@utils/date";
import {
  InvoiceUserReceiptData,
  InvoiceUserReceiptDataUser
} from "@stores/domain/invoice/type";
import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

const styles = (): StyleRules =>
  createStyles({
    body: {
      height: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: PRINT_PAGE_PADDING,
      paddingBottom: 31,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)"
    },
    page: {
      // TODO: (PRINT_PAGE_HEIGHT - PRINT_PAGE_PADDING) / 2
      //       そのままだと印刷ページが2枚になるので後で調整
      // height: (PRINT_PAGE_HEIGHT - PRINT_PAGE_PADDING) / 2 - 50,
      paddingBottom: 31,
      "&:last-child": {
        paddingTop: PRINT_PAGE_PADDING,
        paddingBottom: 0
      }
    },
    divider: {
      height: 1,
      width: "100%",
      borderBottom: "1px dashed #778899"
    },
    title: {
      margin: 0,
      fontSize: 30,
      fontWeight: "normal",
      letterSpacing: 1.4,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.84)"
    },
    caption: {
      fontSize: 14,
      letterSpacing: 0.6,
      textAlign: "right",
      color: "rgba(0, 0, 0, 0.84)"
    },
    subContainer: {
      marginTop: 8
    },
    container: {
      marginTop: 16
    },
    dateContainer: {
      marginTop: 18
    },
    userContainer: {
      marginTop: 4
    },
    halfContainer: {
      "& > div": {
        marginBottom: 8,
        "&:last-child": {
          marginBottom: 0
        }
      }
    },
    imageContainer: {
      position: "relative",
      marginTop: 16
    },
    image: {
      height: 54,
      width: "100%"
    },
    imageText: {
      position: "absolute",
      "&.before": {
        top: 16,
        left: 24
      },
      "&.after": {
        bottom: 16,
        right: 24
      }
    },
    emphasizeText: {
      borderBottom: "1px solid #778899"
    },
    labelText: {
      fontSize: 14,
      letterSpacing: 0.6,
      color: "#000000",
      opacity: 0.6,
      "&.small": {
        fontSize: 12
      },
      "&.strong": {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: "rgba(0, 0, 0, 0.84)"
      }
    },
    valueText: {
      fontSize: 18,
      letterSpacing: 0.7,
      color: "rgba(0, 0, 0, 0.84)",
      "&.small": {
        fontSize: 14
      },
      "&.right": {
        textAlign: "right"
      },
      "&.strong": {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: "rgba(0, 0, 0, 0.84)"
      },
      "& > .honorific": {
        fontSize: 16
      }
    },
    note: {
      fontSize: 12,
      letterSpacing: 0.4,
      textAlign: "left",
      color: "rgba(0, 0, 0, 0.84)"
    },
    "@media print": {
      body: {
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
  data: InvoiceUserReceiptData;
  targetDate: string;
  noticeDate: string;
}
class PreviewUserAgencyReceipts extends React.Component<Props> {
  public receiptRender(
    user: InvoiceUserReceiptDataUser,
    copy = false
  ): JSX.Element {
    const { classes, data, targetDate, noticeDate } = this.props;
    const { date, facility } = data;

    return (
      <section className={classes.page}>
        <header>
          <h1 className={classes.title}>
            代理受領額通知書
            {copy ? <span>(控え)</span> : null}
          </h1>
        </header>
        <div className={`${classes.caption} ${classes.dateContainer}`}>
          <div>
            受領日：
            {targetDate}
          </div>
          <div>
            通知日：
            {noticeDate}
          </div>
        </div>
        <div className={classes.userContainer}>
          <div className={classes.emphasizeText}>
            <div className={classes.valueText}>
              {user.name_sei}
              {user.name_mei}
              <span className="honorific"> 様</span>
            </div>
          </div>
          <div className={`${classes.emphasizeText} ${classes.subContainer}`}>
            <div className={`${classes.labelText} small`}>受給者証番号</div>
            <div className={classes.valueText}>
              {user.recipient_number || ""}
            </div>
          </div>
          <div className={`${classes.emphasizeText} ${classes.subContainer}`}>
            <div className={`${classes.labelText} small`}>支給元市区町村</div>
            <div className={classes.valueText}>{user.city_name || ""}</div>
          </div>
          <div className={classes.imageContainer}>
            <img
              alt="backgroundImage"
              className={classes.image}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMs75hpDAAE4wHNINJxKAAAAABJRU5ErkJggg=="
            />
            <div
              className={`${classes.labelText} ${classes.imageText} before strong`}
            >
              受領金額
            </div>
            <div
              className={`${classes.valueText} ${classes.imageText} after strong right`}
            >
              {`¥ ${user.payment_cost_amount}-`}
            </div>
          </div>
        </div>
        <Grid container className={classes.container}>
          <Grid item xs={5}>
            <div className={classes.note}>
              但し、
              {dateToLocalisedString(date.start_of_month, "YYYY年M月分")}
              のサービス利用代として
              <br />
              上記正に受領いたしました。
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className={classes.halfContainer}>
              <div>
                <div className={classes.labelText}>事業所種別</div>
                <div className={`${classes.valueText} small`}>
                  {facility.type_service}
                </div>
              </div>
              <div>
                <div className={classes.labelText}>法人名</div>
                <div className={`${classes.valueText} small`}>
                  {facility.gov_business_owner}
                </div>
              </div>
              <div>
                <div className={classes.labelText}>事業所名</div>
                <div className={`${classes.valueText} small`}>
                  {facility.name}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }

  public render(): JSX.Element | null {
    const { classes, data, key } = this.props;
    if (!data) {
      return null;
    }
    const { users } = data;

    return (
      <React.Fragment key={key}>
        {users.map((user) => (
          <div key={user.recipient_number} className={classes.body}>
            {this.receiptRender(user, false)}
            <div className={classes.divider} />
            {this.receiptRender(user, true)}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PreviewUserAgencyReceipts);
