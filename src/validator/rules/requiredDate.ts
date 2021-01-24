/**
 * セレクトボックスの変更チェック
 * @param value
 */

import required from "@validator/rules/required";
import { SelectDateValue } from "@interfaces/ui/form";

const requiredDate = (date: SelectDateValue) => {
  return {
    year: required(date.year),
    month: required(date.month),
    day: required(date.day)
  };
};

export default requiredDate;
