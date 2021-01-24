import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import { getLabelFromOptions } from "@/utils/dataNormalizer";
import {
  COLLECTION_OF_UTILITY_FEE,
  FOOD_BREAKFAST,
  FOOD_LUNCH,
  FOOD_SUPPER,
  HOSPITALIZATION_OVERNIGHTSTAY,
  REGIONAL_TRANSITION,
  STATUS_TYPE
} from "@constants/mgr/SHISETSUNYUSHO/variables";
import {
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";

const styles = () =>
  createStyles({
    superLongCell: {
      width: "15%",
      minWidth: 256,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    longCell: {
      width: "15%",
      minWidth: 158,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    middleCell: {
      width: "7%",
      minWidth: 72,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    shortCell: {
      width: "5%",
      minWidth: 54,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    editCell: {
      width: "5%",
      minWidth: 77,
      boxSizing: "content-box",
      paddingLeft: 0,
      paddingTop: 14,
      paddingBottom: 14
    },
    hidden: {
      display: "none"
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType;
  idx: number;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
  ) => void;
  isDisabledFood: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportCell = (props: Props) => {
  const {
    usagePerformance,
    usagePerformanceSHISETSUNYUSHO,
    idx,
    classes,
    isDisabledFood
  } = props;

  return (
    <React.Fragment>
      {/* サービス提供の状況 */}
      <TableCellWrap
        key={`${idx}-status-type`}
        cellClass={classes.superLongCell}
      >
        {getLabelFromOptions(`${usagePerformance.statusType}`, STATUS_TYPE)}
      </TableCellWrap>

      {/* 入院・外泊 */}
      <TableCellWrap
        key={`${idx}-hospitalization-overnight-stay`}
        cellClass={classes.longCell}
      >
        {usagePerformanceSHISETSUNYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceSHISETSUNYUSHO.hospitalizationOvernightStay}`,
              HOSPITALIZATION_OVERNIGHTSTAY
            )
          : "-"}
      </TableCellWrap>

      {/* 地域移行加算 */}
      <TableCellWrap
        key={`${idx}-regional-transition`}
        cellClass={classes.middleCell}
      >
        {usagePerformanceSHISETSUNYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceSHISETSUNYUSHO.regionalTransition}`,
              REGIONAL_TRANSITION
            )
          : "-"}
      </TableCellWrap>

      {/* 光熱水費 */}
      <TableCellWrap
        key={`${idx}-collection-of-utility-fee`}
        cellClass={classes.middleCell}
      >
        {usagePerformanceSHISETSUNYUSHO
          ? getLabelFromOptions(
              `${usagePerformanceSHISETSUNYUSHO.collectionOfUtilityFee}`,
              COLLECTION_OF_UTILITY_FEE
            )
          : "-"}
      </TableCellWrap>

      {/* 食事提供(朝) */}
      <TableCellWrap
        key={`${idx}-food-breakfast`}
        cellClass={isDisabledFood ? classes.hidden : classes.middleCell}
      >
        {usagePerformanceSHISETSUNYUSHO && !usagePerformance.initialFlg
          ? getLabelFromOptions(
              `${usagePerformanceSHISETSUNYUSHO.foodBreakfast}`,
              FOOD_BREAKFAST
            )
          : "-"}
      </TableCellWrap>

      {/* 食事提供(昼) */}
      <TableCellWrap
        key={`${idx}-food-lunch`}
        cellClass={isDisabledFood ? classes.hidden : classes.shortCell}
      >
        {usagePerformanceSHISETSUNYUSHO && !usagePerformance.initialFlg
          ? getLabelFromOptions(
              `${usagePerformanceSHISETSUNYUSHO.foodLunch}`,
              FOOD_LUNCH
            )
          : "-"}
      </TableCellWrap>

      {/* 食事提供(夜) */}
      <TableCellWrap
        key={`${idx}-food-supper`}
        cellClass={isDisabledFood ? classes.hidden : classes.shortCell}
      >
        {usagePerformanceSHISETSUNYUSHO && !usagePerformance.initialFlg
          ? getLabelFromOptions(
              `${usagePerformanceSHISETSUNYUSHO.foodSupper}`,
              FOOD_SUPPER
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
