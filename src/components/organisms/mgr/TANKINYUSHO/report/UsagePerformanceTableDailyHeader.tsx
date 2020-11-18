import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import * as React from "react";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import Checkbox from "@material-ui/core/Checkbox";

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
    nameCell: {
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
      marginRight: 8,
      maxWidth: 18,
      maxHeight: 18
    },
    checkBoxColor: {
      color: "rgba(0, 0, 0, 0.54)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.5)"
      }
    }
  });

interface OwnProps {
  isEditing: boolean;
  allCheck: (checkedValue: boolean) => void;
  isAllCheck: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * table headerの取得
 */
const getReportDailyHeader = (
  classes: Props["classes"],
  isEditing: boolean,
  allCheck: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isChecked: boolean
): HeaderProps => {
  const nameLabel = isEditing ? (
    <span>
      <Checkbox
        value=""
        checked={isChecked}
        onChange={allCheck}
        classes={{
          root: classes.checkBox,
          colorSecondary: classes.checkBoxColor
        }}
      />
      利用者名
    </span>
  ) : (
    "利用者名"
  );
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    rowStyle: { height: 56, fontSize: 14 },
    items: [
      {
        align: "left",
        label: nameLabel,
        className: isEditing
          ? `${classes.nameCell} ${classes.editingNameCell}`
          : classes.nameCell
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

const UsagePerformanceTableDailyHeader = (props: Props) => {
  // チェックボックス
  const [isChecked, setChecked] = React.useState(false);

  // チェックボックスのウォッチャー
  React.useEffect(() => {
    setChecked(props.isAllCheck);
  }, [props.isAllCheck]);

  // チェックボックスのchangeイベント
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    props.allCheck(event.target.checked);
  };

  // ヘッダーの取得
  const tableHead = getReportDailyHeader(
    props.classes,
    props.isEditing,
    onChange,
    isChecked
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

export default withStyles(styles)(UsagePerformanceTableDailyHeader);
