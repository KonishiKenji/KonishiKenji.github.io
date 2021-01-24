import * as React from "react";
import * as classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";
import InOutReportCell from "@components/organisms/mgr/IAB/report/InOutReportCells";
import { AppState } from "@stores/type";
import {
  IABReport,
  IABReportTypeInterface,
  REPEAT_DAILY,
  REPEAT_MONTHLY,
  IABInOutReportState
} from "@stores/domain/mgr/IAB/report/types";

const styles = ({ palette }: Theme) =>
  createStyles({
    row: {
      height: 56,
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    rowUser: {
      height: 40
    },
    noData: {
      clear: "both",
      marginTop: 76,
      textAlign: "center",
      height: 104,
      color: BASE_GREY_TEXT_COLOR
    },
    cell: {
      width: 72,
      minWidth: 72,
      padding: "0 0 0 16px",
      boxSizing: "content-box"
    },
    firstCell: {
      width: 228,
      minWidth: 228
    },
    secondCell: {
      width: 158,
      minWidth: 158
    },
    lastCell: {
      width: 86,
      minWidth: 86
    },
    editCell: {
      minWidth: 54
    },
    hiddenCell: {
      display: "none"
    },
    sticky: {
      zIndex: 10,
      position: "sticky"
    }
  });

interface StateProps {
  facility: FacilityState;
  reportState: IABInOutReportState;
}
interface OwnProps {
  headerHeight: number;
  openModal: (param: IABReport) => void;
  type: IABReportTypeInterface["type"];
}

type Props = StateProps & OwnProps & WithStyles<typeof styles>;

/**
 * thのラベルと長さを管理
 */
const reportDailyHeader = (
  classes: Props["classes"],
  facility: FacilityState,
  type: IABReportTypeInterface["type"]
): HeaderProps => {
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    items: [
      {
        align: "left",
        label: type === REPEAT_DAILY ? "利用者" : "日付",
        className: classNames(classes.cell, classes.firstCell)
      },
      {
        align: "left",
        label: "サービス提供の状況",
        className: classNames(classes.cell, classes.secondCell)
      },
      {
        align: "left",
        label: "開始時間",
        className: classNames(classes.cell)
      },
      {
        align: "left",
        label: "終了時間",
        className: classNames(classes.cell)
      },
      {
        align: "left",
        label: "送迎",
        className: classNames(classes.cell, {
          [classes.hiddenCell]: !facility.transferServiceFlag
        })
      },
      {
        align: "left",
        label: "食事提供",
        className: classNames(classes.cell, {
          [classes.hiddenCell]: !facility.mealSaservedServiceFlag
        })
      },
      {
        align: "left",
        label: "訪問支援",
        className: classNames(classes.cell)
      },
      {
        align: "left",
        label: "医療連携体制",
        className: classNames(classes.cell, classes.lastCell)
      },
      {
        align: "center",
        label: "",
        className: classes.editCell
      }
    ]
  };
};

const InOutReportTable = (props: Props) => {
  const { facility, reportState, type } = props;
  const tableHead = reportDailyHeader(
    props.classes,
    props.facility,
    props.type
  );
  const rows =
    type === REPEAT_DAILY
      ? reportState.IABReports.reportDaily.reportList
      : reportState.IABReports.reportUser.reportList;
  const TableList = rows.map((row, index) => {
    return (
      <TableRow
        key={`table-row-${index}`}
        className={classNames(props.classes.row, {
          [props.classes.rowUser]: type === REPEAT_MONTHLY
        })}
      >
        <InOutReportCell
          isDaily={props.type === REPEAT_DAILY}
          params={row}
          facility={facility}
          idx={index}
          openModal={props.openModal}
        />
      </TableRow>
    );
  });

  return (
    <>
      <div
        className={props.classes.sticky}
        style={{ top: `${props.headerHeight}px` }}
      >
        {/* header単体をstickyとする */}
        <Table key="monthly-report-table">
          <TableHead
            role={tableHead.role}
            ariaChecked={tableHead.ariaChecked}
            tabIndex={tableHead.tabIndex}
            key={tableHead.key}
            selected={tableHead.selected}
            items={tableHead.items}
            rowStyle={tableHead.rowStyle}
          />
        </Table>
      </div>
      {TableList.length > 0 ? (
        <Table key="monthly-report-table">
          <TableBody>{TableList}</TableBody>
        </Table>
      ) : (
        <div className={props.classes.noData}>
          利用者の情報が登録されていません。
          <br />
          利用者情報ページで利用者を登録した後にご利用ください。
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    reportState: state.IAB.report,
    facility: state.IAB.facility
  };
};

export default connect(mapStateToProps)(withStyles(styles)(InOutReportTable));
