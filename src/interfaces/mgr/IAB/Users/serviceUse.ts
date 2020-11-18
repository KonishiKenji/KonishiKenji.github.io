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
  classifyDisabilitySupport: RadioButtonValue;
  incomeKind: RadioButtonValue;
  incomeKindType: SelectValue;
  subsidizedFlag: SwitchValue;
  subsidizedPercent: InputValue;
  subsidizedYen: InputValue;
  subsidizedUnit: SelectValue;
  subsidizedCityId: SelectValue;
  aTargetForReductionFlg: SwitchValue;
  upperLimitFacilityFlag: SwitchValue;
  upperLimitControlledBy: SelectValue;
  upperLimitFacilityNumber: InputValue;
  upperLimitFacilityNumber2: InputValue;
  upperLimitFacilityNumber3: InputValue;
  upperLimitFacilityNumber4: InputValue;
  upperLimitFacilityName: InputValue;
  upperLimitFacilityName2: InputValue;
  upperLimitFacilityName3: InputValue;
  upperLimitFacilityName4: InputValue;
  upperLimitTotalYen: InputValue;
  upperLimitTotalYen2: InputValue;
  upperLimitTotalYen3: InputValue;
  upperLimitTotalYen4: InputValue;
  upperLimitUserLoadYen: InputValue;
  upperLimitUserLoadYen2: InputValue;
  upperLimitUserLoadYen3: InputValue;
  upperLimitUserLoadYen4: InputValue;
  resultOfManagement: RadioButtonValue;
  upperLimitYen: InputValue;
  createSupportPlanFlag: SwitchValue;
  notCreateSupportPlanStartDate: SelectDateValue;
  sameCorporationMovementFlg: SwitchValue;
  agreedByContractFlg: RadioButtonValue;
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
  defRecordWork: SwitchValue;
}

type Errors = ValidationErrors<Fields>;

export type ServiceUseValues = Base<Fields>;
export type ServiceUseErrors = Base<Errors>;
