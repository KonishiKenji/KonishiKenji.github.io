import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import GrayLabel from "@components/atoms/GrayLabel";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";
import FormikTextField from "@components/molecules/FormikTextField";

const styles = () =>
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
  name: string; // formikと紐づけるname
  label?: string;
  labelType?: "gray" | "default"; // ラベル表記方法
  value: string; // 表示用、編集には使わない
  defaultValue: string; // 表示モード時の初期値
  placeholder: string; // 編集モード時のplaceholder
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 記録系ページで使う専用のTextField
 * 表示と編集モードを切り替える
 */
const RecordTextField = ({ labelType = "gray", ...props }: Props) => {
  const grayLabel =
    props.label && labelType === "gray" ? props.label : undefined;
  const defaultLabel =
    props.label && labelType === "default" ? props.label : undefined;
  return (
    <div className={props.classes.wrapper}>
      {grayLabel && <GrayLabel label={grayLabel} />}
      <div className={grayLabel ? props.classes.fieldWrapper : undefined}>
        {props.isEditable ? (
          <FormikTextField
            name={props.name}
            label={defaultLabel}
            placeholder={props.placeholder}
            size="fullSize"
            style={{ marginBottom: 0 }}
            multiline={true}
          />
        ) : (
          <ReadonlyTextField
            value={props.value}
            defaultValue={props.defaultValue}
            label={defaultLabel}
            multiline={true}
          />
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(RecordTextField);
