import * as URL from "@constants/url";
import OutlineReceiptIcon from "@images/icons/OutlineReceiptIcon";
import OutlineAssignmentIcon from "@images/icons/OutlineAssignmentIcon";
import OutlineRestoreIcon from "@images/icons/OutlineRestoreIcon";
import OutlineSettingsIcon from "@images/icons/OutlineSettingsIcon";
import OpenInNew from "@material-ui/icons/OpenInNew";
import HelpOutLine from "@material-ui/icons/HelpOutline";
import { MenuItemList } from "@constants/menu";

const MENU_ITEM_LIST_SEIKATSUKAIGO: MenuItemList = [
  {
    title: "利用実績",
    to: URL.REPORT,
    icon: OutlineRestoreIcon,
    selectedPattern: `^${URL.REPORT}.*$`
  },
  {
    title: "記録",
    to: "",
    icon: OutlineAssignmentIcon,
    children: [
      {
        title: "日々の記録",
        to: URL.RECORD_DAILY,
        selectedPattern: `${URL.RECORD_DAILY}|${URL.RECORD_PRINT_DAILY}`
      },
      {
        title: "利用者ごと",
        to: URL.RECORD_USERS_SUMMARY,
        key: "records",
        selectedPattern: `${URL.RECORD_USERS_SUMMARY}|${URL.RECORD_PRINT_USERS_SUMMARY}|^(${URL.RECORD}|${URL.RECORD_PRINT})/[0-9]+/.*$`
      },
      {
        title: "業務日誌",
        to: URL.RECORD_OPERATIONS,
        selectedPattern: `${URL.RECORD_OPERATIONS}|${URL.RECORD_PRINT_OPERATIONS}`
      }
    ],
    checkPlanGroupOperationSupport: true
  },
  {
    title: "請求",
    to: URL.DOWNLOAD,
    icon: OutlineReceiptIcon,
    selectedPattern: `^${URL.DOWNLOAD}.*$`,
    checkPlanGroupInvoice: true
  },
  {
    title: "設定",
    to: "",
    icon: OutlineSettingsIcon,
    children: [
      { title: "事業所情報", to: URL.FACILITY, key: "facility" },
      {
        title: "利用者情報",
        to: URL.USERS,
        key: "users",
        selectedPattern: `^${URL.USERS}.*$`
      },
      {
        title: "初期設定情報",
        to: URL.INITIAL,
        checkPlanGroupInvoice: true
      },
      {
        title: "作業情報",
        to: URL.WORKS,
        checkPlanGroupOperationSupport: true
      },
      {
        title: "職員情報",
        to: URL.STAFFS,
        checkPlanGroupOperationSupport: true
      }
    ]
  },
  {
    title: "ヘルプ",
    to: "",
    icon: HelpOutLine,
    children: [
      {
        title: "操作マニュアル",
        to: URL.SEIKATSUKAIGO_MANUAL_URL,
        target: "_blank",
        rightIcon: OpenInNew
      },
      {
        title: "お問い合わせ",
        to: URL.CONTACT,
        target: "_blank",
        rightIcon: OpenInNew
      }
    ]
  }
];

export default MENU_ITEM_LIST_SEIKATSUKAIGO;
