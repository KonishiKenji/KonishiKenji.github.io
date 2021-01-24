import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import DoneIcon from "@material-ui/icons/Done";
import { SERVICE_STATUS, FacilityType } from "@constants/variables";

const styles = (): StyleRules =>
  createStyles({
    middleCell: {
      boxSizing: "content-box",
      textAlign: "center",
      borderRight: "dashed 1px #979797",
      padding: 0
    },
    lastCell: {
      borderRight: "none",
      textAlign: "center",
      boxSizing: "content-box",
      paddingLeft: 24,
      paddingTop: 0,
      paddingBottom: 0
    },
    doneIcon: {
      width: 18,
      height: 18,
      color: "rgba(0, 0, 0, 0.54)"
    }
  });

interface DailyInOutRecords {
  // 作業実績：名前
  userName: string | undefined;
  // 作業実績：受給者証番号
  recipientNumber: string | undefined;
  // 作業実績：利用実績
  status: number | undefined | null;
}
interface UserInOutRecords {
  // 作業実績：日
  date: string | undefined;
  // 作業実績：利用実績
  status: number | undefined | null;
}

interface OwnProps {
  inOutRecord: DailyInOutRecords | UserInOutRecords;
  idx: number;
  serviceType: FacilityType;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportContentCell = (props: Props): JSX.Element => {
  const { idx, classes, inOutRecord, serviceType } = props;
  const viewFlg =
    serviceType === FacilityType.IKOU ||
    serviceType === FacilityType.A ||
    serviceType === FacilityType.B;
  const contentCell = (
    <>
      {/* 利用なし */}
      <TableCellWrap key={`${idx}-status-type`} cellClass={classes.middleCell}>
        {inOutRecord.status === SERVICE_STATUS[0].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 通所 */}
      <TableCellWrap key={`${idx}-in-out-place`} cellClass={classes.middleCell}>
        {inOutRecord.status === SERVICE_STATUS[1].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 欠席対応 */}
      <TableCellWrap key={`${idx}-when-absent`} cellClass={classes.middleCell}>
        {inOutRecord.status === SERVICE_STATUS[4].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 訪問 */}
      <TableCellWrap key={`${idx}-visit`} cellClass={classes.middleCell}>
        {inOutRecord.status === SERVICE_STATUS[5].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 体験利用支援 */}
      <TableCellWrap
        key={`${idx}-trial-use-support`}
        cellClass={classes.middleCell}
      >
        {inOutRecord.status === SERVICE_STATUS[6].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>

      {/* 施設外就労 or 移行準備支援体制加算(I) */}
      {viewFlg && (
        <TableCellWrap key={`${idx}-IAB-1`} cellClass={classes.middleCell}>
          {(inOutRecord.status === SERVICE_STATUS[2].value ||
            inOutRecord.status === SERVICE_STATUS[7].value) && (
            <DoneIcon className={classes.doneIcon} />
          )}
        </TableCellWrap>
      )}

      {/* 施設外支援 or 移行準備支援体制加算(II) */}
      {viewFlg && (
        <TableCellWrap key={`${idx}-IAB-2`} cellClass={classes.middleCell}>
          {(inOutRecord.status === SERVICE_STATUS[3].value ||
            inOutRecord.status === SERVICE_STATUS[8].value) && (
            <DoneIcon className={classes.doneIcon} />
          )}
        </TableCellWrap>
      )}

      {/* 欠席 */}
      <TableCellWrap key={`${idx}-absent`} cellClass={classes.lastCell}>
        {inOutRecord.status === SERVICE_STATUS[9].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>
    </>
  );
  return contentCell;
};
export default withStyles(styles)(InOutReportContentCell);
