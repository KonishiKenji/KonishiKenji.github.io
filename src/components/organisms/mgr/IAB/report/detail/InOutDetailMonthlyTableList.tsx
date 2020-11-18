import {
  withStyles,
  Theme,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";
import * as React from "react";
import {
  UserInOutRecords,
  IABReport,
  IABInOutReportState
} from "@stores/domain/mgr/IAB/report/types";
import Table from "@components/molecules/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCellWrap from "@components/atoms/TableCellWrap";
import InOutDetailModalContentsCell from "@components/organisms/mgr/IAB/report/detail/InOutDetailModalContentsCell";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import { dateInHyphenYYYYMMDDFormat } from "@utils/date";
import TableBody from "@material-ui/core/TableBody";

interface OwnProps {
  inOutRecords: UserInOutRecords[];
  date: Date;
  userReportList?: IABInOutReportState["IABReports"]["reportUser"]["reportList"];
}

const styles = ({ palette }: Theme) =>
  createStyles({
    table: {
      tableLayout: "fixed",
      width: 1070
    },
    row: {
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    firstCell: {
      width: 270,
      boxSizing: "border-box",
      borderRight: "dashed 1px #979797",
      padding: "0 0 0 32px"
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailMonthlyTableList: React.FunctionComponent<Props> = ({
  inOutRecords,
  date,
  classes,
  userReportList
}) => {
  const holidayList = createHolidayList(userReportList);
  const TableList = inOutRecords
    ? inOutRecords.map((inOutRecord: UserInOutRecords, index: number) => {
        const nowDate = new Date(date);
        nowDate.setDate(index + 1);
        return (
          <TableRow key={`table-row-${index}`} className={classes.row}>
            {/* 日付 */}
            <TableCellWrap
              key={`${index}-target-date`}
              cellClass={classes.firstCell}
            >
              <CustomDateLabel
                date={
                  inOutRecord.date ? dateInHyphenYYYYMMDDFormat(nowDate) : ""
                }
                dateFormat="Do（dd）"
                holiday={
                  inOutRecord.date ? holidayList[inOutRecord.date] : false
                }
              />
            </TableCellWrap>
            <InOutDetailModalContentsCell
              idx={index}
              inOutRecord={inOutRecord}
            />
          </TableRow>
        );
      })
    : [];
  return (
    <Table key="monthly-report-table" className={classes.table}>
      <TableBody>{TableList.length > 0 && TableList}</TableBody>
    </Table>
  );
};

/**
 * 祝日判定用の連想配列作成
 * @param userReportList 利用者の月ごと利用実績一覧
 */
const createHolidayList = (
  userReportList?: IABInOutReportState["IABReports"]["reportUser"]["reportList"]
) => {
  const holidayList = {};
  if (userReportList) {
    userReportList.forEach((userReport: IABReport) => {
      if (userReport.target_date) {
        const targetDate = new Date(userReport.target_date);
        holidayList[`${targetDate.getDate()}`] = userReport.is_holiday;
      }
    });
  }
  return holidayList;
};
export default withStyles(styles)(InOutDetailMonthlyTableList);
