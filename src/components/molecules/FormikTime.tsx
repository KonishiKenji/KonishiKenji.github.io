import * as React from "react";
import FormikTextField, {
  FormikTextFieldProps
} from "@components/molecules/FormikTextField";

type TimeChangeHookEvent = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  beforeValue: string,
  autoCorrectValue: string
) => string | void;

type Props = FormikTextFieldProps & {
  onChangeHook?: never;
  onChangeHookTime?: TimeChangeHookEvent;
};

/**
 * コロンなしの時刻形式の場合、コロンを自動で付ける
 * onChangeHookが渡されている時、追加で第三引数には保管された値を渡す（条件を満たしていないならそのままの値）
 */
const interruptOnChangeHook = (onChangeHook?: TimeChangeHookEvent) => (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  beforeValue: string
): string | void => {
  const currentValue = event.currentTarget.value;
  const correctValue = /^\d{4}$/.test(currentValue)
    ? `${currentValue.slice(0, 2)}:${currentValue.slice(2)}`
    : undefined;
  const autoCorrectValue = correctValue || currentValue;
  const hookValue = onChangeHook
    ? onChangeHook(event, beforeValue, autoCorrectValue)
    : null;
  return hookValue || correctValue;
};

const FormikTime: React.FunctionComponent<Props> = ({
  onChangeHookTime,
  ...props
}) => {
  const handleChange = React.useCallback(
    interruptOnChangeHook(onChangeHookTime),
    [onChangeHookTime]
  );
  return <FormikTextField {...props} onChangeHook={handleChange} />;
};

export default FormikTime;
