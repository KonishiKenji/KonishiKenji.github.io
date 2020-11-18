/**
 * 休憩時間を算出するフィールド、表示だけで編集等は出来ない
 * 計算ロジックはutilsに配置して他でも使用できるようにする
 */

import * as React from "react";
import MuiTextField from "@components/molecules/MuiTextField";
import generateUsageTimeFlagList from "@utils/dataNormalizer/generateUsageTimeFlagList";
import formatMinutes from "@utils/date/formatMinutes";

interface Props {
  unitEngrave: string;
  breakTimes: {
    startTimeHour: string;
    startTimeMinute: string;
    endTimeHour: string;
    endTimeMinute: string;
  }[];
}

const BreakTimeField: React.FunctionComponent<Props> = (props: Props) => {
  const { unitEngrave, breakTimes } = props;
  const [breakTimeValue, setBreakTimeValue] = React.useState("-");

  React.useEffect(() => {
    const useUnitEngrave =
      !!unitEngrave && unitEngrave !== "0" ? Number(unitEngrave) : 1;
    const breakTimeFlagList = generateUsageTimeFlagList(
      useUnitEngrave,
      breakTimes
    );
    let updateBreakTimeValue = "-";
    if (Object.keys(breakTimeFlagList).length > 0) {
      // trueの数とunitEngraveを掛けた数が合計の分
      const totalMin = Object.keys(breakTimeFlagList).reduce(
        (accumulator, listKey) => {
          const flagList: boolean[] = breakTimeFlagList[listKey];
          const targetMin = flagList.reduce((acc, flag) => {
            const min = flag ? useUnitEngrave : 0;
            return acc + min;
          }, 0);
          return accumulator + targetMin;
        },
        0
      );
      updateBreakTimeValue = totalMin ? formatMinutes(totalMin) : "0分";
    }
    setBreakTimeValue(updateBreakTimeValue);
  }, [unitEngrave, breakTimes]);

  return (
    <MuiTextField
      label=""
      size="auto"
      value={breakTimeValue}
      disabled
      style={{ margin: 0 }}
    />
  );
};

export default BreakTimeField;
