import { isNull } from "util";
import { removeHyphenFromPostalCode } from "@utils/dataNormalizer";

export const requiredMessage = "必須です";
export const numberMessage = "数値を入力してください";
export const notSelectedMessage = "選択してください";
export const notCountMessage = "桁で入力してください";
export const notMailMessage = "メール形式で入力してください";
export const notPostalCode = "郵便番号形式で入力してください";
export const notKanaMessage = "全角カタカナで入力してください";
export const notPast = "よりも前に設定してください";
export const notFuture = "よりも後に設定してください";

interface CombineValidateParams {
  validator: (data: any, rule: any) => boolean;
  errorMessage: string;
}

interface DependencyFlgListParams {
  flgName: string;
  value: any;
  valueGroup?: string;
}

export interface ValidationRuleParams {
  rule: CombineValidateParams[];
  default?: string;
  valueGroup?: string;
  label?: string;
  dependencyDate?: {
    label: string;
    value: string;
  };
  dependencyValue?: {
    normalValue: any;
    nowValue: any;
  };
  count?: number;
  dependencyFlgList?: DependencyFlgListParams;
}

export const combineValidator = (
  rule: ValidationRuleParams,
  value: any
): string[] => {
  let validator: CombineValidateParams[] = [...rule.rule];
  validator = validator.map(item => {
    return { ...item };
  });
  const invalidData = validator.filter(item => {
    if (item.errorMessage === notCountMessage) {
      item.errorMessage = rule.count + notCountMessage;
    }
    if (item.errorMessage === notFuture) {
      if (rule.dependencyDate) {
        item.errorMessage = `${rule.label}は${rule.dependencyDate.label}${notFuture}`;
      }
    }
    if (item.errorMessage === notPast) {
      if (rule.dependencyDate) {
        item.errorMessage = `${rule.label}は${rule.dependencyDate.label}${notPast}`;
      }
    }
    return !item.validator(value, rule);
  });
  return invalidData.map(item => item.errorMessage);
};

export const requiredValidator = (value: any): boolean => {
  let isValid = true;
  if (
    value === undefined ||
    isNull(value) ||
    value === "" ||
    (typeof value === "number" && isNaN(value))
  ) {
    isValid = false;
  }
  return isValid;
};

export const dependencyRequiredValidator = (
  value: any,
  rule?: any
): boolean => {
  if (rule.dependencyValue.nowValue === rule.dependencyValue.normalValue) {
    return true;
  }
  let isValid = true;
  if (
    value === undefined ||
    isNull(value) ||
    value === "" ||
    (typeof value === "number" && isNaN(value))
  ) {
    isValid = false;
  }
  return isValid;
};

export const kanaValidator = (value: any): boolean => {
  const kanaList = /^[\u30A0-\u30FF]+$/;
  let isValid = true;
  if (!value.match(kanaList)) {
    isValid = false;
  }
  return isValid;
};

export const numberValidator = (value: any, rule?: any): boolean => {
  const numbers = /^[0-9]+$/;
  let isValid = true;
  if (value === "") {
    return true;
  }
  if ((typeof value === "number" && isNaN(value)) || !value.match(numbers)) {
    isValid = false;
  }
  return isValid;
};

export const countValidator = (value: any, rule?: any): boolean => {
  if (value === "") {
    return true;
  }
  return value.length === rule.count;
};

export const postalCodeValidator = (value: any, rule?: any): boolean => {
  const numbers = /^[0-9]+$/;
  let isValid = true;
  const removeHyphenValue = removeHyphenFromPostalCode(value);
  if (
    (typeof removeHyphenValue === "number" && isNaN(removeHyphenValue)) ||
    !removeHyphenValue.match(numbers)
  ) {
    isValid = false;
  }
  if (removeHyphenValue.length !== 7) {
    isValid = false;
  }
  return isValid;
};

export const dropDownValidator = (value: any, rule?: any): boolean => {
  return value !== rule.default;
};

export const mailValidator = (value: any, rule?: any) => {
  const mail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let isValid = true;
  // TODO check `isRequired`
  if (value !== "" && !value.match(mail)) {
    isValid = false;
  }
  return isValid;
};

export const futureValidator = (value: any, rule?: any) => {
  if (rule.dependencyDate.value === "" || value === "") {
    return true;
  }
  const valueDate = new Date(value);
  const ruleDate = new Date(rule.dependencyDate.value);
  return valueDate.getTime() > ruleDate.getTime();
};

export const pastValidator = (value: any, rule?: any) => {
  if (rule.dependencyDate.value === "" || value === "") {
    return true;
  }
  const valueDate = new Date(value);
  const ruleDate = new Date(rule.dependencyDate.value);
  return valueDate.getTime() < ruleDate.getTime();
};

// テキストボックス必須チェック
export const requiredRules = {
  validator: requiredValidator,
  errorMessage: requiredMessage
};

// 他の項目が特定の値の場合必須チェック
export const dependencyRequiredRules = {
  validator: dependencyRequiredValidator,
  errorMessage: requiredMessage
};

// カタカナチェック
export const kanaRules = {
  validator: kanaValidator,
  errorMessage: notKanaMessage
};

// テキストボックス数字チェック
export const numberRules = {
  validator: numberValidator,
  errorMessage: numberMessage
};

// テキストボックス桁数チェック
export const countRules = {
  validator: countValidator,
  errorMessage: notCountMessage
};

// ドロップダウン必須チェック
export const requiredDropDownRules = {
  validator: dropDownValidator,
  errorMessage: notSelectedMessage
};

// テキストボックス郵便番号チェック
export const postalCodeRules = {
  validator: postalCodeValidator,
  errorMessage: notPostalCode
};

// テキストボックスメールアドレスチェック
export const mailRules = {
  validator: mailValidator,
  errorMessage: notMailMessage
};

// 日付未来日チェック
export const futureRules = {
  validator: futureValidator,
  errorMessage: notFuture
};

// 日付過去日チェック
export const pastRules = {
  validator: pastValidator,
  errorMessage: notPast
};

export const ruleList = {
  required: requiredRules,
  dependencyRequired: dependencyRequiredRules,
  kana: kanaRules,
  number: numberRules,
  count: countRules,
  requiredDropDown: requiredDropDownRules,
  postalCode: postalCodeRules,
  mail: mailRules,
  future: futureRules,
  past: pastRules
};

/**
 * rulesに記載されているバリデーションルールをパラメーターで一括チェックします
 *
 * @param rules
 * @param params
 */
export const arrValidator = (rules: any, params: any) => {
  const errors = Array();
  for (const key in rules) {
    if (rules[key]) {
      if (!dependencyFlgCheck(rules[key].dependencyFlgList, params)) {
        continue;
      }
      let value;
      let param;
      if (rules[key].valueGroup) {
        param = params[rules[key].valueGroup][key];
      } else {
        param = params[key];
      }
      if (rules[key].default) {
        value = param || rules[key].default;
      } else {
        value = param || "";
      }
      const result = combineValidator(rules[key], value);
      if (result.length) {
        errors.push({
          type: key,
          message: result[0]
        });
      }
    }
  }
  return errors;
};

export interface ValidationMessage {
  message: string;
  type: string;
}

/**
 * 依存するフラグが全て一致するかを確認する
 * @param flgList
 * @param params
 */
const dependencyFlgCheck = (
  flgList: DependencyFlgListParams[],
  params: any
) => {
  if (!flgList) {
    return true;
  }
  const result = flgList.filter((target: DependencyFlgListParams) => {
    let param;
    if (target.valueGroup) {
      param = params[target.valueGroup][target.flgName];
    } else {
      param = params[target.flgName];
    }
    if (param) {
      return param === target.value;
    }
    return false;
  });
  return result.length === flgList.length;
};

export const defaultSelectedValue = "default";
