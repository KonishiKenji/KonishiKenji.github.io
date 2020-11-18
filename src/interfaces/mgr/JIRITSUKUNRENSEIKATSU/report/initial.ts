import { InputValue, SelectValue, CheckBoxValue } from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

interface Base<T> {
  initial: T;
}

interface Fields {
  name: string;
  uifId: number;
  targetDate: string;
  status: SelectValue;
  trialUsageKind: SelectValue;
  lifeSupportHubInDistrictFlg: CheckBoxValue;
  inTime: InputValue;
  outTime: InputValue;
  didGetFood: SelectValue;
  travelTime: SelectValue;
  pickupPremises: SelectValue;
  visitSupport: CheckBoxValue;
  medicalCooperation: SelectValue;
  sputumImplementationFlg: CheckBoxValue;
  helpSocialLifeFlg: CheckBoxValue;
  shortStayFlg: CheckBoxValue;
  supportForMentallyIllDischarge: CheckBoxValue;
  specialAreaFlg: CheckBoxValue;
  memo: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type InitialValues = Base<Fields>;
export type InitialErrors = Base<Errors>;
