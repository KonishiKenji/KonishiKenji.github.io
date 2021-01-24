import { BasicValues } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/basic";
import { SubtractionItemValues } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/additionItem";
import { FacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import { dateToSelectDateValueYYYYM } from "@utils/date";
import { AdministrationValues } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/administration";

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
      transferServiceType: state ? state.transferServiceType : "1",
      seriousSupporterFlg: state ? state.seriousSupporterFlg : false
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
      openedOrShortTimeFlag: state ? state.openedOrShortTimeFlag : false,
      lackFlag: state
        ? state.lackOfLifeSupportMemberFlag || state.lackOfResponsiblePersonFlag
        : false,
      lackOfLifeSupportMemberFlag: state
        ? state.lackOfLifeSupportMemberFlag
        : false,
      lackOfLifeSupportMemberStartDate:
        state && state.lackOfLifeSupportMemberStartDate
          ? dateToSelectDateValueYYYYM(state.lackOfLifeSupportMemberStartDate)
          : { year: "NOT_SELECTED", month: "", day: "1" }, // APIの仕様上dayは1固定
      lackOfResponsiblePersonFlag: state
        ? state.lackOfResponsiblePersonFlag
        : false,
      lackOfResponsiblePersonStartDate:
        state && state.lackOfResponsiblePersonStartDate
          ? dateToSelectDateValueYYYYM(state.lackOfResponsiblePersonStartDate)
          : { year: "NOT_SELECTED", month: "", day: "1" }, // APIの仕様上dayは1固定
      doctorInstallationFlag: state ? state.doctorInstallationFlag : false
    },
    additionalItem: {
      staffPlacementType: state ? state.staffPlacementType : "0",
      welfareSpecialistPlacementType: state
        ? state.welfareSpecialistPlacementType
        : "1",
      fullTimeNursePlacementType: state
        ? state.fullTimeNursePlacementType
        : "0",
      staffTreatmentSystemType: state ? state.staffTreatmentSystemType : "1",
      staffTreatmentSpecificSystemType: state
        ? state.staffTreatmentSpecificSystemType
        : "1",
      commuterLifeSupportFlag: state ? state.commuterLifeSupportFlag : false,
      severeFailureSupportFlag: state ? state.severeFailureSupportFlag : false,
      visualAuditoryLanguageDisabledPeopleSupportSystemFlag: state
        ? state.visualAuditoryLanguageDisabledPeopleSupportSystemFlag
        : false,
      employmentTransitionSupportFlag: state
        ? state.employmentTransitionSupportFlag
        : false,
      continuationPersonLaseYear: state
        ? state.continuationPersonLaseYear
        : "1",
      numberOfContinuations: state ? state.numberOfContinuations : ""
    }
  };
};

export default initialValues;
