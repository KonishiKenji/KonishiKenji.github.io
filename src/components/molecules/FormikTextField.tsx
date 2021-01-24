import * as React from "react";
import { getIn, Field, FieldProps } from "formik";
import MuiTextField, {
  MuiTextFieldProps
} from "@components/molecules/MuiTextField";
import deepEqual from "fast-deep-equal";

// イベントの型定義が長いのでAliasを設定
type ChangeEventAlias = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
type BlurEventAlias = React.FormEvent<HTMLInputElement>;

// onChange時に実行できるcallback
type ChangeHookEvent = (
  event: ChangeEventAlias,
  beforeValue: string
) => string | void;

// onBlur時に実行できるcallback
type BlurHookEvent = (
  event: React.FormEvent<HTMLInputElement>,
  beforeValue: string
) => string | void;

// このコンポーネント自身が必要とするprops
interface OwnProps {
  name: string;
  onChangeHook?: ChangeHookEvent;
  onBlurHook?: BlurHookEvent;
}

// バグの原因になるので渡して欲しくないprops
interface NeverSelectProps {
  value?: never;
  onChange?: never;
  onBlur?: never;
}

// MuiTextFieldと合わせた最終的に渡ってくるprops
export type FormikTextFieldProps = OwnProps &
  NeverSelectProps &
  MuiTextFieldProps;

/**
 * Formikから受け取ったvalueとerrorをMuiTextFieldに流し込む
 */
const ConnectMuiTextField: React.FC<
  FormikTextFieldProps & FieldProps
> = React.memo(
  ({ field, form, error, helperText, onChangeHook, onBlurHook, ...props }) => {
    // 現在のテキスト、formikのvalueが更新されたら同期する
    const [currentValue, dispatchAction] = React.useState(field.value);
    React.useEffect(() => {
      dispatchAction(field.value);
    }, [field.value]);

    // エラーがある場合helperTextを上書きする形で表示する
    const formikError = getIn(form.errors, props.name);
    const formikTouch =
      getIn(form.touched, props.name) || form.submitCount !== 0;
    const hasError = error || !!(formikTouch && formikError);
    const errorOrHelperText = hasError ? formikError : helperText;

    // 入力の度に全体が更新されるのを抑制するために、changeではstateを更新する
    const handleChange = React.useCallback(
      (event: ChangeEventAlias) => {
        const hookValue = onChangeHook
          ? onChangeHook(event, currentValue)
          : null;
        const inputValue = hookValue || event.currentTarget.value;
        dispatchAction(inputValue);
      },
      [onChangeHook, onChangeHook && currentValue]
    );

    // stateをformikに反映する
    const handleBlur = React.useCallback(
      (event: BlurEventAlias) => {
        const hookValue = onBlurHook ? onBlurHook(event, field.value) : null;
        const inputValue = hookValue || event.currentTarget.value;
        form.setFieldValue(event.currentTarget.name, inputValue);
        form.setFieldTouched(event.currentTarget.name, true);
      },
      [onBlurHook, onBlurHook && field.value]
    );

    return (
      <MuiTextField
        {...props}
        value={currentValue}
        error={hasError}
        helperText={errorOrHelperText}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
  (
    { field: prevField, form: prevForm, ...prev },
    { field: nextField, form: nextForm, ...next }
  ) => {
    // value,touched,error,propsに変化がないかチェック、なければ更新しない
    const { name } = prev;
    return (
      prevField.value === nextField.value &&
      getIn(prevForm.touched, name) === getIn(nextForm.touched, name) &&
      getIn(prevForm.errors, name) === getIn(nextForm.errors, name) &&
      deepEqual(prev, next)
    );
  }
);

const FormikTextField: React.FC<FormikTextFieldProps> = (props) => (
  // tslint:disable:jsx-no-lambda
  <Field
    name={props.name}
    type={props.type}
    render={(fieldProps: FieldProps): JSX.Element => (
      <ConnectMuiTextField {...props} {...fieldProps} />
    )}
  />
);

export default FormikTextField;
