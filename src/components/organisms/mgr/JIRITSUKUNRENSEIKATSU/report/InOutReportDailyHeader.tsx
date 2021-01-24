import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import DateSelectButtonsDaily from "@components/molecules/DateSelectButtonsDaily";
import Checkbox from "@components/atoms/Checkbox";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center"
    }
  });

interface OwnProps {
  minDate: Date;
  maxDate: Date;
  selectedDate: Date;
  bodyRestrictedStillFlg: boolean;
  onChangeDate: (date: Date) => void;
  onChangeAbolitionCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportDailyHeader = (props: Props) => {
  const { classes } = props;
  return (
    <div className={classes.flex}>
      <div>
        <DateSelectButtonsDaily
          defaultDate={props.selectedDate}
          min={props.minDate}
          max={props.maxDate}
          onClickSubmit={props.onChangeDate}
        />
      </div>
      <div>
        <Checkbox
          label="身体拘束廃止未実施"
          value="physicalRestraintAbolitionCheck"
          checked={props.bodyRestrictedStillFlg}
          onChange={props.onChangeAbolitionCheck}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(InOutReportDailyHeader);
