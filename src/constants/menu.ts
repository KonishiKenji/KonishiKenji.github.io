/**
 * サイドメニューに必要なパラメーター
 * @see @api/requests/errors/getSummaryErrors
 */

import { ComponentType } from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon/SvgIcon";

// 全階層共通
interface MenuItemBase {
  title: string; // 表示テキスト
  to: string; // 遷移先
  target?: string; // リンクのtarget属性
  selectedPattern?: string; // 開いているページの判定、指定がなければtoを使う
  isError?: boolean; // エラーがあればシステムで後から付与する
  checkPlanGroupInvoice?: boolean; // 請求機能が使えるプランかチェックする
  checkPlanGroupOperationSupport?: boolean; // 記録機能を使えるプランかチェックする
  checkPlanGroupLaborCharge?: boolean; // 作業時間機能が使えるプランかチェックする
}

// 第二階層
export interface MenuItemChild extends MenuItemBase {
  key?: "facility" | "users" | "records"; // errorsのkeyと紐づける
  rightIcon?: ComponentType<SvgIconProps>;
}

// 第一階層
export interface MenuItem extends MenuItemBase {
  icon: ComponentType<SvgIconProps>;
  children?: MenuItemChild[];
}

export type MenuItemList = MenuItem[];
