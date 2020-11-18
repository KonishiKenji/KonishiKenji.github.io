import * as React from "react";
import * as ClassNames from "classnames";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";
import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    floatLeft: {
      float: "left"
    },
    floatRight: {
      float: "right"
    },
    dateLabelsContainer: {
      width: 230,
      marginTop: 8,
      padding: `${spacing.unit}px 38px`,
      borderBottom: `1px dotted ${SECONDARY_LINE_COLOR}`
    },
    userNameContainer: {
      width: 240,
      fontFamily:
        "Hiragino Kaku Gothic ProN,ヒラギノ角ゴ ProN W3,Meiryo,メイリオ,Osaka,MS PGothic,arial,helvetica,sans-serif",
      margin: spacing.unit * 2,
      paddingTop: spacing.unit / 2,
      paddingBottom: spacing.unit / 2,
      borderBottom: `1px dotted ${SECONDARY_LINE_COLOR}`
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
    buttonContainer: {
      paddingRight: 0,
      paddingLeft: spacing.unit / 2
    },
    buttonWidth: {
      width: 120
    }
  });

interface OwnProps {
  selectedMonth: Date;
  selectedUserName: string;
  onChangeEditMode: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 *
 */
const UsagePerformanceMonthlyHeaderEdit = (props: Props): JSX.Element => {
  const {
    classes,
    selectedMonth,
    selectedUserName,
    onChangeEditMode,
    onSubmit
  } = props;
  return (
    <>
      <div
        className={ClassNames(classes.floatLeft, classes.dateLabelsContainer)}
      >
        <span className={classes.date}>
          {selectedMonth.getFullYear()}
          <span>年</span>
          {selectedMonth.getMonth() + 1}
          <span>月</span>
        </span>
      </div>
      <div className={ClassNames(classes.floatLeft, classes.userNameContainer)}>
        {selectedUserName}
      </div>
      <div className={classes.floatRight}>
        <ContentHeaderSubmit
          buttonName="保存する"
          cancelButtonName="キャンセル"
          handleSubmit={onSubmit}
          handleCancel={onChangeEditMode}
          submitStyle={classes.buttonWidth}
          cancelStyle={classes.buttonWidth}
          toolbarStyle={classes.buttonContainer}
          isSubmitDisabled={props.isSubmitDisabled}
        />
      </div>
    </>
  );
};

export default withStyles(styles)(UsagePerformanceMonthlyHeaderEdit);
