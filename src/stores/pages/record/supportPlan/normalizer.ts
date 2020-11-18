import { RecordSupportPlanValues } from "@initialize/record/supportPlan/initialValues";
import { PostSupportPlanParams } from "@api/requests/supportPlan/postSupportPlan";
import { PostSupportPlanUpdateParams } from "@api/requests/supportPlan/postSupportPlanUpdate";
import { selectDateValueToDate } from "@utils/date";
import deepEqual from "fast-deep-equal";

/**
 * 所持する項目が1つでも入力されている短期目標だけ返す
 * (idが付与されている場合は常に返すことになる)
 */
const getInputSupportPlanGoal = (
  supportPlanGoal: RecordSupportPlanValues["support_plan_goal"]
): PostSupportPlanParams["support_plan_goal"] => {
  const necessarySupportPlanGoal = supportPlanGoal.filter(
    (value) =>
      value.id || value.sprint_goal || value.adopt_info || value.support_info
  );
  return necessarySupportPlanGoal.map((value) => {
    const resultValue = value;
    if (!value.id && value.sprint_goal === "") delete resultValue.sprint_goal;
    if (!value.id && value.adopt_info === "") delete resultValue.adopt_info;
    if (!value.id && value.support_info === "") delete resultValue.support_info;
    return resultValue;
  });
};

/**
 * Formの入力をPostSupportPlanParams形式に変換する
 * - 入力がなければnullで送る
 * - 短期目標は入力が1つでもある場合送る（入力がない項目はプロパティごと送らない）
 */
export const normalizeFormValuesToPostSupportPlanParams = (
  values: RecordSupportPlanValues
): PostSupportPlanParams => {
  return {
    creation_date: selectDateValueToDate(values.creation_date),
    support_begin_date: selectDateValueToDate(values.support_begin_date),
    support_end_date: selectDateValueToDate(values.support_end_date),
    user_request_text: values.user_request_text || null,
    current_status: values.current_status || null,
    long_term_goal: values.long_term_goal || null,
    support_plan_goal: getInputSupportPlanGoal(values.support_plan_goal),
    remarks: values.remarks || null,
    staff_comment: values.staff_comment || null,
    author: Number(values.author) || 0,
    minutes_date: selectDateValueToDate(values.minutes_date) || null,
    participant: values.participant.map((id) => Number(id)),
    minutes: values.minutes || null,
    status_type: Number(values.status_type),
    authorizer: values.status_type !== "0" ? Number(values.authorizer) || 0 : 0
  };
};

/**
 * Formの入力をPostSupportPlanUpdateParams形式に変換する
 * - 差分がなければ送らない
 * - 短期目標は変更がなくてもidとnumberは送る
 */
export const normalizeFormValuesToPostSupportPlanUpdateParams = (
  values: RecordSupportPlanValues,
  initialValues: RecordSupportPlanValues,
  supportPlanId: string
): PostSupportPlanUpdateParams => {
  const keys = Object.keys(values) as (keyof RecordSupportPlanValues)[];
  const deleteKeys = keys.filter((key) => {
    // support_plan_goalはidもしくは値が一つでもあれば除外フラグをfalseにする
    if (key === "support_plan_goal") {
      const exclusionFlg = !values.support_plan_goal.some((goal) => {
        if (
          goal.sprint_goal ||
          goal.adopt_info ||
          goal.support_info ||
          goal.id
        ) {
          return true;
        }
        return false;
      });
      return exclusionFlg;
    }
    return deepEqual(values[key], initialValues[key]);
  });
  const normalizeValues = normalizeFormValuesToPostSupportPlanParams(values);
  deleteKeys.forEach((key) => {
    delete normalizeValues[key];
  });
  return { id: +supportPlanId, ...normalizeValues };
};
