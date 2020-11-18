import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import {
  CheckBoxValue,
  InputValue,
  SelectValue,
  ShotMultipleSelectValue,
  SelectDateValue,
  RadioButtonValue
} from "@interfaces/ui/form";
import get from "lodash-es/get";
import { dateToSelectDateValue } from "@utils/date";
import dateToLocalisedString from "@utils/date/dateToLocalisedString";
import { SprintType } from "@constants/mgr/IAB/variables";

export interface RecordSupportPlanValues {
  creation_date: SelectDateValue; // 計画作成日
  previous_creation_date: SelectDateValue; // 前回作成日
  support_begin_date: SelectDateValue; // 支援開始日
  support_end_date: SelectDateValue; // 支援終了日
  details: InputValue; // 本人情報・就労継続支援A型利用までの経緯（活動歴や病歴など）
  user_request_text: InputValue; // 本人の希望（業務内容、労働時間、賃金、一般就労の希望有無など）（元・本人・家族の意向）
  income_status: InputValue; // 本人の障害基礎年金などの有無や収入状況
  user_issue: InputValue; // 本人の生産活動を行う際の課題
  physical_condition: InputValue; // 健康状態（病名、服薬状況など）
  risk_factor: InputValue; // 生産活動や支援で留意する医学的リスクなど
  after_summary: InputValue; // 実施後の変化（総括）
  current_status: InputValue; //  生活環境や自宅での役割などの本人の生活状況（元・本人の現状）
  long_term_goal: InputValue; // 長期目標
  // 長期目標・短期目標・個別目標
  support_plan_goal: {
    id?: number; // 登録済みの場合
    number: number; // 短期目標番号
    sprint_type: SprintType; // 目標種別
    sprint_goal: InputValue; // 目標
    adopt_info: InputValue; // 本人の取り組み内容
    support_info: InputValue; // 職員の支援内容
    sprint_start_date: SelectDateValue; // 設定日
    sprint_end_date: SelectDateValue; // 達成予定日
    sprint_result: RadioButtonValue; // 振り返り実施
    sprint_review: InputValue; // 振り返りコメント
    sprint_user_evaluation: RadioButtonValue; // 本人の振り返り
    sprint_user_review: InputValue; // 本人の評価コメント
    sprint_staff_evaluation: RadioButtonValue; // 職員の振り返り
    sprint_staff_review: InputValue; // 職員の評価コメント
  }[];
  support_plan_program: {
    id?: number; // 個別支援計画書のプログラムごとに紐付くID 新規の時はidキーごと無し
    number: number; // 親データに紐づいて付く連番（データソート用）
    scheduled_time: InputValue; // 予定時間
    service_content: InputValue; // サービス内容
    delete: CheckBoxValue; // 削除パラメータ
  }[];
  pickup: SelectValue; // 送迎
  remarks: InputValue; // 備考欄
  staff_comment: InputValue; // 職員コメント
  author: SelectValue; // 作成者
  revaluation_date: SelectDateValue; // 再評価日
  evaluation_status: SelectValue; // 評価・振り返りステータス
  evaluation_minutes_status: SelectValue; // 評価・振り返り議事録ステータス
  minutes_date: SelectDateValue; // 実施日
  evaluation_date: SelectDateValue; // 評価振り返り会議実施日
  participant: ShotMultipleSelectValue; // 参加者
  minutes: InputValue; // 会議議事録
  evaluation_minutes: InputValue; // 評価振り返り議事録
  status_type: SelectValue; // 承認ステータス
  authorizer: SelectValue; // 承認者
  evaluation_authorizer: SelectValue; // 評価者
}

/**
 * support_plan_goalは入力していないnumberは返って来ないので、ない場合は初期値でセットする
 */
const supplementSupportPlanGoal = (
  supportPlanGoal: SupportPlanAState["privateSupportPlan"]["support_plan_goal"]
): RecordSupportPlanValues["support_plan_goal"] => {
  const numberOfLongOrShort = 1;
  const convertPrivateToRecord = (
    res:
      | SupportPlanAState["privateSupportPlan"]["support_plan_goal"][0]
      | undefined,
    defaultNumber: number,
    defaultSprintType: SprintType
  ): RecordSupportPlanValues["support_plan_goal"][0] => {
    return res
      ? {
          id: res.id,
          number: res.number,
          sprint_type: res.sprint_type,
          sprint_goal: res.sprint_goal || "",
          adopt_info: res.adopt_info || "",
          support_info: res.support_info || "",
          sprint_start_date: dateToSelectDateValue(res.sprint_start_date || ""),
          sprint_end_date: dateToSelectDateValue(res.sprint_end_date || ""),
          sprint_result: String(res.sprint_result) || "",
          sprint_review: res.sprint_review || "",
          sprint_user_evaluation: String(res.sprint_user_evaluation) || "",
          sprint_user_review: res.sprint_user_review || "",
          sprint_staff_evaluation: String(res.sprint_staff_evaluation) || "",
          sprint_staff_review: res.sprint_staff_review || ""
        }
      : {
          number: defaultNumber,
          sprint_type: defaultSprintType,
          sprint_goal: "",
          adopt_info: "",
          support_info: "",
          sprint_start_date: dateToSelectDateValue(""),
          sprint_end_date: dateToSelectDateValue(""),
          sprint_result: "",
          sprint_review: "",
          sprint_user_evaluation: "",
          sprint_user_review: "",
          sprint_staff_evaluation: "",
          sprint_staff_review: ""
        };
  };

  const supportPlanGoalLong = convertPrivateToRecord(
    supportPlanGoal.find((g) => g.sprint_type === SprintType.LONG),
    numberOfLongOrShort,
    SprintType.LONG
  );
  const supportPlanGoalShort = convertPrivateToRecord(
    supportPlanGoal.find((g) => g.sprint_type === SprintType.SHORT),
    numberOfLongOrShort,
    SprintType.SHORT
  );
  const tmpSupportPlanGoalIndividuals = supportPlanGoal.filter(
    (g) => g.sprint_type === SprintType.INDIVIDUAL
  );
  const individualNumbers = [1, 2, 3, 4, 5]; // 個別目標 1~5
  const supportPlanGoalIndividuals = individualNumbers.map((num) => {
    const res = tmpSupportPlanGoalIndividuals.find((s) => s.number === num);
    return convertPrivateToRecord(res, num, SprintType.INDIVIDUAL);
  });
  return [
    supportPlanGoalLong,
    supportPlanGoalShort,
    ...supportPlanGoalIndividuals
  ];
};

const supplementSupportPlanProgram = (
  supportPlanProgram: SupportPlanAState["privateSupportPlan"]["support_plan_program"]
): RecordSupportPlanValues["support_plan_program"] => {
  const empty = {
    number: 1,
    scheduled_time: "",
    service_content: "",
    delete: false
  };
  if (supportPlanProgram.length > 0) {
    return supportPlanProgram.map((p, i) => {
      if (p) {
        return {
          id: get(p, "id"),
          number: get(p, "number") || i + 1,
          scheduled_time: get(p, "scheduled_time") || "",
          service_content: get(p, "service_content") || "",
          delete: false
        };
      }
      return { ...empty, number: i + 1 };
    }) as RecordSupportPlanValues["support_plan_program"];
  }
  return [{ ...empty }];
};

const initialValues = (
  values?: SupportPlanAState["privateSupportPlan"]
): RecordSupportPlanValues => {
  const previousCreationDate = get(values, "previous_creation_date") || "";
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
  const evaluationAuthorizerId =
    values && typeof values.evaluation_authorizer !== "number"
      ? `${values.evaluation_authorizer.id}`
      : "";
  // participantはfacility_id以外の情報もくるので整形しておく
  const participantIds = values
    ? values.participant.map((p) => {
        const { id, name } = p;
        return { category_id: 0, id, label: name, is_delete: null };
      })
    : [];

  return {
    creation_date: dateToSelectDateValue(creationDate),
    previous_creation_date: dateToSelectDateValue(previousCreationDate),
    support_begin_date: dateToSelectDateValue(
      get(values, "support_begin_date") || ""
    ),
    support_end_date: dateToSelectDateValue(
      get(values, "support_end_date") || ""
    ),
    details: get(values, "details") || "",
    user_request_text: get(values, "user_request_text") || "",
    income_status: get(values, "income_status") || "",
    user_issue: get(values, "user_issue") || "",
    physical_condition: get(values, "physical_condition") || "",
    risk_factor: get(values, "risk_factor") || "",
    after_summary: get(values, "after_summary") || "",
    current_status: get(values, "current_status") || "",
    long_term_goal: get(values, "long_term_goal") || "",
    support_plan_goal: supplementSupportPlanGoal(
      get(values, "support_plan_goal") || []
    ),
    support_plan_program: supplementSupportPlanProgram(
      get(values, "support_plan_program") || []
    ),
    pickup: `${get(values, "pickup") || 0}`,
    remarks: get(values, "remarks") || "",
    staff_comment: get(values, "staff_comment") || "",
    author: authorId,
    revaluation_date: dateToSelectDateValue(
      get(values, "revaluation_date") || ""
    ),
    evaluation_status: `${get(values, "evaluation_status") || 0}`,
    minutes_date: dateToSelectDateValue(minutesDate),
    evaluation_date: dateToSelectDateValue(
      get(values, "evaluation_date") || ""
    ),
    participant: participantIds,
    minutes: get(values, "minutes") || "",
    evaluation_minutes: get(values, "evaluation_minutes") || "",
    status_type: `${get(values, "status_type") || 0}`,
    evaluation_minutes_status: `${
      get(values, "evaluation_minutes_status") || 0
    }`,
    authorizer: authorizerId,
    evaluation_authorizer: evaluationAuthorizerId
  };
};

export default initialValues;
