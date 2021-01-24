import { BasicValues } from "@interfaces/mgr/TANKINYUSHO/Facility/basic";
import { SubtractionItemValues } from "@interfaces/mgr/TANKINYUSHO/Facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/TANKINYUSHO/Facility/additionItem";
import { FacilityState } from "@stores/domain/mgr/TANKINYUSHO/facility/types";
import { dateToSelectDateValue } from "@utils/date";
export type FacilityValues = BasicValues &
  SubtractionItemValues &
  AdditionalItemValues;

const initialValues = (state?: FacilityState): FacilityValues => {
  return {
    basic: {
      corporationName: state ? state.corporationName : "",
      officeNumber: state ? state.officeNumber : "",
      officeName: state ? state.officeName : "",
      serviceType: state ? state.serviceType : "",
      facilityType: state ? `${state.facilityType}` : "0",
      medicalType: state ? `${state.medicalType}` : "0",
      representativeName: state ? state.representativeName : "",
      capacity: state ? state.capacity : "",
      masterSubordinateFlg: state ? state.masterSubordinateFlg : false,
      isMasterRadioValue: state ? state.isMasterRadioValue : "1",
      multiFunctionOfficeFlag: state ? state.multiFunctionOfficeFlag : false,
      allCapacity: state ? state.allCapacity : "",
      postalCode: state ? state.postalCode : "",
      prefectureId: state ? state.selectedPrefectureName : "NOT_SELECTED",
      cityId: state ? state.selectedCityCode : "NOT_SELECTED",
      restAddress: state ? state.restAddress : "",
      tel: state ? state.tel : ""
    },
    subtractionItem: {
      facilityCombiStatus: state ? `${state.facilityCombiStatus}` : "0",
      largeScaleFlg: state ? state.largeScaleFlg : false,
      lackOfLifeSupportMemberFlag: state
        ? state.lackOfLifeSupportMemberFlag
        : false,
      lackOfLifeSupportMemberStartDate: state
        ? state.lackOfLifeSupportMemberStartDate
          ? dateToSelectDateValue(state.lackOfLifeSupportMemberStartDate)
          : { year: "NOT_SELECTED", month: "", day: "" }
        : { year: "NOT_SELECTED", month: "", day: "" }
    },
    additionalItem: {
      welfareSpecialistPlacementType: state
        ? state.welfareSpecialistPlacementType
        : "1",
      fulltimeNursingStaffFlg: state ? state.fulltimeNursingStaff !== 0 : false,
      fulltimeNursingStaff: state ? `${state.fulltimeNursingStaff}` : "0",
      staffTreatmentSystemType: state ? state.staffTreatmentSystemType : "1",
      staffTreatmentSpecificSystemType: state
        ? state.staffTreatmentSpecificSystemType
        : "1",
      medicalSupportFlg: state ? state.medicalSupportFlg : false,
      dieticianFlg: state ? state.dietician !== 0 : false,
      dietician: state ? `${state.dietician}` : "0",
      seriousDisabilityFlg: state ? state.seriousDisabilityFlg : false
    }
  };
};

export default initialValues;
