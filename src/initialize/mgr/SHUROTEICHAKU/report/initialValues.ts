import { UsageResultsState } from "@stores/domain/mgr/SHUROTEICHAKU/report/types";
import { InitialDataValues } from "@interfaces/mgr/SHUROTEICHAKU/report/initialData";
import { Checkbox } from "@constants/variables";

const initialValues = (state?: UsageResultsState): InitialDataValues => {
  const usageResults: UsageResultsState["usageResults"] =
    state && state.usageResults ? state.usageResults : [];
  const initializedUsageResults = usageResults.map(usageResult => {
    return {
      // 対象年月日
      targetDate: usageResult.targetDate ? usageResult.targetDate : "",
      // サービス提供の状況
      statusType: determineTureOrFalse(
        castNumberCheckboxValue(usageResult.statusType)
      ),
      // 特別地域加算
      specialAreaFlg: determineTureOrFalse(
        castNumberCheckboxValue(usageResult.specialAreaFlg)
      ),
      // 備考
      remarks: usageResult.remarks ? usageResult.remarks : ""
    };
  });

  return { ReportData: initializedUsageResults };
};

// checkBox型にキャスト
const castNumberCheckboxValue = (value?: number | null | undefined) => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === 1 ? Checkbox.ON : Checkbox.OFF;
};

// FlgがCheckbox.ONの場合はtrueを返す
const determineTureOrFalse = (value: Checkbox | undefined): boolean => {
  if (value === Checkbox.ON) {
    return true;
  }
  return false;
};

export default initialValues;
