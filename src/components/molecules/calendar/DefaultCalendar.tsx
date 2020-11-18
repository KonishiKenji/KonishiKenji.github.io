/**
 * react-infinite-calendarに基本テーマだけを設定したコンポーネント
 */

import * as React from "react";
import InfiniteCalendar, {
  ReactInfiniteCalendarProps
} from "react-infinite-calendar";
import "@/styles/react-infinite-calendar.css";

const theme = {
  selectionColor: "rgb(6, 166, 233)",
  todayColor: "rgb(6, 166, 233)",
  textColor: {
    default: "rgb(85, 85, 85)",
    active: "#FFF"
  },
  weekdayColor: "rgba(6, 166, 233, 0.8)",
  headerColor: "rgb(6, 166, 233)",
  floatingNav: {
    background: "#778899",
    color: "#FFF",
    chevron: "#FFF"
  }
};

const DefaultCalendar: React.FC<ReactInfiniteCalendarProps> = props => {
  return <InfiniteCalendar theme={theme} {...props} />;
};

export default DefaultCalendar;
