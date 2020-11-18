import { BasicErrors } from "@interfaces/mgr/SHUROTEICHAKU/Facility/basic";
import { SubtractionItemErrors } from "@interfaces/mgr/SHUROTEICHAKU/Facility/subtractionItem";
import { FacilityValues } from "@initialize/mgr/SHUROTEICHAKU/facility/initialValues";
import validator, { validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

type FacilityErrors = BasicErrors & SubtractionItemErrors;

const basicValidation = (values: FacilityValues): BasicErrors => {
  return {
    basic: {
      corporationName: validator(values.basic.corporationName, "required"),
      officeNumber: validator(
        values.basic.officeNumber,
        "required",
        "naturalNumber",
        { type: "checkDigits", digits: 10 }
      ),
      officeName: validator(values.basic.officeName, "required"),
      representativeName: validator(
        values.basic.representativeName,
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
      tel: validator(values.basic.tel, "required", "naturalNumber"),
      numberOfUsers: validator(
        values.basic.numberOfUsers,
        "required",
        "naturalNumberNonZero",
        {
          type: "upperLimit",
          upperLimit: 999
        }
      ),
      allCapacity: validateSwitcher(
        values.basic.multiFunctionOfficeFlag,
        validator(
          values.basic.allCapacity,
          "required",
          "naturalNumberNonZero",
          {
            type: "upperLimit",
            upperLimit: 999
          }
        )
      )
    }
  };
};

const subtractionItemValidation = (
  values: FacilityValues
): SubtractionItemErrors => {
  // lackOfLifeSupportMemberStartDate,lackOfResponsiblePersonStartDateの
  // フォーム値は「年月」であるが、入力チェックを行うために「年月日」であることが必要なので、
  // 日にちとして「1日」をdefaultで設定する
  values.subtractionItem.lackOfLifeSupportMemberStartDate.day = "1";
  values.subtractionItem.lackOfResponsiblePersonStartDate.day = "1";
  const memberDate = values.subtractionItem.lackOfLifeSupportMemberStartDate;
  const personDate = values.subtractionItem.lackOfResponsiblePersonStartDate;
  const selectDateRules: { type: "selectRequired"; value: string } = {
    type: "selectRequired",
    value: DEFAULT_SELECT_VALUE
  };
  return {
    subtractionItem: {
      lackOfLifeSupportMemberStartDate: {
        year: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(memberDate.year, selectDateRules)
        ),
        // 日付の初期値が空文字のため、validationの初期値に合わせる
        month: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(
            memberDate.month === "" ? DEFAULT_SELECT_VALUE : memberDate.month,
            selectDateRules
          )
        ),
        day: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(memberDate.day, selectDateRules)
        )
      },
      lackOfResponsiblePersonStartDate: {
        year: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(personDate.year, selectDateRules)
        ),
        month: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(
            personDate.month === "" ? DEFAULT_SELECT_VALUE : personDate.month,
            selectDateRules
          )
        ),
        day: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(personDate.day, selectDateRules)
        )
      }
    }
  };
};

const validation = (values: FacilityValues): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const subtractionItemErrors = subtractionItemValidation(values);
  return {
    ...basicErrors,
    ...subtractionItemErrors
  };
};

export default validation;
