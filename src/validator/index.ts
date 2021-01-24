import * as validate from "@validator/rules";
import ValidationErrors from "@interfaces/ui/validationErrors";
import { SelectDateValue } from "@interfaces/ui/form";

type Required = "required"; // 必須チェック
type NaturalNumber = "naturalNumber"; // 自然数チェック
type PostalCode = "postalCode"; // 郵便番号チェック
type Email = "email"; // メールアドレスチェック
type Kana = "kana"; // 全角カナチェック
type Password = "password"; // パスワードチェック
type AccountId = "accountId";
type CheckTime = "checkTime"; // 時間フォーマットチェック
type NaturalNumberNonZero = "naturalNumberNonZero"; // 自然数チェック（0単体を含む）
type Decimal = "decimal";

// 条件を満たした時だけRequiredを実行する
interface ShouldRequired {
  type: "required";
  shouldValidate: boolean;
}

// セレクトボックス変更チェック
interface SelectRequired {
  type: "selectRequired";
  value: string;
}

// セレクトボックスの値がoption内に存在するかのチェック
interface SelectReenter {
  type: "selectReenter";
  options: { value: string }[];
}

// 指定桁数チェック
interface CheckDigits {
  type: "checkDigits";
  digits: number;
}

// startDateよりも未来かチェック
interface Future {
  type: "future";
  startDate: SelectDateValue;
  options?: { startLabel: string; endLabel: string };
}

// 上限チェック
interface UpperLimit {
  type: "upperLimit";
  upperLimit: number;
}

// 上限チェック(小数考慮版)
interface UpperLimitDecimal {
  type: "upperLimitDecimal";
  upperLimitDecimal: number;
}

// 下限チェック
interface LowerLimit {
  type: "lowerLimit";
  lowerLimit: number;
}

// 下限チェック(小数考慮版)
interface LowerLimitDecimal {
  type: "lowerLimitDecimal";
  lowerLimitDecimal: number;
}

// パスワード一致チェック
interface PasswordMatch {
  type: "passwordMatch";
  value: string;
}

// 終了時間チェック
interface CheckTimeFuture {
  type: "checkTimeFuture";
  startTime: string;
  options?: { firstLabel: string; secondLabel: string };
}

// 指定文字数数チェック
interface CheckCharacterLength {
  type: "checkCharacterLength";
  length: number;
}

// 期間内かどうかチェック(月単位)
interface WithinTargetMonth {
  type: "withinTargetMonth";
  startDate: SelectDateValue;
  targetMonth: number;
  options?: { startLabel: string; endLabel: string };
}

export type Rule =
  | Required
  | NaturalNumber
  | PostalCode
  | Email
  | Kana
  | ShouldRequired
  | SelectRequired
  | SelectReenter
  | CheckDigits
  | Password
  | PasswordMatch
  | AccountId
  | CheckTimeFuture
  | CheckCharacterLength
  | CheckTime
  | UpperLimit
  | UpperLimitDecimal
  | LowerLimit
  | LowerLimitDecimal
  | NaturalNumberNonZero
  | Decimal;
export type ErrorMessage = string | undefined;

type DateRule = Required | Future | WithinTargetMonth;
type DateErrorMessage = ValidationErrors<SelectDateValue> | undefined;

/**
 * 渡されたルールからvalueに対して行うバリデーションを決定する
 * @param value
 * @param rules
 */
const validator = (value: string, ...rules: Rule[]): ErrorMessage => {
  let errorMessage: string | undefined;
  rules.some((rule): boolean => {
    if (rule === "required") {
      errorMessage = validate.required(value);
    }
    if (rule === "naturalNumber") {
      errorMessage = validate.naturalNumber(value);
    }
    if (rule === "naturalNumberNonZero") {
      errorMessage = validate.naturalNumberNonZero(value);
    }
    if (rule === "decimal") {
      errorMessage = validate.decimal(value);
    }
    if (rule === "checkTime") {
      errorMessage = validate.checkTime(value);
    }
    if (rule === "postalCode") {
      errorMessage = validate.postalCode(value);
    }
    if (rule === "email") {
      errorMessage = validate.email(value);
    }
    if (rule === "kana") {
      errorMessage = validate.kana(value);
    }
    if (typeof rule === "object") {
      if (rule.type === "required" && rule.shouldValidate) {
        errorMessage = validate.required(value);
      }
      if (rule.type === "selectRequired") {
        errorMessage = validate.selectRequired(value, rule.value);
      }
      if (rule.type === "selectReenter") {
        errorMessage = validate.selectReenter(value, rule.options);
      }
      if (rule.type === "checkDigits") {
        errorMessage = validate.checkDigits(value, rule.digits);
      }
      if (rule.type === "passwordMatch") {
        errorMessage = validate.passwordMatch(value, rule.value);
      }
      if (rule.type === "checkTimeFuture") {
        errorMessage = validate.checkTimeFuture(
          value,
          rule.startTime,
          rule.options
        );
      }
      if (rule.type === "upperLimit") {
        errorMessage = validate.upperLimit(value, rule.upperLimit);
      }
      if (rule.type === "upperLimitDecimal") {
        errorMessage = validate.upperLimit(value, rule.upperLimitDecimal, true);
      }
      if (rule.type === "lowerLimit") {
        errorMessage = validate.lowerLimit(value, rule.lowerLimit);
      }
      if (rule.type === "lowerLimitDecimal") {
        errorMessage = validate.lowerLimit(value, rule.lowerLimitDecimal, true);
      }
      if (rule.type === "checkCharacterLength") {
        errorMessage = validate.checkCharacterLength(value, rule.length);
      }
    }
    if (rule === "password") {
      errorMessage = validate.password(value);
    }
    if (rule === "accountId") {
      errorMessage = validate.accountId(value);
    }

    // errorMessageが生成されていたら終了
    if (errorMessage) {
      return true;
    }
    return false;
  });
  return errorMessage;
};

/**
 * SelectDateValueを処理するためのバリデーション
 * @param date
 * @param rules
 */
export const dateValidator = (
  value: SelectDateValue,
  ...rules: DateRule[]
): DateErrorMessage => {
  let errorMessage:
    | {
        year: string | undefined;
        month: string | undefined;
        day: string | undefined;
      }
    | undefined;
  rules.some((rule): boolean => {
    if (rule === "required") {
      errorMessage = validate.requiredDate(value);
    }
    if (typeof rule === "object") {
      if (rule.type === "future") {
        errorMessage = validate.future(value, rule.startDate, rule.options);
      }
      if (rule.type === "withinTargetMonth") {
        errorMessage = validate.withinTargetMonth(
          rule.startDate,
          value,
          rule.targetMonth,
          rule.options
        );
      }
    }

    if (
      errorMessage &&
      (errorMessage.year || errorMessage.month || errorMessage.day)
    ) {
      return true;
    }
    return false;
  });
  return errorMessage;
};

/**
 * validatorの実行を制御する
 * @param needsValidate trueならバリデーション結果を返す
 * @param validatorResult バリデーション結果
 */
export const validateSwitcher = <T>(
  needsValidate: boolean,
  validatorResult: T
): T | undefined => {
  return needsValidate ? validatorResult : undefined;
};

export default validator;
