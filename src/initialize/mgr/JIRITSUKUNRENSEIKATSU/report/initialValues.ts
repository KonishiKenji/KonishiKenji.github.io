import { ReportInterface } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import { InitialValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/report/initial";
import { Checkbox } from "@constants/variables";

export type InitialDataValues = InitialValues;

// デフォルト値設定
export const initialValues = (state?: ReportInterface): InitialDataValues => {
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
      inTime: inTime ? inTime.toString().trim() : "",
      outTime: outTime ? outTime.toString().trim() : "",
      didGetFood: state && state.didGetFood ? state.didGetFood : "0",
      travelTime: state && state.travelTime ? state.travelTime : "0",
      lifeSupportHubInDistrictFlg:
        state && state.lifeSupportHubInDistrictFlg
          ? state.lifeSupportHubInDistrictFlg === Checkbox.ON
          : false,
      pickupPremises:
        state && state.pickupPremises ? state.pickupPremises : "0",
      // 3:視覚障害者に対する専門的訓練
      visitSupport:
        state && state.visitSupport ? state.visitSupport === "3" : false,
      memo: state && state.memo ? state.memo : "",
      medicalCooperation:
        state && state.medicalCooperation ? state.medicalCooperation : "0",
      sputumImplementationFlg:
        state && state.sputumImplementationFlg
          ? state.sputumImplementationFlg === Checkbox.ON
          : false,
      helpSocialLifeFlg:
        state && state.helpSocialLifeFlg
          ? state.helpSocialLifeFlg === Checkbox.ON
          : false,
      shortStayFlg:
        state && state.shortStayFlg
          ? state.shortStayFlg === Checkbox.ON
          : false,
      supportForMentallyIllDischarge:
        state && state.supportForMentallyIllDischarge
          ? state.supportForMentallyIllDischarge === Checkbox.ON
          : false,
      specialAreaFlg:
        state && state.specialAreaFlg
          ? state.specialAreaFlg === Checkbox.ON
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
