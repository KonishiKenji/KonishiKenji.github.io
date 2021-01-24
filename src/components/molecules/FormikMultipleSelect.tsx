import * as React from "react";
import { FieldArray, FormikProps, getIn } from "formik";
import MuiMultipleSelect, {
  MuiMultipleSelectProps
} from "@components/molecules/MuiMultipleSelect";
import { CategorizedFieldItem } from "@interfaces/ui/form";
import isPlainObject from "lodash-es/isPlainObject";

interface OwnProps {
  name: string;
  isNotShot?: boolean;
}

interface NeverSelectProps {
  value?: never;
  onChange?: never;
}

type Props = OwnProps & NeverSelectProps & MuiMultipleSelectProps;

const handleChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  form: FormikProps<unknown>,
  options: CategorizedFieldItem[],
  isNotShot?: boolean
): void => {
  // event.target.valueの型がstringになるため、arrayに変換
  const formValues: any[] = Array.from(event.target.value);
  let setFormikValues: string | any[] = [];
  if (isNotShot) {
    setFormikValues = event.target.value;
  } else {
    setFormikValues = formValues.filter((value) => isPlainObject(value));
    const selectId = formValues.slice(-1)[0];
    const selectLabel = event.currentTarget.textContent;
    let selectOption = { categoryId: 0, label: "", value: 0, deleteFlg: false };
    options.forEach((option, i) => {
      option.items.forEach((item) => {
        if (item.value === selectId && item.label === selectLabel) {
          selectOption = {
            categoryId: options[i].categoryId || 0,
            label: item.label,
            value: Number(item.value),
            deleteFlg: item.deleteFlg || false
          };
        }
      });
    });
    const index = setFormikValues.findIndex(
      (item) =>
        item.id === selectOption.value && item.label === selectOption.label
    );
    if (index > -1) {
      if (selectOption.deleteFlg) {
        const isDelete = setFormikValues[index].is_delete;
        setFormikValues[index].is_delete = isDelete ? null : 1;
      } else {
        setFormikValues.splice(index, 1);
      }
    } else {
      setFormikValues.push({
        category_id: selectOption.categoryId,
        id: selectOption.value,
        label: selectOption.label,
        is_delete: null
      });
    }
  }
  form.setFieldValue(event.target.name, setFormikValues);
  form.setFieldTouched(event.target.name, true);
};

const FormikMultipleSelect: React.FunctionComponent<Props> = ({
  classes,
  error,
  helperText,
  isNotShot,
  ...props
}) => (
  // tslint:disable:jsx-no-lambda
  <FieldArray
    name={props.name}
    render={(helper): JSX.Element => {
      const formikValues = getIn(helper.form.values, props.name);
      const formikError = getIn(helper.form.errors, props.name);
      const formikTouch =
        getIn(helper.form.touched, props.name) || helper.form.submitCount !== 0;
      const hasError = error || !!(formikTouch && formikError);
      const errorOrHelperText = hasError ? formikError : helperText;
      return (
        <MuiMultipleSelect
          {...props}
          values={formikValues}
          error={hasError}
          helperText={errorOrHelperText}
          onChange={(e): void => {
            return handleChange(e, helper.form, props.options, isNotShot);
          }}
        />
      );
    }}
  />
);

export default FormikMultipleSelect;
