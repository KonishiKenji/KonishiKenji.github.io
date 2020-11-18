import * as React from "react";
import * as classNames from "classnames";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import { getLabelFromOptions } from "@/utils/dataNormalizer";
import {
  VISIT_SUPPORT,
  IAB_USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE,
  SUPPLY_PICKUP_SERVICE,
  SUPPLY_FOODS_SERVICE,
  NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES
} from "@constants/variables";
import { IAB_IN_OUT_RECORDS_STATUS_LIST } from "@constants/mgr/IAB/variables";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import Edit from "@material-ui/icons/Edit";
import { IABReport } from "@stores/domain/mgr/IAB/report/types";
import { convertTimeHHMM } from "@utils/date";

const styles = (): StyleRules =>
  createStyles({
    cell: {
      width: 72,
      minWidth: 72,
      padding: "0 0 0 16px",
      boxSizing: "content-box",
      borderBottom: "none"
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
      // paddingRightはcssレベルの影響でstyleでないと通らない
      paddingLeft: 16,
      minWidth: 54,
      borderBottom: "none"
    },
    editButton: {
      width: 22,
      height: 22,
      color: "#0277bd",
      cursor: "pointer",
      verticalAlign: "text-bottom"
    }
  });

interface OwnProps {
  isDaily: boolean;
  params: IABReport;
  facility: FacilityState;
  idx: number;
  openModal: (param: IABReport) => void;
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
      {/* 利用者名 or 日付 */}
      <TableCell
        key={`first-cell-${props.idx}`}
        className={classNames(classes.cell, classes.firstCell)}
      >
        {props.isDaily ? (
          params.name
        ) : (
          <CustomDateLabel
            date={params.target_date ? params.target_date : ""}
            dateFormat="Do（dd）"
            holiday={params.is_holiday}
          />
        )}
      </TableCell>

      {/* サービス提供の状況 */}
      <TableCell
        key={`${idx}-status-type`}
        className={classNames(classes.cell, classes.secondCell)}
      >
        {getLabelFromOptions(paramsStatusValue, IAB_IN_OUT_RECORDS_STATUS_LIST)}
      </TableCell>

      {/* 開始時間 */}
      <TableCell key={`${idx}-in-time`} className={classNames(classes.cell)}>
        {params.inTime
          ? convertTimeHHMM(new Date(params.inTime.replace(/-/g, "/")))
          : "-"}
      </TableCell>

      {/* 終了時間 */}
      <TableCell key={`${idx}-out-time`} className={classNames(classes.cell)}>
        {params.outTime
          ? convertTimeHHMM(new Date(params.outTime.replace(/-/g, "/")))
          : "-"}
      </TableCell>

      {/* 送迎 */}
      {props.facility.transferServiceFlag && (
        <TableCell
          key={`${idx}-travel-time`}
          className={classNames(classes.cell)}
        >
          {isAcceptableStatusField
            ? getLabelFromOptions(
                params.travelTime && !params.initialFlg
                  ? params.travelTime
                  : "0",
                SUPPLY_PICKUP_SERVICE
              )
            : "-"}
        </TableCell>
      )}

      {/* 食事提供 */}
      {props.facility.mealSaservedServiceFlag && (
        <TableCell
          key={`${idx}-supply-foods-service`}
          className={classNames(classes.cell)}
        >
          {isAcceptableStatusField && params.didGetFood && !params.initialFlg
            ? getLabelFromOptions(params.didGetFood, SUPPLY_FOODS_SERVICE)
            : "-"}
        </TableCell>
      )}

      {/* 訪問支援 */}
      <TableCell
        key={`${idx}-visit-support`}
        className={classNames(classes.cell)}
      >
        {getLabelFromOptions(
          params.visitSupport ? params.visitSupport.toString() : "0",
          VISIT_SUPPORT
        )}
      </TableCell>

      {/* 医療連携体制 */}
      <TableCell
        key={`${idx}-trial-usage-kind`}
        className={classNames(classes.cell, classes.lastCell)}
      >
        {params.medicalCooperation
          ? getLabelFromOptions(
              params.medicalCooperation,
              IAB_USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE
            )
          : "-"}
      </TableCell>

      {/* 編集ボタン */}
      <TableCell
        key={`${idx}-edit-icon`}
        align="right"
        className={classes.editCell}
        style={{ paddingRight: 16 }}
      >
        <Edit className={classes.editButton} onClick={openModal} />
      </TableCell>
    </>
  );
};

export default withStyles(styles)(InOutReportCell);
