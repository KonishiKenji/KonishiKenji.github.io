import * as React from "react";
import { Field, FieldProps, getIn } from "formik";
import MuiSwitch, { MuiSwitchProps } from "@components/molecules/MuiSwitch";

interface FormikCheckboxProps {
  name: string;
}

type Props = FormikCheckboxProps & MuiSwitchProps;

const FormikCheckbox: React.FunctionComponent<Props> = props => (
  // tslint:disable:jsx-no-lambda
  <Field
    name={props.name}
    type="checkbox"
    render={({ field, form }: FieldProps) => {
      const checked = getIn(form.values, props.name);
      return <MuiSwitch {...field} {...props} checked={checked} />;
    }}
  />
);

export default FormikCheckbox;
