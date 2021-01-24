/**
 * ActionNames
 */

export const FETCH_STARTED = "SHISETSUNYUSHO/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "SHISETSUNYUSHO/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "SHISETSUNYUSHO/FACILITY/FETCH_FAILED";
export const POST_STARTED = "SHISETSUNYUSHO/FACILITY/POST_STARTED";
export const POST_SUCCESS = "SHISETSUNYUSHO/FACILITY/POST_SUCCESS";
export const POST_FAILED = "SHISETSUNYUSHO/FACILITY/POST_FAILED";

/**
 * Basic
 */
export interface FacilityState {
  corporationName: string;
  officeNumber: string;
  officeName: string;
  serviceType: string;
  representativeName: string;
  capacity: string;
  multiFunctionOfficeFlg: boolean;
  masterSubordinateFlg: boolean;
  isMasterRadioValue: string;
  allCapacity: string;
  postalCode: string;
  selectedPrefectureName: string;
  selectedCityCode: string;
  restAddress: string;
  tel: string;
  cityId: string;
  availableFood: boolean;
  foodExpenses: number;
  foodExpensesBreakfast: number;
  foodExpensesLunch: number;
  foodExpensesSupper: number;
  foodExpensesDay: number;
  utility: number;
  utilityCosts: number;

  // SubtractionItemSection
  originLocalGovFlg: boolean;
  nutritionistPlacement: number;
  lackOfSupporterFlg: boolean;
  dateStartLackOfSupporter: string;

  // AdditionItemSection
  nighttimePlacement: number;
  seeHearTeamFlg: boolean;
  regionalLifeTransition: boolean;
  nutritionManagementFlg: boolean;
  staffTreatmentSystemType: string;
  staffTreatmentSpecificSystemType: string;
  seriousDisability: number;
}
