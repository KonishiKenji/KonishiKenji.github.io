/**
 * お問い合わせ
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { InputValue, SelectValue, CheckBoxValue } from "@interfaces/ui/form";

interface Base<T> {
  contact: T;
}

interface Fields {
  agreement: CheckBoxValue;
  browser: InputValue;
  content: InputValue;
  email: InputValue;
  facilityName: InputValue;
  govBusinessOwner: InputValue;
  os: InputValue;
  overview: SelectValue;
  responsibleName: InputValue;
  userAgent: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type ContactValues = Base<Fields>;
export type ContactErrors = Base<Errors>;
