import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import UsagePerformanceReportCell from "@components/organisms/mgr/TANKINYUSHO/report/cells/UsagePerformanceReportCell";
import {
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  REPEAT_MONTHLY
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import UsagePerformanceReportCellEdit from "./UsagePerformanceReportCellEdit";
import CustomDateLabel from "@components/atoms/CustomDateLabel";

const styles = () =>
  createStyles({
    dateCell: {
      width: "15.1%",
      minWidth: 156,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 16
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType;
  idx: number;
  keyValue: string;
  isEditing: boolean;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportMonthlyCell = (props: Props) => {
  const {
    usagePerformance,
    usagePerformanceTANKINYUSHO,
    idx,
    keyValue,
    isEditing,
    openModal
  } = props;

  return (
    <React.Fragment>
      {/* 利用者名 */}
      <TableCellWrap key={`${idx}-sei-mei`} cellClass={props.classes.dateCell}>
        <CustomDateLabel
          date={
            usagePerformance && usagePerformance.targetDate
              ? usagePerformance.targetDate
              : ""
          }
          dateFormat={"Do（dd）"}
          holiday={
            usagePerformance.isHoliday !== null
              ? usagePerformance.isHoliday
              : false
          }
        />
      </TableCellWrap>
      {isEditing ? (
        <UsagePerformanceReportCellEdit
          usagePerformance={usagePerformance}
          usagePerformanceTANKINYUSHO={usagePerformanceTANKINYUSHO}
          idx={idx}
          keyValue={keyValue}
          openModal={openModal}
          reportType={REPEAT_MONTHLY}
        />
      ) : (
        <UsagePerformanceReportCell
          usagePerformance={usagePerformance}
          usagePerformanceTANKINYUSHO={usagePerformanceTANKINYUSHO}
          idx={idx}
          openModal={openModal}
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(UsagePerformanceReportMonthlyCell);
