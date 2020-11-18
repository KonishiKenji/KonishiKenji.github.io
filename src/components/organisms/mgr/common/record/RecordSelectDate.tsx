import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import FormikSelectDate from "@components/molecules/FormikSelectDate";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";
import { SelectDateValue } from "@interfaces/ui/form";
import { getWareki } from "@utils/date";

const styles = () =>
  createStyles({
    readonlyWrapper: {
      display: "flex",
      alignItems: "flex-end",
      "& > div": {
        width: 128,
        marginRight: 16
      },
      "& > div:first-child": {
        width: 240
      }
    }
  });

interface OwnProps {
  isEditable: boolean;
  name: string; // formikと紐づけるname
  label: string;
  value: SelectDateValue;
  required?: boolean;
  addYearTo?: number;
  overrideYearFrom?: number;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 記録系ページで使う専用のSelectDate
 * 表示と編集モードを切り替える
 */
const RecordSelectDate = (props: Props) => {
  let Component: JSX.Element;
  if (props.isEditable) {
    Component = (
      <FormikSelectDate
        name={props.name}
        label={props.label}
        required={props.required || false}
        addYearTo={props.addYearTo}
        style={{ marginBottom: 0 }}
        overrideYearFrom={props.overrideYearFrom}
      />
    );
  } else {
    const year =
      props.value && props.value.year
        ? `${props.value.year}年 (${getWareki(props.value.year)})`
        : "-年";
    const month =
      props.value && props.value.month ? `${props.value.month}` : "-";
    const day = props.value && props.value.day ? `${props.value.day}` : "-";
    Component = (
      <div className={props.classes.readonlyWrapper}>
        <ReadonlyTextField value={year} defaultValue="" label={props.label} />
        <ReadonlyTextField value={`${month}月`} defaultValue="" />
        <ReadonlyTextField value={`${day}日`} defaultValue="" />
      </div>
    );
  }
  return Component;
};

export default withStyles(styles)(RecordSelectDate);
