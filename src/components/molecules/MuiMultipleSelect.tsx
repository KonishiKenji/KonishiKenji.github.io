import * as React from "react";
import Select, { SelectProps } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import FieldWrapper, { FieldSizeName } from "@components/atoms/FieldWrapper";
import { CategorizedFieldItem } from "@interfaces/ui/form";
import flatMap from "lodash-es/flatMap";
import isPlainObject from "lodash-es/isPlainObject";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
  StyleRules
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const styles = (theme: Theme): StyleRules =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing.unit * 2
    }
  });

const BootstrapInput = withStyles({
  input: {
    display: "inline-block",
    whiteSpace: "initial",
    borderBottom: "solid 1px #455a64",
    width: "-webkit-fill-available",
    "&:hover": {
      borderBottom: "2px solid rgba(0, 0, 0, 0.87)"
    }
  }
})(InputBase);

const EmptyBootstrapInput = withStyles({
  input: {
    display: "inline-block",
    whiteSpace: "initial",
    borderBottom: "dotted 1px #455a64",
    width: "-webkit-fill-available"
  }
})(InputBase);

const StyledListSubheader = withStyles({
  root: {
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "#eceff1",
    outline: "none",
    cursor: "default",
    pointerEvents: "none"
  }
})(ListSubheader);

interface OwnProps {
  name: string;
  label: string;
  options: CategorizedFieldItem[];
  helperText?: string;
  emptyText?: string;
  shrink?: boolean;
  size?: FieldSizeName;
  FormLabelClasses?: InputLabelProps["FormLabelClasses"];
}
interface Values {
  values: (
    | string
    | number
    | { id: string | number; label: string; is_delete: number | null }
  )[];
}

export type MuiMultipleSelectProps = OwnProps & SelectProps;
type MultipleSelectProps = OwnProps &
  Values &
  SelectProps &
  WithStyles<typeof styles>;

const MuiMultipleSelect: React.FunctionComponent<MultipleSelectProps> = ({
  label,
  options,
  helperText,
  emptyText,
  shrink,
  id,
  error,
  fullWidth,
  size,
  style,
  values = [],
  FormLabelClasses,
  placeholder,
  ...props
}) => {
  // optionsのitemsから該当のlabelを引っ張ってくる
  // selectedの実態はValues["values"]だが、エラー回避のためanyで定義
  const renderValue = (selected: any): string | undefined => {
    if (Array.isArray(selected)) {
      const fieldItems = flatMap(options, (fieldItem) => fieldItem.items);
      const selectedLabels = selected.map((value) => {
        const target = fieldItems.find((item) =>
          isPlainObject(value)
            ? !value.is_delete &&
              item.value === value.id &&
              item.label === value.label
            : item.value === value
        );
        // 機能上は必ずtargetは存在するはず
        return target ? target.label : "";
      });
      const result = selectedLabels.filter((data) => data);
      return result.length > 0 ? result.join("、") : placeholder;
    }
    return placeholder;
  };
  const hasValues = Array.isArray(values);
  if (!hasValues) {
    console.error("values is array-only");
  }

  // optionsの値が何もない
  const isItemEmpty =
    options.reduce((prev, opt) => prev + opt.items.length, 0) === 0;

  let text = helperText;
  if (isItemEmpty && emptyText) {
    text = emptyText;
  }

  return (
    <FieldWrapper size={size} style={style}>
      <FormControl
        required={props.required}
        error={error}
        fullWidth={fullWidth}
        disabled={isItemEmpty}
      >
        {label && (
          <InputLabel
            htmlFor={id || props.name}
            shrink={shrink}
            style={{
              visibility: !shrink && !!values.length ? "hidden" : "visible"
            }}
            classes={FormLabelClasses}
          >
            {label}
          </InputLabel>
        )}
        <Select
          {...props}
          classes={{ root: label ? props.classes.selectEmpty : undefined }}
          id={id || props.name}
          multiple
          value={values}
          renderValue={renderValue}
          displayEmpty
          input={isItemEmpty ? <EmptyBootstrapInput /> : <BootstrapInput />}
        >
          {options &&
            options.map((option) => [
              option.categoryName && option.items.length > 0 && (
                <StyledListSubheader key={`${option.categoryName}-subheeader`}>
                  {option.categoryName}
                </StyledListSubheader>
              ),
              option.items.map((item, index) => {
                const checked = hasValues
                  ? values.findIndex((value) =>
                      typeof value === "object" && isPlainObject(value)
                        ? !value.is_delete &&
                          value.id === item.value &&
                          value.label === item.label
                        : value === item.value
                    ) > -1
                  : false;
                const uniqueKey = `${option.categoryName}-${item.label}-${index}`;
                return (
                  <MenuItem key={uniqueKey} value={item.value}>
                    <Checkbox checked={checked} />
                    {item.label}
                  </MenuItem>
                );
              })
            ])}
        </Select>
        {text && <FormHelperText>{text}</FormHelperText>}
      </FormControl>
    </FieldWrapper>
  );
};

MuiMultipleSelect.defaultProps = {
  fullWidth: true,
  shrink: true
};

export default withStyles(styles)(MuiMultipleSelect);
