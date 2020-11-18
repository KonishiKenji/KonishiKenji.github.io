import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import DoneIcon from "@material-ui/icons/Done";
import {
  UserInOutRecords,
  DailyInOutRecords
} from "@stores/domain/mgr/IAB/report/types";
import { IAB_SUMMARY_SERVICE_STATUS } from "@constants/mgr/IAB/variables";

const styles = () =>
  createStyles({
    middleCell: {
      width: 100,
      boxSizing: "border-box",
      textAlign: "center",
      borderRight: "dashed 1px #979797",
      padding: 0,
      lineHeight: 1,
      "&:last-child": {
        borderRight: "none"
      }
    },
    doneIcon: {
      width: 18,
      height: 18,
      color: "rgba(0, 0, 0, 0.54)"
    }
  });

interface OwnProps {
  inOutRecord: DailyInOutRecords | UserInOutRecords;
  idx: number;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailModalContentCell = (props: Props) => {
  const { idx, classes, inOutRecord } = props;
  return (
    <React.Fragment>
      {/* 利用なし */}
      <TableCellWrap key={`${idx}-status-type`} cellClass={classes.middleCell}>
        {!Object.keys(IAB_SUMMARY_SERVICE_STATUS).some(
          key => IAB_SUMMARY_SERVICE_STATUS[key].value === inOutRecord.status
        ) && <DoneIcon className={classes.doneIcon} />}
      </TableCellWrap>

      {/* 通所 */}
      <TableCellWrap key={`${idx}-in-out-place`} cellClass={classes.middleCell}>
        {inOutRecord.status ===
          IAB_SUMMARY_SERVICE_STATUS.USUAL_PLACE.value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 欠席対応 */}
      <TableCellWrap key={`${idx}-when-absent`} cellClass={classes.middleCell}>
        {inOutRecord.status ===
          IAB_SUMMARY_SERVICE_STATUS.WHEN_ABSENT.value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 訪問 */}
      <TableCellWrap key={`${idx}-visit`} cellClass={classes.middleCell}>
        {inOutRecord.status === IAB_SUMMARY_SERVICE_STATUS.VISIT.value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 体験利用支援 */}
      <TableCellWrap
        key={`${idx}-trial-use-support`}
        cellClass={classes.middleCell}
      >
        {inOutRecord.status ===
          IAB_SUMMARY_SERVICE_STATUS.TRIAL_USE_SUPPORT.value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 施設外就労 or 移行準備支援体制加算(I) */}
      <TableCellWrap key={`${idx}-IAB-1`} cellClass={classes.middleCell}>
        {(inOutRecord.status ===
          IAB_SUMMARY_SERVICE_STATUS.OFFSITE_WORK.value ||
          inOutRecord.status ===
            IAB_SUMMARY_SERVICE_STATUS.SUPPORT_IKOU_1.value) && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 施設外支援 or 移行準備支援体制加算(II) */}
      <TableCellWrap key={`${idx}-IAB-2`} cellClass={classes.middleCell}>
        {(inOutRecord.status ===
          IAB_SUMMARY_SERVICE_STATUS.OFFSITE_SUPPORT.value ||
          inOutRecord.status ===
            IAB_SUMMARY_SERVICE_STATUS.SUPPORT_IKOU_2.value) && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 欠席 */}
      <TableCellWrap key={`${idx}-absent`} cellClass={classes.middleCell}>
        {inOutRecord.status === IAB_SUMMARY_SERVICE_STATUS.ABSENT.value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>
    </React.Fragment>
  );
};
export default withStyles(styles)(InOutDetailModalContentCell);
