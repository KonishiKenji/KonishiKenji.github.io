import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import UsagePerformanceReportDailyCell from "@components/organisms/mgr/TANKINYUSHO/report/cells/UsagePerformanceReportDailyCell";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";
import { StatusType } from "@constants/mgr/TANKINYUSHO/variables";
import UsagePerformanceTableDailyHeader from "./UsagePerformanceTableDailyHeader";

const styles = ({ palette }: Theme) =>
  createStyles({
    row: {
      height: 56,
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    noData: {
      clear: "both",
      marginTop: 76,
      textAlign: "center",
      height: 104,
      color: BASE_GREY_TEXT_COLOR
    },
    disableCell: {
      display: "none"
    },
    sticky: {
      zIndex: 10,
      position: "sticky"
    }
  });

interface StateProps {
  report: ReportState;
}

interface OwnProps {
  isEditing: boolean;
  isSorting: boolean;
  headerHeight: number;
  checkedIds: string[];
  onChecked: (checkedId: string, isChecked: boolean) => void;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => void;
  allCheck: (checkedValue: boolean) => void;
  isAllCheck: boolean;
}

type Props = StateProps & OwnProps & WithStyles<typeof styles>;

/**
 * ソート処理  サービス提供状況[提供] > サービス提供状況[-]
 * @param idList
 * @param usagePerformance
 */
const sortTable = (
  idList: string[],
  usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
) => {
  return idList.sort((beforeId: string, afterId: string) => {
    // サービス提供状況[提供]は前へ
    if (
      `${usagePerformance[afterId].statusType}` === StatusType.IMPLEMENTATION
    ) {
      return 1;
    }
    // どちらもサービス提供状況[-]は何もしない
    if (
      `${usagePerformance[beforeId].statusType}` === StatusType.NONE &&
      `${usagePerformance[afterId].statusType}` === StatusType.NONE
    ) {
      return 0;
    }
    // 上記以外は後ろへ
    return -1;
  });
};

class UsagePerformanceDailyTable extends React.Component<Props> {
  public render() {
    const usagePerformance = this.props.isEditing
      ? this.props.report.reportDaily.usagePerformance.after
      : this.props.report.reportDaily.usagePerformance.before;
    const usagePerformanceTANKINYUSHO = this.props.isEditing
      ? this.props.report.reportDaily.usagePerformanceTANKINYUSHO.after
      : this.props.report.reportDaily.usagePerformanceTANKINYUSHO.before;
    const idList: string[] = Object.keys(usagePerformance);
    const sortIdList: string[] = this.props.isSorting
      ? sortTable(idList, usagePerformance)
      : idList;
    const TableList = sortIdList.map((keyValue: string, index) => {
      return (
        <TableRow key={`table-row-${index}`} className={this.props.classes.row}>
          <UsagePerformanceReportDailyCell
            usagePerformance={usagePerformance[keyValue]}
            usagePerformanceTANKINYUSHO={usagePerformanceTANKINYUSHO[keyValue]}
            keyValue={keyValue}
            idx={index}
            isEditing={this.props.isEditing}
            onChecked={this.props.onChecked}
            openModal={this.props.openModal}
            checkedIds={this.props.checkedIds}
          />
        </TableRow>
      );
    });

    return (
      <React.Fragment>
        <div
          className={this.props.classes.sticky}
          style={{ top: `${this.props.headerHeight}px` }}
        >
          <Table key="monthly-report-table">
            <UsagePerformanceTableDailyHeader
              isEditing={this.props.isEditing}
              allCheck={this.props.allCheck}
              isAllCheck={this.props.isAllCheck}
            />
          </Table>
        </div>
        <Table key="monthly-report-table">
          <TableBody>{TableList.length > 0 && TableList}</TableBody>
        </Table>
        {TableList.length === 0 && (
          <div className={this.props.classes.noData}>
            利用者の情報が登録されていません。
            <br />
            利用者情報ページで利用者を登録した後にご利用ください。
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    report: state.TANKINYUSHO.report
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(UsagePerformanceDailyTable)
);
