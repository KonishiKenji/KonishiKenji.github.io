import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import DateSelectButtonsDaily from "@components/molecules/DateSelectButtonsDaily";
import Checkbox from "@components/atoms/Checkbox";
import MuiSelect from "@components/molecules/MuiSelect";
import { OPENED_TIME_ITEMS } from "@constants/mgr/SEIKATSUKAIGO/variables";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center"
    },
    innerFlex: {
      display: "flex",
      width: "40%",
      justifyContent: "space-between",
      alignItems: "center"
    },
    physicalRestraintAbolitionCheck: {
      minWidth: 196
    }
  });

interface OwnProps {
  minDate: Date;
  maxDate: Date;
  selectedDate: Date;
  bodyRestrictedStillFlg: boolean;
  openShortTime: number;
  onChangeDate: (date: Date) => void;
  onChangeAbolitionCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  onChangeOpenShortTimeSelect: (
    event: React.ChangeEvent<HTMLSelectElement>
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
      <div className={classes.innerFlex}>
        <MuiSelect
          label="開所・短時間"
          name=""
          value={props.openShortTime}
          options={OPENED_TIME_ITEMS}
          onChange={props.onChangeOpenShortTimeSelect}
          style={{ width: 405, marginBottom: 0 }}
        />
        <div className={classes.physicalRestraintAbolitionCheck}>
          <Checkbox
            label="身体拘束廃止未実施"
            value="physicalRestraintAbolitionCheck"
            checked={props.bodyRestrictedStillFlg}
            onChange={props.onChangeAbolitionCheck}
            inputStyle={{ marginRight: 16, padding: "12px 0px 12px 12px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(InOutReportDailyHeader);
