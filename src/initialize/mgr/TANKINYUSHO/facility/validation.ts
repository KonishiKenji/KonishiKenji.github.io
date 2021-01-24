import { BasicErrors } from "@interfaces/mgr/TANKINYUSHO/Facility/basic";
import { SubtractionItemErrors } from "@interfaces/mgr/TANKINYUSHO/Facility/subtractionItem";
import { FacilityValues } from "@initialize/mgr/TANKINYUSHO/facility/initialValues";
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
      facilityType: validator(values.basic.facilityType, "required"),
      medicalType: validateSwitcher(
        values.basic.facilityType === "1" || values.basic.facilityType === "2",
        validator(values.basic.medicalType, {
          type: "selectRequired",
          value: "0"
        })
      ),
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
      tel: validator(values.basic.tel, "required", "naturalNumber")
    }
  };
};

const subtractionItemValidation = (
  values: FacilityValues
): SubtractionItemErrors => {
  // lackOfLifeSupportMemberStartDateのフォーム値は「年月」であるが、
  // 入力チェックを行うために「年月日」であることが必要なので、
  // 日にちとして「1日」をdefaultで設定する
  values.subtractionItem.lackOfLifeSupportMemberStartDate.day = "1";
  const memberDate = values.subtractionItem.lackOfLifeSupportMemberStartDate;
  const selectDateRules: { type: "selectRequired"; value: string } = {
    type: "selectRequired",
    value: DEFAULT_SELECT_VALUE
  };
  return {
    subtractionItem: {
      facilityCombiStatus: validator(
        values.subtractionItem.facilityCombiStatus,
        "required"
      ),
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
