import * as React from "react";
import * as ClassNames from "classnames";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const styles = () =>
  createStyles({
    cellStyle: {
      padding: "0 8px",
      borderBottom: "none"
    },
    hidden: {
      display: "none"
    }
  });

interface OwnProps {
  key: string;
  hidden?: boolean;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  cellClass?: string;
}

type Props = OwnProps & WithStyles<typeof styles> & React.Props<{}>;

const TableCellWrap = (props: Props) => {
  return (
    <TableCell
      key={props.key}
      align={props.align || "left"}
      className={ClassNames(
        props.classes.cellStyle,
        props.hidden ? props.classes.hidden : "",
        props.cellClass
      )}
    >
      {props.children}
    </TableCell>
  );
};

export default withStyles(styles)(TableCellWrap);
