import { BasicValues } from "@interfaces/mgr/SHUROTEICHAKU/Facility/basic";
import { SubtractionItemValues } from "@interfaces/mgr/SHUROTEICHAKU/Facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/SHUROTEICHAKU/Facility/additionItem";
import { FacilityState } from "@stores/domain/mgr/SHUROTEICHAKU/facility/types";
import { dateToSelectDateValueYYYYM } from "@utils/date";
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
      representativeName: state ? state.representativeName : "",
      postalCode: state ? state.postalCode : "",
      prefectureId: state ? state.selectedPrefectureName : "",
      cityId: state ? state.selectedCityCode : "",
      restAddress: state ? state.restAddress : "",
      tel: state ? state.tel : "",
      numberOfUsers: state ? state.numberOfUsers : "",
      masterSubordinateFlg: state ? state.masterSubordinateFlg : false,
      masterFlg: state ? state.masterFlg : "1",
      multiFunctionOfficeFlag: state ? state.multiFunctionOfficeFlag : false,
      allCapacity: state ? state.allCapacity : ""
    },
    subtractionItem: {
      rateGetJob: state ? state.rateGetJob : "1",
      lackFlag: state
        ? state.lackOfLifeSupportMemberFlag || state.lackOfResponsiblePersonFlag
        : false,
      lackOfLifeSupportMemberFlag: state
        ? state.lackOfLifeSupportMemberFlag
        : false,
      lackOfLifeSupportMemberStartDate: state
        ? state.lackOfLifeSupportMemberStartDate
          ? dateToSelectDateValueYYYYM(state.lackOfLifeSupportMemberStartDate)
          : { year: "NOT_SELECTED", month: "", day: "1" } // APIの仕様上dayは1固定
        : { year: "NOT_SELECTED", month: "", day: "1" }, // APIの仕様上dayは1固定
      lackOfResponsiblePersonFlag: state
        ? state.lackOfResponsiblePersonFlag
        : false,
      lackOfResponsiblePersonStartDate: state
        ? state.lackOfResponsiblePersonStartDate
          ? dateToSelectDateValueYYYYM(state.lackOfResponsiblePersonStartDate)
          : { year: "NOT_SELECTED", month: "", day: "1" } // APIの仕様上dayは1固定
        : { year: "NOT_SELECTED", month: "", day: "1" } // APIの仕様上dayは1固定
    },
    additionalItem: {
      workHardenesResultFlag: state ? state.workHardenesResultFlag : false,
      workPlaceAdaptationAssistantFlag: state
        ? state.workPlaceAdaptationAssistantFlag
        : false
    }
  };
};

export default initialValues;
