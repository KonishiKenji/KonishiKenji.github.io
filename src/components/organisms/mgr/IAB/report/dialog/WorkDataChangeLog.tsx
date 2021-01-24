import * as React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IABReport } from "@stores/domain/mgr/IAB/report/types";

const styles = () =>
  createStyles({
    table: {
      margin: "8px 0"
    },
    tableHeader: {
      backgroundColor: "#f5f5f5"
    },
    column: {
      fontSize: 14,
      padding: "16px 0 16px 16px"
    },
    tableHeaderColumn: {
      borderBottom: "none",
      backgroundColor: "#90a4ae",
      color: "#ffffff"
    },
    tableBody: {
      "& > tr >td": {
        borderBottom: "none"
      },
      "& > tr:nth-child(even)": {
        backgroundColor: "#f5f5f5"
      }
    }
  });

interface OwnProps {
  data: IABReport["workRecord"]["histories"];
}

type Props = OwnProps & WithStyles<typeof styles>;
const columns = [
  { text: "日時", index: "updatedDate" },
  { text: "項目", index: "columnName" },
  { text: "変更内容", index: "changeDetail" }
];

const WorkDataTable = (props: Props) => {
  if (!!!props.data) {
    return <></>;
  }
  return (
    <Table classes={{ root: props.classes.table }}>
      <TableHead classes={{ root: props.classes.tableHeader }}>
        <TableRow>
          {columns.map(col => (
            <TableCell
              key={col.index}
              className={`${props.classes.tableHeaderColumn} ${props.classes.column}`}
            >
              {col.text}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody className={props.classes.tableBody}>
        {props.data &&
          props.data.map((item, index) => (
            <TableRow key={index}>
              {columns.map(col => (
                <TableCell
                  key={`${index}_${col.index}`}
                  className={props.classes.column}
                >
                  {item[col.index]}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(WorkDataTable);
