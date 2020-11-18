import { BasicErrors } from "@interfaces/mgr/GroupHome/users/basic";
import { ServiceUseErrors } from "@interfaces/mgr/GroupHome/users/serviceUse";
import { RecipientCertificateErrors } from "@interfaces/mgr/GroupHome/users/recipientCertificate";
import { UsersValues } from "@initialize/mgr/GroupHome/users/initialValues";
import validator, { dateValidator, validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

type FacilityErrors = BasicErrors &
  ServiceUseErrors &
  RecipientCertificateErrors;

const basicValidation = (values: UsersValues): BasicErrors => {
  return {
    basic: {
      nameSei: validator(values.basic.nameSei, "required"),
      nameMei: validator(values.basic.nameMei, "required"),
      nameSeiKana: validator(values.basic.nameSeiKana, "required", "kana"),
      nameMeiKana: validator(values.basic.nameMeiKana, "required", "kana"),
      recipientNumber: validator(
        values.basic.recipientNumber,
        {
          type: "required",
          shouldValidate: !values.basic.noneRecipientNumberFlag
        },
        "naturalNumber",
        { type: "checkDigits", digits: 10 }
      ),
      dateOfBirth: dateValidator(values.basic.dateOfBirth, "required"),
      postalCode: validator(values.basic.postalCode, "required", "postalCode"),
      prefectureId: validator(values.basic.prefectureId, {
        type: "selectRequired",
        value: DEFAULT_SELECT_VALUE
      }),
      cityId: validator(values.basic.cityId, {
        type: "selectRequired",
        value: DEFAULT_SELECT_VALUE
      }),
      restAddress: validator(values.basic.restAddress, "required"),
      tel: validator(values.basic.tel, "naturalNumber"),
      email: validator(values.basic.email, "email")
    }
  };
};

const serviceUseValidation = (
  values: UsersValues,
  operatingUnitFlg: boolean
): ServiceUseErrors => {
  return {
    serviceUse: {
      inServiceStartDate: dateValidator(
        values.serviceUse.inServiceStartDate,
        "required"
      ),
      inServiceEndDate: dateValidator(values.serviceUse.inServiceEndDate, {
        type: "future",
        startDate: values.serviceUse.inServiceStartDate
      }),
      payStartDate: dateValidator(values.serviceUse.payStartDate, "required"),
      payEndDate: dateValidator(values.serviceUse.payEndDate, "required", {
        type: "future",
        startDate: values.serviceUse.payStartDate
      }),
      specifiedPersonsDisabilitiesBenefits: validator(
        values.serviceUse.specifiedPersonsDisabilitiesBenefits,
        "required",
        "naturalNumber"
      ),
      subsidizedPercent: validateSwitcher(
        values.serviceUse.subsidizedFlag &&
          values.serviceUse.subsidizedUnit === "1",
        validator(
          values.serviceUse.subsidizedPercent,
          "required",
          "naturalNumber"
        )
      ),
      subsidizedYen: validateSwitcher(
        values.serviceUse.subsidizedFlag &&
          values.serviceUse.subsidizedUnit === "2",
        validator(values.serviceUse.subsidizedYen, "required", "naturalNumber")
      ),
      subsidizedCityId: validateSwitcher(
        values.serviceUse.subsidizedFlag,
        validator(values.serviceUse.subsidizedCityId, {
          type: "selectRequired",
          value: DEFAULT_SELECT_VALUE
        })
      ),
      upperLimitFacilityNumber: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag,
        validator(
          values.serviceUse.upperLimitFacilityNumber,
          "required",
          "naturalNumber",
          { type: "checkDigits", digits: 10 }
        )
      ),
      upperLimitFacilityName: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag,
        validator(values.serviceUse.upperLimitFacilityName, "required")
      ),
      upperLimitTotalYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitTotalYen, "naturalNumber")
      ),
      upperLimitUserLoadYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitUserLoadYen, "naturalNumber")
      ),
      upperLimitYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.resultOfManagement === "3",
        validator(values.serviceUse.upperLimitYen, "required", "naturalNumber")
      ),
      notCreateSupportPlanStartDate: validateSwitcher(
        values.serviceUse.createSupportPlanFlag,
        dateValidator(
          values.serviceUse.notCreateSupportPlanStartDate,
          "required"
        )
      ),
      facilityUnitId: validateSwitcher(
        operatingUnitFlg,
        validator(values.serviceUse.facilityUnitId, "required")
      )
    }
  };
};

const recipientCertificateValidation = (
  values: UsersValues
): RecipientCertificateErrors => {
  return {
    recipientCertificate: {
      userChargeLimitStartDate: validateSwitcher(
        values.recipientCertificate.userChargeLimitFlag,
        dateValidator(
          values.recipientCertificate.userChargeLimitStartDate,
          "required"
        )
      ),
      userChargeLimitEndDate: validateSwitcher(
        values.recipientCertificate.userChargeLimitFlag,
        dateValidator(
          values.recipientCertificate.userChargeLimitEndDate,
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.userChargeLimitStartDate
          }
        )
      ),
      careSupportAuthStartDate: validateSwitcher(
        values.recipientCertificate.careSupportAuthFlag,
        dateValidator(
          values.recipientCertificate.careSupportAuthStartDate,
          "required"
        )
      ),
      careSupportAuthEndDate: validateSwitcher(
        values.recipientCertificate.careSupportAuthFlag,
        dateValidator(
          values.recipientCertificate.careSupportAuthEndDate,
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.careSupportAuthStartDate
          }
        )
      ),
      careSupportPaymentStartDate: validateSwitcher(
        values.recipientCertificate.careSupportPaymentFlag,
        dateValidator(
          values.recipientCertificate.careSupportPaymentStartDate,
          "required"
        )
      ),
      careSupportPaymentEndDate: validateSwitcher(
        values.recipientCertificate.careSupportPaymentFlag,
        dateValidator(
          values.recipientCertificate.careSupportPaymentEndDate,
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.careSupportPaymentStartDate
          }
        )
      ),

      planSupportPaymentStartDate: validateSwitcher(
        values.recipientCertificate.planSupportPaymentFlag,
        dateValidator(
          values.recipientCertificate.planSupportPaymentStartDate,
          "required"
        )
      ),
      planSupportPaymentEndDate: validateSwitcher(
        values.recipientCertificate.planSupportPaymentFlag,
        dateValidator(
          values.recipientCertificate.planSupportPaymentEndDate,
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.planSupportPaymentStartDate
          }
        )
      ),
      planSupportMonitorStartDate: validateSwitcher(
        values.recipientCertificate.planSupportMonitorFlag,
        dateValidator(
          values.recipientCertificate.planSupportMonitorStartDate,
          "required"
        )
      ),
      planSupportMonitorEndDate: validateSwitcher(
        values.recipientCertificate.planSupportMonitorFlag,
        dateValidator(
          values.recipientCertificate.planSupportMonitorEndDate,
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.planSupportMonitorStartDate
          }
        )
      )
    }
  };
};

const validation = (
  values: UsersValues,
  operatingUnitFlg: boolean
): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const serviceUseErrors = serviceUseValidation(values, operatingUnitFlg);
  const recipientCertificateErrors = recipientCertificateValidation(values);
  return { ...basicErrors, ...serviceUseErrors, ...recipientCertificateErrors };
};

export default validation;
