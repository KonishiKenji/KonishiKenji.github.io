import * as React from "react";
import * as ClassNames from "classnames";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { CellParam } from "@components/molecules/Table";

const styles = ({ palette, spacing }: Theme): StyleRules =>
  createStyles({
    head: {
      backgroundColor: blueGrey[300],
      color: palette.common.white
    },
    cell: {
      padding: `0 ${spacing.unit}px`,
      color: palette.common.white,
      fontSize: 13
    }
  });

export interface HeaderProps {
  role?: string;
  ariaChecked?: boolean;
  tabIndex: number;
  key: number;
  selected: boolean;
  items: CellParam[];
  headerFirstWidth?: string;
  rowStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

interface Props extends HeaderProps, WithStyles<typeof styles> {}

const tableHead: React.FunctionComponent<Props> = (props) => {
  const { classes, headerFirstWidth } = props;
  return (
    <TableHead className={classes.head} style={props.headerStyle}>
      <TableRow
        role={props.role}
        aria-checked={props.ariaChecked}
        tabIndex={props.tabIndex}
        key={`table-header-row-${props.key}`}
        selected={props.selected}
        style={props.rowStyle}
      >
        {props.items.map((item, idx) => {
          return (
            <TableCell
              key={`table-cell-${item.label}-${idx}`}
              className={ClassNames(classes.cell, item.className, {
                [`${headerFirstWidth || ""}`]: idx === 0
              })}
              align={item.align}
            >
              {item.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(tableHead);
