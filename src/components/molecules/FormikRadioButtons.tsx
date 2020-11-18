import * as React from "react";
import { Field, FormikProps, FieldProps } from "formik";
import MuiRadioButtons, {
  MuiRadioButtonsProps
} from "@components/molecules/MuiRadioButtons";

type ChangeHookEvent = (
  event: React.ChangeEvent<any>,
  beforeValue: string
) => void;

interface OwnProps {
  name: string;
  disabled?: boolean;
  onChangeHook?: ChangeHookEvent;
}

interface NeverSelectProps {
  value?: never;
  onChange?: never;
}

type Props = OwnProps & NeverSelectProps & MuiRadioButtonsProps;

const handleChange = (
  event: React.ChangeEvent<any>,
  beforeValue: string,
  form: FormikProps<any>,
  onChangeHook?: ChangeHookEvent
) => {
  if (onChangeHook) onChangeHook(event, beforeValue);
  form.setFieldValue(event.target.name, event.target.value);
  form.setFieldTouched(event.target.name, true);
};

const FormikCheckbox: React.FunctionComponent<Props> = ({
  onChangeHook,
  ...props
}) => (
  // tslint:disable:jsx-no-lambda
  <Field
    name={props.name}
    render={({ field, form }: FieldProps) => {
      return (
        <MuiRadioButtons
          {...props}
          value={field.value}
          onChange={e => handleChange(e, field.value, form, onChangeHook)}
          onBlur={field.onBlur}
        />
      );
    }}
  />
);

export default FormikCheckbox;
