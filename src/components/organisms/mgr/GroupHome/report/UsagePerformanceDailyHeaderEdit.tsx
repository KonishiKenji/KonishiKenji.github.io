import * as React from "react";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";
import { oneLetterWeekdaysJapanese } from "@utils/date";
import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    dateLabelsContainer: {
      width: 306,
      padding: `${spacing.unit}px 38px 0 38px`,
      borderBottom: `1px dotted ${SECONDARY_LINE_COLOR}`
    },
    dateButtonsContainer: {
      paddingTop: spacing.unit
    },
    date: {
      fontFamily:
        "Hiragino Kaku Gothic ProN,ヒラギノ角ゴ ProN W3,Meiryo,メイリオ,Osaka,MS PGothic,arial,helvetica,sans-serif",
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 1,
      letterSpacing: 0.2,
      color: BASE_TEXT_COLOR,
      "& > span": {
        margin: "0 5px 0 3px",
        fontSize: 16,
        lineHeight: 1.5
      }
    },
    abolitionChip: {
      paddingLeft: 20,
      width: 160
    },
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
  bodyRestraintAbolitionUnexecutedFlg: boolean;
  onChangeDate: (date: Date) => void;
  onSubmit: () => void;
  onChangeEditMode: () => void;
  onChangeAbolitionCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  isSubmitDisabled: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceDailyHeaderEdit = (props: Props): JSX.Element => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.flex}>
        <div>
          <div className={classes.dateLabelsContainer}>
            <span className={classes.date}>
              {props.selectedDate.getFullYear()}
              <span>年</span>
              {props.selectedDate.getMonth() + 1}
              <span>月</span>
              {props.selectedDate.getDate()}
              <span>日</span>
              <span>
                {oneLetterWeekdaysJapanese[props.selectedDate.getDay()]}
              </span>
            </span>
          </div>
        </div>
        <div>
          <ContentHeaderSubmit
            buttonName="保存する"
            handleSubmit={props.onSubmit}
            submitStyle={classes.buttonWidth}
            cancelButtonName="キャンセル"
            handleCancel={props.onChangeEditMode}
            cancelStyle={classes.buttonWidth}
            toolbarStyle={classes.buttonContainer}
            isSubmitDisabled={props.isSubmitDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(UsagePerformanceDailyHeaderEdit);
