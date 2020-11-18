import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import * as React from "react";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";

import {
  ReportType,
  REPEAT_DAILY
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";

const styles = ({ palette }: Theme) =>
  createStyles({
    superLongCell: {
      width: "15%",
      minWidth: 256,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    longCell: {
      width: "15%",
      minWidth: 158,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    middleCell: {
      width: "7%",
      minWidth: 72,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    shortCell: {
      width: "5%",
      minWidth: 54,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    editCell: {
      width: "5%",
      minWidth: 77,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: 14,
      paddingBottom: 14
    },
    nameCell: {
      width: "13%",
      minWidth: 142,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 16
    },
    hidden: {
      display: "none"
    }
  });

interface OwnProps {
  isEditing: boolean;
  isDisabledFood: boolean;
  reportType: ReportType;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * table headerの取得
 */
const getReportDailyHeader = (
  classes: Props["classes"],
  isEditing: boolean,
  isDisabledFood: boolean,
  reportType: ReportType
): HeaderProps => {
  const nameLabel = reportType === REPEAT_DAILY ? "利用者名" : "日付";
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    rowStyle: { height: 56, fontSize: 14 },
    items: [
      {
        align: "left",
        label: nameLabel,
        className: classes.nameCell
      },
      {
        align: "left",
        label: "サービス提供の状況",
        className: classes.superLongCell
      },
      {
        align: "left",
        label: "入院・外泊",
        className: classes.longCell
      },
      {
        align: "left",
        label: "地域移行\n加算",
        className: classes.middleCell
      },
      {
        align: "left",
        label: "光熱水費\n提供",
        className: classes.middleCell
      },
      {
        align: "left",
        label: "食事提供\n（朝）",
        className: isDisabledFood ? classes.hidden : classes.middleCell
      },
      {
        align: "left",
        label: "\n（昼）",
        className: isDisabledFood ? classes.hidden : classes.shortCell
      },
      {
        align: "left",
        label: "\n（夜）",
        className: isDisabledFood ? classes.hidden : classes.shortCell
      },
      {
        align: "right",
        label: isEditing ? "詳細を編集" : "",
        className: classes.editCell
      }
    ]
  };
};

const UsagePerformanceTableHeader = (props: Props) => {
  // ヘッダーの取得
  const tableHead = getReportDailyHeader(
    props.classes,
    props.isEditing,
    props.isDisabledFood,
    props.reportType
  );

  return (
    <TableHead
      role={tableHead.role}
      ariaChecked={tableHead.ariaChecked}
      tabIndex={tableHead.tabIndex}
      key={tableHead.key}
      selected={tableHead.selected}
      items={tableHead.items}
      rowStyle={tableHead.rowStyle}
    />
  );
};

export default withStyles(styles)(UsagePerformanceTableHeader);
