/**
 * 利用者情報: サービス利用詳細
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  RadioButtonValue,
  SwitchValue,
  SelectDateValue
} from "@interfaces/ui/form";

interface Base<T> {
  serviceUse: T;
}

interface Fields {
  inServiceStartDate: SelectDateValue;
  inServiceEndDate: SelectDateValue;
  payStartDate: SelectDateValue;
  payEndDate: SelectDateValue;
  disabilityClass: RadioButtonValue;
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
  createSupportPlanFlag: SwitchValue;
  notCreateSupportPlanStartDate: SelectDateValue;
  sameCorporationMovementFlg: SwitchValue;
  agreedByContractFlg: RadioButtonValue;
  severeDisabilitySupport: SwitchValue;
  severeDisabilitySupportStartData: SelectDateValue;
  rehabilitation: RadioButtonValue;
  rehabilitationStartDate: SelectDateValue;
  defFood: SelectValue;
  defPickup: SelectValue;
  pickupPremises: SelectValue;
  payDaysAgreed: InputValue;
  businessNumberContract: InputValue;
  monScheduledFlg: SwitchValue;
  tueScheduledFlg: SwitchValue;
  wedScheduledFlg: SwitchValue;
  thuScheduledFlg: SwitchValue;
  friScheduledFlg: SwitchValue;
  satScheduledFlg: SwitchValue;
  sunScheduledFlg: SwitchValue;
}

type Errors = ValidationErrors<Fields>;

export type ServiceUseValues = Base<Fields>;
export type ServiceUseErrors = Base<Errors>;
