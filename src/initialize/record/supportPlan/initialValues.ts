import { SupportPlanState } from "@stores/domain/supportPlan/types";
import {
  InputValue,
  SelectValue,
  MultipleSelectValue,
  SelectDateValue
} from "@interfaces/ui/form";
import get from "lodash-es/get";
import { dateToSelectDateValue } from "@utils/date";
import dateToLocalisedString from "@utils/date/dateToLocalisedString";

export interface RecordSupportPlanValues {
  creation_date: SelectDateValue; // 計画作成日
  support_begin_date: SelectDateValue; // 支援開始日
  support_end_date: SelectDateValue; // 支援終了日
  user_request_text: InputValue; // 本人・家族の意向
  current_status: InputValue; // 本人の現状
  long_term_goal: InputValue; // 長期目標
  // 短期目標
  support_plan_goal: {
    id?: number; // 登録済みの場合
    number: number; // 短期目標番号
    sprint_goal: InputValue; // 目標
    adopt_info: InputValue; // 本人の取り組み内容
    support_info: InputValue; // 職員の支援内容
  }[];
  remarks: InputValue; // 備考欄
  staff_comment: InputValue; // 職員コメント
  author: SelectValue; // 作成者
  minutes_date: SelectDateValue; // 実施日
  participant: MultipleSelectValue; // 参加者
  minutes: InputValue; // 会議議事録
  status_type: SelectValue; // 承認ステータス
  authorizer: SelectValue; // 承認者
}

/**
 * support_plan_goalは入力していないnumberは返って来ないので、ない場合は初期値でセットする
 */
const supplementSupportPlanGoal = (
  supportPlanGoal: SupportPlanState["privateSupportPlan"]["support_plan_goal"]
): RecordSupportPlanValues["support_plan_goal"] => {
  return [1, 2, 3].map((num) => {
    const res = supportPlanGoal.find((s) => s.number === num);
    return res
      ? {
          id: res.id,
          number: res.number,
          sprint_goal: res.sprint_goal || "",
          adopt_info: res.adopt_info || "",
          support_info: res.support_info || ""
        }
      : {
          number: num,
          sprint_goal: "",
          adopt_info: "",
          support_info: ""
        };
  });
};

const initialValues = (
  values?: SupportPlanState["privateSupportPlan"]
): RecordSupportPlanValues => {
  let creationDate = get(values, "creation_date") || "";
  let minutesDate = get(values, "minutes_date") || "";
  if (!values) {
    // 新規作成の場合は現在日付を入れる
    const currentDate = dateToLocalisedString(new Date(), "YYYY-MM-DD");
    creationDate = currentDate;
    minutesDate = currentDate;
  }

  // author,authorizerは入力ありなしで型が変わる
  const authorId =
    values && typeof values.author !== "number" ? `${values.author.id}` : "";
  const authorizerId =
    values && typeof values.authorizer !== "number"
      ? `${values.authorizer.id}`
      : "";
  // participantはfacility_id以外の情報もくるので整形しておく
  const participantIds = values ? values.participant.map((p) => `${p.id}`) : [];

  return {
    creation_date: dateToSelectDateValue(creationDate),
    support_begin_date: dateToSelectDateValue(
      get(values, "support_begin_date") || ""
    ),
    support_end_date: dateToSelectDateValue(
      get(values, "support_end_date") || ""
    ),
    user_request_text: get(values, "user_request_text") || "",
    current_status: get(values, "current_status") || "",
    long_term_goal: get(values, "long_term_goal") || "",
    support_plan_goal: supplementSupportPlanGoal(
      get(values, "support_plan_goal") || []
    ),
    remarks: get(values, "remarks") || "",
    staff_comment: get(values, "staff_comment") || "",
    author: authorId,
    minutes_date: dateToSelectDateValue(minutesDate),
    participant: participantIds,
    minutes: get(values, "minutes") || "",
    status_type: `${get(values, "status_type") || 0}`,
    authorizer: authorizerId
  };
};

export default initialValues;
