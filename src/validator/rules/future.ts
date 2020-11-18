/**
 * 未来かどうか
 * @param value
 */

import { SelectDateValue } from "@interfaces/ui/form";
import { selectDateValueToDate } from "@utils/date";

const requiredDate = (
  date: SelectDateValue,
  startDate: SelectDateValue,
  options = { startLabel: "開始日", endLabel: "終了日" }
) => {
  let errorMessage;
  if (
    date.year &&
    date.month &&
    date.day &&
    startDate.year &&
    startDate.month &&
    startDate.day
  ) {
    const end = new Date(selectDateValueToDate(date));
    const start = new Date(selectDateValueToDate(startDate));
    if (end.getTime() <= start.getTime()) {
      errorMessage = `${options.endLabel}は${options.startLabel}よりも後に設定してください`;
    }
  }
  return {
    year: errorMessage,
    month: undefined,
    day: undefined
  };
};

export default requiredDate;
