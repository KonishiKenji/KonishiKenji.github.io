import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import UsageResultCell from "@components/organisms/mgr/SHUROTEICHAKU/report/cell/UsageResultCell";
import { UsageResult } from "@stores/domain/mgr/SHUROTEICHAKU/report/types";
import CustomDateLabel from "@components/atoms/CustomDateLabel";
import UsageResultEditCell from "@components/organisms/mgr/SHUROTEICHAKU/report/cell/UsageResultEditCell";

const styles = () =>
  createStyles({
    cell: {
      boxSizing: "content-box",
      paddingLeft: 16,
      height: 56
    },
    dateCell: {
      width: "25%",
      minWidth: 260
    }
  });

interface OwnProps {
  params: UsageResult;
  idx: number;
  isEditing: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsageResultListCell = (props: Props) => {
  const { params, idx, isEditing } = props;
  return (
    <React.Fragment>
      {/* 日付 */}
      <TableCellWrap
        key={`${idx}-target-date`}
        cellClass={`${props.classes.cell} ${props.classes.dateCell}`}
      >
        <CustomDateLabel
          date={params.targetDate ? params.targetDate : ""}
          dateFormat={"Do（dd）"}
          holiday={params.isHoliday ? params.isHoliday : false}
        />
      </TableCellWrap>
      {isEditing ? (
        <UsageResultEditCell idx={idx} />
      ) : (
        <UsageResultCell params={params} idx={idx} />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(UsageResultListCell);
