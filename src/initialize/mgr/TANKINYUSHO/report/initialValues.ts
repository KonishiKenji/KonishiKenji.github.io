import { InitialValues } from "@interfaces/mgr/TANKINYUSHO/report/initial";
import {
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import { INT_TRUE_FROM_API } from "@constants/variables";
import { StatusType } from "@constants/mgr/TANKINYUSHO/variables";

export type InitialDataValues = InitialValues;

// デフォルト値設定
export const initialValues = (
  state?: UsagePerformanceType,
  stateTANKINYUSHO?: UsagePerformanceTANKINYUSHOType
): InitialDataValues => {
  return {
    initial: {
      name:
        state && state.nameSei && state.nameMei
          ? `${state.nameSei} ${state.nameMei}`
          : "",
      usersInFacilityId:
        state && state.usersInFacilityId ? state.usersInFacilityId : -1,
      targetDate: state && state.targetDate ? state.targetDate : "",
      statusType:
        state && state.statusType
          ? state.statusType.toString() === StatusType.IMPLEMENTATION
          : false,
      otherSupportFlg:
        stateTANKINYUSHO && stateTANKINYUSHO.otherSupport
          ? stateTANKINYUSHO.otherSupport === INT_TRUE_FROM_API
          : false,
      food:
        stateTANKINYUSHO && stateTANKINYUSHO.food
          ? stateTANKINYUSHO.food.toString()
          : "0",
      pickup:
        stateTANKINYUSHO && stateTANKINYUSHO.pickup
          ? stateTANKINYUSHO.pickup.toString()
          : "0",
      pickupPremises:
        stateTANKINYUSHO && stateTANKINYUSHO.pickupPremises
          ? stateTANKINYUSHO.pickupPremises.toString()
          : "0",
      emergencyShorttermFlg:
        stateTANKINYUSHO && stateTANKINYUSHO.emergencyShortterm
          ? stateTANKINYUSHO.emergencyShortterm === INT_TRUE_FROM_API
          : false,
      overHoursFlg:
        stateTANKINYUSHO && stateTANKINYUSHO.overHours
          ? stateTANKINYUSHO.overHours === INT_TRUE_FROM_API
          : false,
      capacityOverrunException:
        stateTANKINYUSHO && stateTANKINYUSHO.capacityOverrunException
          ? stateTANKINYUSHO.capacityOverrunException.toString()
          : "0",
      medicalSupportType:
        state && state.medicalSupportType
          ? state.medicalSupportType.toString()
          : "0",
      sputumImplementationFlg:
        stateTANKINYUSHO && stateTANKINYUSHO.sputumImplementation
          ? stateTANKINYUSHO.sputumImplementation === INT_TRUE_FROM_API
          : false,
      severeDisabilitySupportFlg:
        stateTANKINYUSHO && stateTANKINYUSHO.severeDisabilitySupport
          ? stateTANKINYUSHO.severeDisabilitySupport === INT_TRUE_FROM_API
          : false,
      remarks: state && state.remarks ? state.remarks : ""
    }
  };
};
