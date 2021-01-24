import * as parse from "date-fns/parse";
import * as differenceInMinutes from "date-fns/difference_in_minutes";
import { SelectDateValue } from "@interfaces/ui/form";

export {
  default as createWeekdaysJapaneseList
} from "@utils/date/createWeekdaysJapaneseList";

import dateToLocalisedString from "@utils/date/dateToLocalisedString"; // このファイルの中でまだ使っているのがいるので。
export {
  default as dateToLocalisedString
} from "@utils/date/dateToLocalisedString";

export { default as dateToObject } from "@utils/date/dateToObject";

import oneLetterWeekdaysJapanese from "@utils/date/oneLetterWeekdaysJapanese"; // このファイルの中でまだ使っているのがいるので。
export {
  default as oneLetterWeekdaysJapanese
} from "@utils/date/oneLetterWeekdaysJapanese";

export const dayOfTheWeekLabels = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat"
};

export const defaultTimeLabel = "--:--";

const warekiFormat = [
  {
    era: "昭和",
    leastEra: "S",
    startDate: new Date(1926, 12 - 1, 25),
    endDate: new Date(1989, 1 - 1, 7)
  },
  {
    era: "平成",
    leastEra: "H",
    startDate: new Date(1989, 1 - 1, 8),
    endDate: new Date(2019, 4 - 1, 30)
  },
  {
    era: "令和",
    leastEra: "R",
    startDate: new Date(2019, 5 - 1, 1),
    endDate: new Date(2099, 12 - 1, 31)
  }
];
export const convertWareki = (yyyy: string | number, mm: string | number) => {
  if (!yyyy || !mm) {
    return {
      year: "",
      era: "",
      leastEra: "",
      warekiYear: "年",
      warekiYearMonth: " 年 月"
    };
  }
  const targetDate = new Date(Number(yyyy), Number(mm) - 1, 2);
  const resultDate = warekiFormat.filter(e => {
    return e.startDate <= targetDate && e.endDate >= targetDate;
  })[0];
  const year =
    targetDate.getFullYear() - resultDate.startDate.getFullYear() + 1;
  return {
    year,
    month: targetDate.getMonth() + 1,
    era: resultDate.era,
    leastEra: resultDate.leastEra,
    warekiYear: `${resultDate.era}${year}年`
  };
};

export const getWareki = (yyyy: string | number) => {
  const date = new Date(Number(yyyy), 0, 2); // 1日にするとタイムゾーンの関係？でPCの機種によってうまく表示されないので2日にする
  const warekiYear = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    year: "numeric",
    era: "long"
  }).format(date);
  const era = warekiYear.slice(0, 2);
  const year = warekiYear.replace(/[^0-9]/g, "");
  if (era === "昭和" && year === "64") return "昭和64/平成1";
  if (era === "平成") {
    const numberYear = Number(year);
    if (numberYear === 31) return "平成31/令和1";
    if (numberYear > 31) return `令和${numberYear - 30}`;
  }
  return era + year;
};

export const getWarekiList = (from: number, to: number, desc = true) => {
  const result = [];

  for (let num = 0; num <= to - from; num += 1) {
    const year = desc ? to - num : from + num;
    const wareki = getWareki(year);
    result.push({ label: `${year}年 (${wareki})`, value: year });
  }

  return result;
};

const dateToday = new Date();

export const localisedDateToday = dateToLocalisedString(
  dateToday,
  "YYYY/MM/DD"
);
export const dateTodayForAttendanceHeader = (
  date = dateToday,
  withDayOfWeek = true
) =>
  dateToLocalisedString(date, "YYYY年MM月DD日") +
  (withDayOfWeek
    ? ` (${oneLetterWeekdaysJapanese[+dateToLocalisedString(date, "d")]})`
    : "");

export const dateTodayForAttendanceHeaderForDetailDaily = (
  date: Date = dateToday,
  withDayOfWeek: boolean = true
) =>
  dateToLocalisedString(date, "YYYY年M月D日") +
  (withDayOfWeek
    ? ` (${oneLetterWeekdaysJapanese[+dateToLocalisedString(date, "d")]})`
    : "");

export const dateTodayInFormat = (
  date: string | Date = dateToday,
  withDayOfWeek = true
) =>
  dateToLocalisedString(date, "YYYY年MM月DD日") +
  (withDayOfWeek
    ? ` (${oneLetterWeekdaysJapanese[+dateToLocalisedString(date, "d")]})`
    : "");

export const dateTodayForApi = () =>
  dateToLocalisedString(new Date(), "YYYYMMDD");
export const currentUnixTimestamp = () => parse(new Date()).getTime();
export const dateFromUnixTimestamp = (unixTimeStamp: string | number | Date) =>
  parse(unixTimeStamp);
export const dateInHyphenYYYYMMDDFormat = (date: Date) =>
  dateToLocalisedString(date, "YYYY-MM-DD");
export const dateInYYYYMMDDFormat = (date = dateToday) =>
  dateToLocalisedString(date, "YYYYMMDD");
export const dateInYYYYMMFormat = (date: Date) =>
  dateToLocalisedString(date, "YYYYMM");
export const dateInYYYYFormat = (date: Date) =>
  dateToLocalisedString(date, "YYYY");
export const dateInMMFormat = (date: Date) => dateToLocalisedString(date, "MM");
export const dateInMFormat = (date: Date) => dateToLocalisedString(date, "M");
export const localisedDateTodayInYYYY_MM_DDFormat = dateToLocalisedString(
  dateToday,
  "YYYY-MM-DD"
);

export const formatTime = (time: number | string): string => {
  if (!time) return "";

  let timeStr = typeof time === "number" ? time.toString() : time;
  const divider = ":";
  if (timeStr.includes(divider)) {
    timeStr = timeStr.replace(divider, "");
  }
  if (timeStr.length < 3) {
    return timeStr;
  }
  if (timeStr.length > 4) timeStr = timeStr.substr(0, 4);
  if (timeStr.length === 3) timeStr = `0${timeStr}`;
  timeStr = timeStr.slice(0, 2) + divider + timeStr.slice(2);
  return timeStr;
};

export const getDiff = (
  dateLeft: string | number | Date,
  dateRight: string | number | Date,
  type = "minute"
) => {
  switch (type) {
    case "minute":
      return differenceInMinutes(dateLeft, dateRight);
    default:
      return differenceInMinutes(dateLeft, dateRight);
  }
};

export const dayOfTheWeekStyle = (date: string | number | Date): string => {
  const dayIndex = new Date(date).getDay();
  if (dayIndex === 0) {
    return "#FF5656";
  }
  if (dayIndex === 6) {
    return "#06A6E9";
  }
  return "";
};

export const getDayOfTheWeek = (date: string | number | Date) => {
  const dayIndex = new Date(date).getDay();
  return oneLetterWeekdaysJapanese[dayIndex];
};

// その月の日数を取得
export const getLastDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

// `YYYY-MM-DD` フォーマットのstringをDateに変換
export const parseDateString = (date: string) => {
  return parse(date);
};

/**
 * string (YYYY-MM-dd) => SelectDateValue
 */
export const dateToSelectDateValue = (date: string): SelectDateValue => {
  const year = date ? dateToLocalisedString(date, "YYYY") : "";
  const month = date ? dateToLocalisedString(date, "M") : "";
  const day = date ? dateToLocalisedString(date, "D") : "";
  return { year, month, day };
};

/**
 * SelectDateValue => string (YYYY-MM-dd)
 */
export const selectDateValueToDate = (value: SelectDateValue): string => {
  const date =
    value.year && value.month && value.day
      ? `${value.year}-${value.month}-${value.day}`
      : "";
  return date;
};

/**
 * SelectDateValue => string (YYYY-MM-dd)
 * 月と日付を0埋めする
 */
export const selectDateValueToDatePaddingZero = (
  value: SelectDateValue
): string | null => {
  const date =
    value.year && value.month && value.day
      ? dateToLocalisedString(
          `${value.year}-${value.month}-${value.day}`,
          "YYYY-MM-DD"
        )
      : null;
  return date;
};

/**
 * Date型から00:00に変換
 */
export const convertTimeHHMM = (date: Date) => {
  const HH = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const MM =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${HH}:${MM}`;
};

/**
 * stringの年月日を年、月、日(1固定)に変換する
 */
export const dateToSelectDateValueYYYYM = (date: string): SelectDateValue => {
  const year = date ? dateToLocalisedString(date, "YYYY") : "";
  const month = date ? dateToLocalisedString(date, "M") : "";
  const day = "1";
  return { year, month, day };
};
