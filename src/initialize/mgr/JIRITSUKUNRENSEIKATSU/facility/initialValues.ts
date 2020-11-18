import { BasicValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/Facility/basic";
import { SubtractionItemValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/Facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/Facility/additionItem";
import { FacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/types";
import { dateToSelectDateValue } from "@utils/date";
import { AdministrationValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/Facility/administration";
export type FacilityValues = BasicValues &
  AdministrationValues &
  SubtractionItemValues &
  AdditionalItemValues;

const initialValues = (state?: FacilityState): FacilityValues => {
  return {
    basic: {
      corporationName: state ? state.corporationName : "",
      officeNumber: state ? state.officeNumber : "",
      officeName: state ? state.officeName : "",
      serviceType: state ? state.serviceType : "",
      facilityType: state ? `${state.facilityType}` : "",
      representativeName: state ? state.representativeName : "",
      capacity: state ? state.capacity : "",
      masterSubordinateFlg: state ? state.masterSubordinateFlg : false,
      masterFlg: state ? state.masterFlg : "1",
      multiFunctionOfficeFlag: state ? state.multiFunctionOfficeFlag : false,
      allCapacity: state ? state.allCapacity : "",
      postalCode: state ? state.postalCode : "",
      prefectureId: state ? state.selectedPrefectureName : "",
      cityId: state ? state.selectedCityCode : "",
      restAddress: state ? state.restAddress : "",
      tel: state ? state.tel : "",
      mealSaservedServiceFlag: state ? state.mealSaservedServiceFlag : false,
      transferServiceFlag: state ? state.transferServiceFlag : false,
      transferServiceType: state ? state.transferServiceType : "1"
    },
    administration: {
      mondaySchedule: state ? state.mondaySchedule : false,
      mondayStartTime: state ? state.mondayStartTime : "",
      mondayEndTime: state ? state.mondayEndTime : "",
      tuesdaySchedule: state ? state.tuesdaySchedule : false,
      tuesdayStartTime: state ? state.tuesdayStartTime : "",
      tuesdayEndTime: state ? state.tuesdayEndTime : "",
      wednesdaySchedule: state ? state.wednesdaySchedule : false,
      wednesdayStartTime: state ? state.wednesdayStartTime : "",
      wednesdayEndTime: state ? state.wednesdayEndTime : "",
      thursdaySchedule: state ? state.thursdaySchedule : false,
      thursdayStartTime: state ? state.thursdayStartTime : "",
      thursdayEndTime: state ? state.thursdayEndTime : "",
      fridaySchedule: state ? state.fridaySchedule : false,
      fridayStartTime: state ? state.fridayStartTime : "",
      fridayEndTime: state ? state.fridayEndTime : "",
      saturdaySchedule: state ? state.saturdaySchedule : false,
      saturdayStartTime: state ? state.saturdayStartTime : "",
      saturdayEndTime: state ? state.saturdayEndTime : "",
      sundaySchedule: state ? state.sundaySchedule : false,
      sundayStartTime: state ? state.sundayStartTime : "",
      sundayEndTime: state ? state.sundayEndTime : ""
    },
    subtractionItem: {
      establishedByLocalGovernmentsFlag: state
        ? state.establishedByLocalGovernmentsFlag
        : false,
      standardOverUseFlag: state ? state.standardOverUseFlag : false,
      lackOfLifeSupportMemberFlag: state
        ? state.lackOfLifeSupportMemberFlag
        : false,
      lackOfLifeSupportMemberStartDate: state
        ? state.lackOfLifeSupportMemberStartDate
          ? dateToSelectDateValue(state.lackOfLifeSupportMemberStartDate)
          : { year: "NOT_SELECTED", month: "", day: "" }
        : { year: "NOT_SELECTED", month: "", day: "" },
      lackOfResponsiblePersonFlag: state
        ? state.lackOfResponsiblePersonFlag
        : false,
      lackOfResponsiblePersonStartDate: state
        ? state.lackOfResponsiblePersonStartDate
          ? dateToSelectDateValue(state.lackOfResponsiblePersonStartDate)
          : { year: "NOT_SELECTED", month: "", day: "" }
        : { year: "NOT_SELECTED", month: "", day: "" }
    },
    additionalItem: {
      welfareSpecialistPlacementType: state
        ? state.welfareSpecialistPlacementType
        : "1",
      nursingSupporterFlag: state ? state.nursingSupporterFlag : false,
      staffTreatmentSystemType: state ? state.staffTreatmentSystemType : "1",
      commuterLifeSupportFlag: state ? state.commuterLifeSupportFlag : false,
      staffTreatmentSpecificSystemType: state
        ? state.staffTreatmentSpecificSystemType
        : "1",
      employmentTransitionSupportFlag: state
        ? state.employmentTransitionSupportFlag
        : false,
      continuationPersonLastYear: state
        ? state.continuationPersonLastYear
        : "1",
      numberOfContinuators: state ? state.numberOfContinuators : "",
      visualAuditoryLanguageDisabledPeopleSupportSystemFlag: state
        ? state.visualAuditoryLanguageDisabledPeopleSupportSystemFlag
        : false,
      shortStayType: state ? state.shortStayType : "0",
      supportForMentallyIllDisChargeSystemType: state
        ? state.supportForMentallyIllDisChargeSystemType
        : "0"
    }
  };
};

export default initialValues;
