import { BasicValues } from "@interfaces/mgr/SHISETSUNYUSHO/Facility/basic";
import { SubtractionItemValues } from "@interfaces/mgr/SHISETSUNYUSHO/Facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/SHISETSUNYUSHO/Facility/additionItem";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";
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
      representativeName: state ? state.representativeName : "",
      capacity: state ? state.capacity : "",
      masterSubordinateFlg: state ? state.masterSubordinateFlg : false,
      isMasterRadioValue: state ? state.isMasterRadioValue : "1",
      multiFunctionOfficeFlg: state ? state.multiFunctionOfficeFlg : false,
      allCapacity: state ? state.allCapacity : "",
      postalCode: state ? state.postalCode : "",
      prefectureId: state ? state.selectedPrefectureName : "NOT_SELECTED",
      cityId: state ? state.selectedCityCode : "NOT_SELECTED",
      restAddress: state ? state.restAddress : "",
      tel: state ? state.tel : "",
      availableFood: state ? state.availableFood : false,
      foodExpenses: state ? `${state.foodExpenses}` : "0",
      foodExpensesBreakfast: state ? `${state.foodExpensesBreakfast}` : "",
      foodExpensesLunch: state ? `${state.foodExpensesLunch}` : "",
      foodExpensesSupper: state ? `${state.foodExpensesSupper}` : "",
      foodExpensesDay: state ? `${state.foodExpensesDay}` : "",
      utility: state ? `${state.utility}` : "0",
      utilityCosts: state ? `${state.utilityCosts}` : ""
    },
    subtractionItem: {
      originLocalGovFlg: state ? state.originLocalGovFlg : false,
      nutritionistPlacement: state ? `${state.nutritionistPlacement}` : "1",
      lackOfSupporterFlg: state ? state.lackOfSupporterFlg : false,
      dateStartLackOfSupporter: state
        ? state.dateStartLackOfSupporter
          ? dateToSelectDateValue(state.dateStartLackOfSupporter)
          : { year: "NOT_SELECTED", month: "", day: "" }
        : { year: "NOT_SELECTED", month: "", day: "" }
    },
    additionalItem: {
      nighttimePlacement: state ? `${state.nighttimePlacement}` : "0",
      seeHearTeamFlg: state ? state.seeHearTeamFlg : false,
      regionalLifeTransition: state ? state.regionalLifeTransition : false,
      nutritionManagementFlg: state ? state.nutritionManagementFlg : false,
      staffTreatmentSystemType: state ? state.staffTreatmentSystemType : "1",
      staffTreatmentSpecificSystemType: state
        ? state.staffTreatmentSpecificSystemType
        : "1",
      seriousDisability: state ? `${state.seriousDisability}` : "0"
    }
  };
};

export default initialValues;
