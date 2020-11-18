/**
 * 営業スケジュール
 * 月曜日から日曜日までの営業スケジュール入力（チェック・開始時間・終了時間）
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { InputValue, CheckBoxValue } from "@interfaces/ui/form";

interface Base<T> {
  administration: T;
}

interface Fields {
  mondaySchedule: CheckBoxValue;
  mondayStartTime: InputValue;
  mondayEndTime: InputValue;
  tuesdaySchedule: CheckBoxValue;
  tuesdayStartTime: InputValue;
  tuesdayEndTime: InputValue;
  wednesdaySchedule: CheckBoxValue;
  wednesdayStartTime: InputValue;
  wednesdayEndTime: InputValue;
  thursdaySchedule: CheckBoxValue;
  thursdayStartTime: InputValue;
  thursdayEndTime: InputValue;
  fridaySchedule: CheckBoxValue;
  fridayStartTime: InputValue;
  fridayEndTime: InputValue;
  saturdaySchedule: CheckBoxValue;
  saturdayStartTime: InputValue;
  saturdayEndTime: InputValue;
  sundaySchedule: CheckBoxValue;
  sundayStartTime: InputValue;
  sundayEndTime: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type AdministrationValues = Base<Fields>;
export type AdministrationErrors = Base<Errors>;
