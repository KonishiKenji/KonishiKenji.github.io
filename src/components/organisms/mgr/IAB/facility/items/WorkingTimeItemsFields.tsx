/**
 * 作業時間
 * ※ 大カテゴリの作業時間とは別
 */

import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import createHoursArray from "@utils/date/createHoursArray";
import createMinutesArray from "@utils/date/createMinutesArray";
import { FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

interface Props {
  formikProps: FormikProps<FacilityValues>;
}

const WorkingTimeFields: React.FC<Props> = ({ formikProps }) => {
  const { unitEngrave, workTimeItems } = formikProps.values.workingTime;
  const hoursOptions = createHoursArray();
  const minutesOptions = createMinutesArray(Number(unitEngrave));

  // 作業時間を更新したら曜日ごとの営業時間も更新する
  const setValueWorkTimeItems = React.useCallback(
    (
      value: string,
      target: keyof FacilityValues["workingTime"]["workTimeItems"][0],
      items: FacilityValues["workingTime"]["workTimeItems"]
    ) => {
      const values = items.map((item) => ({
        ...item,
        [target]: value
      }));
      formikProps.setFieldValue("workingTime.workTimeItems", values);
    },
    []
  );

  const onChangeStartHor = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValueWorkTimeItems(e.target.value, "startTimeHour", workTimeItems);
      formikProps.setFieldTouched("workingTime.endHor", true);
    },
    [workTimeItems]
  );

  const onChangeStartMin = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValueWorkTimeItems(e.target.value, "startTimeMinute", workTimeItems);
      formikProps.setFieldTouched("workingTime.endHor", true);
    },
    [workTimeItems]
  );

  const onChangeEndHor = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValueWorkTimeItems(e.target.value, "endTimeHour", workTimeItems);
    },
    [workTimeItems]
  );

  const onChangeEndMin = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValueWorkTimeItems(e.target.value, "endTimeMinute", workTimeItems);
      formikProps.setFieldTouched("workingTime.endHor", true);
    },
    [workTimeItems]
  );

  return (
    <FormGroup row>
      <FormikSelect
        name="workingTime.startHor"
        label="開始"
        size="smallMedium"
        options={hoursOptions}
        onChangeHook={onChangeStartHor}
      />
      <FormikSelect
        name="workingTime.startMin"
        label=""
        size="smallMedium"
        options={minutesOptions}
        onChangeHook={onChangeStartMin}
      />
      <FormikSelect
        name="workingTime.endHor"
        label="終了"
        size="smallMedium"
        options={hoursOptions}
        onChangeHook={onChangeEndHor}
      />
      <FormikSelect
        name="workingTime.endMin"
        label=""
        size="smallMedium"
        options={minutesOptions}
        onChangeHook={onChangeEndMin}
      />
    </FormGroup>
  );
};

export default WorkingTimeFields;
