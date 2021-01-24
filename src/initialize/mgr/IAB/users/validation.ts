import { BasicErrors } from "@interfaces/mgr/IAB/Users/basic";
import { ServiceUseErrors } from "@interfaces/mgr/IAB/Users/serviceUse";
import { RecipientCertificateErrors } from "@interfaces/mgr/IAB/Users/recipientCertificate";
import { UsersValues } from "@initialize/mgr/IAB/users/initialValues";
import validator, { dateValidator, validateSwitcher, Rule } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";
import { SelectDateValue } from "@interfaces/ui/form";

type FacilityErrors = BasicErrors &
  ServiceUseErrors &
  RecipientCertificateErrors;

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

// 文字数制限
const lengthRule = (length: number): Rule => ({
  type: "checkCharacterLength",
  length
});

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
            startLabel: "サービス提供開始日",
            endLabel: "サービス提供終了日"
          }
        }
      ),
      payStartDate: validateSwitcher(
        !values.basic.noneRecipientNumberFlag,
        dateValidator(
          notSelectedToEmpty(values.serviceUse.payStartDate),
          "required"
        )
      ),
      payEndDate: values.basic.noneRecipientNumberFlag
        ? dateValidator(notSelectedToEmpty(values.serviceUse.payEndDate), {
            type: "future",
            startDate: values.serviceUse.payStartDate,
            options: {
              startLabel: "支給決定開始日",
              endLabel: "支給決定終了日"
            }
          })
        : dateValidator(
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
      payDaysAgreed: validateSwitcher(
        values.serviceUse.agreedByContractFlg === "2",
        validator(
          values.serviceUse.payDaysAgreed,
          "required",
          "naturalNumberNonZero",
          { type: "upperLimit", upperLimit: 31 }
        )
      ),
      businessNumberContract: validateSwitcher(
        values.serviceUse.agreedByContractFlg === "2",
        validator(
          values.serviceUse.businessNumberContract,
          "required",
          "naturalNumber",
          { type: "checkDigits", digits: 2 }
        )
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
      upperLimitFacilityNumber2: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag,
        validator(
          values.serviceUse.upperLimitFacilityNumber2,
          "naturalNumber",
          { type: "checkDigits", digits: 10 }
        )
      ),
      upperLimitFacilityNumber3: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag,
        validator(
          values.serviceUse.upperLimitFacilityNumber3,
          "naturalNumber",
          { type: "checkDigits", digits: 10 }
        )
      ),
      upperLimitFacilityNumber4: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag,
        validator(
          values.serviceUse.upperLimitFacilityNumber4,
          "naturalNumber",
          { type: "checkDigits", digits: 10 }
        )
      ),
      upperLimitFacilityName: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag,
        validator(
          nullToEmpty(values.serviceUse.upperLimitFacilityName),
          lengthRule(2500),
          "required"
        )
      ),
      upperLimitFacilityName2: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          !!values.serviceUse.upperLimitFacilityNumber2,
        validator(
          nullToEmpty(values.serviceUse.upperLimitFacilityName2),
          lengthRule(2500),
          "required"
        )
      ),
      upperLimitFacilityName3: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          !!values.serviceUse.upperLimitFacilityNumber3,
        validator(
          nullToEmpty(values.serviceUse.upperLimitFacilityName3),
          lengthRule(2500),
          "required"
        )
      ),
      upperLimitFacilityName4: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          !!values.serviceUse.upperLimitFacilityNumber4,
        validator(
          nullToEmpty(values.serviceUse.upperLimitFacilityName4),
          lengthRule(2500),
          "required"
        )
      ),
      upperLimitTotalYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitTotalYen, "naturalNumberNonZero")
      ),
      upperLimitTotalYen2: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitTotalYen2, "naturalNumberNonZero")
      ),
      upperLimitTotalYen3: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitTotalYen3, "naturalNumberNonZero")
      ),
      upperLimitTotalYen4: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(values.serviceUse.upperLimitTotalYen4, "naturalNumberNonZero")
      ),
      upperLimitUserLoadYen: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(
          values.serviceUse.upperLimitUserLoadYen,
          "naturalNumberNonZero"
        )
      ),
      upperLimitUserLoadYen2: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(
          values.serviceUse.upperLimitUserLoadYen2,
          "naturalNumberNonZero"
        )
      ),
      upperLimitUserLoadYen3: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(
          values.serviceUse.upperLimitUserLoadYen3,
          "naturalNumberNonZero"
        )
      ),
      upperLimitUserLoadYen4: validateSwitcher(
        values.serviceUse.upperLimitFacilityFlag &&
          values.serviceUse.upperLimitControlledBy === "1",
        validator(
          values.serviceUse.upperLimitUserLoadYen4,
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

const validation = (values: UsersValues): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const serviceUseErrors = serviceUseValidation(values);
  const recipientCertificateErrors = recipientCertificateValidation(values);
  return { ...basicErrors, ...serviceUseErrors, ...recipientCertificateErrors };
};

export default validation;
