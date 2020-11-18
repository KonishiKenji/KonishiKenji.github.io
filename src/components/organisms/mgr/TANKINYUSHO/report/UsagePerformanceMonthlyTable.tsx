import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";
import UsagePerformanceTableMonthlyHeader from "./UsagePerformanceTableMonthlyHeader";
import UsagePerformanceReportMonthlyCell from "@components/organisms/mgr/TANKINYUSHO/report/cells/UsagePerformanceReportMonthlyCell";

const styles = ({ palette }: Theme) =>
  createStyles({
    row: {
      height: 48,
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
    sticky: {
      zIndex: 10,
      position: "sticky",
      height: 81,
      backgroundColor: "#fff",
      paddingTop: 24
    }
  });

interface StateProps {
  report: ReportState;
}

interface OwnProps {
  isEditing: boolean;
  headerHeight: number;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => void;
}

type Props = StateProps & OwnProps & WithStyles<typeof styles>;

class UsagePerformanceMonthlyTable extends React.Component<Props> {
  public render() {
    const usagePerformance = this.props.isEditing
      ? this.props.report.reportMonthly.usagePerformance.after
      : this.props.report.reportMonthly.usagePerformance.before;
    const usagePerformanceTANKINYUSHO = this.props.isEditing
      ? this.props.report.reportMonthly.usagePerformanceTANKINYUSHO.after
      : this.props.report.reportMonthly.usagePerformanceTANKINYUSHO.before;
    const idList: string[] = Object.keys(usagePerformance);

    const TableList = idList.map((keyValue: string, index) => {
      return (
        <TableRow key={`table-row-${index}`} className={this.props.classes.row}>
          <UsagePerformanceReportMonthlyCell
            usagePerformance={usagePerformance[keyValue]}
            usagePerformanceTANKINYUSHO={usagePerformanceTANKINYUSHO[keyValue]}
            keyValue={keyValue}
            idx={index}
            isEditing={this.props.isEditing}
            openModal={this.props.openModal}
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
            <UsagePerformanceTableMonthlyHeader
              isEditing={this.props.isEditing}
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
  withStyles(styles)(UsagePerformanceMonthlyTable)
);
