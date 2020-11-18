import * as React from "react";
import * as format from "date-fns/format";

import Paper from "@material-ui/core/Paper";

import SectionTitleWithButton from "@components/molecules/SectionTitleWithButton";
import DropDown from "@components/atoms/DropDown";
import Button from "@material-ui/core/Button";

import {
  createStyles,
  WithStyles,
  withStyles,
  StyleRules
} from "@material-ui/core/styles";

const styles = (): StyleRules =>
  createStyles({
    container: {
      padding: 32
    },
    description: {
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "#37474f",
      marginBottom: 16
    },
    dropDown: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      width: 213
    },
    button: {
      margin: 0,
      verticalAlign: "bottom",
      width: 120,
      height: 36,
      boxShadow: "none",
      fontSize: 14
    },
    error: {
      fontSize: 12,
      color: "#f44336",
      marginTop: 16
    }
  });

interface OwnProps {
  months: { date: string }[];
  value: string;
  onChangeSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 実施報告書 > 施設外就労実施報告書の印刷
 */
const SelectOffsiteWorkMonth = (props: Props): JSX.Element => {
  const { classes, months = [] } = props;

  const monthItems = months.map((v) => {
    return { label: format(v.date, "YYYY年M月"), value: v.date };
  });

  monthItems.unshift({ label: "月を選択", value: "" });
  return (
    <Paper elevation={0} className={classes.container}>
      <SectionTitleWithButton
        label="施設外就労実施報告書の印刷"
        isTitleNoMargin={false}
      />
      <div className={classes.description}>
        常に最新の利用実績・記録の内容と就労先企業情報をもとにファイルが作成されます。
        <br />
        対象月の実績等を更新してから印刷を実行してください。
      </div>
      <DropDown
        id="selectMonth"
        label="印刷対象月"
        isError={false}
        size="textFieldSmall"
        options={monthItems}
        value={props.value}
        styles={classes.dropDown}
        onChange={props.onChangeSelect}
        isDisabled={false}
      />
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        disabled={props.value === ""}
        onClick={props.onClick}
      >
        印刷
      </Button>
      {props.months.length === 0 && (
        <div className={props.classes.error}>
          「施設外就労」の利用実績がないか、「就労先企業情報」がまだ登録されていません。
          <br />
          利用実績または就労先企業情報を確認してください。
        </div>
      )}
    </Paper>
  );
};

export default withStyles(styles)(SelectOffsiteWorkMonth);
