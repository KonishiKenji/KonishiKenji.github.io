import { OperationsState } from "@stores/domain/operations/types";
import * as format from "date-fns/format";
import get from "lodash-es/get";
import { ShotMultipleSelectValue } from "@interfaces/ui/form";
import buildStaffs from "@utils/domain/staffs/buildStaffs";

export interface RecordMonthlyValues {
  operation: [
    {
      target_date: string; // yyyy-mm-dd
      operation_in_the_morning: string | null;
      operation_in_the_afternoon: string | null;
      staff_id: string | number | null;
      staff_name: string | null;
      operation_other_comment: string | null;
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
    }
  ];
}

const initialValues = (
  targetDate: string,
  values?: OperationsState["monthlyRecord"]["operation"][0]
): RecordMonthlyValues => {
  const ope = values || null;
  const record = ope ? ope.record : null;
  const operationWorkHistory = ope ? ope.operation_work_history : [];
  const operationWorkingCompany = ope ? ope.workplace_company : [];
  const initStaffs = {
    workplace_company_operation_id: 0,
    staffs_in_facility_id: 0,
    staff_name: "",
    working_hours: "",
    display_order: 0
  };

  return {
    operation: [
      {
        target_date: format(targetDate, "YYYY-MM-DD"),
        operation_in_the_morning: get(record, "operation_in_the_morning") || "",
        operation_in_the_afternoon:
          get(record, "operation_in_the_afternoon") || "",
        operation_other_comment: get(record, "operation_other_comment") || "",
        staff_id: get(record, "staff_id") || "",
        staff_name: get(record, "staff_name") || "",
        operation_work_history: {
          beforeValues: operationWorkHistory,
          itemIdList: operationWorkHistory.map((history) => ({
            category_id: history.category_id,
            id: history.item_id,
            label: history.item_name,
            is_delete: null
          }))
        },
        workplace_company: operationWorkingCompany
          ? operationWorkingCompany.map((workingCompany) => {
              return {
                operation_record_id: get(workingCompany, "operation_record_id"),
                workplace_company_id: get(
                  workingCompany,
                  "workplace_company_id"
                ),
                workplace_name: get(workingCompany, "workplace_name"),
                staffs: workingCompany.staffs
                  ? buildStaffs(workingCompany.staffs)
                  : [initStaffs, initStaffs, initStaffs]
              };
            })
          : []
      }
    ]
  };
};

export default initialValues;
