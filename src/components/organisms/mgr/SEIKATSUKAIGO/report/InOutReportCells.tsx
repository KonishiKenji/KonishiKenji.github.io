import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import { getLabelFromOptions } from "@/utils/dataNormalizer";
import {
  SEIKATSUKAIGO_IN_OUT_RECORDS_STATUS,
  VISIT_SUPPORT,
  TRIAL_USAGE_KIND,
  SUPPLY_PICKUP_SERVICE,
  SUPPLY_FOODS_SERVICE,
  NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES
} from "@constants/variables";

import { FacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import Edit from "@material-ui/icons/Edit";
import { SEIKATSUKAIGOReport } from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { convertTimeHHMM } from "@utils/date";

const styles = (): StyleRules =>
  createStyles({
    shortCell: {
      width: "8.3%",
      minWidth: 71,
      boxSizing: "content-box",
      lineHeight: "28px",
      "&:last-child": {
        paddingRight: 16
      }
    },
    middleCell: {
      width: "16.6%",
      minWidth: 158,
      boxSizing: "content-box",
      lineHeight: "28px"
    },
    longCell: {
      width: "24.9%",
      minWidth: 158,
      boxSizing: "content-box",
      lineHeight: "28px"
    }
  });

interface OwnProps {
  params: SEIKATSUKAIGOReport;
  facility: FacilityState;
  idx: number;
  classOption: string;
  openModal: (param: SEIKATSUKAIGOReport) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportCell = (props: Props): JSX.Element => {
  const { params, idx, classes } = props;
  const openModal = (): void => {
    props.openModal(params);
  };

  const paramsStatusValue = params.status ? params.status.toString() : "0";
  const isAcceptableStatusField =
    paramsStatusValue === "0"
      ? false
      : !NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES.find(
          (item) => item === paramsStatusValue
        );

  return (
    <>
      {/* サービス提供の状況 */}
      <TableCellWrap
        key={`${idx}-status-type`}
        cellClass={`${classes.longCell} ${props.classOption}`}
      >
        {getLabelFromOptions(
          paramsStatusValue,
          SEIKATSUKAIGO_IN_OUT_RECORDS_STATUS
        )}
      </TableCellWrap>

      {/* 開始時間 */}
      <TableCellWrap
        key={`${idx}-in-time`}
        cellClass={`${classes.shortCell} ${props.classOption}`}
      >
        {params.inTime
          ? convertTimeHHMM(new Date(params.inTime.replace(/-/g, "/")))
          : "-"}
      </TableCellWrap>

      {/* 終了時間 */}
      <TableCellWrap
        key={`${idx}-out-time`}
        cellClass={`${classes.shortCell} ${props.classOption}`}
      >
        {params.outTime
          ? convertTimeHHMM(new Date(params.outTime.replace(/-/g, "/")))
          : "-"}
      </TableCellWrap>

      {/* 送迎 */}
      {props.facility.transferServiceFlag && (
        <TableCellWrap
          key={`${idx}-travel-time`}
          cellClass={`${classes.shortCell} ${props.classOption}`}
        >
          {isAcceptableStatusField
            ? getLabelFromOptions(
                params.travelTime && !params.initialFlg
                  ? params.travelTime
                  : "0",
                SUPPLY_PICKUP_SERVICE
              )
            : "-"}
        </TableCellWrap>
      )}

      {/* 訪問支援 */}
      <TableCellWrap
        key={`${idx}-visit-support`}
        cellClass={`${classes.shortCell} ${props.classOption}`}
      >
        {getLabelFromOptions(
          params.visitSupport ? params.visitSupport.toString() : "0",
          VISIT_SUPPORT
        )}
      </TableCellWrap>

      {/* 食事提供 */}
      {props.facility.mealSaservedServiceFlag && (
        <TableCellWrap
          key={`${idx}-supply-foods-service`}
          cellClass={`${classes.shortCell} ${props.classOption}`}
        >
          {isAcceptableStatusField && params.didGetFood && !params.initialFlg
            ? getLabelFromOptions(params.didGetFood, SUPPLY_FOODS_SERVICE)
            : "-"}
        </TableCellWrap>
      )}

      {/* 体験利用 */}
      <TableCellWrap
        key={`${idx}-trial-usage-kind`}
        cellClass={`${classes.shortCell} ${props.classOption}`}
      >
        {params.trialUsageKind
          ? getLabelFromOptions(params.trialUsageKind, TRIAL_USAGE_KIND)
          : "-"}
      </TableCellWrap>

      {/* 編集ボタン */}
      <TableCellWrap
        key={`${idx}-edit-icon`}
        cellClass={`${classes.shortCell} ${props.classOption}`}
        align="right"
      >
        <Edit
          style={{ width: 18, height: 18, color: "#0277bd", cursor: "pointer" }}
          onClick={openModal}
        />
      </TableCellWrap>
    </>
  );
};

export default withStyles(styles)(InOutReportCell);
