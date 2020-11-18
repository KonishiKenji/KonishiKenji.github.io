import * as React from "react";
import FormikTextField, {
  FormikTextFieldProps
} from "@components/molecules/FormikTextField";

type Props = FormikTextFieldProps;

/**
 * 3桁目入力時(2 => 3)ハイフンを自動で付ける
 */
const handleChange = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  beforeValue: string
): string | void => {
  const currentValue = event.currentTarget.value;
  if (beforeValue.length === 2 && currentValue.length === 3) {
    return `${currentValue}-`;
  }
};

/**
 * ハイフンなしの郵便番号形式の場合、ハイフンを自動で付ける
 */
const handleBlur = (
  event: React.FormEvent<HTMLInputElement>
): string | void => {
  const currentValue = event.currentTarget.value;
  if (/^\d{7}$/.test(currentValue)) {
    return `${currentValue.slice(0, 3)}-${currentValue.slice(3)}`;
  }
};

const FormikPostalCode: React.FunctionComponent<Props> = ({
  onChangeHook,
  onBlurHook,
  ...props
}) => (
  <FormikTextField
    {...props}
    onChangeHook={handleChange}
    onBlurHook={handleBlur}
  />
);

export default FormikPostalCode;
