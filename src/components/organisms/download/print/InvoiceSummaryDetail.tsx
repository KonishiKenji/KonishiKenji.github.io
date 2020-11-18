import * as React from "react";
import * as classNames from "classnames";

import { convertWareki } from "@utils/date";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import { getUrlParams } from "@utils/url";

import { SeikyuDetail, SeikyuDetailUser } from "@stores/domain/invoice/type";

const SERVICE_TYPE_MAX_ROW = 3;
const SERVICE_CONTENTS_MAX_ROW = 13;
const SUMMARIES_MAX_ROW = 4;

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

export const TABLE_HEAD_HEIGHT = 20;

const styles = (theme: Theme) => {
  return createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: `10px ${PRINT_PAGE_PADDING}px`,
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
      },
      "&.align-end": {
        alignItems: "flex-end"
      }
    },
    container: {
      marginBottom: 10
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
        padding: "0.5px 7px",
        borderRight: "1px solid",
        fontSize: 10,
        letterSpacing: 0.6,
        color: "rgba(0, 0, 0, 0.84)",
        height: 15,
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
        "&.borderDoubleTop": {
          borderTopStyle: "double"
        }
      }
    },
    title: {
      margin: 0,
      fontWeight: "normal",
      letterSpacing: 1.2,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.84)",
      fontSize: 13
    },
    subTitle: {
      margin: "0 0 10px 0",
      fontWeight: "normal",
      letterSpacing: 1.2,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.84)",
      fontSize: 11
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
};

// import { PRINT_PAGE_HEIGHT } from "@constants/styles";

interface Props extends WithStyles<typeof styles> {
  data: SeikyuDetail;
  user: SeikyuDetailUser;
}

/**
 * 請求明細書
 * 介護給付費・訓練等給付費等明細書　の印刷画面
 */
class InvoiceSummaryDetail extends React.Component<Props> {
  public render() {
    const { data, classes, user } = this.props;
    const { date, facility } = data;
    return (
      <React.Fragment>
        <section className={classes.page}>
          <header>
            <h1 className={classes.title}>介護給付費・訓練等給付費等明細書</h1>
            <h2 className={classes.subTitle}>
              （居宅介護、重度訪問介護、同行援護、行動援護、重度障害者等包括支援、短期入所、療養介護、
              <br />
              生活介護、施設入所支援、自立訓練、就労移行支援、就労継続支援、就労定着支援、自立生活援助）
            </h2>
          </header>
          <div className={classNames(classes.flexContainer, "space-between")}>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className="label">市町村番号</td>
                  <td className="msize">{user.m01}</td>
                </tr>
                <tr>
                  <td className="label">助成自治体番号</td>
                  <td className="msize">{user.m02}</td>
                </tr>
              </tbody>
            </table>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>{convertWareki(date.m03, date.m04).era}</td>
                  <td>{convertWareki(date.m03, date.m04).year}</td>
                  <td>年</td>
                  <td>{date.m04}</td>
                  <td>月分</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={classNames(
              classes.flexContainer,
              "space-between",
              "align-end"
            )}
          >
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className="label">受給者証番号</td>
                  <td className="msize">{user.m05}</td>
                </tr>
                <tr>
                  <td className="label">
                    支給決定障害者等
                    <br />
                    氏名
                  </td>
                  <td className="msize">{user.m06}</td>
                </tr>
                <tr>
                  <td className="label">
                    支給決定に係る
                    <br />
                    障害児氏名
                  </td>
                  <td className="msize">{user.m07}</td>
                </tr>
              </tbody>
            </table>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td
                    rowSpan={4}
                    className="label vertical"
                    style={{ height: 100, padding: 0 }}
                  >
                    <span>請求事業者</span>
                  </td>
                  <td colSpan={2} className="label">
                    指定事業所番号
                  </td>
                  <td colSpan={2}>{facility.m08}</td>
                </tr>
                <tr>
                  <td rowSpan={2} colSpan={2} className="label">
                    事業者及び
                    <br />
                    その事業所
                    <br />
                    の名称
                  </td>
                  <td colSpan={2} className="llsize" style={{ height: 50 }}>
                    {facility.m09}
                  </td>
                </tr>
                <tr>
                  <td className="label">地域区分</td>
                  <td>{facility.m10}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="label">
                    就労継続支援Ａ型事業者負担減免措置実施
                  </td>
                  <td>{facility.m11}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.flexContainer}>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className="label">利用者負担上限月額　①</td>
                  <td className="ssize prise borderBold">{user.m12}</td>
                  <td className="label">就労継続支援Ａ型減免対象者</td>
                  <td className="ssize">{user.m13}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.flexContainer}>
            <table className={`${classes.table} fullWidth`}>
              <tbody>
                <tr className="borderBold">
                  <td rowSpan={2} className="label msize borderBold">
                    利用者負担上限額
                    <br />
                    管理事業所
                  </td>
                  <td className="label msize">指定事業所番号</td>
                  <td className="msize borderBold">{user.m14}</td>
                  <td className="label ssize">管理結果</td>
                  <td className="borderBold">{user.m15}</td>
                  <td className="label ssize">管理結果額</td>
                  <td className="ssize prise">{user.m16}</td>
                </tr>
                <tr>
                  <td className="label">事業所名称</td>
                  <td colSpan={5}>{user.m17}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.flexContainer}>{this.serviceType(user)}</div>
          <div className={classes.flexContainer}>
            {this.serviceContents(user)}
          </div>
          <div className={classes.flexContainer}>{this.summaries(user)}</div>
          <div
            className={classNames(
              classes.flexContainer,
              "space-between",
              "align-end"
            )}
          >
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td rowSpan={2} className="label borderBold">
                    特定障害者特別給付費
                  </td>
                  <td className="label borderBold">算定日額</td>
                  <td className="label borderBold">日数</td>
                  <td className="label borderBold">給付費請求額</td>
                  <td className="label borderBold">実費算定額</td>
                </tr>
                <tr>
                  <td className="ssize borderBold">{user.h01}</td>
                  <td className="ssize borderBold">{user.h02}</td>
                  <td className="ssize borderBold">{user.h03}</td>
                  <td className="ssize borderBold">{user.h04}</td>
                </tr>
              </tbody>
            </table>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>1枚中</td>
                  <td>1枚目</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </React.Fragment>
    );
  }

  public serviceType = (user: SeikyuDetailUser) => {
    const { classes } = this.props;
    const emptyList = [
      ...Array(
        user.serviceTypes.length >= SERVICE_TYPE_MAX_ROW
          ? 0
          : SERVICE_TYPE_MAX_ROW - user.serviceTypes.length
      )
    ].fill(undefined);
    const serviceTypes = [...user.serviceTypes, ...emptyList];

    return (
      <React.Fragment>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            {serviceTypes.map((item, index) => (
              <tr key={index} className="borderBold">
                {index === 0 ? (
                  <td rowSpan={SERVICE_TYPE_MAX_ROW} className="label">
                    <span>サービス種別</span>
                  </td>
                ) : null}
                <td className="borderBold">{item ? item.s01 : ""}</td>
                <td className="label">開始年月日</td>
                <td className="borderBold">
                  {item && item.s02
                    ? `${convertWareki(item.s02, item.s03).warekiYear}${
                        item.s03
                      }月${item.s04}日`
                    : "    年  月  日"}
                </td>
                <td className="label">終了年月日</td>
                <td className="borderBold">
                  {item && item.s05
                    ? `${convertWareki(item.s05, item.s06).warekiYear}${
                        item.s06
                      }月${item.s07}日`
                    : "    年  月  日"}
                </td>
                <td className="label">利用日数</td>
                <td className="borderBold">{item ? item.s08 : ""}</td>
                <td className="label">入院日数</td>
                <td>{item ? item.s09 : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  public serviceContents = (user: SeikyuDetailUser) => {
    const { classes } = this.props;
    const emptyList = [
      ...Array(
        user.serviceContents.length >= SERVICE_CONTENTS_MAX_ROW
          ? 0
          : SERVICE_CONTENTS_MAX_ROW - user.serviceContents.length
      )
    ].fill(undefined);
    const serviceContents = [...user.serviceContents, ...emptyList];

    return (
      <React.Fragment>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr className="borderBold">
              <td
                rowSpan={SERVICE_CONTENTS_MAX_ROW + 1}
                className="label vertical borderBold"
                style={{ height: 100, padding: 0 }}
              >
                <span>給付費明細欄</span>
              </td>
              <td className="label borderBold">サービス内容</td>
              <td className="label borderBold">サービスコード</td>
              <td className="label borderBold">単位数</td>
              <td className="label borderBold">回数</td>
              <td className="label borderBold">サービス単位数</td>
              <td className="label borderBold">摘要</td>
            </tr>
            {serviceContents.map((item, index) => {
              if (index >= SERVICE_CONTENTS_MAX_ROW) return undefined;
              return (
                <tr key={index}>
                  <td className="borderBold" style={{ width: 400 }}>
                    {item ? item.c01 : ""}
                  </td>
                  <td className="msize borderBold">{item ? item.c02 : ""}</td>
                  <td className="prise borderBold" style={{ width: 50 }}>
                    {item ? item.c03 : ""}
                  </td>
                  <td className="prise borderBold" style={{ width: 50 }}>
                    {item ? item.c04 : ""}
                  </td>
                  <td className="msize prise borderBold">
                    {item ? item.c05 : ""}
                  </td>
                  <td className="msize borderBold">{item ? item.c06 : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  public summaries = (user: SeikyuDetailUser) => {
    const { classes } = this.props;
    const emptyList = [
      ...Array(
        user.summaries.length >= SUMMARIES_MAX_ROW
          ? 0
          : SUMMARIES_MAX_ROW - user.summaries.length
      )
    ].fill(undefined);
    const summaries = [...user.summaries, ...emptyList];

    return (
      <React.Fragment>
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            <tr>
              <td
                rowSpan={15}
                className="label vertical borderBold"
                style={{ height: 100, padding: 0 }}
              >
                <span>請求額集計欄</span>
              </td>
              <td colSpan={2} className="label borderBold">
                サービス種類コード
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td>{item ? item.d01 : ""}</td>
                    <td className="borderBold">{item ? item.d02 : ""}</td>
                  </React.Fragment>
                );
              })}
              <td rowSpan={2} className="label borderBold">
                合計
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="label borderBold">
                サービス利用日数
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold">
                      {item ? `${item.d03}日` : "日"}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>
            <tr>
              <td colSpan={2} className="label borderBold">
                給付単位数
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d04 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t01}</td>
            </tr>
            <tr>
              <td colSpan={2} className="label borderBold">
                単位数単価
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? `${item.d05} 円/単位` : "円/単位"}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold" />
            </tr>
            <tr className="borderBold">
              <td colSpan={2} className="label borderBold">
                総費用額
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d06 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t02}</td>
            </tr>
            <tr>
              <td colSpan={2} className="label borderBold">
                １割相当額
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d07 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold" />
            </tr>
            <tr>
              <td colSpan={2} className="label borderBold">
                利用者負担額②
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d08 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold" />
            </tr>
            <tr className="borderBold">
              <td colSpan={2} className="label borderBold">
                上限月額調整(①②の内少ない数)
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d09 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t03}</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                className="label"
                style={{ borderBottom: "2px solid" }}
              >
                A型減免
              </td>
              <td className="label borderBold">事業者減免額</td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d10 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t04}</td>
            </tr>
            <tr className="borderBold">
              <td className="label borderBold">減免後利用者負担額</td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d11 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t05}</td>
            </tr>
            <tr className="borderBold">
              <td colSpan={2} className="label borderBold">
                調整後利用者負担額
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d12 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t06}</td>
            </tr>
            <tr className="borderBold">
              <td colSpan={2} className="label borderBold">
                上限額管理後利用者負担額
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d13 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t07}</td>
            </tr>
            <tr className="borderBold">
              <td colSpan={2} className="label borderBold">
                決定利用者負担額
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d14 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t08}</td>
            </tr>
            <tr className="borderBold">
              <td className="label">請求額</td>
              <td className="label borderBold">給付費</td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d15 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t09}</td>
            </tr>
            <tr className="borderDoubleTop">
              <td colSpan={2} className="label borderBold">
                自治体助成分請求額
              </td>
              {summaries.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <td colSpan={2} className="borderBold prise">
                      {item ? item.d16 : ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="borderBold prise">{user.t10}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(InvoiceSummaryDetail);
