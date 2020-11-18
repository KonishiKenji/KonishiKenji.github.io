import { SelectValue, CheckBoxValue } from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

interface Base<T> {
  initial: T;
}

interface Fields {
  name: string;
  usersInFacilityId: number;
  targetDate: string;
  statusType: CheckBoxValue;
  otherSupportFlg: CheckBoxValue;
  food: SelectValue;
  pickup: SelectValue;
  pickupPremises: SelectValue;
  emergencyShorttermFlg: CheckBoxValue;
  overHoursFlg: CheckBoxValue;
  capacityOverrunException: SelectValue;
  medicalSupportType: SelectValue;
  sputumImplementationFlg: CheckBoxValue;
  severeDisabilitySupportFlg: CheckBoxValue;
  remarks: string;
}

type Errors = ValidationErrors<Fields>;

export type InitialValues = Base<Fields>;
export type InitialErrors = Base<Errors>;
