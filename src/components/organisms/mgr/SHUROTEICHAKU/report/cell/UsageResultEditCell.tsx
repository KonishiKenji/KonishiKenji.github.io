import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";

const styles = (): StyleRules =>
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
    },
    root: {
      fontSize: 16
    }
  });

interface OwnProps {
  idx: number;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsageResultEditCell = (props: Props): JSX.Element => {
  const { idx, classes } = props;
  return (
    <>
      {/* 支援実施 */}
      <TableCellWrap
        key={`${idx}-status-type`}
        cellClass={`${classes.cell} ${classes.statusCell}`}
      >
        <FormikCheckbox
          name={`ReportData[${idx}].statusType`}
          label=""
          style={{ marginBottom: 0, marginTop: 0 }}
        />
      </TableCellWrap>

      {/* 特別地域加算 */}
      <TableCellWrap
        key={`${idx}-usage-performance`}
        cellClass={`${classes.cell} ${classes.specialAreaFlgCell}`}
      >
        <FormikCheckbox
          name={`ReportData[${idx}].specialAreaFlg`}
          label=""
          focusVisibleClassName={classes.root}
          style={{ marginBottom: 0, marginTop: 0 }}
        />
      </TableCellWrap>

      {/* 備考 */}
      <TableCellWrap
        key={`${idx}-remarks`}
        cellClass={`${classes.cell} ${classes.remarkCell}`}
      >
        <FormikTextField
          name={`ReportData[${idx}].remarks`}
          label=""
          required={false}
          placeholder="-"
          size="fullSize"
          style={{ marginBottom: 0 }}
        />
      </TableCellWrap>
    </>
  );
};

export default withStyles(styles)(UsageResultEditCell);
