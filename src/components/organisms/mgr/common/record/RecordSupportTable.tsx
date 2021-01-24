import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Table from "@components/molecules/Table";

const styles = () =>
  createStyles({
    root: {
      padding: 32
    },
    head: {
      backgroundColor: blueGrey[300]
    },
    name: {
      width: 155
    },
    item: {
      width: 166
    },
    field: {
      maxWidth: "100%"
    },
    recorder: {
      width: 188
    },
    recorderAndEdit: {
      width: 200
    }
  });

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: `12px 16px`,
    color: theme.palette.common.white,
    fontSize: 14
  }
}))(TableCell);

interface OwnProps {
  pattern?: "work" | "interview" | "daily";
}

type Props = OwnProps & React.Props<{}> & WithStyles<typeof styles>;

/**
 * 日々の記録(支援記録)・利用者ごと（支援記録/作業記録/面談記録）で利用するテーブル
 * @param pattern 差分吸収用、work＝作業記録、interview=面談記録、daily＝日々の記録として指定。
 * @param children ./RecordSupportTableRow.tsxを想定
 */
const SupportRecord = (props: Props) => (
  <Table key="support-record-table">
    <TableHead className={props.classes.head}>
      <TableRow>
        {props.pattern === "daily" ? (
          <StyledTableCell className={props.classes.name}>
            利用者名
          </StyledTableCell>
        ) : (
          <StyledTableCell className={props.classes.name}>日付</StyledTableCell>
        )}
        {props.pattern !== "work" && (
          <StyledTableCell className={props.classes.item}>項目</StyledTableCell>
        )}
        <StyledTableCell className={props.classes.field}>内容</StyledTableCell>
        <StyledTableCell
          className={
            props.pattern === "work" || props.pattern === "interview"
              ? props.classes.recorderAndEdit
              : props.classes.recorder
          }
        >
          記録者
        </StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>{props.children}</TableBody>
  </Table>
);

export default withStyles(styles)(SupportRecord);
