import { BasicErrors } from "@interfaces/mgr/GroupHome/facility/basic";
import { SubtractionItemErrors } from "@interfaces/mgr/GroupHome/facility/subtractionItem";
import { AdditionalItemErrors } from "@interfaces/mgr/GroupHome/facility/additionItem";
import { UnitsErrors } from "@interfaces/mgr/GroupHome/facility/units";
import { FacilityValues } from "@initialize/mgr/GroupHome/facility/initialValues";
import validator, { validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

type FacilityErrors = BasicErrors &
  SubtractionItemErrors &
  AdditionalItemErrors;

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
      capacity: validator(values.basic.capacity, "required", "naturalNumber"),
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
  const memberDate = values.subtractionItem.lackOfLifeSupportMemberStartDate;
  const personDate = values.subtractionItem.lackOfResponsiblePersonStartDate;
  const selectDateRules: { type: "selectRequired"; value: string } = {
    type: "selectRequired",
    value: ""
  };
  return {
    subtractionItem: {
      lackOfLifeSupportMemberStartDate: {
        year: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(memberDate.year, selectDateRules)
        ),
        month: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(memberDate.month, selectDateRules)
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
          validator(personDate.month, selectDateRules)
        ),
        day: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(personDate.day, selectDateRules)
        )
      }
    }
  };
};

/**
 * 加算対象項目
 */
const additionItemValidation = (
  values: FacilityValues
): AdditionalItemErrors => {
  // ２つ以上のユニットを運営している」が有効でない時に、夜間支援体制加算を有効にしたらチェック
  const hasNightSupport =
    !values.basic.operatingUnitFlag && values.additionalItem.nightSupportFlag;
  return {
    additionalItem: {
      nightSupportType: validateSwitcher(
        hasNightSupport,
        validator(values.additionalItem.nightSupportType, "required")
      ),
      averageUsersLastYear: validateSwitcher(
        hasNightSupport,
        validator(
          values.additionalItem.averageUsersLastYear,
          "required",
          "naturalNumber"
        )
      )
    }
  };
};

/**
 *  GHユニット
 * 「２つ以上のユニットを運営している」が有効な時に実行する
 */
const unitsValidation = (values: FacilityValues): UnitsErrors => {
  const units = values.basic.operatingUnitFlag
    ? values.units.map(unit => ({
        unit_name: validateSwitcher(
          !unit.is_deleted,
          validator(unit.unit_name, "required", {
            type: "checkCharacterLength",
            length: 30
          })
        ),
        night_support_type: validateSwitcher(
          !unit.is_deleted && values.additionalItem.nightSupportFlag,
          validator(unit.night_support_type, "required")
        ),
        ave_users_last_fiscal_year: validateSwitcher(
          !unit.is_deleted &&
            values.additionalItem.nightSupportFlag &&
            unit.night_support_type !== "1",
          validator(
            unit.ave_users_last_fiscal_year,
            "required",
            "naturalNumber"
          )
        )
      }))
    : [];
  return { units };
};

const validation = (values: FacilityValues): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const subtractionItemErrors = subtractionItemValidation(values);
  const additionalItemErrors = additionItemValidation(values);
  const unitsErrors = unitsValidation(values);
  return {
    ...basicErrors,
    ...subtractionItemErrors,
    ...additionalItemErrors,
    ...unitsErrors
  };
};

export default validation;
