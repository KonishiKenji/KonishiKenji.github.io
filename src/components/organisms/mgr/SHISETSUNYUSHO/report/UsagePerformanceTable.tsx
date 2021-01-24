import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import UsagePerformanceReportRow from "@components/organisms/mgr/SHISETSUNYUSHO/report/cells/UsagePerformanceReportRow";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  ReportType,
  REPEAT_DAILY
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";
import UsagePerformanceTableHeader from "./UsagePerformanceTableHeader";

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
    sticky: {
      zIndex: 10,
      position: "sticky",
      backgroundColor: "#fff"
    },
    stickyNotEditing: {
      height: 73,
      paddingTop: 16
    },
    stickyIsEditing: {
      height: 57
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
    usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
  ) => void;
  isDisabledFood: boolean;
  reportType: ReportType;
}

type Props = StateProps & OwnProps & WithStyles<typeof styles>;

class UsagePerformanceTable extends React.Component<Props> {
  public render() {
    const isDaily = this.props.reportType === REPEAT_DAILY;
    const report = isDaily
      ? this.props.report.reportDaily
      : this.props.report.reportUsers;
    const usagePerformance = this.props.isEditing
      ? report.usagePerformance.after
      : report.usagePerformance.before;
    const usagePerformanceSHISETSUNYUSHO = this.props.isEditing
      ? report.usagePerformanceSHISETSUNYUSHO.after
      : report.usagePerformanceSHISETSUNYUSHO.before;

    const TableList = Object.keys(usagePerformance).map(
      (keyValue: string, index: number) => {
        return (
          <TableRow
            key={`table-row-${index}`}
            className={this.props.classes.row}
          >
            <UsagePerformanceReportRow
              usagePerformance={usagePerformance[keyValue]}
              usagePerformanceSHISETSUNYUSHO={
                usagePerformanceSHISETSUNYUSHO[keyValue]
              }
              idx={index}
              keyValue={keyValue}
              isEditing={this.props.isEditing}
              openModal={this.props.openModal}
              isDisabledFood={this.props.isDisabledFood}
              reportType={this.props.reportType}
            />
          </TableRow>
        );
      }
    );

    return (
      <React.Fragment>
        <div
          className={
            this.props.isEditing
              ? `${this.props.classes.sticky} ${this.props.classes.stickyIsEditing}`
              : `${this.props.classes.sticky} ${this.props.classes.stickyNotEditing}`
          }
          style={{ top: `${this.props.headerHeight}px` }}
        >
          <Table key="users-report-table">
            <UsagePerformanceTableHeader
              isEditing={this.props.isEditing}
              isDisabledFood={this.props.isDisabledFood}
              reportType={this.props.reportType}
            />
          </Table>
        </div>
        <Table key="users-report-table">
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
    report: state.SHISETSUNYUSHO.report
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(UsagePerformanceTable)
);
