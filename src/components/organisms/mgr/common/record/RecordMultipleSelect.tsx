import * as React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import GrayLabel from "@components/atoms/GrayLabel";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";
import FormikMultipleSelect from "@components/molecules/FormikMultipleSelect";
import { CategorizedFieldItem } from "@interfaces/ui/form";

const styles = (): StyleRules =>
  createStyles({
    wrapper: {
      width: "100%"
    },
    fieldWrapper: {
      padding: "0 16px"
    }
  });

interface OwnProps {
  isEditable: boolean;
  name: string;
  label?: string;
  helperText?: string;
  emptyText?: string;
  labelType?: "gray" | "default"; // ラベル表記方法
  value: string;
  defaultValue: string; // 表示モード時の初期値
  placeholder: string; // 編集モード時のplaceholder
  options: CategorizedFieldItem[];
  maxWidth?: number;
  isNotShot?: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 記録系ページで使う専用のMultipleSelect
 * 表示と編集モードを切り替える
 */
const RecordMultipleSelect = ({
  labelType = "gray",
  ...props
}: Props): JSX.Element => {
  const grayLabel =
    props.label && labelType === "gray" ? props.label : undefined;
  const defaultLabel =
    props.label && labelType === "default" ? props.label : "";

  return (
    <div className={props.classes.wrapper}>
      {grayLabel && <GrayLabel label={grayLabel} />}
      <div className={grayLabel ? props.classes.fieldWrapper : undefined}>
        {props.isEditable ? (
          <FormikMultipleSelect
            name={props.name}
            label={defaultLabel}
            placeholder={props.placeholder}
            helperText={props.helperText}
            emptyText={props.emptyText}
            size="fullSize"
            style={{
              maxWidth: props.maxWidth,
              marginRight: 0,
              marginBottom: 0
            }}
            options={props.options}
            isNotShot={props.isNotShot}
          />
        ) : (
          <ReadonlyTextField
            value={props.value}
            label={defaultLabel}
            defaultValue={props.defaultValue}
            multiline
          />
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(RecordMultipleSelect);
