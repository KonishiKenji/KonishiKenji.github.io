import { BasicErrors } from "@interfaces/mgr/SHISETSUNYUSHO/Facility/basic";
import { SubtractionItemErrors } from "@interfaces/mgr/SHISETSUNYUSHO/Facility/subtractionItem";
import { FacilityValues } from "@initialize/mgr/SHISETSUNYUSHO/facility/initialValues";
import validator, { validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";
import { foodExpenses, utility } from "@constants/mgr/SHISETSUNYUSHO/variables";

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
      capacity: validator(
        values.basic.capacity,
        "required",
        "naturalNumberNonZero",
        {
          type: "upperLimit",
          upperLimit: 999
        }
      ),
      allCapacity: validateSwitcher(
        values.basic.multiFunctionOfficeFlg,
        validator(
          values.basic.allCapacity,
          "required",
          "naturalNumberNonZero",
          {
            type: "upperLimit",
            upperLimit: 999
          }
        )
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
      foodExpensesBreakfast: validateSwitcher(
        values.basic.availableFood &&
          values.basic.foodExpenses === foodExpenses.PER_FOOD,
        validator(
          values.basic.foodExpensesBreakfast,
          "required",
          "naturalNumberNonZero"
        )
      ),
      foodExpensesLunch: validateSwitcher(
        values.basic.availableFood &&
          values.basic.foodExpenses === foodExpenses.PER_FOOD,
        validator(
          values.basic.foodExpensesLunch,
          "required",
          "naturalNumberNonZero"
        )
      ),
      foodExpensesSupper: validateSwitcher(
        values.basic.availableFood &&
          values.basic.foodExpenses === foodExpenses.PER_FOOD,
        validator(
          values.basic.foodExpensesSupper,
          "required",
          "naturalNumberNonZero"
        )
      ),
      foodExpensesDay: validateSwitcher(
        values.basic.availableFood &&
          values.basic.foodExpenses === foodExpenses.PER_DAY,
        validator(
          values.basic.foodExpensesDay,
          "required",
          "naturalNumberNonZero"
        )
      ),
      utilityCosts: validateSwitcher(
        values.basic.utility !== utility.NONE,
        validator(values.basic.utilityCosts, "required", "naturalNumberNonZero")
      )
    }
  };
};

const subtractionItemValidation = (
  values: FacilityValues
): SubtractionItemErrors => {
  // dateStartLackOfSupporterのフォーム値は「年月」であるが、
  // 入力チェックを行うために「年月日」であることが必要なので、
  // 日にちとして「1日」をdefaultで設定する
  values.subtractionItem.dateStartLackOfSupporter.day = "1";
  const memberDate = values.subtractionItem.dateStartLackOfSupporter;
  const selectDateRules: { type: "selectRequired"; value: string } = {
    type: "selectRequired",
    value: DEFAULT_SELECT_VALUE
  };
  return {
    subtractionItem: {
      dateStartLackOfSupporter: {
        year: validateSwitcher(
          values.subtractionItem.lackOfSupporterFlg,
          validator(memberDate.year, selectDateRules)
        ),
        // 日付の初期値が空文字のため、validationの初期値に合わせる
        month: validateSwitcher(
          values.subtractionItem.lackOfSupporterFlg,
          validator(
            memberDate.month === "" ? DEFAULT_SELECT_VALUE : memberDate.month,
            selectDateRules
          )
        ),
        day: validateSwitcher(
          values.subtractionItem.lackOfSupporterFlg,
          validator(memberDate.day, selectDateRules)
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
