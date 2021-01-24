import { RecordSupportPlanValues } from "@initialize/mgr/A/record/supportPlan/initialValues";
import { PostSupportPlanParams } from "@api/requests/supportPlan/A/postSupportPlan";
import { PostSupportPlanUpdateParams } from "@api/requests/supportPlan/A/postSupportPlanUpdate";
import { selectDateValueToDate } from "@utils/date";
import trimString from "@utils/dataNormalizer/trimString";
import deepEqual from "fast-deep-equal";
import uniq from "lodash-es/uniq";

/**
 * 所持する項目が1つでも入力されている目標だけ返す
 * (idが付与されている場合は常に返すことになる)
 */
const getInputSupportPlanGoal = (
  supportPlanGoal: RecordSupportPlanValues["support_plan_goal"]
): PostSupportPlanParams["support_plan_goal"] => {
  const result = supportPlanGoal.map((v) => {
    return {
      ...v,
      sprint_goal: trimString(v.sprint_goal),
      adopt_info: trimString(v.adopt_info),
      support_info: trimString(v.support_info),
      sprint_review: trimString(v.sprint_review),
      sprint_user_review: trimString(v.sprint_user_review),
      sprint_staff_review: trimString(v.sprint_staff_review),
      sprint_type: v.sprint_type.toString(),
      sprint_start_date: selectDateValueToDate(v.sprint_start_date) || null,
      sprint_end_date: selectDateValueToDate(v.sprint_end_date) || null,
      sprint_result:
        v.sprint_result === "0" ? 0 : Number(v.sprint_result) || null,
      sprint_user_evaluation:
        v.sprint_user_evaluation === "0"
          ? 0
          : Number(v.sprint_user_evaluation) || null,
      sprint_staff_evaluation:
        v.sprint_staff_evaluation === "0"
          ? 0
          : Number(v.sprint_staff_evaluation) || null
    };
  });
  return result
    .map((value) => {
      const resultValue = value;
      if (!value.id && !value.sprint_goal) {
        delete resultValue.sprint_goal;
      }
      if (!value.id && !value.adopt_info) {
        delete resultValue.adopt_info;
      }
      if (!value.id && !value.support_info) {
        delete resultValue.support_info;
      }
      if (!value.id && !value.sprint_start_date) {
        delete resultValue.sprint_start_date;
      }
      if (!value.id && !value.sprint_end_date) {
        delete resultValue.sprint_end_date;
      }
      if (!value.id && value.sprint_result !== 0 && !value.sprint_result) {
        delete resultValue.sprint_result;
      }
      if (!value.id && !value.sprint_review) {
        delete resultValue.sprint_review;
      }
      if (
        !value.id &&
        value.sprint_user_evaluation !== 0 &&
        !value.sprint_user_evaluation
      ) {
        delete resultValue.sprint_user_evaluation;
      }
      if (!value.id && !value.sprint_user_review) {
        delete resultValue.sprint_user_review;
      }
      if (
        !value.id &&
        value.sprint_staff_evaluation !== 0 &&
        !value.sprint_staff_evaluation
      ) {
        delete resultValue.sprint_staff_evaluation;
      }
      if (!value.id && !value.sprint_staff_review) {
        delete resultValue.sprint_staff_review;
      }
      return resultValue;
    })
    .filter((v) => {
      return (
        v.sprint_goal ||
        v.adopt_info ||
        v.support_info ||
        v.sprint_start_date ||
        v.sprint_end_date ||
        v.sprint_result ||
        v.sprint_result === 0 ||
        v.sprint_review ||
        v.sprint_user_evaluation ||
        v.sprint_user_evaluation === 0 ||
        v.sprint_user_review ||
        v.sprint_staff_evaluation ||
        v.sprint_staff_evaluation === 0 ||
        v.sprint_staff_review ||
        v.id
      );
    });
};

/**
 * 「半角・全角ブランクのみ」の値を間引き number 値を採番する整形処理
 * 「プログラム ( 1 日の流れ )」項目は空欄入力が可能
 */
const getInputSupportPlanProgram = (
  supportPlanProgram: RecordSupportPlanValues["support_plan_program"]
): PostSupportPlanParams["support_plan_program"] => {
  return supportPlanProgram.map((p, index) => {
    const resultValue = {
      ...p,
      service_content: trimString(p.service_content),
      scheduled_time: trimString(p.scheduled_time),
      number: index + 1 // number を再採番
    };
    if (!resultValue.id) {
      delete resultValue.id;
    }
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
  const previousCreationDate = selectDateValueToDate(
    values.previous_creation_date
  );
  return {
    creation_date: selectDateValueToDate(values.creation_date),
    previous_creation_date: previousCreationDate || null,
    support_begin_date: selectDateValueToDate(values.support_begin_date),
    support_end_date: selectDateValueToDate(values.support_end_date),
    details: trimString(values.details) || null,
    user_request_text: trimString(values.user_request_text) || null,
    income_status: trimString(values.income_status) || null,
    user_issue: trimString(values.user_issue) || null,
    physical_condition: trimString(values.physical_condition) || null,
    risk_factor: trimString(values.risk_factor) || null,
    after_summary: trimString(values.after_summary) || null,
    current_status: trimString(values.current_status) || null,
    support_plan_goal: getInputSupportPlanGoal(values.support_plan_goal),
    support_plan_program: getInputSupportPlanProgram(
      values.support_plan_program
    ),
    pickup: Number(values.pickup),
    remarks: trimString(values.remarks) || null,
    staff_comment: trimString(values.staff_comment) || null,
    author: Number(values.author) || 0,
    revaluation_date: selectDateValueToDate(values.revaluation_date) || null,
    minutes_date: selectDateValueToDate(values.minutes_date) || null,
    evaluation_date: selectDateValueToDate(values.evaluation_date) || null,
    participant: uniq(values.participant.map((p) => Number(p.id))),
    minutes: trimString(values.minutes) || null,
    evaluation_minutes: trimString(values.evaluation_minutes) || null,
    status_type: Number(values.status_type),
    evaluation_minutes_status: Number(values.evaluation_minutes_status),
    evaluation_status: Number(values.evaluation_status),
    authorizer: values.status_type !== "0" ? Number(values.authorizer) || 0 : 0,
    evaluation_authorizer:
      values.evaluation_status !== "0"
        ? Number(values.evaluation_authorizer) || 0
        : 0
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
      return !values.support_plan_goal.some((goal) => {
        return (
          trimString(goal.sprint_goal) ||
          trimString(goal.adopt_info) ||
          trimString(goal.support_info) ||
          trimString(goal.sprint_review) ||
          trimString(goal.sprint_user_review) ||
          trimString(goal.sprint_staff_review) ||
          selectDateValueToDate(goal.sprint_start_date) ||
          selectDateValueToDate(goal.sprint_end_date) ||
          goal.sprint_result ||
          goal.sprint_user_evaluation ||
          goal.sprint_staff_evaluation ||
          goal.id
        );
      });
    }
    return deepEqual(values[key], initialValues[key]);
  });
  const normalizeValues = normalizeFormValuesToPostSupportPlanParams(values);
  deleteKeys.forEach((key) => {
    delete normalizeValues[key];
  });
  return { id: +supportPlanId, ...normalizeValues };
};
