import * as React from "react";

import { dateToLocalisedString } from "@utils/date";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";

import { Theme } from "@material-ui/core/styles/createMuiTheme";

import {
  InvoiceUserReceiptData,
  InvoiceUserReceiptDataUser
} from "@stores/domain/invoice/type";

import Grid from "@material-ui/core/Grid";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

const styles = (theme: Theme) =>
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
      height: (PRINT_PAGE_HEIGHT - PRINT_PAGE_PADDING) / 2 - 50,
      "&:last-child": {
        paddingTop: PRINT_PAGE_PADDING
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
      marginTop: 24
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
      height: 56,
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
    chargeText: {
      padding: "16px 16px 10px"
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
}

class PreviewUserReceipts extends React.Component<Props> {
  public render() {
    const { classes, data } = this.props;
    const { users } = data;
    if (!data) return null;

    return (
      <React.Fragment>
        {users.map(user => (
          <div key={user.recipient_number} className={classes.body}>
            {this.receiptRender(user, false)}
            <div className={classes.divider} />
            {this.receiptRender(user, true)}
          </div>
        ))}
      </React.Fragment>
    );
  }

  public receiptRender(user: InvoiceUserReceiptDataUser, copy = false) {
    const { classes, data } = this.props;
    const { date, facility } = data;

    // 文字数に対するfont-sizeの調整値、最小を10pxとして、大まかに調整している
    const adjustFacilityFontSize =
      facility.name.length + facility.gov_business_owner.length <= 100
        ? 14
        : facility.name.length + facility.gov_business_owner.length <= 180
        ? 12
        : 10;

    return (
      <section className={classes.page}>
        <header>
          <h1 className={classes.title}>
            領収書
            {copy ? <span>(控え)</span> : null}
          </h1>
        </header>
        <div className={`${classes.caption} ${classes.dateContainer}`}>
          発行日：
          {this.props.targetDate}
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
              {user.recipient_number || "-"}
            </div>
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
              領収金額
            </div>
            <div
              className={`${classes.valueText} ${classes.imageText} after strong right`}
            >
              ¥ {user.user_cost_amount}-
            </div>
          </div>
        </div>
        <Grid container={true} className={classes.container}>
          <Grid item={true} xs={5}>
            <div className={classes.note}>
              但し、
              {dateToLocalisedString(date.start_of_month, "YYYY年M月分")}
              のサービス利用代として
              <br />
              上記正に領収いたしました。
            </div>
          </Grid>
          <Grid item={true} xs={7}>
            <div className={classes.halfContainer}>
              <div>
                <div
                  className={classes.labelText}
                  style={{ fontSize: adjustFacilityFontSize }}
                >
                  事業所種別
                </div>
                <div
                  className={`${classes.valueText} small`}
                  style={{ fontSize: adjustFacilityFontSize }}
                >
                  {facility.type_service}
                </div>
              </div>
              <div>
                <div
                  className={classes.labelText}
                  style={{ fontSize: adjustFacilityFontSize }}
                >
                  法人名
                </div>
                <div
                  className={`${classes.valueText} small`}
                  style={{ fontSize: adjustFacilityFontSize }}
                >
                  {facility.gov_business_owner}
                </div>
              </div>
              <div>
                <div
                  className={classes.labelText}
                  style={{ fontSize: adjustFacilityFontSize }}
                >
                  事業所名
                </div>
                <div
                  className={`${classes.valueText} small`}
                  style={{ fontSize: adjustFacilityFontSize }}
                >
                  {facility.name}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default withStyles(styles)(PreviewUserReceipts);
