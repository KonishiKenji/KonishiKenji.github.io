import dateToLocalisedString from "@/utils/date/dateToLocalisedString";

const oneLetterWeekdaysJapanese = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * 指定日付から1ヶ月分の曜日を作成
 *
 * @param date
 */
const createWeekdaysJapaneseList = (date: Date): string[] => {
  const initTarget = +dateToLocalisedString(date, "d");
  return Array(31)
    .fill(0)
    .map((target, idx) => {
      const targetWeekday =
        initTarget + idx - Math.floor((initTarget + idx) / 7) * 7;
      return oneLetterWeekdaysJapanese[targetWeekday];
    });
};

export default createWeekdaysJapaneseList;
