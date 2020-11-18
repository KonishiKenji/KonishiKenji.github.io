import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";
import { oneLetterWeekdaysJapanese } from "@utils/date";
import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";

const styles = ({ spacing, palette }: Theme) =>
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
        marginTop: 0,
        marginRight: 5,
        marginBottom: 0,
        marginLeft: 3,
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
      alignItems: "center",
      height: 48,
      paddingTop: 12
    },
    cancelButton: {
      width: 120,
      height: 36,
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      backgroundColor: "rgba(98, 2, 238, 0)",
      color: "#0277bd"
    }
  });

interface OwnProps {
  minDate: Date;
  maxDate: Date;
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  onSubmit: () => void;
  onChangeEditMode: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceDailyHeaderEdit = (props: Props) => {
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
                ({oneLetterWeekdaysJapanese[props.selectedDate.getDay()]})
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
            cancelStyle={`${classes.buttonWidth} ${classes.cancelButton}`}
            toolbarStyle={classes.buttonContainer}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(UsagePerformanceDailyHeaderEdit);
