import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import { FieldItem } from "@interfaces/ui/form";

const styles = () =>
  createStyles({
    root: {
      width: "100%"
    },
    // FormikSelectからlabel除去をするとデザイン影響があるので一旦ここで吸収させる
    noLabel: {
      marginTop: -16
    }
  });

interface OwnProps {
  isEditable: boolean;
  name: string;
  label?: string;
  value: string;
  defaultValue: string; // 表示モード時の初期値
  placeholder: string; // 編集モード時のplaceholder
  options: FieldItem[];
  isSelectablePlaceholder?: boolean; // true：編集モード時にplaceholderを選択できるようにする
  emptyText?: string;
  onChangeHook?: (
    event: React.ChangeEvent<HTMLSelectElement>,
    beforeValue: string
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 記録系ページで使う専用のSelectBox
 * 表示と編集モードを切り替える
 */
const RecordSelect = (props: Props) => (
  <div className={props.classes.root}>
    {props.isEditable ? (
      <div className={!props.label ? props.classes.noLabel : undefined}>
        <FormikSelect
          label={props.label || ""}
          name={props.name}
          placeholder={props.placeholder}
          size="fullSize"
          style={{ marginBottom: 0 }}
          options={props.options}
          onChangeHook={props.onChangeHook}
          emptyText={props.emptyText}
          isSelectablePlaceholder={props.isSelectablePlaceholder}
        />
      </div>
    ) : (
      <ReadonlyTextField
        label={props.label}
        value={props.value}
        defaultValue={props.defaultValue}
      />
    )}
  </div>
);

export default withStyles(styles)(RecordSelect);
