import { RecordMonthlyValues as SEIKATSUKAIGOFormValues } from "@initialize/mgr/SEIKATSUKAIGO/record/monthly/initialValues";
import { RecordMonthlyValues as IABFormValues } from "@initialize/mgr/IAB/record/monthly/initialValues";
import { PostOperationsParams } from "@api/requests/operations/postOperations";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import getStaffName from "@utils/domain/staffs/getStaffName";
import omitByNoChanges from "@utils/dataNormalizer/omitByNoChanges";
import omit from "lodash-es/omit";
import deepEqual from "fast-deep-equal";

type RecordMonthlyValues = SEIKATSUKAIGOFormValues | IABFormValues;
type FormOperation = RecordMonthlyValues["operation"][0];
type PostOperation = Exclude<PostOperationsParams["operation"], null>[0];
type StaffsOperation = IABFormValues["operation"][0]["workplace_company"][0]["staffs"];

/**
 * 差分だけピックしたフォームの値をPostOperationが受け付ける値に変換する
 */
const operationMapping = (
  value: Partial<FormOperation>,
  work: WorkState,
  staff: StaffState,
  initialValues: FormOperation
): PostOperation => {
  const operation = {} as PostOperation;

  // 入力はstaffIdのみなので復元する
  if (value.staff_id === "") {
    operation.staff_id = null;
    operation.staff_name = null;
  } else if (value.staff_id) {
    operation.staff_id = value.staff_id;
    operation.staff_name = getStaffName(staff, value.staff_id);
  }

  // 入力はitemIdのリストなので復元する
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

      const initialOperation = initialValues as IABFormValues["operation"][0];
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

  // 対応の不要なパラメーターを取り出す
  const restValue = omit(value, [
    "staff_id",
    "staff_name",
    "operation_work_history",
    "workplace_company"
  ]);
  // merge
  return { ...restValue, ...operation };
};

/**
 * Form => Post
 * 入力前との比較をして差分のあるデータだけ送る
 */
const normalizeFormValuesToPostOperationsParams = (
  values: RecordMonthlyValues,
  initialValues: RecordMonthlyValues,
  work: WorkState,
  staff: StaffState
): PostOperationsParams => {
  const params: PostOperationsParams = {
    operation: null
  };
  // paramsで[]をセットしても型が通らない
  const operation: PostOperationsParams["operation"] = [];

  // 変更のないプロパティを除外する
  values.operation.forEach((v, i) => {
    const res = omitByNoChanges(v, initialValues.operation[i]);
    // どれか一つでもis_deleteが1だった場合operation_work_historyをPOST
    if (v.operation_work_history.itemIdList.some((item) => item.is_delete)) {
      res.operation_work_history = v.operation_work_history;
    }
    if (res && Object.keys(res).length !== 0) {
      // 必要なデータの復元
      res.target_date = v.target_date;
      if (res.operation_work_history) {
        res.operation_work_history = v.operation_work_history;
      }
      const res2 = operationMapping(
        res,
        work,
        staff,
        initialValues.operation[i]
      );
      operation.push(res2);
    }
  });

  params.operation = operation;
  return params;
};

export default normalizeFormValuesToPostOperationsParams;
