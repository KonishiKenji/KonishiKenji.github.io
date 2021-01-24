import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import { CellParam } from "@components/molecules/Table";
import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import { FacilityType } from "@constants/variables";

interface OwnProps {
  headerData: React.ReactElement[];
  serviceType?: FacilityType;
  pageType: "report" | "record";
}

const styles = (): StyleRules =>
  createStyles({
    table: {
      tableLayout: "fixed",
      width: 1070
    },
    headMiddle: {
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
      boxSizing: "content-box",
      height: "88px",
      lineHeight: 3,
      letterSpacing: "0.1px",
      verticalAlign: "bottom",
      padding: "0px",
      backgroundColor: "#90a4ae"
    },
    headerFirstReport: {
      width: 292
    },
    headerFirstRecord: {
      width: 420
    },
    headerFirstIAB: {
      width: 270
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailHeader: React.FunctionComponent<Props> = ({
  classes,
  headerData,
  serviceType,
  pageType
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

  let headerFirstWidth =
    pageType === "record"
      ? classes.headerFirstRecord
      : classes.headerFirstReport;
  if (
    serviceType === FacilityType.IKOU ||
    serviceType === FacilityType.A ||
    serviceType === FacilityType.B
  ) {
    headerFirstWidth = classes.headerFirstIAB;
  }

  return (
    <Table key="monthly-report-table" className={classes.table}>
      <TableHead
        role={tableHead.role}
        ariaChecked={tableHead.ariaChecked}
        tabIndex={tableHead.tabIndex}
        key={tableHead.key}
        selected={tableHead.selected}
        items={tableHead.items}
        rowStyle={tableHead.rowStyle}
        headerFirstWidth={headerFirstWidth}
      />
    </Table>
  );
};

export default withStyles(styles)(InOutDetailHeader);
