import * as React from "react";
import * as ClassNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";
import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    dateLabelsContainer: {
      width: 232,
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
      paddingRight: 0,
      minHeight: 36
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
    },
    userNameContainer: {
      width: 240,
      fontFamily:
        "Hiragino Kaku Gothic ProN,ヒラギノ角ゴ ProN W3,Meiryo,メイリオ,Osaka,MS PGothic,arial,helvetica,sans-serif",
      marginLeft: 16,
      paddingTop: spacing.unit / 2,
      paddingBottom: spacing.unit / 2,
      borderBottom: `1px dotted ${SECONDARY_LINE_COLOR}`
    },
    floatLeft: {
      float: "left"
    },
    floatRight: {
      float: "right"
    }
  });

interface OwnProps {
  selectedMonth: Date;
  selectedUserName: string;
  onChangeEditMode: () => void;
  onSubmit: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsagePerformanceUsersHeaderEdit = (props: Props) => {
  const {
    classes,
    selectedMonth,
    selectedUserName,
    onChangeEditMode,
    onSubmit
  } = props;
  return (
    <div className={classes.flex}>
      <div>
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
        <div
          className={ClassNames(classes.floatLeft, classes.userNameContainer)}
        >
          {selectedUserName}
        </div>
      </div>
      <div className={classes.floatRight}>
        <ContentHeaderSubmit
          buttonName="保存する"
          cancelButtonName="キャンセル"
          handleSubmit={onSubmit}
          handleCancel={onChangeEditMode}
          submitStyle={classes.buttonWidth}
          cancelStyle={classes.cancelButton}
          toolbarStyle={classes.buttonContainer}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(UsagePerformanceUsersHeaderEdit);
