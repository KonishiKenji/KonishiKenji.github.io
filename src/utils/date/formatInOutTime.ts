import { defaultTimeLabel } from "@/utils/date/index";
import dateToObject from "@utils/date/dateToObject";

/**
 * Returns formatted obj
 * @param {string} dateTime
 * @returns {object}
 */
export const formatInOutTime = (dateTime: string) => {
  if (dateTime) {
    const dateObject = dateToObject(new Date(dateTime.replace(/-/g, "/")));
    return `${dateObject.hour}:${dateObject.minute}`;
  }
  return defaultTimeLabel;
};
