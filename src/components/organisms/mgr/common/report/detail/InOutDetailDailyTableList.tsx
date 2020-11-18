import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import * as React from "react";
import { DailyInOutRecords } from "@stores/domain/report/type";
import TableRow from "@material-ui/core/TableRow";
import TableCellWrap from "@components/atoms/TableCellWrap";
import InOutDetailModalContentsCell from "@components/organisms/mgr/common/report/detail/InOutDetailModalContentsCell";
import Table from "@components/molecules/Table";
import TableBody from "@material-ui/core/TableBody";
import { FacilityType } from "@constants/variables";
import ClassNames from "classnames";

interface OwnProps {
  inOutRecords: DailyInOutRecords[];
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
    },
    headerFirstIAB: {
      width: 270
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailDailyTableList: React.FunctionComponent<Props> = ({
  inOutRecords,
  classes,
  serviceType
}) => {
  const headerFirstWidth =
    serviceType === FacilityType.IKOU ||
    serviceType === FacilityType.A ||
    serviceType === FacilityType.B
      ? classes.headerFirstIAB
      : classes.headerFirstReport;
  const TableList = inOutRecords
    ? inOutRecords.map((inOutRecord: DailyInOutRecords, index: number) => {
        return (
          <TableRow key={`table-row-${index}`} className={classes.row}>
            <>
              {/* 利用者名 */}
              <TableCellWrap
                key={`${index}-sei-mei`}
                cellClass={ClassNames(classes.longCell, headerFirstWidth)}
              >
                <div className={classes.firstCell}>
                  <div className={classes.nameCell}>{inOutRecord.userName}</div>
                  <div className={classes.idCell}>
                    {inOutRecord.recipientNumber}
                  </div>
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
    <Table key="monthly-report-table" className={classes.table}>
      <TableBody>{TableList.length > 0 && TableList}</TableBody>
    </Table>
  );
};
export default withStyles(styles)(InOutDetailDailyTableList);
