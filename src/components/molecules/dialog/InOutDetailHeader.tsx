import {
  withStyles,
  Theme,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";
import { CellParam } from "@components/molecules/Table";
import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";

interface OwnProps {
  headerData: React.ReactElement[];
}

const styles = ({ palette }: Theme) =>
  createStyles({
    headMiddle: {
      width: "129px",
      boxSizing: "content-box",
      height: "88px",
      backgroundColor: "#90a4ae",
      padding: "0px",
      "&:nth-of-type(even)": {
        backgroundColor: "#9badb6"
      },
      "&:last-child": {
        padding: "0px"
      }
    },
    headFirst: {
      width: "292px",
      boxSizing: "content-box",
      height: "88px",
      lineHeight: 3,
      letterSpacing: "0.1px",
      verticalAlign: "bottom",
      padding: "0px",
      backgroundColor: "#90a4ae"
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailHeader: React.FunctionComponent<Props> = ({
  classes,
  headerData
}) => {
  const itemList: CellParam[] = headerData.map(
    (element: string | React.ReactElement, index: number) => {
      const classValue = index === 0 ? classes.headFirst : classes.headMiddle;
      return {
        align: "left",
        label: element,
        className: classValue
      };
    }
  );
  const tableHead: HeaderProps = {
    tabIndex: -1,
    key: 0,
    selected: false,
    items: itemList
  };
  return (
    <Table key="monthly-report-table">
      <TableHead
        role={tableHead.role}
        ariaChecked={tableHead.ariaChecked}
        tabIndex={tableHead.tabIndex}
        key={tableHead.key}
        selected={tableHead.selected}
        items={tableHead.items}
        rowStyle={tableHead.rowStyle}
      />
    </Table>
  );
};

export default withStyles(styles)(InOutDetailHeader);
