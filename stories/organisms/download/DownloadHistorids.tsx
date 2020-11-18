import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import SectionTitle from "@components/atoms/SectionTitle";
import Table from "@components/molecules/Table";
import { InvoiceState } from "@stores/domain/invoice/type";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import { dateToLocalisedString } from "@utils/date";

const FILE_TARGET_JISSEKI = "jisseki";
const FILE_TARGET_UPLIMIT = "uplimit";
const kindOfFileTarget = {
  jisseki: "サービス提供実績記録票",
  seikyu_meisai: "請求書・明細書",
  uplimit: "上限額管理事業所明細書"
};

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    tableContainer: {
      padding: `30px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
      margin: spacing.unit * 2,
      boxShadow: "none"
    },
    tableCell: {
      fontSize: 14,
      padding: "14px 0 14px 16px",
      "&:last-child": {
        paddingTop: 0,
        paddingRight: 16,
        paddingBottom: 4
      }
    },
    cellStyle: {
      padding: spacing.unit * 2,
      borderBottom: "none"
    },
    tab: {
      height: 32
    },
    historyButton: {
      margin: `6px ${spacing.unit * 2}px 2px 0`,
      width: 80
    },
    receiptHistoryButton: {
      width: 112,
      marginTop: 6,
      marginBottom: 2
    },
    noData: {
      clear: "both",
      marginTop: 80,
      marginBottom: 52,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: 14
    }
  });

interface CellParam {
  role?: string;
  align: "left" | "center" | "right";
  className?: string;
  label: string | React.ReactElement<any>;
}
interface RowParam {
  cells: CellParam[];
}

interface OwnProps {
  invoice: InvoiceState;
  history: RouteComponentProps["history"];
  handleClick: (title: string[], path: string, dataKey: string) => () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class DownloadHistory extends React.Component<Props> {
  public render() {
    const { classes } = this.props;

    const header: HeaderProps = {
      tabIndex: -1,
      key: 0,
      selected: false,
      items: [
        {
          className: classes.cellStyle,
          align: "left",
          label: "対象月"
        },
        {
          className: classes.cellStyle,
          align: "left",
          label: "ファイル種別"
        },
        {
          className: classes.cellStyle,
          align: "left",
          label: "日時"
        },
        {
          className: classes.cellStyle,
          align: "left",
          label: "利用者帳票印刷"
        }
      ]
    };

    const rows: RowParam[] = this.props.invoice.history.map(h => {
      let buttons = null;

      if (
        h.file_target !== FILE_TARGET_JISSEKI &&
        h.file_target !== FILE_TARGET_UPLIMIT
      ) {
        buttons = (
          <React.Fragment>
            <Button
              color="secondary"
              variant="outlined"
              className={classes.historyButton}
              onClick={this.props.handleClick(["請求日"], "seikyu", h.dataKey)}
            >
              請求書
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.props.handleClick(["発行日"], "receipt", h.dataKey)}
              className={classes.historyButton}
            >
              領収書
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.props.handleClick(
                ["受領日", "通知日"],
                "agency_receipt",
                h.dataKey
              )}
              className={classes.receiptHistoryButton}
            >
              代理受領書
            </Button>
          </React.Fragment>
        );
      }

      return {
        cells: [
          {
            className: classes.cellStyle,
            align: "left",
            label: dateToLocalisedString(`${h.target_date}01`, `YYYY年M月分`)
          },
          {
            className: classes.cellStyle,
            align: "left",
            label: kindOfFileTarget[h.file_target]
          },
          {
            className: classes.cellStyle,
            align: "left",
            label: dateToLocalisedString(h.created_at, "YYYY年M月D日 H時m分")
          },
          {
            className: classes.cellStyle,
            align: "left",
            label: buttons
          }
        ]
      };
    });

    return (
      <Paper elevation={0} className={classes.tableContainer}>
        <SectionTitle label="請求書類CSVファイルのダウンロード履歴" />
        <Table key="daily-report-table">
          <TableHead
            role={header.role}
            ariaChecked={header.ariaChecked}
            tabIndex={header.tabIndex}
            key={header.key}
            selected={header.selected}
            items={header.items}
            rowStyle={header.rowStyle}
          />
          <TableBody tabIndex={0} key={`"${header.key}-body"`}>
            {rows.map((row, idx) => (
              <TableRow key={`${header.key}-row-${idx}`}>
                {row.cells.map((cell, i) => (
                  <TableCell
                    key={`${header.key}-row-${idx}-cell-${i}`}
                    align={cell.align}
                    className={classes.tableCell}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <div className={classes.noData}>
            ダウンロード履歴がありません。
            <br />
            ダウンロード履歴は給付費請求必要書類をダウンロードした後に表示されます。
          </div>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(DownloadHistory);
