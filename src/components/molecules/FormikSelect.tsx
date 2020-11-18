import * as React from "react";
import { Field, FormikProps, FieldProps, getIn } from "formik";
import MuiSelect, { MuiSelectProps } from "@components/molecules/MuiSelect";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

type ChangeHookEvent = (
  event: React.ChangeEvent<HTMLSelectElement>,
  beforeValue: string
) => void;

interface OwnProps {
  name: string;
  onChangeHook?: ChangeHookEvent;
  tooltip?: React.ReactElement<any>;
  emptyText?: string;
}

interface NeverSelectProps {
  value?: never;
  onChange?: never;
}

type Props = OwnProps & NeverSelectProps & MuiSelectProps;

const handleChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  beforeValue: string,
  form: FormikProps<any>,
  onChangeHook?: ChangeHookEvent
) => {
  if (onChangeHook) onChangeHook(event, beforeValue);
  form.setFieldValue(event.target.name, event.target.value);
  form.setFieldTouched(event.target.name, true);
};

const FormikSelect: React.FunctionComponent<Props> = ({
  error,
  helperText,
  onChangeHook,
  ...props
}) => (
  // tslint:disable:jsx-no-lambda
  <Field
    name={props.name}
    render={({ field, form }: FieldProps) => {
      let unselectedValue = "";
      if (
        props.options &&
        props.options.length > 0 &&
        props.options[0].value === DEFAULT_SELECT_VALUE
      ) {
        unselectedValue = props.options[0].value;
      }
      const selectValue =
        props.options &&
        props.options.find((category) => {
          if (typeof field.value === "string") {
            return `${category.value}` === field.value;
          }
          return Number(category.value) === field.value;
        });
      const formValue = selectValue ? selectValue.value : unselectedValue;
      const formikError = getIn(form.errors, props.name);
      const formikTouch =
        getIn(form.touched, props.name) || form.submitCount !== 0;
      const hasError = error || !!(formikTouch && formikError);
      const errorOrHelperText = hasError ? formikError : helperText;
      return (
        <MuiSelect
          {...props}
          value={formValue}
          error={hasError}
          helperText={errorOrHelperText}
          onChange={(e): void => {
            return handleChange(e, field.value, form, onChangeHook);
          }}
          onBlur={field.onBlur}
          tooltip={props.tooltip}
        />
      );
    }}
  />
);

export default FormikSelect;
