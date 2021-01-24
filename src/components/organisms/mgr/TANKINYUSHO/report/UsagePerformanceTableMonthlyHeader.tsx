import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import * as React from "react";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";

const styles = ({ palette }: Theme) =>
  createStyles({
    cell: {
      width: "8.5%",
      minWidth: 88,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    dateCell: {
      width: "15.1%",
      minWidth: 156,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 36
    },
    otherSupportCell: {
      width: "16.8%",
      minWidth: 174,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    pickupPremiseCell: {
      width: "10%",
      minWidth: 103,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    editCell: {
      width: "13.1%",
      minWidth: 135,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    editingNameCell: {
      paddingLeft: 8
    },
    checkBox: {
      padding: 0,
      marginRight: 8
    },
    checkBoxSize: {
      fontSize: 18
    }
  });

interface OwnProps {
  isEditing: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * table headerの取得
 */
const getReportMonthlyHeader = (
  classes: Props["classes"],
  isEditing: boolean
): HeaderProps => {
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    rowStyle: { height: 56, fontSize: 14 },
    items: [
      {
        align: "left",
        label: "日付",
        className: classes.dateCell
      },
      {
        align: "left",
        label: "サービス\n提供状況",
        className: classes.cell
      },
      {
        align: "left",
        label: "生活介護等または\n指定通所支援等を実施",
        className: classes.otherSupportCell
      },
      {
        align: "left",
        label: "食事提供",
        className: classes.cell
      },
      {
        align: "left",
        label: "送迎",
        className: classes.cell
      },
      {
        align: "left",
        label: "同一敷地内",
        className: classes.pickupPremiseCell
      },
      {
        align: "left",
        label: "緊急短期\n入所受入",
        className: classes.cell
      },
      {
        align: "left",
        label: "単独型\n18時間以上",
        className: classes.cell
      },
      {
        align: "right",
        label: isEditing ? "詳細を編集" : "",
        className: classes.editCell
      }
    ]
  };
};

const UsagePerformanceTableMonthlyHeader = (props: Props) => {
  // ヘッダーの取得
  const tableHead = getReportMonthlyHeader(props.classes, props.isEditing);

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

export default withStyles(styles)(UsagePerformanceTableMonthlyHeader);
