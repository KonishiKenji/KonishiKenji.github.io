import format from "date-fns/format";
import jaLocale from "date-fns/locale/ja";
import fixDateAndTimeFormat from "@utils/dataNormalizer/fixDateAndTimeFormat";

/**
 * 日付を任意フォーマットに変換する
 * @param date 日付文字列・タイムスタンプ・Date
 * @param desiredFormat 指定フォーマット
 */
const dateToLocalisedString = (
  date: string | number | Date,
  desiredFormat: string
): string => {
  const value = typeof date === "string" ? fixDateAndTimeFormat(date) : date;
  return format(value, desiredFormat, { locale: jaLocale });
};

export default dateToLocalisedString;
