/**
 * 指定した期間内かどうかのチェック（月単位）
 */

import * as differenceInMonths from "date-fns/difference_in_months";
import { SelectDateValue } from "@interfaces/ui/form";
import { selectDateValueToDate } from "@utils/date";

const withinTargetMonth = (
  startDate: SelectDateValue,
  endDate: SelectDateValue,
  targetMonth: number,
  options = { startLabel: "開始日", endLabel: "終了日" }
) => {
  let errorMessage;
  if (
    startDate.year &&
    startDate.month &&
    startDate.day &&
    endDate.year &&
    endDate.month &&
    endDate.day
  ) {
    const start = new Date(selectDateValueToDate(startDate));
    const end = new Date(selectDateValueToDate(endDate));
    const month = differenceInMonths(end, start);
    if (targetMonth < month) {
      errorMessage = `${options.endLabel}は${options.startLabel}から${targetMonth}ヶ月以内に設定してください`;
    }
  }
  return {
    year: errorMessage,
    month: undefined,
    day: undefined
  };
};

export default withinTargetMonth;
