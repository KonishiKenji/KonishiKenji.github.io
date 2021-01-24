/**
 * 指定日付にエラーアイコンを表示する
 */

import * as React from "react";
import {
  withDateSelection,
  ReactInfiniteCalendarProps
} from "react-infinite-calendar";
import DefaultCalendar from "./DefaultCalendar";
import withHighlightedDates from "./withHighlightedDates";

type Props = ReactInfiniteCalendarProps & { errorDates: string[] }; // errorDates => ["YYYY-MM-DD", ...]

const HighlightErrorsCalendar: React.FC<Props> = props => {
  return (
    <DefaultCalendar
      Component={withDateSelection(withHighlightedDates(props.errorDates))}
      {...props}
    />
  );
};

export default HighlightErrorsCalendar;
