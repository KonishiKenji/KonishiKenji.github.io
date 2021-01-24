/**
 * 利用者情報: 受給者証の詳細
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { SwitchValue, SelectDateValue } from "@interfaces/ui/form";

interface Base<T> {
  recipientCertificate: T;
}

interface Fields {
  userChargeLimitFlag: SwitchValue;
  userChargeLimitStartDate: SelectDateValue;
  userChargeLimitEndDate: SelectDateValue;
  careSupportAuthFlag: SwitchValue;
  careSupportAuthStartDate: SelectDateValue;
  careSupportAuthEndDate: SelectDateValue;
  careSupportPaymentFlag: SwitchValue;
  careSupportPaymentStartDate: SelectDateValue;
  careSupportPaymentEndDate: SelectDateValue;
  planSupportPaymentFlag: SwitchValue;
  planSupportPaymentStartDate: SelectDateValue;
  planSupportPaymentEndDate: SelectDateValue;
  planSupportMonitorFlag: SwitchValue;
  planSupportMonitorStartDate: SelectDateValue;
  planSupportMonitorEndDate: SelectDateValue;
}

type Errors = ValidationErrors<Fields>;

export type RecipientCertificateValues = Base<Fields>;
export type RecipientCertificateErrors = Base<Errors>;
