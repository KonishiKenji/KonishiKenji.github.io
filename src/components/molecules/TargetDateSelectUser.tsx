import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiTextField from "@components/molecules/MuiTextField";
import MuiSelect from "@components/molecules/MuiSelect";
import { FieldItem } from "@interfaces/ui/form";
import { FieldSizeName } from "@components/atoms/FieldWrapper";

const styles = (): StyleRules =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      alignItems: "flex-end"
    },
    button: {
      borderColor: "#ccc",
      padding: "3px 16px"
    }
  });

interface OwnProps {
  selectValue: string;
  isDefaultValue: boolean;
  targetDateOptions: FieldItem[];
  currentUserCount: number;
  maxUserCount: number;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickButton: () => void;
  selectLabel?: string;
  selectSize?: FieldSizeName;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 選んだ月の値を返却して対象利用者数の表示と利用者選択の非活性を行うコンポーネント
 * 利用者選択ボタンの挙動管理は親で行うこと
 * 後で請求でも使うことをある程度想定
 */
const TargetDateSelectUser = ({
  selectLabel = "対象月",
  selectSize = "small",
  ...props
}: Props): JSX.Element => {
  const isShrink = !!selectLabel;
  const userCountLabel = props.isDefaultValue
    ? "-"
    : `${props.currentUserCount}名／${props.maxUserCount}名`;
  const disabledExcludeUsers = props.isDefaultValue || props.maxUserCount === 0;
  return (
    <div className={props.classes.root}>
      <MuiSelect
        name="target-date-select-user"
        label={selectLabel}
        value={props.selectValue}
        options={props.targetDateOptions}
        shrink={isShrink}
        disabled={props.targetDateOptions.length === 1}
        onChange={props.onChangeSelect}
        size={selectSize}
        style={{ marginBottom: 0 }}
      />
      <MuiTextField
        label="対象利用者数"
        value={userCountLabel}
        InputLabelProps={{ shrink: true }}
        disabled
        size="small"
        style={{ marginBottom: 0 }}
      />
      <Button
        className={props.classes.button}
        color="secondary"
        variant="outlined"
        disabled={disabledExcludeUsers}
        onClick={props.onClickButton}
      >
        利用者選択
      </Button>
    </div>
  );
};

export default withStyles(styles)(TargetDateSelectUser);
