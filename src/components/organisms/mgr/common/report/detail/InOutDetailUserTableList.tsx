import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import * as React from "react";
import { UserInOutRecords } from "@stores/domain/report/type";
import { IABReport } from "@stores/domain//mgr/IAB/report/types";
import { SEIKATSUKAIGOReport } from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { ReportInterface as JIRITSUKUNRENSEIKATSUReport } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import TableRow from "@material-ui/core/TableRow";
import TableCellWrap from "@components/atoms/TableCellWrap";
import InOutDetailModalContentsCell from "@components/organisms/mgr/common/report/detail/InOutDetailModalContentsCell";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import { dateInHyphenYYYYMMDDFormat } from "@utils/date";
import Table from "@components/molecules/Table";
import TableBody from "@material-ui/core/TableBody";
import { FacilityType } from "@constants/variables";
import ClassNames from "classnames";

interface OwnProps {
  inOutRecords: UserInOutRecords[];
  date: Date;
  userReportList?:
    | SEIKATSUKAIGOReport[]
    | JIRITSUKUNRENSEIKATSUReport[]
    | IABReport[];
  serviceType: FacilityType;
}

const styles = ({ palette }: Theme): StyleRules =>
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
    longCell: {
      width: 270,
      boxSizing: "content-box",
      borderRight: "dashed 1px #979797",
      padding: 0
    },
    nameCell: {
      fontSize: "16px"
    },
    firstCell: {
      margin: "12px 0px 12px 32px"
    },
    idCell: {
      color: "rgba(0, 0, 0, 0.38)",
      fontSize: "12px"
    },
    headerFirstReport: {
      width: 292
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 祝日判定用の連想配列作成
 * @param userReportList 利用者の月ごと利用実績一覧
 */
const createHolidayList = (
  userReportList?:
    | SEIKATSUKAIGOReport[]
    | JIRITSUKUNRENSEIKATSUReport[]
    | IABReport[]
): {} => {
  const holidayList = {};
  if (userReportList) {
    userReportList.forEach(
      (
        userReport:
          | SEIKATSUKAIGOReport
          | JIRITSUKUNRENSEIKATSUReport
          | IABReport
      ) => {
        if (userReport.target_date) {
          const targetDate = new Date(userReport.target_date);
          holidayList[`${targetDate.getDate()}`] = userReport.is_holiday;
        }
      }
    );
  }
  return holidayList;
};

const InOutDetailUserTableList: React.FunctionComponent<Props> = ({
  inOutRecords,
  date,
  classes,
  userReportList,
  serviceType
}) => {
  const holidayList = createHolidayList(userReportList);
  const TableList = inOutRecords
    ? inOutRecords.map((inOutRecord: UserInOutRecords, index: number) => {
        const nowDate = new Date(date);
        nowDate.setDate(index + 1);
        return (
          <TableRow key={`table-row-${index}`} className={classes.row}>
            <>
              {/* 日付 */}
              <TableCellWrap
                key={`${index}-target-date`}
                cellClass={ClassNames(
                  classes.longCell,
                  classes.headerFirstReport
                )}
              >
                <div className={classes.firstCell}>
                  <CustomDateLabel
                    date={
                      inOutRecord.date
                        ? dateInHyphenYYYYMMDDFormat(nowDate)
                        : ""
                    }
                    dateFormat="Do（dd）"
                    holiday={
                      inOutRecord.date ? holidayList[inOutRecord.date] : false
                    }
                  />
                </div>
              </TableCellWrap>
              <InOutDetailModalContentsCell
                idx={index}
                inOutRecord={inOutRecord}
                serviceType={serviceType}
              />
            </>
          </TableRow>
        );
      })
    : [];
  return (
    <Table key="user-report-table" className={classes.table}>
      <TableBody>{TableList.length > 0 && TableList}</TableBody>
    </Table>
  );
};

export default withStyles(styles)(InOutDetailUserTableList);
