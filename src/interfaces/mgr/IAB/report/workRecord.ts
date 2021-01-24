import { InputValue, CheckBoxValue } from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

interface Base<T> {
  workRecord: T;
}

interface Fields {
  id: number | null;
  inoutRecordsId: number | null;
  worked: CheckBoxValue;
  startTime: InputValue;
  endTime: InputValue;
  breakTime: InputValue;
  totalTime: InputValue;
  memo: InputValue;
  histories?: any;
}

type Errors = ValidationErrors<Fields>;

export type InitialValues = Base<Fields>;
export type WorkRecordErrors = Base<Errors>;
