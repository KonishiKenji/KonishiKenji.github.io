import { OperationsState } from "@stores/domain/operations/types";
import get from "lodash-es/get";
import * as format from "date-fns/format";
import { formatTime } from "@utils/date";
import { ShotMultipleSelectValue } from "@interfaces/ui/form";
import buildStaffs from "@utils/domain/staffs/buildStaffs";

export interface RecordDailyValues {
  operation: {
    target_date: string;
    operation_in_the_morning: string;
    operation_in_the_afternoon: string;
    staff_id: number | string;
    staff_name: string;
    operation_other_comment: string;
    operation_work_history: {
      // 差分チェック用
      readonly beforeValues: {
        operation_record_id: number;
        category_id: number;
        item_id: number;
        item_name: string;
        is_delete: number | null;
      }[];
      // formで実際に変更するidList
      itemIdList: ShotMultipleSelectValue;
    };
    workplace_company: {
      operation_record_id: number;
      workplace_company_id: number;
      workplace_name: string;
      staffs: {
        workplace_company_operation_id: number | undefined;
        staffs_in_facility_id: number | null;
        staff_name: string | null;
        working_hours: number | string | null;
        display_order: number;
      }[];
    }[];
  };
  support: {
    id: number | null;
    inout_record_id: number;
    user_status: string;
    interview_flg: string;
    interview_start_time: string;
    interview_end_time: string;
    interview_comment: string;
    staff_comment: string;
    other_comment: string;
    absence_reason: string;
    support_content: string;
    correspondent_staff_id: number | string;
    correspondent_staff_name: string;
    staff_id: number | string;
    staff_name: string;
    uif_id: number | string;
    workplace_company_id: number | string;
    // 表示用
    readonly workplace_company: {
      workplace_company_id: number;
      workplace_name: string;
      is_checked: boolean;
    }[];
    support_work_history: {
      readonly beforeValues: {
        inout_record_id: number;
        category_id: number;
        item_id: number;
        item_name: string;
        is_delete: number | null;
      }[];
      // formで実際に変更するidList
      itemIdList: ShotMultipleSelectValue;
    };
  }[];
}

const initialValues = (
  targetDate: string,
  values?: OperationsState["dailyRecord"]
): RecordDailyValues => {
  const operationRecord = values ? values.operation.record : null;
  const operationWorkHistory = values
    ? values.operation.operation_work_history
    : [];
  const operationWorkplaceCompanies = values
    ? values.operation.workplace_company
    : [];
  const initStaffs = {
    workplace_company_operation_id: 0,
    staffs_in_facility_id: 0,
    staff_name: "",
    working_hours: "",
    display_order: 0
  };
  return {
    operation: {
      target_date: format(targetDate, "YYYY-MM-DD"),
      operation_in_the_morning:
        get(operationRecord, "operation_in_the_morning") || "",
      operation_in_the_afternoon:
        get(operationRecord, "operation_in_the_afternoon") || "",
      operation_other_comment:
        get(operationRecord, "operation_other_comment") || "",
      staff_id: get(operationRecord, "staff_id") || "",
      staff_name: get(operationRecord, "staff_name") || "",
      operation_work_history: {
        beforeValues: operationWorkHistory,
        itemIdList: operationWorkHistory.map((history) => ({
          category_id: history.category_id,
          id: history.item_id,
          label: history.item_name,
          is_delete: null
        }))
      },
      workplace_company: operationWorkplaceCompanies
        ? operationWorkplaceCompanies.map((company) => {
            return {
              operation_record_id: get(company, "operation_record_id"),
              workplace_company_id: get(company, "workplace_company_id"),
              workplace_name: get(company, "workplace_name"),
              staffs: company.staffs
                ? buildStaffs(company.staffs)
                : [initStaffs, initStaffs, initStaffs]
            };
          })
        : []
    },
    support:
      values && values.support
        ? values.support.map((sup) => {
            const interviewStartTime = get(sup.record, "interview_start_time");
            const interviewEndTime = get(sup.record, "interview_end_time");
            const initializedCompanies = sup.record
              ? sup.record.workplace_company.map((item) => {
                  return {
                    workplace_company_id: get(item, "workplace_company_id"),

                    workplace_name: get(item, "workplace_name") || "",
                    is_checked: get(item, "is_checked") || false
                  };
                })
              : [];
            const checkedCompany =
              initializedCompanies.length > 0
                ? initializedCompanies.filter((value) => {
                    return value.is_checked;
                  })
                : [];
            return {
              id: get(sup.record, "id") || null,
              inout_record_id: sup.inout.id,
              user_status: get(sup.record, "user_status") || "",
              interview_flg: get(sup.record, "interview_flg") || "0",
              interview_start_time: interviewStartTime
                ? formatTime(interviewStartTime)
                : "",
              interview_end_time: interviewEndTime
                ? formatTime(interviewEndTime)
                : "",
              interview_comment: get(sup.record, "interview_comment") || "",
              staff_comment: get(sup.record, "staff_comment") || "",
              other_comment: get(sup.record, "other_comment") || "",
              absence_reason: get(sup.record, "absence_reason") || "",
              support_content: get(sup.record, "support_content") || "",
              correspondent_staff_id:
                get(sup.record, "correspondent_staff_id") || "",
              correspondent_staff_name:
                get(sup.record, "correspondent_staff_name") || "",
              staff_id: get(sup.record, "staff_id") || "",
              staff_name: get(sup.record, "staff_name") || "",
              uif_id: sup.inout.uif_id,
              workplace_company_id:
                checkedCompany.length > 0
                  ? checkedCompany[0].workplace_company_id
                  : "",
              workplace_company: initializedCompanies,
              support_work_history: {
                beforeValues: sup.support_work_history,
                itemIdList: sup.support_work_history.map((history) => ({
                  category_id: history.category_id,
                  id: history.item_id,
                  label: history.item_name,
                  is_delete: null
                }))
              }
            };
          })
        : []
  };
};

export default initialValues;
