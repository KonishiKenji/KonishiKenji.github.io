import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import { getLabelFromOptions } from "@/utils/dataNormalizer";
import {
  TRIAL_USAGE_KIND,
  SUPPLY_PICKUP_SERVICE,
  SUPPLY_FOODS_SERVICE,
  MEDICAL_COOPERATION,
  SHORT_STAY_LIST,
  NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES
} from "@constants/variables";
import {
  JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT,
  JIRITSUKUNRENSEIKATSU_IN_OUT_RECORDS_STATUS_LIST
} from "@constants/mgr/JIRITSUKUNRENSEIKATSU/variables";
import { FacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/types";
import Edit from "@material-ui/icons/Edit";
import { ReportInterface } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import { convertTimeHHMM } from "@utils/date";

const styles = (): StyleRules =>
  createStyles({
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
    iconCell: {
      width: 54,
      boxSizing: "content-box",
      paddingLeft: 16
    }
  });

interface OwnProps {
  params: ReportInterface;
  facility: FacilityState;
  idx: number;
  openModal: (param: ReportInterface) => void;
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
      <TableCellWrap key={`${idx}-status-type`} cellClass={classes.middleCell}>
        {getLabelFromOptions(
          paramsStatusValue,
          JIRITSUKUNRENSEIKATSU_IN_OUT_RECORDS_STATUS_LIST
        )}
      </TableCellWrap>

      {/* 開始時間 */}
      <TableCellWrap key={`${idx}-in-time`} cellClass={classes.shortCell}>
        {params.inTime
          ? convertTimeHHMM(new Date(params.inTime.replace(/-/g, "/")))
          : "-"}
      </TableCellWrap>

      {/* 終了時間 */}
      <TableCellWrap key={`${idx}-out-time`} cellClass={classes.shortCell}>
        {params.outTime
          ? convertTimeHHMM(new Date(params.outTime.replace(/-/g, "/")))
          : "-"}
      </TableCellWrap>

      {/* 送迎 */}
      {props.facility.transferServiceFlag && (
        <TableCellWrap key={`${idx}-travel-time`} cellClass={classes.shortCell}>
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
      <TableCellWrap key={`${idx}-visit-support`} cellClass={classes.shortCell}>
        {getLabelFromOptions(
          params.visitSupport ? params.visitSupport.toString() : "0",
          JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT
        )}
      </TableCellWrap>

      {/* 食事提供 */}
      {props.facility.mealSaservedServiceFlag && (
        <TableCellWrap
          key={`${idx}-supply-foods-service`}
          cellClass={classes.shortCell}
        >
          {isAcceptableStatusField && params.didGetFood && !params.initialFlg
            ? getLabelFromOptions(params.didGetFood, SUPPLY_FOODS_SERVICE)
            : "-"}
        </TableCellWrap>
      )}

      {/* 医療連携体制 */}
      <TableCellWrap
        key={`${idx}-.medical-cooperation`}
        cellClass={classes.shortCell}
      >
        {params.medicalCooperation
          ? getLabelFromOptions(params.medicalCooperation, MEDICAL_COOPERATION)
          : "-"}
      </TableCellWrap>

      {/* 体験利用 */}
      <TableCellWrap
        key={`${idx}-trial-usage-kind`}
        cellClass={classes.shortCell}
      >
        {params.trialUsageKind
          ? getLabelFromOptions(params.trialUsageKind, TRIAL_USAGE_KIND)
          : "-"}
      </TableCellWrap>

      {/* 短期滞在 */}
      {props.facility.shortStayType !== "0" && (
        <TableCellWrap
          key={`${idx}-short-stay-flg`}
          cellClass={classes.shortCell}
        >
          {params.shortStayFlg
            ? getLabelFromOptions(params.shortStayFlg, SHORT_STAY_LIST)
            : "-"}
        </TableCellWrap>
      )}

      {/* 編集ボタン */}
      <TableCellWrap
        key={`${idx}-edit-icon`}
        cellClass={classes.iconCell}
        align="center"
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
