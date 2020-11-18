import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import { getLabelFromOptions } from "@/utils/dataNormalizer";
import {
  SupplyFoodsServiceList,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST1,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST2,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST3
} from "@constants/variables";
import {
  OTHER_SUPPORT,
  SUPPLY_PICKUP_SERVICE_LIST,
  EMERGENCY_SHORTTERM,
  OVER_HOURS,
  STATUS_TYPE,
  SUPPLY_FOOD_SERVICE_LIST
} from "@constants/mgr/TANKINYUSHO/variables";
import {
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType
} from "@stores/domain/mgr/TANKINYUSHO/report/types";

const styles = () =>
  createStyles({
    cell: {
      width: "8.5%",
      minWidth: 88,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    otherSupportCell: {
      width: "16.8%",
      minWidth: 174,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    pickupPremiseCell: {
      width: "10%",
      minWidth: 103,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    editCell: {
      width: "13.1%",
      minWidth: 135,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      paddingTop: 14,
      paddingBottom: 14
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType;
  idx: number;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportCell = (props: Props) => {
  const { usagePerformance, usagePerformanceTANKINYUSHO, idx, classes } = props;
  /**
   * 同一敷地内の選択肢変更イベント
   */
  const changePickupPremisesState = (pickupValue: number) => {
    let pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST0;
    switch (pickupValue) {
      case 1:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST1;
        break;
      case 2:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST2;
        break;
      case 3:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST3;
        break;
    }
    return pickupPremisesList;
  };
  return (
    <React.Fragment>
      {/* サービス提供の状況 */}
      <TableCellWrap key={`${idx}-status-type`} cellClass={classes.cell}>
        {getLabelFromOptions(`${usagePerformance.statusType}`, STATUS_TYPE)}
      </TableCellWrap>

      {/* 生活介護または指定通所支援等を実施 */}
      <TableCellWrap
        key={`${idx}-other-support`}
        cellClass={classes.otherSupportCell}
      >
        {usagePerformanceTANKINYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceTANKINYUSHO.otherSupport}`,
              OTHER_SUPPORT
            )
          : "-"}
      </TableCellWrap>

      {/* 食事提供 */}
      <TableCellWrap key={`${idx}- food`} cellClass={classes.cell}>
        {getLabelFromOptions(
          usagePerformanceTANKINYUSHO
            ? `${usagePerformanceTANKINYUSHO.food}`
            : SupplyFoodsServiceList["-"],
          SUPPLY_FOOD_SERVICE_LIST
        )}
      </TableCellWrap>

      {/* 送迎 */}
      <TableCellWrap key={`${idx}-pick-up`} cellClass={classes.cell}>
        {usagePerformanceTANKINYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceTANKINYUSHO.pickup}`,
              SUPPLY_PICKUP_SERVICE_LIST
            )
          : "-"}
      </TableCellWrap>

      {/* 同一敷地内 */}
      <TableCellWrap
        key={`${idx}-pick-up-premises`}
        cellClass={classes.pickupPremiseCell}
      >
        {usagePerformanceTANKINYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceTANKINYUSHO.pickupPremises}`,
              changePickupPremisesState(
                props.usagePerformanceTANKINYUSHO.pickup
              )
            )
          : "-"}
      </TableCellWrap>

      {/* 緊急短期入所受入 */}
      <TableCellWrap
        key={`${idx}-emergency-shortitem-flg`}
        cellClass={classes.cell}
      >
        {usagePerformanceTANKINYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceTANKINYUSHO.emergencyShortterm}`,
              EMERGENCY_SHORTTERM
            )
          : "-"}
      </TableCellWrap>

      {/* 単独型18時間以上 */}
      <TableCellWrap key={`${idx}-over-hours-flg`} cellClass={classes.cell}>
        {usagePerformanceTANKINYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceTANKINYUSHO.overHours}`,
              OVER_HOURS
            )
          : "-"}
      </TableCellWrap>

      {/* 編集ボタン */}
      <TableCellWrap
        key={`${idx}-edit-icon`}
        cellClass={classes.editCell}
        align={"right"}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(UsagePerformanceReportCell);
