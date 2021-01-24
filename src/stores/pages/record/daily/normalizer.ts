import { RecordDailyValues as SEIKATSUKAIGOFormValues } from "@initialize/mgr/SEIKATSUKAIGO/record/daily/initialValues";
import { RecordDailyValues as IABFormValues } from "@initialize/mgr/IAB/record/daily/initialValues";
import { PostOperationsAndSupportsParams } from "@api/requests/operations/postOperationsAndSupports";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import getStaffName from "@utils/domain/staffs/getStaffName";
import omitByNoChanges from "@utils/dataNormalizer/omitByNoChanges";
import deepEqual from "fast-deep-equal";

type RecordDailyValues = SEIKATSUKAIGOFormValues | IABFormValues;
type FormOperation = RecordDailyValues["operation"];
type PostOperation = PostOperationsAndSupportsParams["operation"];
type FormSupport = RecordDailyValues["support"][0];
type PostSupport = PostOperationsAndSupportsParams["support"][0];
type StaffsOperation = IABFormValues["operation"]["workplace_company"][0]["staffs"];

/**
 * フォームの値をPost出来るように変換: 業務日誌の部分
 */
const operationMapping = (
  value: Partial<FormOperation>,
  work: WorkState,
  staff: StaffState,
  initialValues: RecordDailyValues
): PostOperation => {
  const operation = {} as Exclude<PostOperation, null>;

  // 記録者の入力はstaffIdのみなので復元する
  if (value.staff_id === "") {
    operation.staff_id = null;
    operation.staff_name = null;
  } else if (value.staff_id) {
    operation.staff_id = value.staff_id;
    operation.staff_name = getStaffName(staff, value.staff_id);
  }

  // 作業の入力はitemIdのリストなので復元する
  if (value.operation_work_history) {
    const { beforeValues, itemIdList } = value.operation_work_history;
    operation.operation_work_history = itemIdList.map((item, index) => {
      const beforeValue = beforeValues[index];
      // is_deleteがnull以外＆同じ位置に同じitemIdがあれば変更なしとみなして前回値を渡す
      if (!item.is_delete && beforeValue && beforeValue.item_id === item.id) {
        beforeValue.is_delete = null;
        return beforeValue;
      }
      return {
        operation_record_id: null,
        category_id: item.category_id || 0,
        item_id: +item.id,
        item_name: item.label || "",
        is_delete: item.is_delete
      };
    });
  }

  // 移行AB用: 施設外就労同行職員の変換
  if ("workplace_company" in value && value.workplace_company) {
    const { workplace_company } = value; // map配下までは存在チェックが通らない対策
    operation.workplace_company = workplace_company.map((company, i) => {
      const workplaceCompanyStaffs: StaffsOperation = [];

      const initialOperation = initialValues.operation as IABFormValues["operation"];
      const hasDifferentStaffs = !deepEqual(
        company.staffs,
        initialOperation.workplace_company
      );
      if (company.staffs && hasDifferentStaffs) {
        company.staffs.forEach((staffValue, j) => {
          if (!staffValue) return;
          const {
            staffs_in_facility_id,
            workplace_company_operation_id
          } = staffValue;
          if (
            (staffs_in_facility_id === null || staffs_in_facility_id < 1) &&
            !workplace_company_operation_id
          )
            return;

          // 同行職員あり -> なしの場合、ほかのプロパティはそのままだが、staffs_in_facility_idは空になるので
          // 同行職員なし時のデータ構造を作ってAPIに渡す。
          if (!staffs_in_facility_id) {
            workplaceCompanyStaffs.push({
              workplace_company_operation_id:
                staffValue.workplace_company_operation_id,
              staffs_in_facility_id: null,
              staff_name: null,
              working_hours: "",
              display_order: staffValue.display_order
            });
            return;
          }
          const operationId = !staffValue.workplace_company_operation_id
            ? undefined
            : staffValue.workplace_company_operation_id;
          let staffId: number | null = !staffValue.staffs_in_facility_id
            ? null
            : staffValue.staffs_in_facility_id;
          let staffName = staffValue.staff_name;
          let workingHours: string | number | null = staffValue.working_hours;

          const initialStaffValue =
            initialOperation.workplace_company[i].staffs[j];
          if (initialStaffValue.staffs_in_facility_id === staffId) {
            workplaceCompanyStaffs.push({
              workplace_company_operation_id:
                initialStaffValue.workplace_company_operation_id,
              staffs_in_facility_id: initialStaffValue.staffs_in_facility_id,
              staff_name: initialStaffValue.staff_name,
              working_hours: workingHours,
              display_order: j
            });
            return;
          }

          if (staffId) {
            staffName = getStaffName(staff, staffId);
          } else {
            staffId = null;
            staffName = null;
            workingHours = null;
          }
          workplaceCompanyStaffs.push({
            workplace_company_operation_id: operationId,
            staffs_in_facility_id: staffId,
            staff_name: staffName,
            working_hours: workingHours,
            display_order: j
          });
        });
      }

      return {
        operation_record_id: company.operation_record_id,
        workplace_company_id: company.workplace_company_id,
        staffs: workplaceCompanyStaffs
      };
    });
  }

  // merge
  return { ...value, ...operation };
};

/**
 * フォームの値をPost出来るように変換: 支援記録の部分
 */
const supportMapping = (
  value: Partial<FormSupport>,
  work: WorkState,
  staff: StaffState
): PostSupport => {
  const supportParams = {} as PostOperationsAndSupportsParams["support"][0];

  // 記録者の入力はstaffIdのみなので復元する
  if (value.staff_id === "") {
    supportParams.staff_id = null;
    supportParams.staff_name = null;
  } else if (value.staff_id) {
    supportParams.staff_id = value.staff_id;
    supportParams.staff_name = getStaffName(staff, value.staff_id);
  }

  // 対応職員も記録者と同じ対応
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

  // 作業の入力はitemIdのリストなので復元する
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

  // 時間の項目に空文字を送ると`00:00`扱いになるので面談フラグがあっても消しておく
  if (value.interview_start_time === "") {
    supportParams.interview_start_time = null;
  }
  if (value.interview_end_time === "") {
    supportParams.interview_end_time = null;
  }

  // merge
  return { ...value, ...supportParams };
};

/**
 * RecordDailyValuesをマージする形でPostOperationsAndSupportsParamsに変換する
 * operationとsupportでそれぞれ差分がなければ空値を送る
 */
const normalizeFormValuesToPostOperationsAndSupportsParams = (
  values: RecordDailyValues,
  initialValues: RecordDailyValues,
  work: WorkState,
  staff: StaffState
): PostOperationsAndSupportsParams => {
  const params: PostOperationsAndSupportsParams = {
    operation: null,
    support: []
  };

  // 業務日誌のnormalize
  const operationDiff = omitByNoChanges(
    values.operation,
    initialValues.operation
  );
  // どれか一つでもis_deleteが1だった場合operation_work_historyをPOST
  if (
    values.operation.operation_work_history.itemIdList.some(
      (item) => item.is_delete
    )
  ) {
    operationDiff.operation_work_history =
      values.operation.operation_work_history;
  }
  if (operationDiff && Object.keys(operationDiff).length !== 0) {
    operationDiff.target_date = values.operation.target_date;
    if (operationDiff.operation_work_history) {
      operationDiff.operation_work_history =
        values.operation.operation_work_history;
    }
    const operationMapped = operationMapping(
      operationDiff,
      work,
      staff,
      initialValues
    );
    params.operation = operationMapped;
  }

  // 作業記録のnormalize
  values.support.forEach((v, i) => {
    const supportDiff = omitByNoChanges(v, initialValues.support[i]);
    // どれか一つでもis_deleteが1だった場合support_work_historyをPOST
    if (v.support_work_history.itemIdList.some((item) => item.is_delete)) {
      supportDiff.support_work_history = v.support_work_history;
    }
    if (supportDiff && Object.keys(supportDiff).length !== 0) {
      // 必要なデータの復元
      supportDiff.id = v.id;
      supportDiff.inout_record_id = v.inout_record_id;
      supportDiff.uif_id = v.uif_id;
      if (supportDiff.support_work_history) {
        supportDiff.support_work_history = v.support_work_history;
      }
      const supportMapped = supportMapping(supportDiff, work, staff);
      params.support.push(supportMapped);
    }
  });

  return params;
};

export default normalizeFormValuesToPostOperationsAndSupportsParams;
