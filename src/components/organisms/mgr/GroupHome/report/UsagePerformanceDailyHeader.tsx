import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import DateSelectButtonsDaily from "@components/molecules/DateSelectButtonsDaily";
import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    buttonContainer: {
      paddingRight: 0
    },
    buttonWidth: {
      width: 120
    },
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
  isSubmitDisabled: boolean;
  bodyRestraintAbolitionUnexecutedFlg: boolean;
  onChangeDate: (date: Date) => void;
  onChangeEditMode: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceDailyHeader = (props: Props) => {
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
        <ContentHeaderSubmit
          buttonName="編集"
          handleSubmit={props.onChangeEditMode}
          submitStyle={classes.buttonWidth}
          toolbarStyle={classes.buttonContainer}
          isSubmitDisabled={props.isSubmitDisabled}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(UsagePerformanceDailyHeader);
