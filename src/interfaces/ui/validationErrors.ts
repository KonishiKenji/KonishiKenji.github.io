/**
 * フィールド構造の型をエラー構造の型([key?]: string)に変換する
 */

// tslint:disable:array-type prefer-array-literal
type ValidationErrors<T> = {
  [P in keyof T]?: T[P] extends object ? ValidationErrors<T[P]> : string;
};

export default ValidationErrors;
