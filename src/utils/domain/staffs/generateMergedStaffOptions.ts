import { FieldItem } from "@interfaces/ui/form";
import { GetSupportPlanOnceResponse } from "@api/requests/supportPlan/A/getSupportPlanOnce";

const generateMergedStaffOptions = (
  baseOptions: FieldItem[],
  historyOptions: GetSupportPlanOnceResponse["data"]["participant_history"]
): FieldItem[] => {
  if (!baseOptions) {
    return [];
  }
  const resultOptions = baseOptions.map((o) => {
    const { value, label } = o;
    return {
      value: Number(value),
      label,
      deleteFlg: false
    };
  });
  if (!historyOptions || historyOptions.length === 0) {
    return resultOptions;
  }
  historyOptions.forEach((history) => {
    const { id, name } = history;
    const noMatch = !baseOptions.some(
      (o) => Number(o.value) === id && o.label === name
    );
    if (noMatch) {
      resultOptions.push({
        value: id,
        label: name,
        deleteFlg: true
      });
    }
  });
  return resultOptions;
};

export default generateMergedStaffOptions;
