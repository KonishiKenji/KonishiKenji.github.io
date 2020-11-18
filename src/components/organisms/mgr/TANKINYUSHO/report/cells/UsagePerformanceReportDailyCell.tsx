import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import UsagePerformanceReportCell from "@components/organisms/mgr/TANKINYUSHO/report/cells/UsagePerformanceReportCell";
import {
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  REPEAT_DAILY
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import UsagePerformanceReportCellEdit from "./UsagePerformanceReportCellEdit";
import Checkbox from "@material-ui/core/Checkbox";

const styles = () =>
  createStyles({
    nameCell: {
      width: "15.1%",
      minWidth: 156,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 36
    },
    editingNameCell: {
      paddingLeft: 8
    },
    checkbox: {
      fontSize: 16
    },
    checkBox: {
      padding: 0,
      marginRight: 8,
      maxWidth: 18,
      maxHeight: 18
    },
    checkBoxSize: {
      fontSize: 24
    },
    nameSpace: {
      marginRight: 8
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType;
  idx: number;
  keyValue: string;
  onChecked: (checkedId: string, isChecked: boolean) => void;
  isEditing: boolean;
  checkedIds: string[];
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceReportDailyCell = (props: Props) => {
  const {
    usagePerformance,
    usagePerformanceTANKINYUSHO,
    idx,
    keyValue,
    isEditing,
    openModal,
    checkedIds
  } = props;

  // 一括登録チェックボックス
  const [isChecked, setCheckedIds] = React.useState(
    checkedIds.includes(keyValue)
  );

  // チェックボックスのウォッチャー
  React.useEffect(() => {
    setCheckedIds(checkedIds.includes(keyValue));
  }, [checkedIds.includes(keyValue)]);

  /**
   * チェックボックス押下時の処理
   */
  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    event.persist();
    setCheckedIds(event.target.checked);
    props.onChecked(event.target.value, event.target.checked);
  };

  return (
    <React.Fragment>
      {/* 利用者名 */}
      <TableCellWrap
        key={`${idx}-sei-mei`}
        cellClass={
          isEditing
            ? `${props.classes.nameCell} ${props.classes.editingNameCell}`
            : props.classes.nameCell
        }
      >
        {isEditing && (
          <Checkbox
            value={keyValue}
            checked={isChecked}
            onChange={onChecked}
            classes={{ root: props.classes.checkBox }}
          />
        )}
        <span className={props.classes.nameSpace}>
          {usagePerformance.nameSei || ""}
        </span>
        {usagePerformance.nameMei || ""}
      </TableCellWrap>
      {isEditing ? (
        <UsagePerformanceReportCellEdit
          usagePerformance={usagePerformance}
          usagePerformanceTANKINYUSHO={usagePerformanceTANKINYUSHO}
          idx={idx}
          openModal={openModal}
          keyValue={keyValue}
          reportType={REPEAT_DAILY}
        />
      ) : (
        <UsagePerformanceReportCell
          usagePerformance={usagePerformance}
          usagePerformanceTANKINYUSHO={usagePerformanceTANKINYUSHO}
          idx={idx}
          openModal={openModal}
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(UsagePerformanceReportDailyCell);
