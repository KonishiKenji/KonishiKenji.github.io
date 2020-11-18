import * as React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { FacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import InOutReportCell from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/InOutReportCells";
import { AppState } from "@stores/type";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import {
  REPEAT_DAILY,
  REPEAT_USER,
  InOutReportState,
  ReportType
} from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/types";
import { ReportInterface } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";

const styles = ({ palette }: Theme) =>
  createStyles({
    rowDaily: {
      height: 56,
      paddingTop: 14,
      paddingBottom: 14,
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    rowUser: {
      height: 40,
      paddingTop: 6,
      paddingBottom: 6,
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
    shortCell: {
      width: "8.6%",
      minWidth: 89,
      boxSizing: "content-box",
      paddingLeft: 16
    },
    middleCell: {
      width: "10%",
      minWidth: 103,
      boxSizing: "content-box",
      paddingLeft: 16
    },
    longCell: {
      width: "15.5%",
      minWidth: 160,
      boxSizing: "content-box",
      paddingRight: 8,
      paddingLeft: 16
    },
    iconCell: {
      width: 54,
      boxSizing: "content-box",
      paddingLeft: 16
    },
    sticky: {
      zIndex: 10,
      position: "sticky"
    },
    hidden: {
      display: "none"
    },
    whiteSpace: {
      whiteSpace: "pre"
    }
  });

interface StateProps {
  facility: FacilityState;
  reportState: InOutReportState;
}
interface OwnProps {
  headerHeight: number;
  openModal: (param: ReportInterface) => void;
  type: ReportType;
}

type Props = StateProps & OwnProps & WithStyles<typeof styles>;

const reportDailyHeader = (
  classes: Props["classes"],
  facility: FacilityState,
  type: ReportType
): HeaderProps => {
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    items: [
      {
        align: "left",
        label: type === REPEAT_DAILY ? "利用者名" : "日付",
        className: classes.longCell
      },
      {
        align: "left",
        label: "サービス\n提供の状況",
        className: `${classes.middleCell} ${classes.whiteSpace}`
      },
      {
        align: "left",
        label: "開始時間",
        className: classes.shortCell
      },
      {
        align: "left",
        label: "終了時間",
        className: classes.shortCell
      },
      {
        align: "left",
        label: "送迎",
        className: facility.transferServiceFlag
          ? classes.shortCell
          : classes.hidden
      },
      {
        align: "left",
        label: "訪問支援",
        className: classes.shortCell
      },
      {
        align: "left",
        label: "食事提供",
        className: facility.mealSaservedServiceFlag
          ? classes.shortCell
          : classes.hidden
      },
      {
        align: "left",
        label: "医療連携\n体制",
        className: `${classes.shortCell} ${classes.whiteSpace}`
      },
      {
        align: "left",
        label: "体験利用",
        className: classes.shortCell
      },
      {
        align: "left",
        label: "短期滞在",
        className:
          facility.shortStayType !== "0" ? classes.shortCell : classes.hidden
      },
      {
        align: "center",
        label: "",
        className: classes.iconCell
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
      ? reportState.reports.reportDaily.reportList
      : reportState.reports.reportUser.reportList;
  const TableList = rows.map((row, index) => {
    return (
      <TableRow
        key={`table-row-${index}`}
        className={
          props.type === REPEAT_DAILY
            ? props.classes.rowDaily
            : props.classes.rowUser
        }
      >
        {props.type === REPEAT_DAILY ? (
          /* 利用者名 */
          <TableCellWrap
            key={`${index}-sei-mei`}
            cellClass={props.classes.longCell}
          >
            {row.name}
          </TableCellWrap>
        ) : null}
        {props.type === REPEAT_USER ? (
          /* 日付 */
          <TableCellWrap
            key={`${index}-target-date`}
            cellClass={props.classes.longCell}
          >
            <CustomDateLabel
              date={row.target_date ? row.target_date : ""}
              dateFormat={"Do（dd）"}
              holiday={row.is_holiday}
            />
          </TableCellWrap>
        ) : null}
        <InOutReportCell
          params={row}
          facility={facility}
          idx={index}
          openModal={props.openModal}
        />
      </TableRow>
    );
  });

  return (
    <React.Fragment>
      <div
        className={props.classes.sticky}
        style={{ top: `${props.headerHeight}px` }}
      >
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
      <Table key="monthly-report-table">
        <TableBody>{TableList.length > 0 && TableList}</TableBody>
      </Table>
      {TableList.length === 0 && (
        <div className={props.classes.noData}>
          利用者の情報が登録されていません。
          <br />
          利用者情報ページで利用者を登録した後にご利用ください。
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    reportState: state.JIRITSUKUNRENSEIKATSU.report,
    facility: state.JIRITSUKUNRENSEIKATSU.facility
  };
};

export default connect(mapStateToProps)(withStyles(styles)(InOutReportTable));
