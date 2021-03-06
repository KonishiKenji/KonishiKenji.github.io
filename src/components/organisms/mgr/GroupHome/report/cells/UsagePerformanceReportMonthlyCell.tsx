import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import UsagePerformanceReportCell from "@components/organisms/mgr/GroupHome/report/cells/UsagePerformanceReportCell";
import UsagePerformanceReportCellEdit from "@components/organisms/mgr/GroupHome/report/cells/UsagePerformanceReportCellEdit";
import { Report } from "@stores/domain/report/type";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";

const styles = (): StyleRules =>
  createStyles({
    middleCell: {
      width: 130,
      minWidth: 130,
      boxSizing: "content-box"
    }
  });

interface OwnProps {
  params: Report;
  facility: FacilityState;
  idx: number;
  isEditing: boolean;
  hasNightSupportType: boolean;
  setStatusType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setNightSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setHospitalizationSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setGetHomeSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setDaytimeSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setMedicalSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setLifeSupportFlg: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setHomeCareFlg: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setRemarks: (remarks: string, key: number) => void;
  onChangeDisabled: (errorMessage: string, key: number) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportMonthlyCell = (props: Props): JSX.Element => {
  const { params, idx, isEditing, hasNightSupportType, facility } = props;
  return (
    <>
      {/* 日付 */}
      <TableCellWrap
        key={`${idx}-target-date`}
        cellClass={props.classes.middleCell}
      >
        <CustomDateLabel
          date={params.targetDate}
          dateFormat="Do（dd）"
          holiday={params.isHoliday}
        />
      </TableCellWrap>
      {isEditing ? (
        <UsagePerformanceReportCellEdit {...props} />
      ) : (
        <UsagePerformanceReportCell
          params={params}
          facility={facility}
          idx={idx}
          hasNightSupportType={hasNightSupportType}
        />
      )}
    </>
  );
};

export default withStyles(styles)(UsagePerformanceReportMonthlyCell);
