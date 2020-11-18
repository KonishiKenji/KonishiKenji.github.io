/**
 * 曜日ごとに作業時間・休憩時間を設定する
 * 連動項目
 *   - 営業スケジュール => 営業日の状態
 *   - 刻む単位
 *   - 作業時間
 *   - 休憩時間
 */

import * as React from "react";
import * as classNames from "classnames";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import TableHead from "@components/molecules/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormikMultipleSelect from "@components/molecules/FormikMultipleSelect";
import FormikSelect from "@components/molecules/FormikSelect";
import MuiSelect from "@components/molecules/MuiSelect";
import BreakTimeField from "@components/organisms/mgr/IAB/facility/items/BreakTimeField";
import dayOfTheWeek from "@constants/mgr/IAB/dayOfTheWeek";
import circleNumbersList from "@constants/mgr/IAB/circleNumbersList";
import createHoursArray from "@utils/date/createHoursArray";
import createMinutesArray from "@utils/date/createMinutesArray";
import { dowMappingSchedule } from "@utils/domain/facility/dowMappingAdministration";
import { FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

const styles = (): StyleRules =>
  createStyles({
    table: {
      width: 1007,
      tableLayout: "fixed"
    },
    businessDay: {
      marginLeft: 16,
      color: "rgba(45, 180, 90, 0.87)"
    },
    holiday: {
      marginLeft: 16,
      color: "#ff5656"
    },
    cell: {
      padding: "0 8px",
      width: 152,
      boxSizing: "content-box",
      "&:first-child": {
        paddingLeft: 16,
        width: 66,
        whiteSpace: "nowrap"
      },
      "&:last-child": {
        paddingRight: 16,
        width: 93
      },
      "&:nth-last-child(2)": {
        width: 432
      }
    },
    headCell: {
      fontSize: 14
    },
    bodyCell: {
      verticalAlign: "top",
      paddingTop: 10,
      paddingBottom: 10,
      "&:first-child": {
        paddingTop: 16
      }
    },
    bodyRow: {
      height: 56
    },
    field: {
      marginTop: -16,
      "& > div": {
        marginBottom: 0
      },
      "& > :first-child": {
        marginRight: 12
      },
      "& > :last-child": {
        marginRight: 0
      }
    },
    timeWrapper: {
      display: "flex",
      "& > div": {
        width: 72
      }
    }
  });

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

type ChangeHookEvent = (
  event: React.ChangeEvent<HTMLSelectElement>,
  beforeValue: string
) => void;

// 休日の時も内部的に値は持つので、Selectの表示を管理する
const SelectField: React.FC<{
  businessDay: boolean;
  name: string;
  options: { label: string; value: string }[];
  onChangeHook?: ChangeHookEvent;
}> = (props) => {
  return props.businessDay ? (
    <FormikSelect
      label=""
      size="auto"
      name={props.name}
      options={props.options}
      onChangeHook={props.onChangeHook}
    />
  ) : (
    <MuiSelect value="" label="" size="auto" name={props.name} disabled />
  );
};

const ChangeEverydayFields: React.FC<Props> = ({ classes, formikProps }) => {
  const {
    workTimeItems,
    workBreakTimes,
    unitEngrave
  } = formikProps.values.workingTime;
  const hoursOptions = createHoursArray();
  const minutesOptions = createMinutesArray(Number(unitEngrave));

  // 時間が全て存在して削除されていない休憩時間（時間の妥当性は管轄外にしておく）
  const effectiveTimes = workBreakTimes.filter(
    (time) =>
      time.startTimeHour &&
      time.startTimeMinute &&
      time.endTimeHour &&
      time.endTimeMinute &&
      !time.isDeleted
  );

  // circleNumbersListは50までだがその保証は休憩時間の方に任せる
  const breakTimeListOptionsItems = effectiveTimes.map((time) => {
    const index = circleNumbersList[time.index - 1];
    return {
      value: time.id,
      label: `${index}${time.startTimeHour}時${time.startTimeMinute}分〜${time.endTimeHour}時${time.endTimeMinute}分`
    };
  });
  const breakTimeListOptions = [
    {
      categoryName: "選択してください",
      items: breakTimeListOptionsItems
    }
  ];

  // 開始時間や終了時間(分)を変更した時に終了時間(時)のバリデーションを表示させる
  const onChangeWorkTime = (key: number) => (): void => {
    const name = `workingTime.workTimeItems[${key}].endTimeHour`;
    formikProps.setFieldTouched(name, true);
  };

  return (
    <Table className={classes.table}>
      <TableHead
        tabIndex={0}
        key={0}
        selected={false}
        items={[
          {
            align: "left",
            label: "曜日",
            className: classNames(classes.cell, classes.headCell)
          },
          {
            align: "left",
            label: "作業開始時間",
            className: classNames(classes.cell, classes.headCell)
          },
          {
            align: "left",
            label: "作業終了時間",
            className: classNames(classes.cell, classes.headCell)
          },
          {
            align: "left",
            label: "休憩",
            className: classNames(classes.cell, classes.headCell)
          },
          {
            align: "left",
            label: "休憩時間合計",
            className: classNames(classes.cell, classes.headCell)
          }
        ]}
      />
      <TableBody>
        {workTimeItems.map(
          (item: FacilityValues["workingTime"]["workTimeItems"][0], key) => {
            // 営業日を取得する
            const dowSchedule = dowMappingSchedule[item.day_of_the_week];
            const businessDay = formikProps.values.administration[dowSchedule];
            // 現在の選択休憩時間の詳細情報(営業日でないときは強制で未指定扱い)
            const selectBreakTimes = businessDay
              ? effectiveTimes.filter(
                  (time) =>
                    item.workBreakTimeItems.findIndex(
                      (val) => val === time.id
                    ) !== -1
                )
              : [];
            return (
              <TableRow key={item.id} className={classes.bodyRow}>
                <TableCell
                  className={classNames(classes.cell, classes.bodyCell)}
                >
                  {dayOfTheWeek[item.day_of_the_week]}
                  {businessDay ? (
                    <span className={classes.businessDay}>営業</span>
                  ) : (
                    <span className={classes.holiday}>休日</span>
                  )}
                </TableCell>
                <TableCell
                  className={classNames(classes.cell, classes.bodyCell)}
                >
                  <div
                    className={classNames(classes.field, classes.timeWrapper)}
                  >
                    <SelectField
                      name={`workingTime.workTimeItems[${key}].startTimeHour`}
                      options={hoursOptions}
                      businessDay={businessDay}
                      onChangeHook={onChangeWorkTime(key)}
                    />
                    <SelectField
                      name={`workingTime.workTimeItems[${key}].startTimeMinute`}
                      options={minutesOptions}
                      businessDay={businessDay}
                      onChangeHook={onChangeWorkTime(key)}
                    />
                  </div>
                </TableCell>
                <TableCell
                  className={classNames(classes.cell, classes.bodyCell)}
                >
                  <div
                    className={classNames(classes.field, classes.timeWrapper)}
                  >
                    <SelectField
                      name={`workingTime.workTimeItems[${key}].endTimeHour`}
                      options={hoursOptions}
                      businessDay={businessDay}
                    />
                    <SelectField
                      name={`workingTime.workTimeItems[${key}].endTimeMinute`}
                      options={minutesOptions}
                      businessDay={businessDay}
                      onChangeHook={onChangeWorkTime(key)}
                    />
                  </div>
                </TableCell>
                <TableCell
                  className={classNames(classes.cell, classes.bodyCell)}
                >
                  {businessDay && (
                    <FormikMultipleSelect
                      label=""
                      name={`workingTime.workTimeItems[${key}].workBreakTimeItems`}
                      placeholder={businessDay ? "選択してください" : ""}
                      size="fullSize"
                      disabled={effectiveTimes.length === 0}
                      options={breakTimeListOptions}
                      style={{ margin: 0 }}
                      isNotShot
                    />
                  )}
                  {!businessDay && (
                    <div className={classes.field}>
                      <MuiSelect
                        value=""
                        label=""
                        size="fullSize"
                        name=""
                        disabled
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell
                  className={classNames(classes.cell, classes.bodyCell)}
                >
                  <BreakTimeField
                    unitEngrave={unitEngrave}
                    breakTimes={selectBreakTimes}
                  />
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(ChangeEverydayFields);
