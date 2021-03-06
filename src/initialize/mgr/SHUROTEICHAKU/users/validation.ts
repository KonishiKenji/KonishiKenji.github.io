import { BasicErrors } from "@interfaces/mgr/SHUROTEICHAKU/Users/basic";
import { ServiceUseErrors } from "@interfaces/mgr/SHUROTEICHAKU/Users/serviceUse";
import { RecipientCertificateErrors } from "@interfaces/mgr/SHUROTEICHAKU/Users/recipientCertificate";
import { CompaniesErrors } from "@interfaces/mgr/SHUROTEICHAKU/Users/companies";
import { UsersValues } from "@initialize/mgr/SHUROTEICHAKU/users/initialValues";
import validator, { dateValidator, validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";
import { SelectDateValue } from "@interfaces/ui/form";

type FacilityErrors = BasicErrors &
  ServiceUseErrors &
  RecipientCertificateErrors &
  CompaniesErrors;

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
      dateOfBirth: dateValidator(
        notSelectedToEmpty(values.basic.dateOfBirth),
        "required"
      ),
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
      email: validator(values.basic.email, "email"),
      guardianTel: validator(values.basic.guardianTel, "naturalNumber")
    }
  };
};

// "NOT_SELECTED"がrequiredバリデーションにかからないため""に変換
const notSelectedToEmpty = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "NOT_SELECTED" ? "" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

// nullがrequiredバリデーションにかからないため""に変換
const nullToEmpty = (value: string): string => {
  const param = value === null ? "" : value;
  return param;
};

const serviceUseValidation = (values: UsersValues): ServiceUseErrors => {
  return {
    serviceUse: {
      inServiceStartDate: dateValidator(
        notSelectedToEmpty(values.serviceUse.inServiceStartDate),
        "required"
      ),
      inServiceEndDate: dateValidator(
        notSelectedToEmpty(values.serviceUse.inServiceEndDate),
        {
          type: "future",
          startDate: values.serviceUse.inServiceStartDate,
          options: {
            startLabel: "開始日",
            endLabel: "終了日"
          }
        }
      ),
      payStartDate: dateValidator(
        notSelectedToEmpty(values.serviceUse.payStartDate),
        "required"
      ),
      payEndDate: dateValidator(
        notSelectedToEmpty(values.serviceUse.payEndDate),
        "required",
        {
          type: "future",
          startDate: values.serviceUse.payStartDate,
          options: {
            startLabel: "支給決定開始日",
            endLabel: "支給決定終了日"
          }
        }
      ),
      subsidizedPercent: validateSwitcher(
        values.serviceUse.subsidizedFlag &&
          values.serviceUse.subsidizedUnit === "1",
        validator(
          values.serviceUse.subsidizedPercent,
          "required",
          "naturalNumberNonZero",
          {
            type: "upperLimit",
            upperLimit: 100
          }
        )
      ),
      subsidizedYen: validateSwitcher(
        values.serviceUse.subsidizedFlag &&
          values.serviceUse.subsidizedUnit === "2",
        validator(
          values.serviceUse.subsidizedYen,
          "required",
          "naturalNumberNonZero"
        )
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
        validator(
          nullToEmpty(values.serviceUse.upperLimitFacilityName),
          "required"
        )
      ),
      upperLimitTotalYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitTotalYen, "naturalNumberNonZero")
      ),
      upperLimitUserLoadYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(
          values.serviceUse.upperLimitUserLoadYen,
          "naturalNumberNonZero"
        )
      ),
      upperLimitYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.resultOfManagement === "3",
        validator(
          values.serviceUse.upperLimitYen,
          "required",
          "naturalNumberNonZero"
        )
      ),
      notCreateSupportPlanStartDate: validateSwitcher(
        values.serviceUse.createSupportPlanFlag,
        dateValidator(
          notSelectedToEmpty(values.serviceUse.notCreateSupportPlanStartDate),
          "required"
        )
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
          notSelectedToEmpty(
            values.recipientCertificate.userChargeLimitStartDate
          ),
          "required"
        )
      ),
      userChargeLimitEndDate: validateSwitcher(
        values.recipientCertificate.userChargeLimitFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.userChargeLimitEndDate
          ),
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.userChargeLimitStartDate,
            options: {
              startLabel: "適用開始日",
              endLabel: "適用終了日"
            }
          }
        )
      ),
      foodServeAdditionStartDate: validateSwitcher(
        values.recipientCertificate.foodServeAdditionFlg,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.foodServeAdditionStartDate
          ),
          "required"
        )
      ),
      foodServeAdditionEndDate: validateSwitcher(
        values.recipientCertificate.foodServeAdditionFlg,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.foodServeAdditionEndDate
          ),
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.foodServeAdditionStartDate,
            options: {
              startLabel: "適用開始日",
              endLabel: "適用終了日"
            }
          }
        )
      ),
      careSupportAuthStartDate: validateSwitcher(
        values.recipientCertificate.careSupportAuthFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.careSupportAuthStartDate
          ),
          "required"
        )
      ),
      careSupportAuthEndDate: validateSwitcher(
        values.recipientCertificate.careSupportAuthFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.careSupportAuthEndDate
          ),
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.careSupportAuthStartDate,
            options: {
              startLabel: "認定開始日",
              endLabel: "認定終了日"
            }
          }
        )
      ),
      careSupportPaymentStartDate: validateSwitcher(
        values.recipientCertificate.careSupportPaymentFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.careSupportPaymentStartDate
          ),
          "required"
        )
      ),
      careSupportPaymentEndDate: validateSwitcher(
        values.recipientCertificate.careSupportPaymentFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.careSupportPaymentEndDate
          ),
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.careSupportPaymentStartDate,
            options: {
              startLabel: "支給決定開始日",
              endLabel: "支給決定終了日"
            }
          }
        )
      ),

      planSupportPaymentStartDate: validateSwitcher(
        values.recipientCertificate.planSupportPaymentFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.planSupportPaymentStartDate
          ),
          "required"
        )
      ),
      planSupportPaymentEndDate: validateSwitcher(
        values.recipientCertificate.planSupportPaymentFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.planSupportPaymentEndDate
          ),
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.planSupportPaymentStartDate,
            options: {
              startLabel: "支給開始日",
              endLabel: "支給終了日"
            }
          }
        )
      ),
      planSupportMonitorStartDate: validateSwitcher(
        values.recipientCertificate.planSupportMonitorFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.planSupportMonitorStartDate
          ),
          "required"
        )
      ),
      planSupportMonitorEndDate: validateSwitcher(
        values.recipientCertificate.planSupportMonitorFlag,
        dateValidator(
          notSelectedToEmpty(
            values.recipientCertificate.planSupportMonitorEndDate
          ),
          "required",
          {
            type: "future",
            startDate: values.recipientCertificate.planSupportMonitorStartDate,
            options: {
              startLabel: "モニタリング開始日",
              endLabel: "モニタリング終了日"
            }
          }
        )
      )
    }
  };
};

const companiesValidation = (values: UsersValues): CompaniesErrors => {
  const date = notSelectedToEmpty(values.companies.workingStartDate);
  const isAllEmptyDate =
    date.year === "" && date.month === "" && date.day === "";
  return {
    companies: {
      overview: validator(values.companies.overview, {
        type: "checkCharacterLength",
        length: 1000
      }),
      address: validator(values.companies.address, {
        type: "checkCharacterLength",
        length: 1000
      }),
      workingStartDate: validateSwitcher(
        !isAllEmptyDate,
        dateValidator(date, "required")
      ),
      remarks: validator(values.companies.remarks, {
        type: "checkCharacterLength",
        length: 1000
      }),
      companyPersons: companyPersonsValidator(values)
    }
  };
};

const companyPersonsValidator = (
  values: UsersValues
): CompaniesErrors["companies"]["companyPersons"] => {
  const companyPersonsValidation: CompaniesErrors["companies"]["companyPersons"] = [];
  values.companies.companyPersons.map(staff => {
    companyPersonsValidation.push({
      tel: validateSwitcher(staff.flg, validator(staff.tel, "naturalNumber")),
      email: validateSwitcher(staff.flg, validator(staff.email, "email"))
    });
  });
  return companyPersonsValidation;
};

const validation = (values: UsersValues): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const serviceUseErrors = serviceUseValidation(values);
  const recipientCertificateErrors = recipientCertificateValidation(values);
  const companiesErrors = companiesValidation(values);
  return {
    ...basicErrors,
    ...serviceUseErrors,
    ...recipientCertificateErrors,
    ...companiesErrors
  };
};

export default validation;
