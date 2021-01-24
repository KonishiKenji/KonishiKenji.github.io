import * as React from "react";
import * as format from "date-fns/format";

import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
import LinkButton from "@components/atoms/LinkButton";

import Table, { CellParam } from "@components/molecules/Table";
import TableHead from "@components/molecules/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Edit from "@material-ui/icons/Edit";

import SectionTitleWithButton from "@components/molecules/SectionTitleWithButton";

import { InitialState } from "@stores/domain/offsiteWork/types";

import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 32
    },
    button: {
      width: 120,
      height: 36,
      boxShadow: "none",
      fontSize: 14
    },
    empty: {
      height: 196,
      paddingTop: 80,
      textAlign: "center",
      verticalAlign: "middle",
      fontSize: 14
    },
    table: {
      marginBottom: 14
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
      minWidth: 194
    },
    tableCell1: {
      width: 310
    },
    tableCell2: {
      width: 306
    },
    tableCell3: {
      width: 132
    },
    tableCell4: {
      width: 56
    },
    editCell: {
      paddingLeft: 16,
      minWidth: 54,
      borderBottom: "none"
    },
    editButton: {
      width: 22,
      height: 22,
      color: "#0277bd",
      cursor: "pointer",
      verticalAlign: "text-bottom"
    },
    subTitle: {
      fontSize: 14,
      paddingTop: 16,
      paddingBottom: 16
    }
  });

interface OwnProps {
  workplaceCompanies: InitialState["workplaceCompanies"];
  editAction: (
    workplaceCompanyId: number
  ) => (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

interface Row {
  workplaceCompanyId: number;
  isValid: boolean;
  cells: {
    label: string;
  }[];
}

/**
 * 実施報告書 > 就労先企業情報
 */
const WorkplaceCompanyList = (props: Props) => {
  const { classes, workplaceCompanies = [] } = props;

  const headerItems: CellParam[] = [
    {
      align: "left",
      label: "企業名",
      className: `${classes.tableCell} ${classes.tableCell0}`
    },
    {
      align: "left",
      label: "所在地",
      className: `${classes.tableCell} ${classes.tableCell1}`
    },
    {
      align: "left",
      label: "契約期間",
      className: `${classes.tableCell} ${classes.tableCell2}`
    },
    {
      align: "left",
      label: "利用予定者数",
      className: `${classes.tableCell} ${classes.tableCell3}`
    },
    {
      align: "left",
      label: "",
      className: `${classes.tableCell} ${classes.tableCell4}`
    }
  ];

  const rows: Row[] = workplaceCompanies.map((company, idx) => {
    const beginDate = format(company.contract_begin_date, "YYYY年MM月DD日");
    const endDate = company.contract_end_date
      ? format(company.contract_end_date, "YYYY年MM月DD日")
      : "";
    const contract = `${beginDate}〜${endDate}`;

    return {
      workplaceCompanyId: company.workplace_company_id,
      isValid: company.is_valid,
      cells: [
        { label: company.name },
        { label: company.full_address },
        { label: contract },
        { label: `${company.user_count}名` }
      ]
    };
  });
  const validRows = rows.filter((c) => c.isValid);
  const validCount = validRows.length || 0;
  const invalidRows = rows.filter((c) => !c.isValid);
  const invalidCount = invalidRows.length || 0;
  const rowsCount = validCount + invalidCount;

  const renderTable = (key: string, results: Row[]) => (
    <Table key={key} className={classes.table}>
      <TableHead key={0} tabIndex={0} selected={false} items={headerItems} />
      <TableBody>
        {results.map((row, idx) => (
          <TableRow
            key={`tabele-body-${idx}`}
            className={
              idx % 2 === 1 ? classes.tableRowOdd : classes.tableRowEven
            }
          >
            {row.cells.map((cell, i) => (
              <TableCell
                key={`table-body-cell-${idx}-${i}`}
                className={`${classes.tableCell} ${classes.tableCell}${i}`}
              >
                {cell.label}
              </TableCell>
            ))}
            <TableCell
              key={`${idx}-edit-icon`}
              align="right"
              className={`${classes.editCell} ${classes.tableCell4}`}
              style={{ paddingRight: 16 }}
            >
              <Edit
                className={classes.editButton}
                onClick={props.editAction(row.workplaceCompanyId)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Paper elevation={0} className={classes.container}>
      <SectionTitleWithButton label="就労先企業情報" isTitleNoMargin={false}>
        <LinkButton
          to="/record/offsite-work/workplace_company/new"
          variant="contained"
          className={classes.button}
        >
          新規登録
        </LinkButton>
      </SectionTitleWithButton>
      {rowsCount === 0 ? (
        <div>
          <Table
            key="offsite-valid-workplace-company-list"
            className={classes.table}
          >
            <TableHead
              key={0}
              tabIndex={0}
              selected={false}
              items={headerItems}
            />
          </Table>
          <div className={classes.empty}>
            就労先企業情報が登録されていません。新規登録ボタンから登録してください。
          </div>
        </div>
      ) : null}
      {validCount > 0 ? (
        <div className={classes.subTitle}>{`契約期間内 全${validCount}件`}</div>
      ) : null}
      {validCount > 0 ? renderTable("validtable", validRows) : null}

      {invalidCount > 0 ? (
        <div className={classes.subTitle}>
          {`契約期間外 全${invalidCount}件`}
        </div>
      ) : null}
      {invalidCount > 0 ? renderTable("invalidTable", invalidRows) : null}
    </Paper>
  );
};

export default withStyles(styles)(WorkplaceCompanyList);
