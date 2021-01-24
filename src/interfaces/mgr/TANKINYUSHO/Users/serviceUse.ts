/**
 * 利用者情報: サービス利用詳細
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  RadioButtonValue,
  SwitchValue,
  SelectDateValue,
  CheckBoxValue
} from "@interfaces/ui/form";

interface Base<T> {
  serviceUse: T;
}

interface Fields {
  inServiceStartDate: SelectDateValue;
  inServiceEndDate: SelectDateValue;
  endInServiceSameCorporationMovementFlg: CheckBoxValue;
  payStartDate: SelectDateValue;
  payEndDate: SelectDateValue;
  classifyHandicappedFlag: CheckBoxValue;
  disabilityChildClass: RadioButtonValue;
  disabilityClass: RadioButtonValue;
  severeDisabilitySupport: RadioButtonValue;
  payDaysAgreed: InputValue;
  businessNumberContract: InputValue;
  supportType: RadioButtonValue;
  incomeKind: RadioButtonValue;
  incomeKindType: SelectValue;
  subsidizedFlag: SwitchValue;
  subsidizedPercent: InputValue;
  subsidizedYen: InputValue;
  subsidizedUnit: SelectValue;
  subsidizedCityId: SelectValue;
  upperLimitFacilityFlag: SwitchValue;
  upperLimitControlledBy: SelectValue;
  upperLimitFacilityNumber: InputValue;
  upperLimitFacilityName: InputValue;
  upperLimitTotalYen: InputValue;
  upperLimitUserLoadYen: InputValue;
  resultOfManagement: RadioButtonValue;
  upperLimitYen: InputValue;
  severelyDisabledFlg: CheckBoxValue;
  useType: CheckBoxValue;
  medicalCareFlg: CheckBoxValue;
  specialSevereDisabilitySupport: RadioButtonValue;
}

type Errors = ValidationErrors<Fields>;

export type ServiceUseValues = Base<Fields>;
export type ServiceUseErrors = Base<Errors>;
