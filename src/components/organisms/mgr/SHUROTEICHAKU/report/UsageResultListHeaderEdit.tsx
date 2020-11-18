import * as React from "react";
import * as ClassNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles, Button } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import { FormikProps } from "formik";
import { InitialDataValues } from "@interfaces/mgr/SHUROTEICHAKU/report/initialData";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    floatLeft: {
      float: "left"
    },
    floatRight: {
      float: "right",
      minHeight: 64,
      paddingTop: 14
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
        marginTop: 0,
        marginRight: 5,
        marginBottom: 0,
        marginLeft: 3,
        fontSize: 16,
        lineHeight: 1.5
      }
    },
    buttonContainer: {
      paddingRight: 0,
      paddingLeft: spacing.unit / 2,
      width: 120
    },
    cancelButton: {
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      backgroundColor: "rgba(98, 2, 238, 0)",
      marginRight: 8
    },
    headerInfoContainer: {
      minHeight: 56,
      width: "100%"
    }
  });

interface OwnProps {
  selectedMonth: Date;
  selectedUserName: string;
  onChangeEditMode: () => void;
  formikProps: FormikProps<InitialDataValues>;
  resetForm: (nextValues?: InitialDataValues) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 編集中のヘッダー
 */
const UsageResultListHeaderEdit: React.FunctionComponent<Props> = props => {
  const { classes, selectedMonth, selectedUserName, formikProps } = props;
  // キャンセルボタン押下時 formのリセット
  const onCancel = () => {
    props.resetForm();
    props.onChangeEditMode();
  };
  return (
    <React.Fragment>
      <div className={classes.headerInfoContainer}>
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
        <div className={classes.floatRight}>
          <Button
            onClick={onCancel}
            className={`${classes.buttonContainer} ${classes.cancelButton}`}
          >
            キャンセル
          </Button>
          <FormikSubmitButton
            buttonName="保存する"
            formikProps={formikProps}
            className={classes.buttonContainer}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(UsageResultListHeaderEdit);
