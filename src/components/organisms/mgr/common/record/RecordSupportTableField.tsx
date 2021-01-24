import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import RecordTextField from "@components/organisms/mgr/common/record/RecordTextField";
import RecordSelect from "@components/organisms/mgr/common/record/RecordSelect";
import RecordMultipleSelect from "@components/organisms/mgr/common/record/RecordMultipleSelect";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";

const styles = () =>
  createStyles({
    listRow: {
      display: "flex",
      marginBottom: 12,
      "& > :first-child": {
        paddingRight: 16
      },
      "& > :last-child": {
        paddingLeft: 16
      },
      "& > :only-child": {
        padding: 0
      }
    },
    listLabel: {
      width: 150,
      marginTop: 4,
      fontSize: 14
    },
    listField: {
      flex: 1
    }
  });

interface BaseProps extends WithStyles<typeof styles> {
  label: string;
  name: string;
  value: string;
  defaultValue: string;
  placeholder: string;
  isEditing: boolean;
  hiddenLabel?: boolean;
  emptyText?: string;
}
interface TextProps extends BaseProps {
  type: "text";
}
interface SelectProps extends BaseProps {
  type: "select";
  options: FieldItem[];
  onChangeHook?: (
    event: React.ChangeEvent<HTMLSelectElement>,
    beforeValue: string
  ) => void;
  isSelectablePlaceholder?: boolean; // placeholderを選択した際に表示
}
interface MultipleProps extends BaseProps {
  type: "multiple";
  options: CategorizedFieldItem[];
  maxWidth?: number;
}
interface CustomProps extends WithStyles<typeof styles>, React.Props<{}> {
  type: "custom";
  label: string;
  hiddenLabel?: boolean;
}

type Props = TextProps | SelectProps | MultipleProps | CustomProps;

/**
 * 支援記録のtypeに応じたフィールド
 */
const RecordSupportTableField = (props: Props) => (
  <li className={props.classes.listRow}>
    {props.hiddenLabel !== true && (
      <div className={props.classes.listLabel}>{props.label}</div>
    )}
    <div className={props.classes.listField}>
      {props.type === "text" && (
        <RecordTextField
          name={props.name}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          isEditable={props.isEditing}
        />
      )}
      {props.type === "select" && (
        <RecordSelect
          name={props.name}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          isEditable={props.isEditing}
          options={props.options}
          onChangeHook={props.onChangeHook}
          emptyText={props.emptyText}
          isSelectablePlaceholder={props.isSelectablePlaceholder}
        />
      )}
      {props.type === "multiple" && (
        <RecordMultipleSelect
          name={props.name}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          isEditable={props.isEditing}
          options={props.options}
          maxWidth={props.maxWidth}
          emptyText={props.emptyText}
        />
      )}
      {props.type === "custom" && props.children}
    </div>
  </li>
);

export default withStyles(styles)(RecordSupportTableField);
