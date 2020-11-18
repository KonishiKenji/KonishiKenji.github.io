import * as React from "react";
import { Field, FieldProps, getIn } from "formik";
import MuiCheckbox, {
  MuiCheckboxProps
} from "@components/molecules/MuiCheckbox";

interface FormikCheckboxProps {
  name: string;
}

type Props = FormikCheckboxProps & MuiCheckboxProps;

const FormikCheckbox: React.FunctionComponent<Props> = props => (
  // tslint:disable:jsx-no-lambda
  <Field
    name={props.name}
    type="checkbox"
    render={({ field, form }: FieldProps) => {
      const checked = getIn(form.values, props.name);
      return <MuiCheckbox {...field} {...props} checked={checked} />;
    }}
  />
);

export default FormikCheckbox;
