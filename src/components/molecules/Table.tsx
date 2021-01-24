import * as React from "react";
import * as ClassNames from "classnames";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@material-ui/core/Table";

export interface RowParam {
  cells: CellParam[];
}

export interface CellParam {
  role?: string;
  align: "left" | "center" | "right";
  className?: string;
  label: string | React.ReactElement<any>;
}

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    table: {
      minWidth: 700
    }
  });

export interface CellParam {
  align: "left" | "center" | "right";
  label: string | React.ReactElement<any>;
  className?: string;
}

export interface RowParam {
  cells: CellParam[];
}

interface Props extends WithStyles<typeof styles> {
  key: string;
  className?: string;
}

const table: React.FunctionComponent<Props> = props => {
  const { classes, children, key, className } = props;
  return (
    <Table key={key} className={ClassNames(classes.table, className)}>
      {children}
    </Table>
  );
};

export default withStyles(styles)(table);
