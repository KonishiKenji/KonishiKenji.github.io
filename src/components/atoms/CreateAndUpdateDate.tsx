import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import * as format from "date-fns/format";

const styles = () =>
  createStyles({
    dateLabel: {
      display: "flex",
      justifyContent: "space-between",
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: 12,
      width: 185,
      marginLeft: "auto"
    }
  });

interface OwnProps {
  createdAt?: string | number | Date | null;
  updatedAt?: string | number | Date | null;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 作成日と更新日を表示する
 */
const CreateAndUpdateDate = (props: Props) => (
  <div>
    <div className={props.classes.dateLabel}>
      <span>作成日</span>
      <span>
        {props.createdAt
          ? format(props.createdAt, "YYYY年MM月DD日 HH:mm")
          : "-年 -月 -日 --:--"}
      </span>
    </div>
    <div className={props.classes.dateLabel}>
      <span>更新日</span>
      <span>
        {props.updatedAt
          ? format(props.updatedAt, "YYYY年MM月DD日 HH:mm")
          : "-年 -月 -日 --:--"}
      </span>
    </div>
  </div>
);

export default withStyles(styles)(CreateAndUpdateDate);
