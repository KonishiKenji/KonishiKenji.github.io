/**
 * react-infinite-calendarの日付コンポーネントにhighlightedのスタイルを付与する仕組みと思われる
 *  => やっていることは何となく分かるがライブラリ内部の実装までは潜れてない
 * react-infinite-calendar.cssがライブラリではなく、knowbe管理下にあるのはcssにhighlightedの定義を追加するためだったと思われる
 * @see https://vijayt.com/post/highlighting-dates-react-infinite-calendar/
 */

import { withProps } from "recompose";
import { Calendar } from "react-infinite-calendar";

// 日付コンポーネントのdate(YYYY-MM-DD)がこちら側で用意した日付一覧に含まれているかをチェックしているっぽい
function enhanceDay(highlighted: string[]) {
  return withProps((props: { date: string }) => ({
    isHighlighted: highlighted.indexOf(props.date) !== -1
  }));
}

// Calendar内にDayComponentが含まれているらしく、それをenhanceDayを通して合成結果を引き出しているっぽい
export default function withHighlightedDates(highlighted: string[]) {
  return withProps(({ DayComponent }: any) => ({
    DayComponent: enhanceDay(highlighted)(DayComponent)
  }))(Calendar);
}
