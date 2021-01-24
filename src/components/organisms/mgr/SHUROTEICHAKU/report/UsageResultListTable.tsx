import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles, FormGroup } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import UsageResultListCell from "@components/organisms/mgr/SHUROTEICHAKU/report/cell/UsageResultListCell";
import { UsageResultsState } from "@stores/domain/mgr/SHUROTEICHAKU/report/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";
import { FieldArray } from "formik";
const styles = ({ palette }: Theme) =>
  createStyles({
    row: {
      height: 56,
      display: "inline-table",
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    noData: {
      clear: "both",
      marginTop: 76,
      textAlign: "center",
      height: 104,
      color: BASE_GREY_TEXT_COLOR
    },
    disableCell: {
      display: "none"
    },
    sticky: {
      zIndex: 10,
      position: "sticky"
    },
    cell: {
      boxSizing: "content-box",
      paddingLeft: 8
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
    dateCell: {
      width: "25%",
      minWidth: 260,
      paddingLeft: 16
    }
  });

interface StateProps {
  usageResultList: UsageResultsState["usageResults"];
}

interface OwnProps {
  isEditing: boolean;
  headerHeight: number;
}

type Props = StateProps & OwnProps & WithStyles<typeof styles>;

const reportMonthlyHeader = (
  classes: Record<
    "cell" | "statusCell" | "specialAreaFlgCell" | "remarkCell" | "dateCell",
    string
  >
): HeaderProps => {
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    items: [
      {
        align: "left",
        label: "日付",
        className: `${classes.cell} ${classes.dateCell}`
      },
      {
        align: "left",
        label: "支援実施",
        className: `${classes.cell} ${classes.statusCell}`
      },
      {
        align: "left",
        label: "特別地域加算",
        className: `${classes.cell} ${classes.specialAreaFlgCell}`
      },
      {
        align: "left",
        label: "備考",
        className: `${classes.cell} ${classes.remarkCell}`
      }
    ]
  };
};

const UsageResultListTable = (props: Props) => {
  const chindrenList = props.usageResultList.map((usageResult, index) => {
    return (
      <TableRow key={`table-row-${index}`} className={props.classes.row}>
        <UsageResultListCell
          params={usageResult}
          key={index}
          idx={index}
          isEditing={props.isEditing}
        />
      </TableRow>
    );
  });
  const tableHead = reportMonthlyHeader(props.classes);
  const TableList = (
    <FormGroup>
      <FieldArray name="ReportData">{() => chindrenList}</FieldArray>
    </FormGroup>
  );
  return (
    <React.Fragment>
      <div
        className={props.classes.sticky}
        style={{ top: `${props.headerHeight}px` }}
      >
        <Table key="monthly-report-table">
          <TableHead
            role={tableHead.role}
            ariaChecked={tableHead.ariaChecked}
            tabIndex={tableHead.tabIndex}
            key={tableHead.key}
            selected={tableHead.selected}
            items={tableHead.items}
            rowStyle={tableHead.rowStyle}
            headerStyle={{ position: "sticky", top: props.headerHeight }}
          />
        </Table>
      </div>
      <Table key="monthly-report-table">
        <TableBody>{chindrenList.length > 0 && TableList}</TableBody>
      </Table>
      {chindrenList.length === 0 && (
        <div className={props.classes.noData}>
          利用者の情報が登録されていません。
          <br />
          利用者情報ページで利用者を登録した後にご利用ください。
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    usageResultList: state.SHUROTEICHAKU.report.usageResults
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(UsageResultListTable)
);
