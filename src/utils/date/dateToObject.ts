import dateToLocalisedString from "@utils/date/dateToLocalisedString";
import oneLetterWeekdaysJapanese from "@utils/date/oneLetterWeekdaysJapanese";

const dateToday = new Date();

const dateToObject = (date = dateToday) => ({
  year: dateToLocalisedString(date, "YYYY"),
  month: dateToLocalisedString(date, "M"),
  day: dateToLocalisedString(date, "D"),
  hour: dateToLocalisedString(date, "HH"),
  minute: dateToLocalisedString(date, "mm"),
  second: dateToLocalisedString(date, "s"),
  day_of_week: oneLetterWeekdaysJapanese[+dateToLocalisedString(date, "d")]
});

export default dateToObject;
