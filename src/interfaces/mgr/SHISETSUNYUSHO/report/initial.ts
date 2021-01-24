import { SelectValue, CheckBoxValue } from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

interface Base<T> {
  initial: T;
}

interface Fields {
  name: string;
  usersInFacilityId: number;
  targetDate: string;
  statusType: SelectValue;
  hospitalizationOvernightStay: SelectValue;
  regionalTransitionFlg: CheckBoxValue;
  collectionOfUtilityFeeFlg: CheckBoxValue;
  nutritionManagementFlg: CheckBoxValue;
  foodBreakfastFlg: CheckBoxValue;
  foodLunchFlg: CheckBoxValue;
  foodSupperFlg: CheckBoxValue;
  oralTransition: SelectValue;
  oralPreservation: SelectValue;
  medicalFoodsFlg: CheckBoxValue;
  severeDisabilitySupportFlg: CheckBoxValue;
  remarks: string;
}

type Errors = ValidationErrors<Fields>;

export type InitialValues = Base<Fields>;
export type InitialErrors = Base<Errors>;
