import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import DoneIcon from "@material-ui/icons/Done";
import { SERVICE_STATUS } from "@constants/variables";

const styles = () =>
  createStyles({
    middleCell: {
      width: 129,
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
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportContentCell = (props: Props) => {
  const { idx, classes, inOutRecord } = props;
  return (
    <React.Fragment>
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
      {/* 欠席 */}
      <TableCellWrap key={`${idx}-absent`} cellClass={classes.lastCell}>
        {inOutRecord.status === SERVICE_STATUS[9].value && (
          <DoneIcon className={classes.doneIcon} />
        )}
      </TableCellWrap>
    </React.Fragment>
  );
};
export default withStyles(styles)(InOutReportContentCell);
