import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import UsagePerformanceReportCell from "@components/organisms/mgr/SHISETSUNYUSHO/report/cells/UsagePerformanceReportCell";
import {
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  ReportType,
  REPEAT_DAILY,
  REPEAT_USERS
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import UsagePerformanceReportCellEdit from "./UsagePerformanceReportCellEdit";

const styles = () =>
  createStyles({
    nameCell: {
      width: "13%",
      minWidth: 142,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 16
    },
    editingNameCell: {
      paddingLeft: 8
    },
    checkbox: {
      fontSize: 16
    },
    checkBox: {
      padding: 0,
      marginRight: 8
    },
    checkBoxSize: {
      fontSize: 18
    },
    nameSpace: {
      marginRight: 8
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType;
  idx: number;
  isEditing: boolean;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
  ) => void;
  keyValue: string;
  isDisabledFood: boolean;
  reportType: ReportType;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportRow = (props: Props) => {
  const {
    usagePerformance,
    usagePerformanceSHISETSUNYUSHO,
    idx,
    isEditing,
    openModal,
    isDisabledFood,
    reportType,
    keyValue
  } = props;

  return (
    <React.Fragment>
      {reportType === REPEAT_DAILY ? (
        /* 利用者名 */
        <TableCellWrap
          key={`${idx}-sei-mei`}
          cellClass={props.classes.nameCell}
        >
          <span className={props.classes.nameSpace}>
            {usagePerformance.nameSei || ""}
          </span>
          {usagePerformance.nameMei || ""}
        </TableCellWrap>
      ) : null}
      {reportType === REPEAT_USERS ? (
        /* 日付 */
        <TableCellWrap
          key={`${idx}-target-date`}
          cellClass={props.classes.nameCell}
        >
          <CustomDateLabel
            date={
              usagePerformance.targetDate ? usagePerformance.targetDate : ""
            }
            dateFormat={"Do（dd）"}
            holiday={
              usagePerformance.isHoliday !== null
                ? usagePerformance.isHoliday
                : false
            }
          />
        </TableCellWrap>
      ) : null}
      {isEditing ? (
        <UsagePerformanceReportCellEdit
          usagePerformance={usagePerformance}
          usagePerformanceSHISETSUNYUSHO={usagePerformanceSHISETSUNYUSHO}
          idx={idx}
          openModal={openModal}
          keyValue={keyValue}
          isDisabledFood={isDisabledFood}
          reportType={reportType}
        />
      ) : (
        <UsagePerformanceReportCell
          usagePerformance={usagePerformance}
          usagePerformanceSHISETSUNYUSHO={usagePerformanceSHISETSUNYUSHO}
          idx={idx}
          openModal={openModal}
          isDisabledFood={isDisabledFood}
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(UsagePerformanceReportRow);
