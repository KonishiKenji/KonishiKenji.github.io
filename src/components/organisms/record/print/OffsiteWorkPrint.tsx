import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";

import {
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@constants/styles";

import { convertWareki, createWeekdaysJapaneseList } from "@utils/date";

import { InitialState } from "@stores/domain/offsiteWork/types";
import cloneDeep from "lodash-es/cloneDeep";

import LineBreak from "@components/atoms/LineBreak";

// const CELL_MIN_WIDTH = 10;

const styles = createStyles({
  root: {},
  page: {
    minHeight: PRINT_PAGE_HEIGHT,
    width: PRINT_PAGE_WIDTH,
    margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
    "&:last-child": {
      margin: "0 auto"
    },
    fontSize: 10
  },
  flexContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 12,
    "&.space-between": {
      justifyContent: "space-between"
    }
  },
  container: {
    marginBottom: 6
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
    border: "2px solid",
    textAlign: "left",
    "&.tableFixed": {
      tableLayout: "fixed"
    },
    "&.borderTop0": {
      borderTop: 0
    },
    "&.wide": {
      width: "100%"
    },
    "&  td": {
      padding: "3px 7px",
      borderRight: "1px solid",
      fontSize: 10,
      color: "rgba(0, 0, 0, 0.84)",
      wordBreak: "break-word",
      "&.label": {
        textAlign: "center",
        "& .fixMinHeight": {
          minHeight: 12
        }
      },
      "&.dayWidth": {
        minWidth: 18
      },
      "&.scale06": {
        transform: "scale(0.6)"
      },
      "&.scale09": {
        transform: "scale(0.9)"
      },
      "&.h38": {
        height: 38
      },
      "&.h50": {
        height: 50
      },
      "&.w32": {
        width: 32
      },
      "&.w64": {
        width: 64
      },
      "&.w82": {
        width: 82
      },
      "&.w120": {
        width: 120
      },
      "&.w128": {
        width: 128
      },
      "&.w180": {
        width: 180
      },
      "&.w360": {
        width: 360
      },
      "&.w550": {
        width: 550
      },
      "&.vertical": {
        width: 18,
        "& > span": {
          textOrientation: "upright",
          writingMode: "vertical-rl",
          whiteSpace: "nowrap"
        }
      },
      "&.lineBottomBold": {
        borderBottom: "2px solid"
      }
    },
    "&  tr": {
      borderBottom: "1px solid",
      "&.lineTopBottomBold": {
        borderBottom: "2px solid",
        borderTop: "2px solid"
      },
      "&.lineBottomBold": {
        borderBottom: "2px solid"
      }
    },
    "&.concat, &.concat tr:last-child": {
      borderBottom: "none"
    }
  },
  nameSpace: {
    display: "flex",
    justifyContent: "space-between"
  },
  signature: {
    marginRight: 8
  },
  smallTableRow: {
    "& > td": {
      padding: 0,
      "&.paddingLeft7": {
        paddingLeft: 7
      }
    }
  },
  title: {
    margin: "0 0 10px 0",
    fontWeight: "bold",
    letterSpacing: 1.2,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.84)"
  },
  printInfo: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10
  },
  reportTo: {
    fontSize: 12
  },
  preContent: {
    whiteSpace: "pre-line"
  },
  overHidden: {
    overflow: "hidden",
    width: "100%",
    "& p": {
      margin: 0,
      height: 48,
      lineHeight: 1.6,
      position: "relative",
      "&:before,&:after": {
        backgroundColor: "#fff",
        position: "absolute"
      },
      "&:before": {
        content: "'...'",
        top: 30,
        right: 0
      },
      "&:after": {
        content: "''",
        height: "100%",
        width: "100%"
      }
    }
  },
  "@media print": {
    page: {
      width: "200mm",
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

interface OwnProps {
  offsiteWork: InitialState;
  targetDate: Date;
}

interface Props extends OwnProps, WithStyles<typeof styles> {}

type Report = InitialState["download"]["report"][0];

interface RenderReport extends Report {
  userCount: number;
}

enum userLabels {
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H"
}

class OffsiteWork extends React.Component<Props> {
  public render() {
    const { classes, offsiteWork } = this.props;

    const convertedTargetDate = convertWareki(
      this.props.targetDate.getFullYear(),
      this.props.targetDate.getMonth() + 1
    );

    const reportList = this.createReportList();

    const weekdays = createWeekdaysJapaneseList(this.props.targetDate);

    return (
      <React.Fragment key={1}>
        {reportList.map((report, reportIdx) => {
          const monthlyScore: number[] = Array(31)
            .fill(0)
            .map((day, dayIdx) => {
              return report.users.reduce((result, currentValue) => {
                return currentValue.daily[dayIdx] === "◯" ? result + 1 : result;
              }, 0);
            });
          return (
            <section key={`${reportIdx}_user`} className={classes.page}>
              <div className={classes.printInfo}>
                <div>(参考様式)</div>
                <div>
                  {`${reportIdx + 1}/${reportList.length}`}
                  ページ
                </div>
              </div>
              <header>
                <h1 className={classes.title}>施設外就労実施報告書</h1>
              </header>
              <div className={`${classes.flexContainer} space-between`}>
                <div className={classes.reportTo}>
                  <div>報告先</div>
                  <div>{`${report.to_address}様`}</div>
                </div>
                <div>
                  <div>(報告者)</div>
                  <table className={classes.table}>
                    <tbody>
                      <tr>
                        <td className="label">所在地</td>
                        <td>{offsiteWork.download.facility.full_address}</td>
                      </tr>
                      <tr>
                        <td className="label">事業所名</td>
                        <td>{offsiteWork.download.facility.name}</td>
                      </tr>
                      <tr>
                        <td className="label h50">代表者職・氏名</td>
                        <td className="w360">
                          <div className={classes.nameSpace}>
                            <div />
                            <div className={classes.signature}>印</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="label">事業所番号</td>
                        <td>
                          {offsiteWork.download.facility.gov_facility_number}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={classes.container}>
                <span>{` ${convertedTargetDate.era}`}</span>
                <span>{` ${convertedTargetDate.year}`}</span>
                <span> 年</span>
                <span>{`  ${convertedTargetDate.month} `}</span>
                月分の施設外就労実績について、以下のとおり報告します。
                <table className={`${classes.table} wide`}>
                  <tbody>
                    <tr>
                      <td className="label w128">事業所のサービス種類</td>
                      <td colSpan={3}>
                        {offsiteWork.download.facility.type_service}
                      </td>
                    </tr>
                    <tr>
                      <td className="label w128">当該事業所の定員数</td>
                      <td className="w120">
                        {`${offsiteWork.download.facility.capacity}人`}
                      </td>
                      <td>施設外就労を行う利用者数</td>
                      <td className="w120">{`${report.userCount}人`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={classes.container}>
                <table className={`${classes.table} tableFixed wide`}>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="label w128">
                        就労先企業名
                      </td>
                      <td>{report.name}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="label w128">
                        所在地
                      </td>
                      <td>{report.full_address}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="label w128">
                        契約期間
                      </td>
                      <td>
                        {report.contract_begin_date}
                        {report.contract_end_date
                          ? `〜${report.contract_end_date}`
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={3} className="label w64">
                        契約内容
                      </td>
                      <td className="label w64">作業日</td>
                      <td>{report.working_day}</td>
                    </tr>
                    <tr>
                      <td className="label w64">作業時間</td>
                      <td>{report.working_time}</td>
                    </tr>
                    <tr>
                      <td className="label w64 h38">作業内容</td>
                      <td className="h38">
                        <div className={classes.overHidden}>
                          <p>
                            <LineBreak
                              text={report.working_description || ""}
                            />
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className={`${classes.table} borderTop0 wide`}>
                  <tbody>
                    <tr className={classes.smallTableRow}>
                      <td colSpan={2} className="label" />
                      <td className="label w128">使用者名</td>
                      <td className="label">受給者証番号</td>
                      <td className="label">当月分提供日数</td>
                      <td className="label w180">備考</td>
                    </tr>
                    {report.users.map((targetUser, userIdx) => {
                      let tableRowClassName = classes.smallTableRow;
                      if (userIdx === 8) {
                        tableRowClassName = `${tableRowClassName} lineBottomBold`;
                      }
                      const userName =
                        targetUser.name_sei !== "" || targetUser.name_mei !== ""
                          ? `${targetUser.name_sei} ${targetUser.name_mei}`
                          : "-";
                      return (
                        <tr
                          key={`${reportIdx}_targetUser_${userIdx}`}
                          className={tableRowClassName}
                        >
                          {userIdx === 0 && (
                            <td rowSpan={8} className="w128 label">
                              利用者名簿
                            </td>
                          )}
                          <td className="label w32">{userLabels[userIdx]}</td>
                          <td className="paddingLeft7">
                            {targetUser.inout_sum !== "" ? userName : ""}
                          </td>
                          <td className="paddingLeft7">
                            {targetUser.recipient_number}
                          </td>
                          <td className="paddingLeft7">
                            {targetUser.inout_sum}
                          </td>
                          <td className="paddingLeft7">
                            {targetUser.name_sei ? "" : targetUser.city}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <table
                  className={`${classes.table} tableFixed borderTop0 wide`}
                >
                  <tbody>
                    <tr className={classes.smallTableRow}>
                      <td
                        rowSpan={2}
                        className="label lineSmall lineBottomBold"
                      />
                      <td className="label w64 scale09">{`${convertedTargetDate.leastEra}${convertedTargetDate.year}年${convertedTargetDate.month}月`}</td>
                      {weekdays.map((target, weekIdx) => {
                        return (
                          <td
                            key={`${reportIdx}_monthly_data_${weekIdx}`}
                            className="label"
                          >
                            {weekIdx + 1}
                          </td>
                        );
                      })}
                      <td rowSpan={2} className="label w32 lineBottomBold">
                        計
                      </td>
                    </tr>
                    <tr className={`${classes.smallTableRow} lineBottomBold`}>
                      <td className="label scale09">曜日</td>
                      {weekdays.map((target, weekIdx) => {
                        return (
                          <td
                            key={`${reportIdx}_data_${weekIdx}`}
                            className="label dayWidth"
                          >
                            {target}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                  <tbody>
                    {report.users.map((targetUser, userIdx) => {
                      return (
                        <tr
                          key={`${reportIdx}_targetUserMonthly_${userIdx}`}
                          className={classes.smallTableRow}
                        >
                          {userIdx === 0 && (
                            <td rowSpan={8} className="scale09 vertical">
                              <span>施設外就労実績</span>
                            </td>
                          )}
                          <td className="label">{userLabels[userIdx]}</td>
                          {targetUser.daily.map((target, dailyIndex) => {
                            return (
                              <td
                                key={`${reportIdx}_${userIdx}_targetUserData_${dailyIndex}`}
                                className="label"
                              >
                                {targetUser.inout_sum !== ""
                                  ? target !== ""
                                    ? target
                                    : "-"
                                  : ""}
                              </td>
                            );
                          })}
                          <td className="label">{targetUser.inout_sum}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody>
                    <tr
                      className={`${classes.smallTableRow} lineTopBottomBold`}
                    >
                      <td colSpan={2} className="label">
                        利用者数
                      </td>
                      {monthlyScore.map((score, scoreIdx) => {
                        return (
                          <td
                            key={`${reportIdx}_count_data_${scoreIdx}`}
                            className="label"
                          >
                            {score}
                          </td>
                        );
                      })}
                      <td className="label">計</td>
                    </tr>
                    {report.staffs
                      ? report.staffs.map((staff, staffIdx) => {
                          return (
                            <tr
                              key={`${reportIdx}_staff_${staffIdx}`}
                              className={classes.smallTableRow}
                            >
                              {staffIdx === 0 && (
                                <td rowSpan={5} className="scale09 vertical">
                                  <span>配置職員・時間</span>
                                </td>
                              )}
                              <td className="label w64">
                                <div className="fixMinHeight">
                                  {staff.staff_name}
                                </div>
                              </td>
                              {staff.daily &&
                                staff.daily.map((day, staffDayIdx) => {
                                  return (
                                    <td
                                      key={`operatorMonthly${staffIdx}${staffDayIdx}`}
                                      className="scale06 label"
                                    >
                                      {staff.operation_sum !== ""
                                        ? day !== ""
                                          ? day
                                          : "-"
                                        : ""}
                                    </td>
                                  );
                                })}
                              <td className="label">{staff.operation_sum}</td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
                <table
                  className={`${classes.table} tableFixed borderTop0 wide`}
                >
                  <tbody>
                    <tr className="lineBottomBold">
                      <td className="label h50 w82">その他</td>
                      <td>
                        <div className={`${classes.overHidden}`}>
                          <p>
                            <LineBreak text={report.other || ""} />
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={classes.preContent}>
                1.施設外就労1ユニットあたりの最低定員は1人以上とする。
                <br />
                2.施設外就労を行う利用者に対し、常勤換算による必要な職員が配置されていること。
                <br />
                3.「利用者名簿」欄には、該当市区町村以外の利用者について、市区町村名を備考に記載すること。
                <br />
                4.「施設外就労実績」欄には、施設外就労を行った日は◯、欠席した日は☓、事業所内で支援を行った日は◎を記載すること。
                <br />
                5.「配置職員・時間」欄には、職員氏名を記載し、施設外就労先での配置時間数(小数第1位まで)を記載すること。
                <br />
                6.「その他」欄には、目標の達成状況、個別支援計画の見直し等について適宜記載すること。
              </div>
              <div className={classes.overHidden}>
                <p>
                  <LineBreak text={report.remarks || ""} />
                </p>
              </div>
            </section>
          );
        })}
      </React.Fragment>
    );
  }

  private createReportList = (): RenderReport[] => {
    const result: RenderReport[] = [];

    this.props.offsiteWork.download.report.forEach((target) => {
      if (!target.users) {
        return;
      }
      const slicedReportList = this.reportSlice(target);
      result.push(...slicedReportList);
    });

    return result;
  };

  // ユーザーの数が一定以上の場合、reportを分割
  private reportSlice = (target: InitialState["download"]["report"][0]) => {
    const newArr: RenderReport[] = [];
    const userLength = target.users.length;
    const userLimit = 8; // 1ページに表示できるユーザーの上限
    for (let i = 0; i < Math.ceil(userLength / userLimit); i += 1) {
      const result = Object.assign(cloneDeep(target), {
        userCount: target.users.length
      });
      const j = i * userLimit;
      result.users = target.users.slice(j, j + userLimit);
      if (result.users.length < userLimit) {
        result.users.push(
          ...this.createUserEmptyData(userLimit - result.users.length)
        );
      }

      result.staffs = this.margeStaffs(result.staffs);
      newArr.push(result);
    }
    return newArr;
  };

  // スタッフの数に応じてスタッフ情報を再生成
  private margeStaffs(staffs: InitialState["download"]["report"][0]["staffs"]) {
    const staffLimit = 5;
    const result: InitialState["download"]["report"][0]["staffs"] = [];
    if (!staffs) {
      return result;
    }
    if (staffs.length < staffLimit) {
      result.push(...staffs);
      result.push(...this.createStaffEmptyData(staffLimit - staffs.length));
    } else if (staffs.length > staffLimit) {
      // 4番目までのスタッフはそのままresultに返す
      for (let i = 0; i < staffLimit - 1; i += 1) {
        result.push(staffs[i]);
      }
      // 5番目以降のスタッフをその他として結合
      const resultDaily = Array(31);
      let operationSum = 0;
      resultDaily.fill("-");
      for (let i = 4; i < staffs.length; i += 1) {
        staffs[i].daily.forEach((data, dataIdx) => {
          const oldData =
            resultDaily[dataIdx] === "-" ? 0 : Number(resultDaily[dataIdx]);
          const newData = data === "" ? 0 : Number(data);
          operationSum += newData;
          const resultData = oldData + newData;
          resultDaily[dataIdx] =
            resultData > 0 ? resultData.toFixed(1).toString() : "-";
        });
      }
      result.push({
        staff_name: "その他",
        operation_sum: operationSum.toFixed(1).toString(),
        daily: resultDaily
      });
    } else {
      result.push(...staffs);
    }
    return result;
  }

  // 指定した数だけユーザーの空データを作成する
  private createUserEmptyData = (
    createArrayLength: number
  ): InitialState["download"]["report"][0]["users"] => {
    const result: InitialState["download"]["report"][0]["users"] = [];
    const emptyDaily = Array(31).fill(""); // 一月
    for (let i = 0; i < createArrayLength; i += 1) {
      result.push({
        name_sei: "",
        name_mei: "",
        recipient_number: "",
        city: "",
        inout_sum: "",
        daily: [...emptyDaily]
      });
    }
    return result;
  };

  // 指定した数だけスタッフの空データを作成する
  private createStaffEmptyData = (
    createArrayLength: number
  ): InitialState["download"]["report"][0]["staffs"] => {
    const result: InitialState["download"]["report"][0]["staffs"] = [];
    const emptyStaffs = Array(31).fill(""); // 一月
    for (let i = 0; i < createArrayLength; i += 1) {
      result.push({
        staff_name: "",
        operation_sum: "",
        daily: [...emptyStaffs]
      });
    }
    return result;
  };
}

export default withStyles(styles)(OffsiteWork);
