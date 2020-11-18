import * as React from "react";

import Table, { CellParam } from "@components/molecules/Table";
import TableHead from "@components/molecules/TableHead";

import { WorkRecordsState } from "@stores/domain/workRecords/types";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 32,
      margin: 16,
      minHeight: 300
    },
    button: {
      height: 36,
      boxShadow: "none",
      fontSize: 14,
      textTransform: "none"
    },
    empty: {
      padding: 48,
      textAlign: "center",
      verticalAlign: "middle",
      fontSize: 14,
      border: 0
    },
    header: {
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      position: "relative",
      "& > :first-child": {
        width: "100%"
      }
    },
    excelButtons: {
      position: "absolute",
      right: 0,
      top: "-8px"
    },
    table: {
      marginTop: 16,
      marginBottom: 16
    },
    tableRowOdd: {
      backgroundColor: "#f5f5f5"
    },
    tableRowEven: {
      backgroundColor: "#ffffff"
    },
    tableCell: {
      border: 0,
      padding: 16,
      fontSize: 14,
      verticalAlign: "top"
    },
    tableCell0: {
      minWidth: 242
    },
    tableCell1: {
      minWidth: 242
    },
    tableCell2: {
      width: 106
    },
    tableCell3: {
      width: 106
    },
    tableCell4: {
      width: 134
    },
    tableCell5: {
      width: 200
    }
  });

interface OwnProps {
  targetMonth: string;
  summaryWorkRecords: WorkRecordsState["data"]["summary"];
  onClickDownload: () => void;
  excludedUserIds: number[];
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 作業時間 結果テーブル
 */
const WorkRecordsList = (props: Props) => {
  const { classes, summaryWorkRecords } = props;

  const workRecords = summaryWorkRecords.filter(
    record => !props.excludedUserIds.includes(record.uifId)
  );

  const headerItems: CellParam[] = [
    {
      align: "left",
      label: "受給者証番号",
      className: `${classes.tableCell} ${classes.tableCell0}`
    },
    {
      align: "left",
      label: "利用者名",
      className: `${classes.tableCell} ${classes.tableCell1}`
    },
    {
      align: "left",
      label: "利用日数",
      className: `${classes.tableCell} ${classes.tableCell2}`
    },
    {
      align: "left",
      label: "食事回数",
      className: `${classes.tableCell} ${classes.tableCell3}`
    },
    {
      align: "left",
      label: "作業時間合計",
      className: `${classes.tableCell} ${classes.tableCell4}`
    },
    {
      align: "left",
      label: "休憩時間合計",
      className: `${classes.tableCell} ${classes.tableCell5}`
    }
  ];

  /**
   * HH:MM:SS の時刻からHH:MMに変換
   * @param time
   */
  const formatHourAndMinutes = (time: string) => {
    const hm = time.includes(" ") ? time.split(" ")[1] : time;
    const [hour, minutes] = hm.split(":");
    return `${hour}:${minutes}`;
  };

  /**
   * テーブルの1行
   */
  const tableRow = (
    row: WorkRecordsState["data"]["summary"][0],
    idx: number
  ) => (
    <TableRow
      key={`table-key-${idx}`}
      className={idx % 2 === 1 ? classes.tableRowOdd : classes.tableRowEven}
    >
      <TableCell
        key={`table-cell-${idx}-1`}
        className={`${classes.tableCell} ${classes.tableCell}${idx}`}
      >
        {row.recipientNumber}
      </TableCell>
      <TableCell
        key={`table-cell-${idx}-2`}
        className={`${classes.tableCell} ${classes.tableCell}${idx}`}
      >
        {row.userName}
      </TableCell>
      <TableCell
        key={`table-cell-${idx}-3`}
        className={`${classes.tableCell} ${classes.tableCell}${idx}`}
      >
        {row.useCounts}
      </TableCell>
      <TableCell
        key={`table-cell-${idx}-4`}
        className={`${classes.tableCell} ${classes.tableCell}${idx}`}
      >
        {row.foodCounts}
      </TableCell>
      <TableCell
        key={`table-cell-${idx}-5`}
        className={`${classes.tableCell} ${classes.tableCell}${idx}`}
      >
        {formatHourAndMinutes(row.totalWorkTime)}
      </TableCell>
      <TableCell
        key={`table-cell-${idx}-6`}
        className={`${classes.tableCell} ${classes.tableCell}${idx}`}
      >
        {formatHourAndMinutes(row.totalBreakTime)}
      </TableCell>
    </TableRow>
  );

  const existSummaryWorkRecords = workRecords.length > 0;

  return (
    <Paper elevation={0} className={classes.container}>
      <div className={props.classes.header}>
        <div>{`${props.targetMonth} 作業時間の詳細`}</div>
        <div className={props.classes.excelButtons}>
          {existSummaryWorkRecords && (
            <Button
              variant="contained"
              color="secondary"
              disabled={!existSummaryWorkRecords}
              className={classes.button}
              onClick={props.onClickDownload}
            >
              Excelファイルをダウンロード
            </Button>
          )}
        </div>
      </div>
      <Table key={`work-records-table`} className={classes.table}>
        <TableHead key={0} tabIndex={0} selected={false} items={headerItems} />
        <TableBody>
          {existSummaryWorkRecords ? (
            workRecords.map(tableRow)
          ) : (
            <TableCell className={classes.empty} colSpan={6} align="center">
              作業時間の情報がありません。利用実績・作業時間を入力後、ご利用ください。
            </TableCell>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(WorkRecordsList);
