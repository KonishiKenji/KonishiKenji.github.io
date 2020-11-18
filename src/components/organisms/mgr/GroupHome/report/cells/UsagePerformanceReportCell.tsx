import * as React from "react";
import * as ClassNames from "classnames";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import { getLabelFromOptions } from "@/utils/dataNormalizer";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { Report } from "@stores/domain/report/type";
import {
  USAGE_PERFORMANCE_STATUS_TYPE_FULL,
  USAGE_PERFORMANCE_NIGHT_SUPPORT_TYPE,
  USAGE_PERFORMANCE_HOSPITALIZATION_SUPPORT_TYPE,
  USAGE_PERFORMANCE_GET_HOME_SUPPORT_TYPE,
  USAGE_PERFORMANCE_DAYTIME_SUPPORT_TYPE,
  USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE,
  LIFE_SUPPORT_FLG
} from "@constants/variables";
import { HOME_CARE_FLG } from "@constants/mgr/GroupHome/variables";

const styles = (): StyleRules =>
  createStyles({
    nightShortCell: {
      width: 60,
      minWidth: 60,
      boxSizing: "content-box"
    },
    shortCell: {
      width: 64,
      minWidth: 64,
      boxSizing: "content-box"
    },
    middleCell: {
      width: 130,
      minWidth: 130,
      boxSizing: "content-box"
    },
    longCell: {
      width: 226,
      minWidth: 226,
      boxSizing: "content-box"
    },
    breakWord: {
      wordBreak: "break-all"
    }
  });

interface OwnProps {
  params: Report;
  facility: FacilityState;
  idx: number;
  hasNightSupportType: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportCell = (props: Props): JSX.Element => {
  const { params, idx, hasNightSupportType, classes } = props;
  const shortCellClassName = hasNightSupportType
    ? classes.nightShortCell
    : classes.shortCell;

  const remarkClass = ClassNames(classes.middleCell, classes.breakWord);

  return (
    <>
      {/* サービス提供の状況 */}
      <TableCellWrap
        key={`${idx}-status-type`}
        cellClass={hasNightSupportType ? classes.middleCell : classes.longCell}
      >
        {getLabelFromOptions(
          params.statusType,
          USAGE_PERFORMANCE_STATUS_TYPE_FULL
        )}
      </TableCellWrap>

      {/* 夜間支援 */}
      <TableCellWrap
        key={`${idx}-usage-performance`}
        hidden={!hasNightSupportType}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(
          params.nightSupportType,
          USAGE_PERFORMANCE_NIGHT_SUPPORT_TYPE
        )}
      </TableCellWrap>

      {/* 入院時支援 */}
      <TableCellWrap
        key={`${idx}-hospitalization-support-type`}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(
          params.hospitalizationSupportType,
          USAGE_PERFORMANCE_HOSPITALIZATION_SUPPORT_TYPE
        )}
      </TableCellWrap>

      {/* 帰宅時支援 */}
      <TableCellWrap
        key={`${idx}-get-home-support-type`}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(
          params.getHomeSupportType,
          USAGE_PERFORMANCE_GET_HOME_SUPPORT_TYPE
        )}
      </TableCellWrap>

      {/* 日中支援 */}
      <TableCellWrap
        key={`${idx}-daytime-support-type`}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(
          params.daytimeSupportType,
          USAGE_PERFORMANCE_DAYTIME_SUPPORT_TYPE
        )}
      </TableCellWrap>

      {/* 医療連携 */}
      <TableCellWrap
        key={`${idx}-medical-support-type`}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(
          params.medicalSupportType,
          USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE
        )}
      </TableCellWrap>

      {/* 自立支援 */}
      <TableCellWrap
        key={`${idx}-life-support-flg`}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(params.lifeSupportFlg, LIFE_SUPPORT_FLG)}
      </TableCellWrap>

      {/* 居宅介護 */}
      <TableCellWrap
        key={`${idx}-home-care-flg`}
        cellClass={shortCellClassName}
      >
        {getLabelFromOptions(params.homeCareFlg, HOME_CARE_FLG)}
      </TableCellWrap>

      {/* 備考 */}
      <TableCellWrap key={`${idx}-remarks`} cellClass={remarkClass}>
        {params.remarks || "-"}
      </TableCellWrap>
    </>
  );
};

export default withStyles(styles)(UsagePerformanceReportCell);
