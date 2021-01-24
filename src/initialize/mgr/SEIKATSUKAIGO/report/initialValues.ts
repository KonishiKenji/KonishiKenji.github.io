import { SEIKATSUKAIGOReport } from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { InitialValues } from "@interfaces/mgr/SEIKATSUKAIGO/report/initial";
import { Checkbox } from "@constants/variables";

export type InitialDataValues = InitialValues;

// デフォルト値設定
export const initialValues = (
  state?: SEIKATSUKAIGOReport
): InitialDataValues => {
  let inTime;
  if (state && state.inTime) {
    inTime = getInTime(state.inTime);
  }

  let outTime;
  if (state && state.outTime) {
    outTime = getOutTime(state.outTime);
  }

  return {
    initial: {
      name: state && state.name ? state.name : "",
      uifId: state && state.uif_id ? state.uif_id : -1,
      targetDate: state && state.target_date ? state.target_date : "",
      status: state && state.status ? state.status.toString() : "1",
      trialUsageKind:
        state && state.trialUsageKind ? state.trialUsageKind : "1",
      lifeSupportHubInDistrictFlg:
        state && state.lifeSupportHubInDistrictFlg
          ? state.lifeSupportHubInDistrictFlg === Checkbox.ON
          : false,
      inTime: inTime ? inTime.toString().trim() : "",
      outTime: outTime ? outTime.toString().trim() : "",
      extended: state && state.extended ? state.extended : "0",
      didGetFood: state && state.didGetFood ? state.didGetFood : "0",
      travelTime: state && state.travelTime ? state.travelTime : "0",
      pickupPremises:
        state && state.pickupPremises ? state.pickupPremises : "0",
      memo: state && state.memo ? state.memo : "",
      severeDisabilitySupport:
        state && state.severeDisabilitySupport
          ? `${state.severeDisabilitySupport}` === Checkbox.ON
          : false,
      isSevereDisabilitySupport:
        state && state.is_severe_disability_support
          ? `${state.is_severe_disability_support}` === Checkbox.ON
          : false
    }
  };
};

const getInTime = (inTime: string) => {
  return / [0-1][0-9]:[0-5][0-9]/.exec(inTime)
    ? / [0-1][0-9]:[0-5][0-9]/.exec(inTime)
    : / [2][0-3]:[0-5][0-9]/.exec(inTime);
};

const getOutTime = (outTime: string) => {
  return / [0-1][0-9]:[0-5][0-9]/.exec(outTime)
    ? / [0-1][0-9]:[0-5][0-9]/.exec(outTime)
    : / [2][0-3]:[0-5][0-9]/.exec(outTime);
};
