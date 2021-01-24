import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import DateSelectButtonsDaily from "@components/molecules/DateSelectButtonsDaily";
import Checkbox from "@components/atoms/Checkbox";
import { ReportDailyState } from "@stores/pages/report/daily/types";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center"
    },
    dateSelect: {
      paddingBottom: 8
    }
  });

interface OwnProps {
  minDate: Date;
  maxDate: Date;
  selectedDate: Date;
  bodyRestrictedStillFlg: boolean;
  errorsDateList: ReportDailyState["errorsDateList"];
  onChangeDate: (date: Date) => void;
  onChangeAbolitionCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  fetchLatestInoutErrors: () => Promise<void>;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportDailyHeader = (props: Props) => {
  return (
    <div className={props.classes.wrapper}>
      <div className={props.classes.dateSelect}>
        <DateSelectButtonsDaily
          defaultDate={props.selectedDate}
          min={props.minDate}
          max={props.maxDate}
          onClickSubmit={props.onChangeDate}
          highlightErrors={{
            errorsDateList: props.errorsDateList,
            fetchLatestInoutErrors: props.fetchLatestInoutErrors
          }}
        />
      </div>
      <Checkbox
        label="身体拘束廃止未実施"
        value="physicalRestraintAbolitionCheck"
        checked={props.bodyRestrictedStillFlg}
        onChange={props.onChangeAbolitionCheck}
        inputStyle={{ marginRight: 8, padding: "8px" }}
      />
    </div>
  );
};

export default withStyles(styles)(InOutReportDailyHeader);
