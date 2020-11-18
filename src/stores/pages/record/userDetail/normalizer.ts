import { RecordUserDetailValues as SEIKATSUKAIGOFormValues } from "@initialize/mgr/SEIKATSUKAIGO/record/userDetail/initialValues";
import { RecordUserDetailValues as IABFormValues } from "@initialize/mgr/IAB/record/userDetail/initialValues";
import { PostSupportsParams } from "@api/requests/supports/postSupports";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import getStaffName from "@utils/domain/staffs/getStaffName";
import omitByNoChanges from "@utils/dataNormalizer/omitByNoChanges";
import omit from "lodash-es/omit";

type RecordUserDetailValues = SEIKATSUKAIGOFormValues | IABFormValues;
type FormSupport = RecordUserDetailValues["support"][0];
type PostSupport = PostSupportsParams["support"][0];

/**
 * 差分だけピックしたフォームの値をPostSupportが受け付ける値に変換する
 */
const supportMapping = (
  value: Partial<FormSupport>,
  work: WorkState,
  staff: StaffState
): PostSupport => {
  const supportParams = {} as PostSupportsParams["support"][0];

  if (value.staff_id === "") {
    supportParams.staff_id = null;
    supportParams.staff_name = null;
  } else if (value.staff_id) {
    supportParams.staff_id = value.staff_id;
    supportParams.staff_name = getStaffName(staff, value.staff_id);
  }

  if (value.correspondent_staff_id === "") {
    supportParams.correspondent_staff_id = null;
    supportParams.correspondent_staff_name = null;
  } else if (value.correspondent_staff_id) {
    supportParams.correspondent_staff_id = value.correspondent_staff_id;
    supportParams.correspondent_staff_name = getStaffName(
      staff,
      value.correspondent_staff_id
    );
  }

  if (value.support_work_history) {
    const { beforeValues, itemIdList } = value.support_work_history;
    supportParams.support_work_history = itemIdList.map((item, index) => {
      const beforeValue = beforeValues[index];
      // is_deleteがnull以外＆同じ位置に同じitemIdがあれば変更なしとみなして前回値を渡す
      if (!item.is_delete && beforeValue && beforeValue.item_id === item.id) {
        beforeValue.is_delete = null;
        return beforeValue;
      }
      return {
        inout_record_id: null,
        category_id: item.category_id || 0,
        item_id: +item.id,
        item_name: item.label || "",
        is_delete: item.is_delete
      };
    });
  }

  // 面談なし
  if (value.interview_flg === "0") {
    supportParams.interview_start_time = null;
    supportParams.interview_end_time = null;
    supportParams.interview_comment = "";
  }

  // 時間の項目に空文字を送ると`00:00`扱いになるので面談フラグがあっても消しておく
  if (value.interview_start_time === "") {
    supportParams.interview_start_time = null;
  }
  if (value.interview_end_time === "") {
    supportParams.interview_end_time = null;
  }

  // 対応の不要なパラメーターを取り出す(上書きされるので型定義の解決をすればOK)
  const restValue = omit(value, ["support_work_history"]);
  // merge
  return { ...restValue, ...supportParams };
};

/**
 * PostSupportsに渡すparamsの変換
 */
const normalizeFormValuesToPostSupportsParams = (
  values: RecordUserDetailValues,
  initialValues: RecordUserDetailValues,
  work: WorkState,
  staff: StaffState
): PostSupportsParams => {
  const params: PostSupportsParams = {
    support: []
  };

  // 変更のないプロパティを除外する
  values.support.forEach((v, i) => {
    const res = omitByNoChanges(v, initialValues.support[i]);
    // どれか一つでもis_deleteが1だった場合support_work_historyをPOST
    if (v.support_work_history.itemIdList.some((item) => item.is_delete)) {
      res.support_work_history = v.support_work_history;
    }
    if (res && Object.keys(res).length !== 0) {
      // 必要なデータの復元
      res.id = v.id;
      res.inout_record_id = v.inout_record_id;
      res.uif_id = v.uif_id;
      if (res.support_work_history) {
        res.support_work_history = v.support_work_history;
      }
      const res2 = supportMapping(res, work, staff);
      params.support.push(res2);
    }
  });

  return params;
};

export default normalizeFormValuesToPostSupportsParams;
