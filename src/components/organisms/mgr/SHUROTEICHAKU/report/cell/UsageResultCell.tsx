import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import { UsageResult } from "@stores/domain/mgr/SHUROTEICHAKU/report/types";
import { Checkbox } from "@constants/variables";

const styles = () =>
  createStyles({
    cell: {
      boxSizing: "content-box",
      paddingLeft: 8,
      height: 56
    },
    statusCell: {
      width: "8%",
      minWidth: 88
    },
    specialAreaFlgCell: {
      width: "13%",
      minWidth: 138
    },
    remarkCell: {
      width: "52%",
      minWidth: 544
    }
  });

interface OwnProps {
  params: UsageResult;
  idx: number;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsageReportCell = (props: Props) => {
  const { params, idx, classes } = props;
  return (
    <React.Fragment>
      {/* 支援実施 */}
      <TableCellWrap
        key={`${idx}-status-type`}
        cellClass={`${classes.cell} ${classes.statusCell}`}
      >
        {Checkbox.ON === `${params.statusType}` ? "実施" : "-"}
      </TableCellWrap>

      {/* 特別地域加算 */}
      <TableCellWrap
        key={`${idx}-specialAreaFlg`}
        cellClass={`${classes.cell} ${classes.specialAreaFlgCell}`}
      >
        {Checkbox.ON === `${params.specialAreaFlg}` ? "対象" : "-"}
      </TableCellWrap>

      {/* 備考 */}
      <TableCellWrap
        key={`${idx}-remarks`}
        cellClass={`${classes.cell} ${classes.remarkCell}`}
      >
        {params.remarks || "-"}
      </TableCellWrap>
    </React.Fragment>
  );
};

export default withStyles(styles)(UsageReportCell);
