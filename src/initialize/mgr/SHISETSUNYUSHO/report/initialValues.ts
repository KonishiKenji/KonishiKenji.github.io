import { InitialValues } from "@interfaces/mgr/SHISETSUNYUSHO/report/initial";
import {
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";
import { INT_TRUE_FROM_API } from "@constants/variables";
import {
  StatusType,
  HospitalizationOvernightstay,
  OralTransition,
  OralPreservation
} from "@constants/mgr/SHISETSUNYUSHO/variables";

export type InitialDataValues = InitialValues;

// デフォルト値設定
export const initialValues = (
  state?: UsagePerformanceType,
  stateSHISETSUNYUSHO?: UsagePerformanceSHISETSUNYUSHOType
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
          ? state.statusType.toString()
          : StatusType.NONE,
      hospitalizationOvernightStay:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.hospitalizationOvernightStay
          ? stateSHISETSUNYUSHO.hospitalizationOvernightStay.toString()
          : HospitalizationOvernightstay.NONE.toString(),
      regionalTransitionFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.regionalTransition
          ? stateSHISETSUNYUSHO.regionalTransition === INT_TRUE_FROM_API
          : false,
      collectionOfUtilityFeeFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.collectionOfUtilityFee
          ? stateSHISETSUNYUSHO.collectionOfUtilityFee === INT_TRUE_FROM_API
          : false,
      nutritionManagementFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.nutritionManagement
          ? stateSHISETSUNYUSHO.nutritionManagement === INT_TRUE_FROM_API
          : false,
      foodBreakfastFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.foodBreakfast
          ? stateSHISETSUNYUSHO.foodBreakfast === INT_TRUE_FROM_API
          : false,
      foodLunchFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.foodLunch
          ? stateSHISETSUNYUSHO.foodLunch === INT_TRUE_FROM_API
          : false,
      foodSupperFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.foodSupper
          ? stateSHISETSUNYUSHO.foodSupper === INT_TRUE_FROM_API
          : false,
      oralTransition:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.oralTransition
          ? stateSHISETSUNYUSHO.oralTransition.toString()
          : OralTransition.NONE.toString(),
      oralPreservation:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.oralPreservation
          ? stateSHISETSUNYUSHO.oralPreservation.toString()
          : OralPreservation.NONE.toString(),
      medicalFoodsFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.medicalFoods
          ? stateSHISETSUNYUSHO.medicalFoods === INT_TRUE_FROM_API
          : false,
      severeDisabilitySupportFlg:
        stateSHISETSUNYUSHO && stateSHISETSUNYUSHO.severeDisabilitySupport
          ? stateSHISETSUNYUSHO.severeDisabilitySupport === INT_TRUE_FROM_API
          : false,
      remarks: state && state.remarks ? state.remarks : ""
    }
  };
};
